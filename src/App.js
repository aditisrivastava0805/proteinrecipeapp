import React, { useState } from 'react';
import IngredientsForm from './IngredientsForm';
import { fetchRecipes } from './api';

function App() {
  const [recipes, setRecipes] = useState([]);

  const handleSearch = async (ingredients) => {
    console.log('Searching with ingredients:', ingredients);
    const matchedRecipes = await fetchRecipes(ingredients);
    setRecipes(matchedRecipes);
  };

  return (
    <div>
      <h1>High-Protein Recipe Generator</h1>
      <IngredientsForm onSearch={handleSearch} />

      <h2>Results:</h2>
      {recipes.length === 0 ? (
        <p>No recipes found yet.</p>
      ) : (
        recipes.map((recipe, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
            <h3>{recipe.title}</h3>
            <p>Ingredients: {recipe.ingredients.join(', ')}</p>
            <p>Macros: {recipe.macros.protein}g Protein | {recipe.macros.carbs}g Carbs | {recipe.macros.fats}g Fats</p>
            <p>Match Score: {Math.round(recipe.match_score * 100)}%</p>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
