import { useState, useCallback } from "react";
import axios from "axios";

// 🔧 Single source of truth for backend URL
const API_BASE_URL = "https://recipe-ai-extractor.onrender.com";

export const useRecipes = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Extract Recipe
  const extractRecipe = useCallback(async (url) => {
    if (!url) {
      setError("Please enter a valid URL");
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/extract-recipe`, // ✅ FIXED ENDPOINT
        { url },
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 20000, // ⚠️ Required for Render cold start
        }
      );

      // ✅ Validate backend response
      if (!response.data?.success) {
        throw new Error(
          response.data?.detail || "Invalid response from server"
        );
      }

      return response.data.data;

    } catch (err) {
      console.error("Extract Recipe Error:", err);

      const message =
        err.response?.data?.detail ||
        err.message ||
        "Server connection failed";

      setError(message);
      return null;

    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ Fetch History (ONLY if your backend supports it)
  const fetchHistory = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${API_BASE_URL}/history`, // ⚠️ Make sure this exists in backend
        {
          timeout: 10000,
        }
      );

      return response.data;

    } catch (err) {
      console.error("History Error:", err);
      setError("Failed to load history");
      return [];

    } finally {
      setLoading(false);
    }
  }, []);

  return {
    extractRecipe,
    fetchHistory,
    loading,
    error,
  };
};