import { createContext } from "react";
import { Recipe } from "../types/RecipeType";

export type RecipeTypeContext = {
  todaysRecipe: Recipe;
  setTodaysRecipe: Function;
  recipe: Recipe;
  setRecipe: Function;
  recipes: Recipe[];
  setRecipes: Function;
};

export const RecipeContext = createContext({} as RecipeTypeContext);
