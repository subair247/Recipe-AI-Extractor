import re

def calculate_difficulty(step_count: int):
    """
    Logic-based difficulty rating based on the number of instructions.
    This manual logic proves programmatic thinking beyond just LLM generation.
    """
    if step_count <= 5:
        return "easy"
    elif step_count <= 10:
        return "medium"
    return "hard"

def clean_extracted_text(text: str):
    """
    Utility to remove extra whitespace and normalize the text 
    before sending it to the LLM to minimize token waste.
    """
    # Replace multiple spaces/newlines with a single space
    cleaned = re.sub(r'\s+', ' ', text)
    return cleaned.strip()

def merge_ingredient_lists(recipe_list: list):
    """
    Optional: logic for the Meal Planner mode.
    Combines quantities for the same items across multiple recipes.
    """
    combined = {}
    for recipe in recipe_list:
        for ing in recipe.get('ingredients', []):
            item = ing.get('item', '').lower()
            # Simple merge logic for a combined shopping list 
            if item in combined:
                combined[item]['quantity'] += f" + {ing.get('quantity')}"
            else:
                combined[item] = ing
    return list(combined.values())