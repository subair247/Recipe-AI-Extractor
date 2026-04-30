import React, { useState } from "react";
import axios from "axios";

// ✅ Get backend URL from environment
const API_URL = import.meta.env.VITE_API_URL;

const RecipeForm = ({ onExtractionSuccess }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleExtract = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
        // Hardcode the Render URL here to fix the "undefined" error instantly
        const response = await axios.post(
            'https://recipe-ai-extractor-1.onrender.com/extract-recipe', 
            { url },
            { timeout: 60000 }
        );
        
        if (response.data) {
            setRecipes(response.data);
        }
    } catch (error) {
        // If it's a 402/CORS error, check for fallback data
        if (error.response && error.response.data) {
            setRecipes(error.response.data);
        } else {
            console.error("API Error:", error);
            alert("The server is still waking up. Please click again in 10 seconds.");
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
          placeholder="Enter recipe name (e.g. chicken curry)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={loading}
          className="w-full p-3 border rounded-lg"
        />

        <button
          type="submit"
          disabled={loading}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          {loading ? "Fetching..." : "Get Recipe"}
        </button>
      </form>
    </div>
  );
};

export default RecipeForm;