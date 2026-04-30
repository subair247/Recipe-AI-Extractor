import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const RecipeForm = ({ setRecipes }) => {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);

    const handleExtract = async (e) => {
    e.preventDefault();
    setLoading(true);
    setRecipes(null); // Clear old data
    const loadToast = toast.loading("AI is analyzing...");

    try {
        // 1. Increased timeout to 30 seconds to prevent "fake" connection errors
        const response = await axios.post(
            'https://recipe-ai-extractor-1.onrender.com/extract-recipe', 
            { url },
            { timeout: 30000 } 
        );
        
        toast.dismiss(loadToast);

        // 2. If we have data, USE IT immediately
        if (response.data) {
            setRecipes(response.data);
            
            // Check if it's a fallback recipe
            const fallbacks = ["Bakery-Style Chocolate Chip Cookies", "Lemon Garlic Chicken Piccata", "Old Fashioned Apple Pie"];
            if (fallbacks.includes(response.data.title)) {
                toast.error("Site blocked. Using smart fallback.", { icon: '⚠️' });
            } else {
                toast.success("Extraction successful!");
            }
        }
    } catch (error) {
        toast.dismiss(loadToast);
        
        // 3. Even if Axios "fails", check if we got data anyway (Render sometimes does this)
        if (error.response && error.response.data) {
            setRecipes(error.response.data);
            toast.error("Offline mode activated.");
        } else {
            console.error("Actual Error:", error);
            toast.error("Server is waking up. Please click again in 10 seconds.");
        }
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