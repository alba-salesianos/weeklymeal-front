# Components

- Today's Recipe
- New Menu Button
- Add Recipe Button

# Usage

Upon first entering the add, the "Crear Nuevo Menu" will be disabled until the user has uploaded a minimum of 7 recipes, as the generator needs them to do a menu without repeating recipes in one week.

So, the next step will be to press "Añadir receta" and complete the form with the corresponding information.

Once there is 7 recipes, the "Crear Nuevo Menu" will be pressable, and a modal will appear that will ask the user for 2 options when creating a menu: default or custom.

If the user presses custom, they will be asked how many times each type of food will appear, otherwise the app will load while it's sending the menu to the server. To see the menu, the user will have to navigate to the Weekly Menu page.

Once there's a menu, the TodaysRecipe component will show the recipe for today, and pressing upon it will bring up a screen with the details of the recipe.
