import axios from "axios";
import { Recipe } from "../types/RecipeType";

const API_URL = "http://192.168.137.1:8082/api/v1";

const getAllRecipes = async () => {
  const response = await axios(`${API_URL}/recipes/2`);
  return response.data;
};

const createRecipe = async (recipe: Recipe) => {
  const response = await axios.post(`${API_URL}/recipe/2`, recipe);
  return response.data;
};

const updateRecipe = async (recipe: Recipe) => {
  const response = await axios.put(
    `${API_URL}/recipe/${recipe.idRecipe}`,
    recipe
  );
  return response.data;
};

const RecipeService = {
  getAllRecipes,
  createRecipe,
  updateRecipe,
};

export default RecipeService;
