import React, { useState } from 'react';
import axios from 'axios';

const RecipeForm = ({ setRecipes }) => {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);

    const handleExtract = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
        const response = await axios.post(
            'https://recipe-ai-extractor-1.onrender.com/extract-recipe', 
            { url },
            { timeout: 60000 } // Accounts for Render's 50s spin-up time
        );
        
        // If we reach here, simply set the data
        if (response.data) {
            setRecipes(response.data);
        }
    } catch (error) {
        // This is the CRITICAL fix: check for data even if there is an error status
        if (error.response && error.response.data) {
            console.log("Found fallback data in error response. Displaying now...");
            setRecipes(error.response.data);
        } else {
            console.error("Actual network failure:", error);
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