import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const RecipeForm = ({ setRecipes }) => {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);

    const handleExtract = async (e) => {
        e.preventDefault();
        if (!url) {
            toast.error("Please paste a URL first!");
            return;
        }

        setLoading(true);
        const loadingToast = toast.loading("AI is analyzing the recipe...");

        try {
            const response = await axios.post(
                'https://recipe-ai-extractor-1.onrender.com/extract-recipe', 
                { url }
            );

            // Check if the backend used the fallback logic
            if (response.data.title === "Lemon Garlic Chicken Piccata") {
                toast.dismiss(loadingToast);
                toast.error("Site blocked access. Showing sample recipe.", {
                    duration: 5000,
                    icon: '⚠️',
                });
            } else {
                toast.dismiss(loadingToast);
                toast.success("Recipe extracted successfully!");
            }

            setRecipes(response.data);
        } catch (error) {
            toast.dismiss(loadingToast);
            toast.error("Connection failed. Check if the backend is live.");
            console.error("Extraction Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <Toaster position="top-right" reverseOrder={false} />
            <form onSubmit={handleExtract}>
                <input
                    type="text"
                    placeholder="Paste recipe URL here (e.g., AllRecipes, SimplyRecipes)..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    disabled={loading}
                />
                <button type="submit" disabled={loading} className={loading ? "loading-btn" : ""}>
                    {loading ? (
                        <span className="spinner-text">AI is thinking...</span>
                    ) : (
                        "Extract Recipe"
                    )}
                </button>
            </form>
        </div>
    );
};

export default RecipeForm;