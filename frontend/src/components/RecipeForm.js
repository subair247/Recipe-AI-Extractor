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
                { timeout: 60000 }
            );
            
            // If we get ANY response from our backend, set the data
            if (response.data) {
                setRecipes(response.data);
            }
        } catch (error) {
            // Even on error, check if the backend sent the fallback data
            if (error.response && error.response.data) {
                setRecipes(error.response.data);
            } else {
                console.error("Backend unreachable");
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