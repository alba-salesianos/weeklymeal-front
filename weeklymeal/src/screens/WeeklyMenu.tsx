import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { RecipeContext } from "../contexts/RecipeContext";
import { Recipe } from "../types/RecipeType";
import { Modal, Portal, Provider, Searchbar } from "react-native-paper";
import NewMenu from "../components/NewMenu";

const WeeklyMenu = () => {
  const { currentMenu, recipes, setCurrentMenu } = useContext(RecipeContext);

  // States that manage the visibility for the modals, the edit mode, the selected recipe, and the search text
  const [visible, setVisible] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [searchVisible, setSearchVisible] = useState<boolean>(false);
  const [newMenuVisible, setNewMenuVisible] = useState<boolean>(false);
  const [searchText, setSearchText] = useState("");

  // Function to show the recipe details or search modal
  const showModal = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setSearchVisible(true);
  };

  // Functions to hide the modals
  const hideModal = () => setVisible(false);
  const hideSearchModal = () => setSearchVisible(false);
  const hideNewMenuModal = () => setNewMenuVisible(false);
  const showNewMenuModal = () => setNewMenuVisible(true);

  // Style for the modals
  const containerStyle = {
    backgroundColor: "white",
    padding: 30,
    margin: 20,
    borderRadius: 10,
  };

  // Function that handles when the user changes a recipe in the menu, looping through CurrentMenu and only changing the recipe
  // that is selected at that time when pressing on it.
  const handleRecipeChange = (newRecipe: Recipe) => {
    if (selectedRecipe) {
      setCurrentMenu((prevMenu: Recipe[]) =>
        prevMenu.map((recipe) =>
          recipe.id === selectedRecipe.id ? newRecipe : recipe
        )
      );
      hideSearchModal();
    }
  };

  // Function to toggle edit mode
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  // Function that filters recipes based on input text
  const searchRecipe = () => {
    return recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  const filteredRecipes = searchRecipe();

  return (
    <Provider>
      <View style={styles.container}>
        {currentMenu.length === 0 ? (
          <>
            {recipes.length < 7 && (
              <Text style={styles.infoText}>
                Añade al menos 7 recetas para crear un menú semanal.
              </Text>
            )}
           {/* Button to create a new menu, disabled if there are less than 7 recipes */}
            <Pressable
              style={[
                styles.newMenuButton,
                recipes.length < 7 && styles.disabledButton,
              ]}
              onPress={recipes.length >= 7 ? showNewMenuModal : null}
              disabled={recipes.length < 7}
            >
              <Text style={styles.buttonText}>Crear menú nuevo</Text>
            </Pressable>
          </>
        ) : (
          <View style={styles.buttonGroup}>
         
            <Pressable style={styles.editMenu} onPress={toggleEditMode}>
              <Text style={styles.buttonText}>
                {editMode ? "Dejar de editar" : "Editar menú"}
              </Text>
            </Pressable>

            {/* Button to create a new menu; this one will never be disabled cause for this one to appear there has to be 
            a menu */}
            <Pressable style={styles.newMenuButton} onPress={showNewMenuModal}>
              <Text style={styles.buttonText}>Crear menú nuevo</Text>
            </Pressable>
          </View>
        )}
        {currentMenu.length > 0 && (
          <ScrollView>
         
            {currentMenu.map((recipe, index) => (
              <Pressable key={index} onPress={() => showModal(recipe)}>
                <View style={styles.card}>
                  <Text style={{ fontWeight: "bold", fontSize: 17 }}>
                    {recipe.name}
                  </Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        )}
      </View>

      {/* Modal to show recipe details */}
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
          style={{ margin: 40 }}
        >
          {selectedRecipe && (
            <View>
              <Text>{selectedRecipe.name}</Text>
              <Text>{selectedRecipe.description}</Text>
            </View>
          )}
        </Modal>
      </Portal>

      {/* Modal to search and select a new recipe */}
      <Portal>
        <Modal
          visible={searchVisible}
          onDismiss={hideSearchModal}
          contentContainerStyle={containerStyle}
          style={{ margin: 40 }}
        >
          <Searchbar
            placeholder="Buscar..."
            onChangeText={setSearchText}
            value={searchText}
          />
          <ScrollView>
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

      {/* Modal to create a new menu */}
      <Portal>
        <Modal
          visible={newMenuVisible}
          onDismiss={hideNewMenuModal}
          contentContainerStyle={containerStyle}
        >
          <NewMenu onCloseModal={hideNewMenuModal} />
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
  newMenuButton: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    backgroundColor: "#dbeed0",
    borderColor: "gray",
    borderWidth: 1,
  },
  editMenu: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    backgroundColor: "#dbeed0",
    borderColor: "gray",
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: "gray",
    borderColor: "darkgray",
  },
  infoText: {
    marginTop: 10,
    fontSize: 14,
    color: "red",
  },
});
