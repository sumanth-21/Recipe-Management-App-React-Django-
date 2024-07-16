// import React, { useState } from "react";

// function AddRecipe({ addRecipe }) {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [ingredients, setIngredients] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     fetch("http://127.0.0.1:8000/recipes/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         title,
//         description,
//         ingredients: ingredients.split(","),
//       }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         addRecipe(data);
//         setTitle("");
//         setDescription("");
//         setIngredients("");
//       });
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-lg mx-auto my-6 p-4 bg-gray-800 rounded shadow-lg"
//     >
//       <input
//         type="text"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         placeholder="Title"
//         required
//         className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
//       />
//       <textarea
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         placeholder="Description"
//         required
//         className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
//       />
//       <input
//         type="text"
//         value={ingredients}
//         onChange={(e) => setIngredients(e.target.value)}
//         placeholder="Ingredients (comma separated)"
//         required
//         className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
//       />
//       <button
//         type="submit"
//         className="w-full p-2 bg-blue-500 rounded text-white"
//       >
//         Add Recipe
//       </button>
//     </form>
//   );
// }

// export default AddRecipe;

import React, { useState, useEffect } from "react";
import Loader from "../utils/Loader";

function RecipeForm({ addRecipe, editRecipe, editingRecipe, onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (editingRecipe) {
      setTitle(editingRecipe.title);
      setDescription(editingRecipe.description);
      setIngredients(editingRecipe.ingredients.join(", "));
    }
  }, [editingRecipe]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const method = editingRecipe ? "PUT" : "POST";
    const url = editingRecipe
      ? `${process.env.REACT_APP_API_URL}/recipes/${editingRecipe.id}/`
      : `${process.env.REACT_APP_API_URL}/recipes/`;

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        ingredients: ingredients.split(","),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (editingRecipe) {
          editRecipe(data);
        } else {
          addRecipe(data);
        }
        setTitle("");
        setDescription("");
        setIngredients("");
        onClose();
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  };

  return (
    <div>
      {isLoading && <Loader />}
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto my-6 p-4 bg-gray-800 rounded shadow-lg"
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
        />
        <input
          type="text"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Ingredients (comma separated)"
          required
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 rounded text-white"
        >
          {editingRecipe ? "Update Recipe" : "Add Recipe"}
        </button>
      </form>
    </div>
  );
}

export default RecipeForm;
