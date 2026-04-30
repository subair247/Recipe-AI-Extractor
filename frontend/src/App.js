import React, { useState } from "react";
import RecipeForm from "./components/RecipeForm";
import RecipeCard from "./components/RecipeCard";
import HistoryTable from "./components/HistoryTable";
import DetailsModal from "./components/DetailsModal";

function App() {
  const [activeTab, setActiveTab] = useState("extract");
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [selectedHistoryRecipe, setSelectedHistoryRecipe] = useState(null);
  const [historyList, setHistoryList] = useState([]);

  // ✅ Clean handler (NO timeout hack)
  const handleExtractSuccess = (data) => {
    console.log("Data received in App.js:", data);

    // Show current recipe
    setCurrentRecipe(data);

    // Save to history
    setHistoryList((prev) => [data, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-blue-600">
            RecipeAI Extractor
          </h1>

          <div className="space-x-4">
            <button
              onClick={() => setActiveTab("extract")}
              className={`px-4 py-2 rounded-lg ${
                activeTab === "extract"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Extract New
            </button>

            <button
              onClick={() => setActiveTab("history")}
              className={`px-4 py-2 rounded-lg ${
                activeTab === "history"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              History
            </button>
          </div>
        </div>

        {activeTab === "extract" ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* ✅ Pass correct prop */}
            <RecipeForm onExtractionSuccess={handleExtractSuccess} />

            <div className="min-h-[400px]">
              {currentRecipe ? (
                <RecipeCard recipe={currentRecipe} />
              ) : (
                <div className="h-full border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center text-gray-400">
                  Enter a URL to see the magic happen
                </div>
              )}
            </div>
          </div>
        ) : (
          <HistoryTable
            recipes={historyList}
            onSelectRecipe={(recipe) =>
              setSelectedHistoryRecipe(recipe)
            }
          />
        )}

        {selectedHistoryRecipe && (
          <DetailsModal
            recipe={selectedHistoryRecipe}
            onClose={() => setSelectedHistoryRecipe(null)}
          />
        )}
      </div>
    </div>
  );
}

export default App;