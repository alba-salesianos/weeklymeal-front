export type Recipe = {
  idRecipe: number | undefined;
  name: string;
  description: string;
  label: "hidratos" | "fibra" | "proteína" | "pescado";
  ingredients: string;
  steps: string;
};

export type Preferences = {
  hidratos: number;
  fibra: number;
  proteína: number;
  pescado: number;
};

export type MenuItem = {
  day: string;
  recipe: Recipe;
};
