import { StyleSheet, Text, View, Button } from "react-native";
import React, { useContext, useState } from "react";
import { MenuItem, Recipe } from "../types/RecipeType";
import { RecipeContext } from "../contexts/RecipeContext";

const NewMenu = () => {
  const { recipes, setCurrentMenu } = useContext(RecipeContext);
  const [menuGenerated, setMenuGenerated] = useState(false);

  const generateMenu = () => {
    const daysOfWeek = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    const recipesNeeded = 7;
    const selectedRecipes: Recipe[] = [];
    let recentLabels: string[] = []; // to keep track of labels used in the last two days

    while (selectedRecipes.length < recipesNeeded) {
      const shuffledRecipes = [...recipes].sort(() => Math.random() - 0.5);
      for (const recipe of shuffledRecipes) {
        if (selectedRecipes.length >= recipesNeeded) {
          break;
        }
        // Check if the label is not in the recentLabels array
        if (!recentLabels.includes(recipe.label)) {
          selectedRecipes.push(recipe);
          // Update recent labels: keep only the last two entries
          if (recentLabels.length === 2) {
            recentLabels.shift(); // remove the oldest label
          }
          recentLabels.push(recipe.label); // add the new label
          break; // Break after selecting a recipe to move to the next day
        }
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
      {menuGenerated ? (
        <Text>Menú generado correctamente</Text>
      ) : (
        <Button title="Generar menú" onPress={generateMenu} />
      )}
    </View>
  );
};

export default NewMenu;

const styles = StyleSheet.create({
  button: {
    marginTop: 50,
  },
});
