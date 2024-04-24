export type Recipe = {
  idRecipe: string;
  name: string;
  description: string;
  label: string;
  ingredients: string;
  steps: string;
};

export type MenuItem = {
  day: string;
  recipe: Recipe;
};
