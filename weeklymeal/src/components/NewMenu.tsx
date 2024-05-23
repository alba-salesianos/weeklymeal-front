import React, { useContext, useState } from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import { TextInput, RadioButton } from "react-native-paper";
import { RecipeContext } from "../contexts/RecipeContext";
import { Preferences, Recipe } from "../types/RecipeType";
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
  const { recipes, setCurrentMenu } = useContext(RecipeContext);
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

  const generateMenu = async () => {
    let selectedRecipes: Recipe[] = [];
    let lastUsedLabels: string[] = [];

    recipes.sort(() => 0.5 - Math.random());

    while (selectedRecipes.length < 7) {
      const availableRecipes = recipes.filter((recipe) => {
        const notUsedRecently = !lastUsedLabels.includes(recipe.label);
        const labelCount = selectedRecipes.filter(
          (r) => r.label === recipe.label
        ).length;
        return notUsedRecently && labelCount < (preferences[recipe.label] || 0);
      });

      if (availableRecipes.length > 0) {
        const recipe = availableRecipes[0];
        selectedRecipes.push(recipe);
        lastUsedLabels.push(recipe.label);
        if (lastUsedLabels.length > 2) lastUsedLabels.shift();
      } else {
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
    }

    try {
      //TODO: preguntar esto a jeremy porque claramente lo estoy haciendo mal
      await MenuService.createMenu(selectedRecipes);
      setCurrentMenu(selectedRecipes);
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
