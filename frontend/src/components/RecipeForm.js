import React, { useState } from "react";
import axios from "axios";

// ✅ Get backend URL from environment
const API_URL = import.meta.env.VITE_API_URL;

const RecipeForm = ({ onExtractionSuccess }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleExtract = async (e) => {
    e.preventDefault();

    if (!query.trim()) {
      alert("Please enter a recipe name");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${API_URL}/extract-recipe`,
        { url: query }, // backend still expects "url" field
        { timeout: 30000 }
      );

      console.log("API RESPONSE:", response.data);

      if (response.data && !response.data.error) {
        onExtractionSuccess(response.data);
      } else {
        alert(response.data.error || "No recipe found");
      }
    } catch (error) {
      console.error("API ERROR:", error);
      alert("Failed to fetch recipe. Check backend or try again.");
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