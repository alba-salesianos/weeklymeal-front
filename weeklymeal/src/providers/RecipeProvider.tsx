import React from "react";
import { RecipeContext, RecipeTypeContext } from "../contexts/RecipeContext";
import { Menu, Recipe } from "../types/RecipeType";

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

  let menuDefault: Menu = {
    id: 0,
    created: "",
    recipes: [],
  };

  const [recipe, setRecipe] = React.useState(recipeDefault);
  const [todaysRecipe, setTodaysRecipe] = React.useState(recipeDefault);
  const [recipes, setRecipes] = React.useState<Recipe[]>([]);
  const [currentMenu, setCurrentMenu] = React.useState<Menu>(menuDefault);

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
