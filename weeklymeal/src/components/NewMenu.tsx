import { StyleSheet, Text, View, Button } from "react-native";
import React, { useContext, useState } from "react";
import { MenuItem, Recipe } from "../types/RecipeType";
import { RecipeContext } from "../contexts/RecipeContext";

const NewMenu = () => {
  const { recipes, setCurrentMenu } = useContext(RecipeContext);
  const [menuGenerated, setMenuGenerated] = useState(false);

  const generateMenu = () => {
    const daysOfWeek = [
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
      "Domingo",
    ];
    const recipesNeeded = 7;
    const loops = Math.ceil(recipesNeeded / recipes.length);

    const selectedRecipes: Recipe[] = [];

    for (let i = 0; i < loops; i++) {
      const shuffledRecipes = recipes.sort(() => Math.random() - 0.5);

      for (const recipe of shuffledRecipes) {
        if (selectedRecipes.length >= recipesNeeded) {
          break;
        }
        selectedRecipes.push(recipe);
      }
    }

    const weeklyMenuItems: MenuItem[] = daysOfWeek.map((day, index) => ({
      day,
      recipe: selectedRecipes[index % selectedRecipes.length],
    }));

    setCurrentMenu(weeklyMenuItems);

    setMenuGenerated(true);
  };

  return (
    <View style={styles.button}>
      {menuGenerated || <Button title="Generar menú" onPress={generateMenu} />}
    </View>
  );
};

export default NewMenu;

const styles = StyleSheet.create({
  button: {
    marginTop: 50,
  },
});
