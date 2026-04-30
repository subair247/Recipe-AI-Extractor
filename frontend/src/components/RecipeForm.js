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
        
        // This is the only part that matters: setting the data
        if (response && response.data) {
            setRecipes(response.data);
        }
    } catch (error) {
        // If the backend sends the fallback (like Apple Pie) inside an error response
        if (error.response && error.response.data) {
            setRecipes(error.response.data);
        } 
        // We are NOT adding a console.error here because that is where your current code is crashing
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