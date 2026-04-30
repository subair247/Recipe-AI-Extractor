import React, { useState } from "react";
import axios from "axios";

const API_URL = "https://recipe-ai-extractor-1.onrender.com";

const RecipeForm = ({ onExtractionSuccess }) => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleExtract = async (e) => {
    e.preventDefault();

    console.log("onExtractionSuccess:", onExtractionSuccess);

    if (!url) return;

    setLoading(true);

    try {
      const response = await axios.post(
        `${API_URL}/extract-recipe`,
        { url },
        { timeout: 60000 }
      );

      if (response.data?.success) {
        onExtractionSuccess(response.data.data);
      }

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleExtract}>
      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button type="submit">Extract</button>
    </form>
  );
};

export default RecipeForm;