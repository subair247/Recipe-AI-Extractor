import React, { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const RecipeForm = (props) => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleExtract = async (e) => {
    e.preventDefault();

    console.log("PROPS:", props);

    if (!props.onExtractionSuccess) {
      console.error("onExtractionSuccess is missing!");
      return;
    }

    if (!url) return;

    setLoading(true);

    try {
      const response = await axios.post(
        `${API_URL}/extract-recipe`,
        { url },
        { timeout: 60000 }
      );

      if (response.data?.success) {
        props.onExtractionSuccess(response.data.data);
      } else {
        throw new Error("Invalid response");
      }

    } catch (err) {
      console.error("API ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleExtract}>
      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter recipe URL"
      />
      <button type="submit">
        {loading ? "Loading..." : "Extract"}
      </button>
    </form>
  );
};

export default RecipeForm;