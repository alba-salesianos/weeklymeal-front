import React from "react";
import { RecipeContext, RecipeTypeContext } from "../contexts/RecipeContext";
import { Recipe } from "../types/RecipeType";
import recipesData from "../testing/recipesExample.json";

type RecipeProviderProps = {
  children: JSX.Element | JSX.Element[];
};

function RecipeProvider(props: RecipeProviderProps) {
  const { children } = props;

  let recipeDefault: Recipe = {
    idRecipe: "123456",
    name: "AAA",
    description: "BBB",
    label: "CCC",
    ingredients: "DDD",
    steps: "EEE",
  };

  const [recipe, setRecipe] = React.useState(recipeDefault);
  const [todaysRecipe, setTodaysRecipe] = React.useState(recipeDefault);
  const [recipes, setRecipes] = React.useState<Recipe[]>(recipesData);

  const defaultValue: RecipeTypeContext = {
    recipe,
    setRecipe,
    todaysRecipe,
    setTodaysRecipe,
    recipes,
    setRecipes,
  };

  return (
    <RecipeContext.Provider value={defaultValue}>
      {children}
    </RecipeContext.Provider>
  );
}

export default RecipeProvider;
