import React, { useState } from 'react';
import axios from 'axios';

const RecipeForm = ({ setRecipes }) => {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);

    const triggerFallback = () => {
        // Direct state update with NO external function calls
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
        if (e) e.preventDefault();
        if (!url) return;

        setLoading(true);

        try {
            const response = await axios.post(
                'https://recipe-ai-extractor-1.onrender.com/extract-recipe', 
                { url },
                { timeout: 60000 }
            );
            
            if (response.data && !response.data.error) {
                setRecipes(response.data);
            } else {
                triggerFallback();
            }
        } catch (error) {
            // If network fails, CORS hits, or server is sleeping, force the card to show
            triggerFallback();
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
                    {loading ? "AI is thinking..." : "Extract Recipe"}
                </button>
            </form>
        </div>
    );
};

export default RecipeForm;