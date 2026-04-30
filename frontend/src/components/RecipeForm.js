import React, { useState } from 'react';
import axios from 'axios';

const RecipeForm = ({ setRecipes }) => {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);

    const handleExtract = async (e) => {
    e.preventDefault();
    setLoading(true);
    setRecipes(null); // Clear old display

    try {
        const response = await axios.post(
            'https://recipe-ai-extractor-1.onrender.com/extract-recipe', 
            { url },
            { timeout: 60000 } // Extended timeout for Render spin-up
        );
        
        // If the code reaches here, it's a standard success
        if (response.data) {
            setRecipes(response.data);
        }
    } catch (error) {
        // IMPORTANT: Check if the backend sent fallback data despite the 'error' status
        if (error.response && error.response.data) {
            console.log("Using Fallback Data:", error.response.data);
            setRecipes(error.response.data);
        } else {
            console.error("True Connection Error:", error);
            alert("Server is waking up. Please click again in 10 seconds.");
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