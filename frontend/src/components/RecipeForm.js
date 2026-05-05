import React, { useState } from 'react';
import axios from 'axios';

const RecipeForm = ({ setRecipes }) => {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);

    const handleExtract = async (e) => {
    // 1. Prevent the page from refreshing
    if (e) e.preventDefault();
    
    // 2. Direct validation
    if (!url || url.trim() === "") {
        return alert("Please paste a URL first.");
    }

    setLoading(true);

    try {
        console.log("Sending request to backend..."); // Verify this in your console
        const response = await axios.post(
            'https://recipe-ai-extractor-1.onrender.com/extract-recipe', 
            { url: url.trim() },
            { timeout: 60000 }
        );
        
        if (response.data) {
            setRecipes(response.data);
        }
    } catch (error) {
        // If it's a scraper error (402/404), use the Apple Pie fallback
        if (error.response && error.response.data) {
            setRecipes(error.response.data);
        } else {
            console.error("Network error:", error);
            alert("The server is waking up. Please wait 10 seconds and try again.");
        }
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