import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const RecipeForm = ({ setRecipes }) => {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);

    const handleExtract = async (e) => {
        e.preventDefault();
        if (!url) return toast.error("Please paste a URL");

        setLoading(true);
        // Using a simple string ID to avoid object reference errors
        const toastId = "loading-toast"; 
        toast.loading("AI is analyzing...", { id: toastId });

        try {
            const response = await axios.post(
                'https://recipe-ai-extractor-1.onrender.com/extract-recipe', 
                { url },
                { timeout: 40000 } // Extra time for Render's free tier
            );
            
            toast.dismiss(toastId);

            if (response.data) {
                setRecipes(response.data);
                
                // Check if it's one of our fallback titles
                const fallbacks = ["Bakery-Style Chocolate Chip Cookies", "Lemon Garlic Chicken Piccata", "Old Fashioned Apple Pie"];
                if (fallbacks.includes(response.data.title)) {
                    toast("Site blocked. Using smart fallback.", { icon: '⚠️' });
                } else {
                    toast.success("Extraction successful!");
                }
            }
        } catch (error) {
            toast.dismiss(toastId);
            console.error("Full Error Object:", error);

            if (error.response && error.response.data) {
                setRecipes(error.response.data);
                toast("Server busy. Showing sample recipe.", { icon: 'ℹ️' });
            } else {
                toast.error("Please click Extract again in 5 seconds.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <Toaster />
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