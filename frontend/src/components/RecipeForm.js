import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const RecipeForm = ({ setRecipes }) => {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);

    const handleExtract = async (e) => {
    e.preventDefault();
    setLoading(true);
    const loadToast = toast.loading("AI is analyzing the recipe...");

    try {
        const response = await axios.post('https://recipe-ai-extractor-1.onrender.com/extract-recipe', { url });
        
        // 1. Success! Clear the loading state first
        toast.dismiss(loadToast);
        setRecipes(response.data);

        // 2. Now check if it was a fallback or real extraction
        if (response.data.title === "Lemon Garlic Chicken Piccata" || 
            response.data.title === "Bakery-Style Chocolate Chip Cookies") {
            toast.error("Site blocked access. Showing sample recipe.", { icon: '⚠️', duration: 4000 });
        } else {
            toast.success("Recipe extracted successfully!");
        }
    } catch (error) {
        toast.dismiss(loadToast);
        // This only runs if the SERVER is down, not if the scraping fails
        toast.error("Connection failed. Check if the backend is live.");
    } finally {
        setLoading(false);
    }
};

    return (
        <div className="form-container">
            <Toaster position="top-right" />
            <form onSubmit={handleExtract}>
                <input 
                    type="text" 
                    placeholder="Paste URL here..." 
                    value={url} 
                    onChange={(e) => setUrl(e.target.value)} 
                    disabled={loading}
                />
                <button type="submit" disabled={loading} className={loading ? "loading-btn" : ""}>
                    {loading ? <span className="spinner-text">AI is thinking...</span> : "Extract Recipe"}
                </button>
            </form>
        </div>
    );
};

export default RecipeForm;