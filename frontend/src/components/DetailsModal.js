import React from 'react';
import RecipeCard from './RecipeCard';

const DetailsModal = ({ recipe, onClose }) => {
  // Prevent the modal from rendering if no recipe is selected
  if (!recipe) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4">
      <div className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-200">
        
        {/* Header/Close Action */}
        <div className="sticky top-0 bg-white z-10 p-4 border-b flex justify-between items-center">
          <h3 className="font-bold text-gray-700">Recipe Deep-Dive</h3>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {/* We pass the stored full_data JSON directly to the RecipeCard.
            This ensures Tab 1 and Tab 2 look identical, creating a polished UX.
          */}
          <RecipeCard data={recipe.full_data || recipe} />
          
          <div className="mt-8 bg-gray-50 p-6 rounded-xl border border-dashed border-gray-300">
            <h4 className="font-bold text-gray-800 mb-2">Internal Metadata</h4>
            <p className="text-xs text-gray-500 font-mono">
              Source URL: {recipe.url} <br />
              Extracted On: {new Date(recipe.created_at).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t text-right">
          <button 
            onClick={onClose}
            className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition-all"
          >
            Close View
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsModal;