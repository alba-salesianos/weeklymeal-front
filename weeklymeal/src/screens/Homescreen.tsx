import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { Modal, PaperProvider, Portal } from "react-native-paper";
import NewMenu from "../components/NewMenu";
import TodayRecipe from "../components/Recipes/TodayRecipe";
import AddRecipe from "../components/Recipes/AddRecipe";
import { RecipeContext } from "../contexts/RecipeContext";
import RecipeService from "../services/recipes.service";

const Homescreen = () => {
  const { recipes, setRecipes } = useContext(RecipeContext);
  const [menuVisible, setMenuVisible] = useState(false);
  const [recipeVisible, setRecipeVisible] = useState(false);

  const showMenuModal = () => setMenuVisible(true);
  const hideMenuModal = () => setMenuVisible(false);

  const showRecipeModal = () => setRecipeVisible(true);
  const hideRecipeModal = () => setRecipeVisible(false);

  const containerStyle = {
    backgroundColor: "white",
    padding: 30,
    margin: 20,
    borderRadius: 10,
  };

  React.useEffect(() => {
    async function retrieveRecipes() {
      try {
        const data = await RecipeService.getAllRecipes();
        setRecipes(data);
        console.log("recetas obtenidas correctamente");
      } catch (error) {
        console.log(error);
      }
    }
    retrieveRecipes();
  }, []);

  return (
    <PaperProvider>
      <View style={styles.container}>
        <TodayRecipe />
        <View>
          <Portal>
            <Modal
              visible={recipeVisible}
              onDismiss={hideRecipeModal}
              contentContainerStyle={containerStyle}
            >
              <AddRecipe onClose={hideRecipeModal} />
            </Modal>
          </Portal>
          <Pressable style={styles.buttonRecipe} onPress={showRecipeModal}>
            <Text style={styles.buttonText}>Añadir receta</Text>
          </Pressable>
        </View>
        {recipes.length < 7 && (
          <Text style={styles.infoText}>
            Añade al menos 7 recetas para crear un menú nuevo.
          </Text>
        )}
        <Portal>
          <Modal
            visible={menuVisible}
            onDismiss={hideMenuModal}
            contentContainerStyle={containerStyle}
          >
            <NewMenu onCloseModal={hideMenuModal} />
          </Modal>
        </Portal>
        <Pressable
          style={[
            styles.newMenuButton,
            recipes.length < 7 && styles.disabledButton,
          ]}
          onPress={recipes.length >= 7 ? showMenuModal : null}
          disabled={recipes.length < 7}
        >
          <Text style={styles.buttonText}>Crear menú nuevo</Text>
        </Pressable>
      </View>
    </PaperProvider>
  );
};

export default Homescreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonRecipe: {
    backgroundColor: "#dbeed0",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 15,
    borderColor: "gray",
    borderWidth: 1,
  },
  newMenuButton: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 15,
    backgroundColor: "#dbeed0",
    borderColor: "gray",
    borderWidth: 1,
  },
  disabledButton: {
    backgroundColor: "gray",
    borderColor: "darkgray",
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
  },
  infoText: {
    marginTop: 10,
    fontSize: 14,
    color: "red",
  },
});
