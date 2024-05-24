import React, { useContext, useState } from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { TextInput, RadioButton } from "react-native-paper";
import { RecipeContext } from "../contexts/RecipeContext";
import { Menu, MenuPetition, Preferences, Recipe } from "../types/RecipeType";

import { UserInfoContext } from "../contexts/UserInfoContext";
import moment from "moment";
import RecipeService from "../services/recipes.service";
import MenuService from "../services/menu.service";

const defaultPreferences: Preferences = {
  hidratos: 3,
  fibra: 2,
  proteína: 2,
  pescado: 1,
};

interface NewMenuProps {
  onCloseModal: () => void;
}

const NewMenu: React.FC<NewMenuProps> = ({ onCloseModal }) => {
  const { recipes, setCurrentMenu, setMenuCreated } = useContext(RecipeContext);
  const { currentUser } = useContext(UserInfoContext);

  const [menuType, setMenuType] = useState<"predefined" | "custom">(
    "predefined"
  );
  const [preferences, setPreferences] =
    useState<Preferences>(defaultPreferences);

  const updatePreference = (key: keyof Preferences, value: string) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value === "" ? "" : parseInt(value),
    }));
  };

  const updateRecipeDay = async (recipe: Recipe) => {
    try {
      console.log(
        `Updating recipe with ID: ${recipe.id} and day: ${recipe.weekDay}`
      );
      const response = await RecipeService.updateRecipe(recipe);
      console.log(
        `Recipe ${recipe.id} updated successfully with day ${recipe.weekDay}`,
        response
      );
    } catch (error) {
      console.error(`Error updating recipe ${recipe.id}:`, error);
    }
  };

  const generateMenu = async () => {
    let selectedRecipes: Recipe[] = [];
    let lastUsedLabels: string[] = [];
    let usedRecipes: Set<number> = new Set();

    // Randomize the order of recipes to ensure variety.
    recipes.sort(() => 0.5 - Math.random());

    // Loop until we have selected 7 recipes.
    while (selectedRecipes.length < 7) {
      // Filter recipes based on user preferences, recent usage, and avoiding duplicates.
      const availableRecipes = recipes.filter((recipe) => {
        const notUsedRecently = !lastUsedLabels.includes(recipe.label);
        const notUsedInMenu = !usedRecipes.has(recipe.id!); // recipe.id! asegura que no sea undefined
        const labelCount = selectedRecipes.filter(
          (r) => r.label === recipe.label
        ).length;
        return (
          notUsedRecently &&
          notUsedInMenu &&
          labelCount < (preferences[recipe.label] || 0)
        );
      });

      if (availableRecipes.length > 0) {
        const recipe = availableRecipes[0];
        selectedRecipes.push(recipe); // Add the recipe to the selected recipes.
        lastUsedLabels.push(recipe.label); // Track the label of the used recipe.
        usedRecipes.add(recipe.id!); // Track the recipe ID to avoid duplicates.
        if (lastUsedLabels.length > 2) lastUsedLabels.shift(); // Keep the last 2 labels in the tracking array.
      } else {
        // If no recipes fit the criteria, select a fallback recipe.
        const fallbackRecipes = recipes.filter(
          (recipe) => !usedRecipes.has(recipe.id!)
        );
        const randomRecipe =
          fallbackRecipes[Math.floor(Math.random() * fallbackRecipes.length)] ||
          null; // Select a random recipe from the fallback recipes.
        if (randomRecipe) {
          selectedRecipes.push(randomRecipe); // Add the fallback recipe to the selected recipes.
          lastUsedLabels.push(randomRecipe.label); // Track the label of the used fallback recipe.
          usedRecipes.add(randomRecipe.id!); // Track the recipe ID to avoid duplicates.
          if (lastUsedLabels.length > 2) lastUsedLabels.shift(); // Keep the last 2 labels in the tracking array.
        }
      }
    }

    // Asignar días de la semana a las recetas seleccionadas comenzando desde el día actual
    const startIndex = moment().day(); // Obtener el día de la semana actual
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    for (let i = 0; i < selectedRecipes.length; i++) {
      selectedRecipes[i].weekDay = daysOfWeek[(startIndex + i) % 7];
      await updateRecipeDay(selectedRecipes[i]); // Actualizar la receta en el backend
    }

    const recipeRequest: MenuPetition = {
      recipeDtoList: selectedRecipes,
    };

    try {
      // Send the generated menu to the backend service.
      console.log(recipeRequest);
      await MenuService.createMenu(recipeRequest, currentUser.id);

      // Obtener el último menú guardado
      const lastMenu: Menu = await MenuService.getLastMenu(currentUser.id);
      setCurrentMenu(lastMenu.recipes);
      setMenuCreated(true);
      onCloseModal();
    } catch (error) {
      console.error("Error creating menu:", error);
    }
  };

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

      <Pressable style={styles.button} onPress={generateMenu}>
        <Text style={styles.buttonText}>Generar Menú</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 10,
  },
  input: {
    marginBottom: 10,
    backgroundColor: "white",
  },
  button: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    backgroundColor: "#f28966",
    borderWidth: 1,
    borderColor: "gray",
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
  },
});

export default NewMenu;
