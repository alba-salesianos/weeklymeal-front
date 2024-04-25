import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { RecipeContext } from "../contexts/RecipeContext";
//import AddRecipe from "../components/cards/AddRecipe";
import { Modal, PaperProvider, Portal } from "react-native-paper";
import AddRecipe from "../components/AddRecipe";

const Recipes = () => {
  const { recipes } = useContext(RecipeContext);

  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", margin: 40 };

  return (
    <PaperProvider>
      <View>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}
          >
            <AddRecipe />
          </Modal>
        </Portal>
        <Pressable style={styles.button} onPress={showModal}>
          <Text>Añadir receta</Text>
        </Pressable>

        <ScrollView>
          {recipes &&
            recipes.map((recipe, index) => (
              <View key={index} style={styles.card}>
                <Text>{recipe.name}</Text>
                <Text>{recipe.label}</Text>
                <Text>{recipe.description}</Text>
              </View>
            ))}
        </ScrollView>
      </View>
    </PaperProvider>
  );
};

export default Recipes;

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
    paddingHorizontal: 60,
    borderRadius: 10,
    backgroundColor: "#f8d7d2",
    borderColor: "gray",
    borderWidth: 1,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 10,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "#f8d7d2",
  },
});
