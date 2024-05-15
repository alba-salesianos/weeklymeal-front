import React, { useContext, useState } from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import { TextInput, RadioButton } from "react-native-paper";
import { RecipeContext } from "../contexts/RecipeContext";
import { Preferences, Recipe } from "../types/RecipeType";

const defaultPreferences: Preferences = {
  hidratos: 3,
  fibra: 2,
  proteína: 2,
  pescado: 1,
};

const NewMenu: React.FC<{ onMenuGenerated: () => void }> = ({
  onMenuGenerated,
}) => {
  const { recipes, setCurrentMenu } = useContext(RecipeContext);
  const [menuType, setMenuType] = useState<"predefined" | "custom">(
    "predefined"
  );
  const [preferences, setPreferences] =
    useState<Preferences>(defaultPreferences);

  const updatePreference = (key: keyof Preferences, value: string) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: parseInt(value) || prev[key], // Ensure invalid input doesn't erase the old value
    }));
  };

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
    let selectedRecipes: Recipe[] = [];
    let lastUsedLabels: string[] = [];

    recipes.sort(() => 0.5 - Math.random()); // Randomize the order of recipes

    daysOfWeek.forEach((day) => {
      const availableRecipes = recipes.filter((recipe) => {
        const notUsedRecently = !lastUsedLabels.includes(recipe.label);
        const labelCount = selectedRecipes.filter(
          (r) => r.label === recipe.label
        ).length;
        return notUsedRecently && labelCount < (preferences[recipe.label] || 0);
      });

      //TODO: si el usuario pone un número desorbitado, que salga un mensajito en plan "oye, esto son más de 7 días"

      if (availableRecipes.length > 0) {
        const recipe = availableRecipes[0];
        selectedRecipes.push(recipe);
        // Update lastUsedLabels to remember the last two labels used
        lastUsedLabels.push(recipe.label);
        if (lastUsedLabels.length > 2) lastUsedLabels.shift();
      } else {
        // If there are not enough recipes to meet the preferences, use a fallback recipe
        const fallbackRecipes = recipes.filter(
          (recipe) => !selectedRecipes.includes(recipe)
        );
        const randomRecipe =
          fallbackRecipes[Math.floor(Math.random() * fallbackRecipes.length)] ||
          null;
        if (randomRecipe) {
          selectedRecipes.push(randomRecipe);
          lastUsedLabels.push(randomRecipe.label);
          if (lastUsedLabels.length > 2) lastUsedLabels.shift();
        }
      }
    });

    const weeklyMenuItems = daysOfWeek.map((day, index) => ({
      day,
      recipe: selectedRecipes[index % selectedRecipes.length],
    }));

    setCurrentMenu(weeklyMenuItems);
    onMenuGenerated();
  };

  //TODO: corregir lo de que no se puede poner el número
  return (
    <View style={styles.container}>
      <RadioButton.Group
        onValueChange={(newValue) =>
          setMenuType(newValue as "predefined" | "custom")
        }
        value={menuType}
      >
        <RadioButton.Item label="Menú Predefinido" value="predefined" />
        <RadioButton.Item label="Menú Personalizado" value="custom" />
      </RadioButton.Group>

      {menuType === "custom" && (
        <View>
          <TextInput
            label="Hidratos"
            value={preferences.hidratos.toString()}
            onChangeText={(value) => updatePreference("hidratos", value)}
            keyboardType="numeric"
            style={styles.input}
          />

          <TextInput
            label="Fibra"
            value={preferences.fibra.toString()}
            onChangeText={(value) => updatePreference("fibra", value)}
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            label="Proteína"
            value={preferences.proteína.toString()}
            onChangeText={(value) => updatePreference("proteína", value)}
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            label="Pescado"
            value={preferences.pescado.toString()}
            onChangeText={(value) => updatePreference("pescado", value)}
            keyboardType="numeric"
            style={styles.input}
          />
        </View>
      )}
      <Button title="Generar Menú" onPress={generateMenu} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    marginBottom: 10,
  },
});

export default NewMenu;
