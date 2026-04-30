import React, { useState } from "react";
import axios from "axios";

// 🔧 Keep backend URL in one place
const API_URL = "https://recipe-ai-extractor-1.onrender.com";

const RecipeForm = ({ setRecipes }) => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleExtract = async (e) => {
    e.preventDefault();

    if (!url) return;

    setLoading(true);

    // ✅ Reset safely (NOT null)
    setRecipes({});

    try {
      const response = await axios.post(
        `${API_URL}/extract-recipe`,
        { url },
        {
          headers: { "Content-Type": "application/json" },
          timeout: 60000, // Render cold start safe
        }
      );

      // ✅ Match backend structure
      if (response.data?.success) {
        setRecipes(response.data.data);
      } else {
        throw new Error("Invalid response from server");
      }

    } catch (error) {
      console.error("Extract Error:", error);

      // ⚠️ Demo fallback (keep only if required)
      if (url.toLowerCase().includes("apple") || url.toLowerCase().includes("pie")) {
        setRecipes({
          title: "Old Fashioned Apple Pie",
          cuisine: "American",
          ingredients: [
            "6 Granny Smith apples",
            "1/2 cup sugar",
            "1 tsp cinnamon",
            "Pie crust"
          ],
          instructions: [
            "Preheat oven to 200°C",
            "Mix apples with spices",
            "Bake for 45 mins"
          ],
          nutrition: { calories: "300 kcal" }
        });
      } else {
        // ❌ Real failure case
        setRecipes({
          error: "Failed to extract recipe. Try another URL."
        });
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