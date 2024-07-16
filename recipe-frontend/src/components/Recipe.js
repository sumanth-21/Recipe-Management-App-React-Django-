// import React from "react";

// function Recipe({ recipe, deleteRecipe }) {
//   const handleDelete = () => {
//     fetch(`http://127.0.0.1:8000/recipes/${recipe.id}/`, {
//       method: "DELETE",
//     }).then(() => deleteRecipe(recipe.id));
//   };

//   return (
//     <div className="max-w-sm mx-2 my-2 p-6 bg-gray-800 rounded-lg shadow-lg">
//       <h2 className="text-2xl font-bold text-white mb-4">{recipe.title}</h2>
//       <p className="text-gray-300 mb-4">{recipe.description}</p>
//       <h3 className="text-xl font-semibold text-white mb-2">Ingredients</h3>
//       <ul className="list-disc list-inside text-gray-400 mb-4">
//         {recipe.ingredients.map((ingredient, index) => (
//           <li key={index}>{ingredient}</li>
//         ))}
//       </ul>
//       <button
//         onClick={handleDelete}
//         className="w-full py-2 bg-red-500 hover:bg-red-600 rounded text-white font-semibold"
//       >
//         Delete
//       </button>
//     </div>
//   );
// }

// export default Recipe;

import React from "react";

function Recipe({ recipe, deleteRecipe, startEdit }) {
  const handleDelete = () => {
    fetch(`${process.env.REACT_APP_API_URL}/recipes/${recipe.id}/`, {
      method: "DELETE",
    }).then(() => deleteRecipe(recipe.id));
  };

  return (
    <div className="max-w-sm mx-2 my-2 p-6 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-4">{recipe.title}</h2>
      <p className="text-gray-300 mb-4">{recipe.description}</p>
      <h3 className="text-xl font-semibold text-white mb-2">Ingredients</h3>
      <ul className="list-disc list-inside text-gray-400 mb-4">
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <button
        onClick={handleDelete}
        className="w-full py-2 bg-red-500 hover:bg-red-600 rounded text-white font-semibold mb-2"
      >
        Delete
      </button>
      <button
        onClick={() => startEdit(recipe)}
        className="w-full py-2 bg-yellow-500 hover:bg-yellow-600 rounded text-white font-semibold"
      >
        Edit
      </button>
    </div>
  );
}

export default Recipe;
