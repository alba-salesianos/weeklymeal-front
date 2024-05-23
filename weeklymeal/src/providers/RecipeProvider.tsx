import React from "react";
import { RecipeContext, RecipeTypeContext } from "../contexts/RecipeContext";
import { MenuItem, Recipe } from "../types/RecipeType";
import recipesData from "../testing/recipesExample.json";

type RecipeProviderProps = {
  children: JSX.Element | JSX.Element[];
};

function RecipeProvider(props: RecipeProviderProps) {
  const { children } = props;

  let recipeDefault: Recipe = {
    id: undefined,
    name: "",
    description: "",
    label: "" as "hidratos" | "fibra" | "proteína" | "pescado",
    ingredients: "",
    steps: "",
  };

  const [recipe, setRecipe] = React.useState(recipeDefault);
  const [todaysRecipe, setTodaysRecipe] = React.useState(recipeDefault);
  const [recipes, setRecipes] = React.useState<Recipe[]>([]);
  const [currentMenu, setCurrentMenu] = React.useState<Recipe[]>([]);

  const defaultValue: RecipeTypeContext = {
    recipe,
    setRecipe,
    todaysRecipe,
    setTodaysRecipe,
    recipes,
    setRecipes,
    currentMenu,
    setCurrentMenu,
  };

  return (
    <RecipeContext.Provider value={defaultValue}>
      {children}
    </RecipeContext.Provider>
  );
}

export default RecipeProvider;
