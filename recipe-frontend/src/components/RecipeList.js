// import React, { useEffect, useState } from "react";
// import Recipe from "./Recipe";
// import AddRecipe from "./AddRecipe";

// function RecipeList() {
//   const [recipes, setRecipes] = useState([]);

//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/recipes/")
//       .then((response) => response.json())
//       .then((data) => setRecipes(data));
//   }, []);

//   const addRecipe = (recipe) => {
//     setRecipes([...recipes, recipe]);
//   };

//   const deleteRecipe = (id) => {
//     setRecipes(recipes.filter((recipe) => recipe.id !== id));
//   };

//   return (
//     <div className="dark:bg-gray-900 dark:text-white min-h-screen">
//       <h1 className="text-4xl font-bold text-center py-6">
//         Recipe Management System
//       </h1>
//       <AddRecipe addRecipe={addRecipe} />
//       <div className="flex flex-wrap justify-center">
//         {recipes.map((recipe) => (
//           <Recipe key={recipe.id} recipe={recipe} deleteRecipe={deleteRecipe} />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default RecipeList;

import React from "react";
import Recipe from "./Recipe";

function RecipeList({ recipes, setRecipes, startEdit }) {
  const deleteRecipe = (id) => {
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
  };

  return (
    <div className="flex flex-wrap justify-center">
      {recipes.map((recipe) => (
        <Recipe
          key={recipe.id}
          recipe={recipe}
          deleteRecipe={deleteRecipe}
          startEdit={startEdit}
        />
      ))}
    </div>
  );
}

export default RecipeList;
