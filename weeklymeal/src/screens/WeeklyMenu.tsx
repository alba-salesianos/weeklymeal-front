import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { RecipeContext } from "../contexts/RecipeContext";
import { MenuItem } from "../types/RecipeType";
import { Modal, Portal, Provider } from "react-native-paper";
import NewMenu from "../components/NewMenu";

const WeeklyMenu = () => {
  const { currentMenu } = React.useContext(RecipeContext);
  const [visible, setVisible] = React.useState<boolean>(false);
  const [selectedRecipe, setSelectedRecipe] = React.useState<MenuItem | null>(
    null
  );

  const showModal = (recipe: MenuItem) => {
    setSelectedRecipe(recipe);
    setVisible(true);
  };

  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: "white",
    padding: 30,
    margin: 0,
    borderRadius: 10,
  };

  return (
    <Provider>
      <View style={styles.container}>
        <NewMenu />
        <ScrollView>
          {currentMenu.map(({ day, recipe }, index) => (
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
  modalWrapper: {
    width: "80%",
  },
});
