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
            // Ensure the URL matches your active Render service
            const response = await axios.post('https://recipe-ai-extractor-1.onrender.com/extract-recipe', { url });
            
            // 1. Clear the loading toast immediately
            toast.dismiss(loadToast);
            setRecipes(response.data);

            // 2. Check if the response is one of our fallback recipes
            const isFallback = [
                "Lemon Garlic Chicken Piccata", 
                "Bakery-Style Chocolate Chip Cookies",
                "Old Fashioned Apple Pie"
            ].includes(response.data.title);

            if (isFallback) {
                toast.error("Site blocked access. Showing sample recipe.", { icon: '⚠️', duration: 4000 });
            } else {
                toast.success("Recipe extracted successfully!");
            }
        } catch (error) {
            toast.dismiss(loadToast);
            // This only triggers if the backend server itself is down
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
                    placeholder="Paste recipe URL here..." 
                    value={url} 
                    onChange={(e) => setUrl(e.target.value)} 
                    disabled={loading}
                />
                <button type="submit" disabled={loading} className={loading ? "loading-btn" : ""}>
                    {loading ? "AI is thinking..." : "Extract Recipe"}
                </button>
            </form>
        </div>
    );
};

export default RecipeForm;