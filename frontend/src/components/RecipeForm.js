import React, { useState } from 'react';
import axios from 'axios';

const RecipeForm = ({ setRecipes }) => {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);

    const triggerFallback = () => {
        // Direct object - NO alert, NO toast, NO extra functions
        const applePie = {
            title: "Old Fashioned Apple Pie",
            cuisine: "American",
            ingredients: ["6 Granny Smith apples", "1/2 cup sugar", "1 tsp cinnamon", "Pie crust"],
            instructions: ["Preheat oven to 200°C", "Mix apples with spices", "Bake for 45 mins"],
            nutrition: { "calories": "300 kcal" }
        };
        setRecipes(applePie);
    };

    const handleExtract = async (e) => {
  e.preventDefault();

  if (!query.trim()) {
    alert("Enter recipe name");
    return;
  }

  setLoading(true);

  try {
    const response = await axios.post(
      `${API_URL}/extract-recipe`,
      { url: query }
    );

    if (response.data && !response.data.error) {
      onExtractionSuccess(response.data);
    } else {
      alert(response.data.error || "No recipe found");
    }

  } catch (error) {
    console.error(error);
    alert("Failed to fetch recipe");
  } finally {
    setLoading(false);
  }
};

    return (
        <div className="form-container">
            <form onSubmit={handleExtract}>
                <input 
                    type="text" 
                    placeholder="Paste recipe URL here..." 
                    value={url} 
                    onChange={(e) => setUrl(e.target.value)} 
                    disabled={loading}
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Processing..." : "Extract Recipe"}
                </button>
            </form>
        </div>
    );
};

export default RecipeForm;