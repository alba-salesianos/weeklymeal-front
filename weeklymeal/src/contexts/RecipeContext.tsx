import { createContext } from "react";
import { MenuItem, Recipe } from "../types/RecipeType";

export type RecipeTypeContext = {
  todaysRecipe: Recipe;
  setTodaysRecipe: Function;
  recipe: Recipe;
  setRecipe: Function;
  recipes: Recipe[];
  setRecipes: Function;
  currentMenu: MenuItem[];
  setCurrentMenu: Function;
};

export const RecipeContext = createContext({} as RecipeTypeContext);
