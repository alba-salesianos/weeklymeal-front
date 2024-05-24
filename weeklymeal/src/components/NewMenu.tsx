import React, { useContext, useState } from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { TextInput, RadioButton } from "react-native-paper";
import { RecipeContext } from "../contexts/RecipeContext";
import { Menu, MenuPetition, Preferences, Recipe } from "../types/RecipeType";
import MenuService from "../services/menu.service";
import { UserInfoContext } from "../contexts/UserInfoContext";
import moment from "moment";

// Default preferences for the predefined menu, that will be used if the user picks the default option when generating
// a new menu.
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
  const { recipes, setCurrentMenu } = useContext(RecipeContext);
  const { currentUser } = useContext(UserInfoContext);

  // State to keep track of the selected menu type ("preterminado" or "personalizado").
  const [menuType, setMenuType] = useState<"predefined" | "custom">(
    "predefined"
  );

  // State to store the user preferences for the custom menu.
  const [preferences, setPreferences] =
    useState<Preferences>(defaultPreferences);

  // Function that updates the preferences state based on user input. It takes a key (which is one of the labels)
  // and a value (string from input), and updates the corresponding preference.
  const updatePreference = (key: keyof Preferences, value: string) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value === "" ? "" : parseInt(value),
    }));
  };

  // Function that serves as the heart of the application. It will generate a menu based on the selected type ("preterminado"
  // o "personalizado") and preferences (in the case of "personalizado", the frecuency of each label).

  const generateMenu = async () => {
    let selectedRecipes: Recipe[] = [];
    let lastUsedLabels: string[] = [];

    // Randomize the order of recipes to ensure variety.
    recipes.sort(() => 0.5 - Math.random());

    // Loop until we have selected 7 recipes.
    while (selectedRecipes.length < 7) {
      // Filter recipes based on user preferences and recent usage.
      const availableRecipes = recipes.filter((recipe) => {
        const notUsedRecently = !lastUsedLabels.includes(recipe.label); // Check if the recipe label was not used recently.
        const labelCount = selectedRecipes.filter(
          (r) => r.label === recipe.label
        ).length; // Count how many times the label has been used in the selected recipes.
        return notUsedRecently && labelCount < (preferences[recipe.label] || 0);
        // Ensures a recipe is fit to be included in the menu if the label has not been used in the previous recipe,
        // and also judging by the preferences.
      });

      if (availableRecipes.length > 0) {
        const recipe = availableRecipes[0];
        selectedRecipes.push(recipe); // Add the recipe to the selected recipes.
        lastUsedLabels.push(recipe.label); // Track the label of the used recipe.
        if (lastUsedLabels.length > 2) lastUsedLabels.shift(); // Keep the last 2 labels in the tracking array, as a label
        // can repeat if it's not consecutive.
      } else {
        // If no recipes fit the criteria, select a fallback recipe.
        const fallbackRecipes = recipes.filter(
          (recipe) => !selectedRecipes.includes(recipe)
        );
        const randomRecipe =
          fallbackRecipes[Math.floor(Math.random() * fallbackRecipes.length)] ||
          null; // Select a random recipe from the fallback recipes.
        if (randomRecipe) {
          selectedRecipes.push(randomRecipe); // Add the fallback recipe to the selected recipes.
          lastUsedLabels.push(randomRecipe.label); // Track the label of the used fallback recipe.
          if (lastUsedLabels.length > 2) lastUsedLabels.shift(); // Keep the last 2 labels in the tracking array.
        }
      }
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
      const recipesWithDays = lastMenu.recipes.map((recipe, index) => ({
        ...recipe,
        dayOfWeek: daysOfWeek[(startIndex + index) % 7],
      }));

      lastMenu.recipes = recipesWithDays;

      setCurrentMenu(lastMenu);
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
