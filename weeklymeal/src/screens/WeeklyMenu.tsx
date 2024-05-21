import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { RecipeContext } from "../contexts/RecipeContext";
import { MenuItem, Recipe } from "../types/RecipeType";
import { Modal, Portal, Provider, Searchbar } from "react-native-paper";

const WeeklyMenu = () => {
  const { currentMenu, recipes, setCurrentMenu } = useContext(RecipeContext);
  const [localMenu, setLocalMenu] = useState<MenuItem[]>([]);

  const [visible, setVisible] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [selectedRecipe, setSelectedRecipe] = useState<MenuItem | null>(null);
  const [searchVisible, setSearchVisible] = useState<boolean>(false);

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setLocalMenu(currentMenu);
  }, [currentMenu]);

  const showModal = (recipe: MenuItem) => {
    if (editMode) {
      setSelectedRecipe(recipe);
      setSearchVisible(true);
    } else {
      setSelectedRecipe(recipe);
      setVisible(true);
    }
  };

  const hideModal = () => setVisible(false);
  const hideSearchModal = () => setSearchVisible(false);

  const containerStyle = {
    backgroundColor: "white",
    padding: 30,
    margin: 0,
    borderRadius: 10,
  };

  const handleRecipeChange = (newRecipe: Recipe) => {
    if (selectedRecipe) {
      setLocalMenu((prevMenu) =>
        prevMenu.map((item) =>
          item.day === selectedRecipe.day
            ? { ...item, recipe: newRecipe }
            : item
        )
      );
      hideSearchModal();
    }
  };

  const toggleEditMode = () => {
    if (editMode) {
      setCurrentMenu(localMenu);
    }
    setEditMode(!editMode);
  };

  const searchRecipe = () => {
    return recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(searchText)
    );
  };

  const filteredRecipes = searchRecipe();

  return (
    <Provider>
      <View style={styles.container}>
        <Button
          title={
            editMode ? "Salir del modo de edición" : "Entrar en modo de edición"
          }
          onPress={toggleEditMode}
        />
        <ScrollView>
          {localMenu.map(({ day, recipe }, index) => (
            <Pressable key={index} onPress={() => showModal({ day, recipe })}>
              <View style={styles.card}>
                <Text>{day}</Text>
                <Text style={{ fontWeight: "bold", fontSize: 17 }}>
                  {recipe.name}
                </Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
          style={{ margin: 40 }}
        >
          {selectedRecipe && (
            <View>
              <Text>{selectedRecipe.day}</Text>
              <Text>{selectedRecipe.recipe.name}</Text>
              <Text>{selectedRecipe.recipe.description}</Text>
            </View>
          )}
        </Modal>
      </Portal>

      <Portal>
        <Modal
          visible={searchVisible}
          onDismiss={hideSearchModal}
          contentContainerStyle={containerStyle}
          style={{ margin: 40 }}
        >
          <ScrollView>
            <Searchbar
              placeholder="Buscar..."
              onChangeText={setSearchText}
              value={searchText}
            />
            {filteredRecipes.map((recipe, index) => (
              <Pressable key={index} onPress={() => handleRecipeChange(recipe)}>
                <View style={styles.recipeCard}>
                  <Text>{recipe.name}</Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </Modal>
      </Portal>
    </Provider>
  );
};

export default WeeklyMenu;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  card: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    backgroundColor: "#f8d7d2",
    borderColor: "gray",
    borderWidth: 1,
  },
  recipeCard: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
});
