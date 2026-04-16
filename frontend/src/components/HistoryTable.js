import React from 'react';

const HistoryTable = ({ recipes, onSelectRecipe }) => {
  // If no recipes have been extracted yet, show this message
  if (!recipes || recipes.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
        <p className="text-gray-400">No recipes found in history. Try extracting one first!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 border-b border-gray-100">
          <tr>
            <th className="px-6 py-4 text-sm font-semibold text-gray-600">Recipe Name</th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-600">Cuisine</th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-600">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {recipes.map((recipe, index) => (
            <tr key={index} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 text-sm text-gray-800 font-medium">{recipe.title}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{recipe.cuisine}</td>
              <td className="px-6 py-4 text-sm">
                <button 
                  onClick={() => onSelectRecipe(recipe)}
                  className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;