import React, { useState } from 'react';
import axios from 'axios';

const RecipeForm = ({ setRecipes }) => {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);

    const handleExtract = async (e) => {
    e.preventDefault();
    if (!url) return alert("Please paste a URL first");

    setLoading(true);
    // Removed toast.loading to stop the 't is not a function' error
    
    try {
        const response = await axios.post(
            'https://recipe-ai-extractor-1.onrender.com/extract-recipe', 
            { url },
            { timeout: 50000 } // Extended timeout for Render's free tier
        );
        
        if (response && response.data) {
            setRecipes(response.data);
        }
    } catch (error) {
        console.error("Extraction Error:", error);
        // Handle fallback data if the server sent it
        if (error.response && error.response.data) {
            setRecipes(error.response.data);
        } else {
            alert("The server is still starting up. Please wait 10 seconds and try again.");
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