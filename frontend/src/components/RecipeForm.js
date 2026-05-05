import React, { useState } from "react";
import axios from "axios";

const RecipeForm = ({ onExtractionSuccess }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Correct env for CRA
  const API_URL = process.env.REACT_APP_API_URL;

  console.log("API URL:", API_URL); // debug

  const handleExtract = async (e) => {
    e.preventDefault();

    if (!query.trim()) {
      alert("Enter recipe name");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${API_URL}/extract-recipe`, // ✅ correct endpoint
        { url: query },
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 30000,
        }
      );

      console.log("API RESPONSE:", response.data);

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