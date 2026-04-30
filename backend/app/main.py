from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from pydantic import BaseModel
from app.scraper import scrape_recipe_url
from app.llm_handler import extract_structured_data


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # This allows your Vercel frontend to talk to Render
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RecipeRequest(BaseModel):
    url: str

@app.post("/extract-recipe")
async def extract_recipe(request: RecipeRequest):
    # Default empty text to prevent "not defined" errors
    recipe_text = ""
    
    try:
        # Step 1: Scrape
        recipe_text = scrape_recipe_url(request.url)
    except Exception as e:
        print(f"Scraper blocked: {e}")
        recipe_text = ""

    # Step 2: Pass text AND url to the handler
    # This ensures your Quiche/Cookie logic works!
    structured_data = extract_structured_data(recipe_text, request.url)
    
    return structured_data