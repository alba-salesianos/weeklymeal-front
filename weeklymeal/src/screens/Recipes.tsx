import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { RecipeContext } from "../contexts/RecipeContext";
import { Modal, PaperProvider, Portal, Searchbar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import AddRecipe from "../components/Recipes/AddRecipe";

import { Recipe } from "../types/RecipeType";
import RecipeDetails from "../components/Recipes/RecipeDetails";
import RecipeService from "../services/recipes.service";

const Recipes = () => {
  const { recipes, setRecipes } = useContext(RecipeContext);

  const [addRecipeVisible, setAddRecipeVisible] = useState(false);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const [searchText, setSearchText] = useState("");

  const showAddModal = () => setAddRecipeVisible(true);
  const hideAddModal = () => setAddRecipeVisible(false);

  const showDetailsModal = (recipe: Recipe) => {
    console.log("Selected Recipe:", recipe);
    setSelectedRecipe(recipe);
    setDetailsVisible(true);
  };
  const hideDetailsModal = () => {
    setSelectedRecipe(null);
    setDetailsVisible(false);
  };

  const handleEditRecipe = () => {
    setAddRecipeVisible(true);
    setDetailsVisible(false);
  };

  const handleDeleteRecipe = async () => {
    if (selectedRecipe && selectedRecipe.id !== undefined) {
      try {
        await RecipeService.deleteRecipe(selectedRecipe.id);
        setRecipes((prevState: Recipe[]) =>
          prevState.filter(
            (recipeToDelete) => recipeToDelete.id !== selectedRecipe.id
          )
        );
        hideDetailsModal();
      } catch (error) {
        console.error("Error deleting recipe:", error);
      }
    }
  };

  const containerStyle = { backgroundColor: "white", margin: 40 };

  const searchRecipe = () => {
    return recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  const filteredRecipes = searchRecipe();

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Portal>
          <Modal
            visible={addRecipeVisible}
            onDismiss={hideAddModal}
            contentContainerStyle={containerStyle}
          >
            <AddRecipe initialRecipe={selectedRecipe} onClose={hideAddModal} />
          </Modal>
        </Portal>

        <Searchbar
          placeholder="Busque el nombre de una receta..."
          onChangeText={setSearchText}
          value={searchText}
        />
        <Pressable
          style={styles.floatingButtonContainer}
          onPress={() => {
            setSelectedRecipe(null);
            showAddModal();
          }}
        >
          <Ionicons name="add-outline" size={20} color="#000" />
        </Pressable>
        <ScrollView>
          {filteredRecipes &&
            filteredRecipes.map((recipe, index) => (
              <View key={index} style={styles.card}>
                <Text style={styles.title}>{recipe.name}</Text>
                <Text style={styles.description}>{recipe.description}</Text>
                <Pressable onPress={() => showDetailsModal(recipe)}>
                  <Text style={styles.detailsLink}>Ver detalles</Text>
                </Pressable>
              </View>
            ))}
        </ScrollView>
        <RecipeDetails
          visible={detailsVisible}
          onDismiss={hideDetailsModal}
          recipe={selectedRecipe}
          onEdit={handleEditRecipe}
          onDelete={handleDeleteRecipe}
        />
      </View>
    </PaperProvider>
  );
};

export default Recipes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginBottom: 12,
  },
  floatingButtonContainer: {
    position: "absolute",
    bottom: 50,
    right: 30,
    padding: 15,
    backgroundColor: "#fff0e7",
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    zIndex: 1000,
  },
  detailsLink: {
    color: "green",
    marginTop: 10,
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  detailsContainer: {
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 18,
    color: "#666",
    marginBottom: 20,
  },
  modalSectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
    marginBottom: 6,
  },
  modalText: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 10,
  },
});
