import { useState, useCallback } from 'react';
import axios from 'axios';

export const useRecipes = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const extractRecipe = useCallback(async (url) => {
        setLoading(true);
        setError(null);
        try {
            // Points to your Python FastAPI backend
            const response = await axios.post('https://recipe-ai-extractor.onrender.com-recipe', { url });
            return response.data;
        } catch (err) {
            const message = err.response?.data?.detail || "Could not connect to the server.";
            setError(message);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchHistory = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8000/history');
            return response.data;
        } catch (err) {
            setError("Failed to load history.");
            return [];
        } finally {
            setLoading(false);
        }
    }, []);

    return { extractRecipe, fetchHistory, loading, error };
};