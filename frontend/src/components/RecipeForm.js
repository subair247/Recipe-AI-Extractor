import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const RecipeForm = ({ setRecipes }) => {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);

    const handleExtract = async (e) => {
    e.preventDefault();
    if (!url) return alert("Please paste a URL");

    setLoading(true);
    console.log("Starting extraction for:", url);

    try {
        const response = await axios.post(
            'https://recipe-ai-extractor-1.onrender.com/extract-recipe', 
            { url },
            { timeout: 45000 } 
        );
        
        if (response.data) {
            console.log("Success! Data received:", response.data);
            setRecipes(response.data);
            toast.success("Recipe extracted!");
        }
    } catch (error) {
        console.error("Extraction Error:", error);
        if (error.response && error.response.data) {
            setRecipes(error.response.data);
            toast.error("Using fallback data.");
        } else {
            alert("The server is still waking up. Please wait 10 seconds and click again.");
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