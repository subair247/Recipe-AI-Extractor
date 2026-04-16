import React from 'react';

const RecipeCard = ({ recipe }) => {
  if (!recipe) return null;

  return (
    <div className="bg-white rounded-2xl shadow-lg border p-6 space-y-4 animate-in fade-in duration-500">
      <div className="flex justify-between items-start">
        <h2 className="text-2xl font-bold text-gray-800">{recipe.title || "Untitled Recipe"}</h2>
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
          {recipe.cuisine || "General"}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-100">
        <div>
          <p className="text-sm text-gray-500">Calories</p>
          {/* THE FIX: Added ?. safety checks */}
          <p className="font-semibold text-lg">{recipe.nutrition?.calories || "N/A"}</p>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-gray-700 mb-2">Ingredients</h3>
        <ul className="list-disc list-inside space-y-1 text-gray-600">
          {recipe.ingredients?.map((ing, index) => (
            <li key={index}>{ing}</li>
          )) || <li>No ingredients listed</li>}
        </ul>
      </div>

      <div>
        <h3 className="font-semibold text-gray-700 mb-2">Instructions</h3>
        <ol className="list-decimal list-inside space-y-2 text-gray-600">
          {recipe.instructions?.map((step, index) => (
            <li key={index}>{step}</li>
          )) || <li>No instructions provided</li>}
        </ol>
      </div>
    </div>
  );
};

export default RecipeCard;