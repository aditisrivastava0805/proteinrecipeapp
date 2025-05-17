import React, { useState } from 'react';

function IngredientsForm({ onSearch }) {
  const [ingredientInput, setIngredientInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const ingredients = ingredientInput.split(',').map(item => item.trim());
    onSearch(ingredients);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter Ingredients (comma separated):
        <input
          type="text"
          value={ingredientInput}
          onChange={(e) => setIngredientInput(e.target.value)}
          placeholder="e.g., banana, fairlife milk, pb fit"
        />
      </label>
      <button type="submit">Find Recipes</button>
    </form>
  );
}

export default IngredientsForm;
