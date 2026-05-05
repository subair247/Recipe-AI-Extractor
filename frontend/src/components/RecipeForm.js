import React, { useState } from "react";
import axios from "axios";

const RecipeForm = ({ onExtractionSuccess }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ API URL from env
  const API_URL = import.meta.env.VITE_API_URL;
  console.log("API URL:", import.meta.env.REACT_APP_API_URL);

  const handleExtract = async (e) => {
    e.preventDefault();

    if (!query.trim()) {
      alert("Enter recipe name");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${API_URL}/extract-recipe`,
        { url: query }
      );

      if (response.data && !response.data.error) {
        onExtractionSuccess(response.data);
      } else {
        alert(response.data.error || "No recipe found");
      }
    } catch (error) {
      console.error("API ERROR:", error);
      alert("Failed to fetch recipe");
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
        />

        <button type="submit" disabled={loading}>
          {loading ? "Fetching..." : "Get Recipe"}
        </button>
      </form>
    </div>
  );
};

export default RecipeForm;