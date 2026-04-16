import React, { useState } from 'react';
import axios from 'axios';

const RecipeForm = ({ onExtractionSuccess }) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Inside RecipeForm.js
      const response = await axios.post('http://localhost:8000/extract-recipe', { url });
      onExtractionSuccess(response.data); // <--- This MUST match the prop name in App.js
    } catch (error) {
      alert("Extraction failed. Make sure the backend is running!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <h2 className="text-lg font-semibold mb-4">Recipe Source</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="url" 
          required
          placeholder="https://allrecipes.com/recipe/..."
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button 
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Scraping & Analyzing..." : "Extract Recipe"}
        </button>
      </form>
    </div>
  );
};

export default RecipeForm;