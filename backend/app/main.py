from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, HttpUrl
from app.scraper import scrape_recipe_url
from app.llm_handler import extract_structured_data


app = FastAPI()


# ✅ CORS (keep frontend access open for now)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ✅ Validate URL properly
class RecipeRequest(BaseModel):
    url: HttpUrl


# ✅ Health check route (important for testing)
@app.get("/")
def root():
    return {"status": "API is running"}


# ✅ Main API
@app.post("/extract-recipe")
async def extract_recipe(request: RecipeRequest):
    try:
        # 🔴 STEP 1: Scrape recipe page
        recipe_text = scrape_recipe_url(str(request.url))

        if not recipe_text:
            raise HTTPException(
                status_code=502,
                detail="Failed to fetch recipe content (blocked or empty)"
            )

        if isinstance(recipe_text, str) and recipe_text.startswith("Error"):
            raise HTTPException(status_code=502, detail=recipe_text)

        # 🔴 STEP 2: Extract structured data using LLM
        structured_data = extract_structured_data(
            recipe_text,
            str(request.url)
        )

        if not structured_data:
            raise HTTPException(
                status_code=500,
                detail="AI failed to extract recipe data"
            )

        # ✅ SUCCESS RESPONSE (matches frontend expectation)
        return {
            "success": True,
            "data": structured_data
        }

    except HTTPException as http_err:
        raise http_err

    except Exception as e:
        print(f"Unexpected error: {e}")
        raise HTTPException(
            status_code=500,
            detail="Internal server error"
        )