from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests

app = FastAPI()

# CORS (keep this)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request model (keep same)
class RecipeRequest(BaseModel):
    url: str  # now this will be used as a search query


# 🔥 NEW: Fetch recipe from API (no scraping)
def fetch_recipe_from_api(query: str):
    api_url = f"https://www.themealdb.com/api/json/v1/1/search.php?s={query}"

    response = requests.get(api_url)

    if response.status_code != 200:
        return {"error": "Failed to fetch recipe from API"}

    data = response.json()

    if not data.get("meals"):
        return {"error": "No recipe found"}

    meal = data["meals"][0]

    # Extract ingredients
    ingredients = []
    for i in range(1, 21):
        ing = meal.get(f"strIngredient{i}")
        measure = meal.get(f"strMeasure{i}")

        if ing and ing.strip():
            ingredients.append(f"{measure} {ing}".strip())

    # Extract instructions
    instructions = meal.get("strInstructions", "")
    steps = [step.strip() for step in instructions.split(".") if step.strip()]

    return {
        "title": meal.get("strMeal"),
        "cuisine": meal.get("strArea"),
        "ingredients": ingredients,
        "instructions": steps,
        "image": meal.get("strMealThumb"),
    }


# 🔥 UPDATED endpoint
@app.post("/extract-recipe")
async def extract_recipe(request: RecipeRequest):
    try:
        query = request.url  # user types "chicken curry"
        data = fetch_recipe_from_api(query)
        return data
    except Exception as e:
        return {"error": str(e)}


# Optional root route (for testing)
@app.get("/")
def read_root():
    return {"status": "API is running"}