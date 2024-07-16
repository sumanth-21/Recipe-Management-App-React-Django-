// import RecipeList from "./components/RecipeList";

// function App() {
//   return (
//     <div className="App">
//       <RecipeList />
//     </div>
//   );
// }

// export default App;

import React, { useEffect, useState } from "react";
import RecipeList from "./components/RecipeList";
import RecipeForm from "./components/RecipeForm";
import Modal from "./utils/Model";
import Loader from "./utils/Loader";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/recipes/`)
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  const addRecipe = (recipe) => {
    setRecipes([...recipes, recipe]);
  };

  const editRecipe = (updatedRecipe) => {
    setRecipes(
      recipes.map((recipe) =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      )
    );
  };

  const startEdit = (recipe) => {
    setEditingRecipe(recipe);
    setIsModalOpen(true);
  };

  const handleAddClick = () => {
    setEditingRecipe(null);
    setIsModalOpen(true);
  };

  return (
    <div className="dark:bg-gray-900 dark:text-white min-h-screen">
      <h1 className="text-4xl font-bold text-center py-6">
        Recipe Management System
      </h1>
      <button
        onClick={handleAddClick}
        className="block mx-auto px-5 py-2 bg-blue-500 hover:bg-blue-600 rounded text-white font-semibold mb-6"
      >
        Add Recipe
      </button>
      {isLoading && <Loader />}
      <RecipeList
        recipes={recipes}
        setRecipes={setRecipes}
        startEdit={startEdit}
      />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <RecipeForm
          addRecipe={addRecipe}
          editRecipe={editRecipe}
          editingRecipe={editingRecipe}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}

export default App;
