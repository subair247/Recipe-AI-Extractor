import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast'; // Ensure Toaster is here

const RecipeForm = ({ setRecipes }) => {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);

    const handleExtract = async (e) => {
        e.preventDefault();
        if (!url) return toast.error("Please paste a URL first");

        setLoading(true);
        // We use toast() as a simple fallback if .loading has issues
        const toastId = toast.loading("AI is analyzing the recipe...");

        try {
            const response = await axios.post(
                'https://recipe-ai-extractor-1.onrender.com/extract-recipe', 
                { url },
                { timeout: 30000 } // Long timeout for Render's free tier
            );
            
            toast.dismiss(toastId);

            if (response.data) {
                setRecipes(response.data);
                
                // Logic to identify if a fallback recipe was served
                const isFallback = [
                    "Bakery-Style Chocolate Chip Cookies", 
                    "Lemon Garlic Chicken Piccata", 
                    "Old Fashioned Apple Pie"
                ].includes(response.data.title);

                if (isFallback) {
                    toast("Site blocked access. Showing sample.", { icon: '⚠️' });
                } else {
                    toast.success("Recipe extracted!");
                }
            }
        } catch (error) {
            toast.dismiss(toastId);
            console.error("Extraction Error:", error);
            
            // Critical fix: Check if the server actually sent data despite the error
            if (error.response && error.response.data) {
                setRecipes(error.response.data);
                toast.error("Using smart fallback data.");
            } else {
                toast.error("Server is busy. Please try again in a moment.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <Toaster position="top-right" /> {/* This must be present for toasts to show */}
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