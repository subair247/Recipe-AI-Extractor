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
            // Using the -1 service as seen in your Render dashboard
            const response = await axios.post('https://recipe-ai-extractor-1.onrender.com/extract-recipe', { url });
            
            setRecipes(response.data);
            toast.dismiss(loadToast);

            // Notify if we used a fallback due to site blocking
            if (response.data.title === "Lemon Garlic Chicken Piccata") {
                toast.error("Site blocked access. Showing sample recipe.", { icon: '⚠️', duration: 5000 });
            } else {
                toast.success("Recipe extracted!");
            }
        } catch (error) {
            toast.dismiss(loadToast);
            // If backend is waking up or 402 occurred but returned data
            if (error.response && error.response.data) {
                setRecipes(error.response.data);
                toast.error("Using offline fallback mode.");
            } else {
                toast.error("Connection failed. Try again in 30 seconds.");
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