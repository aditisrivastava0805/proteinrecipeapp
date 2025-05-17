import axios from 'axios';

export const fetchRecipes = async (ingredients) => {
  try {
    const response = await axios.post('http://127.0.0.1:5000/ingredients', { ingredients });
    return response.data.matched_recipes;
  } catch (error) {
    console.error("API call failed:", error);
    return [];
  }
};
