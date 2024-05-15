import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { RecipeContext } from "../contexts/RecipeContext";
import { Modal, PaperProvider, Portal } from "react-native-paper";
import NewMenu from "../components/NewMenu";
import TodayRecipe from "../components/TodayRecipe";

const Homescreen = () => {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  // Callback function to handle when the menu is generated
  const handleMenuGenerated = () => {
    console.log("Menú generado con éxito!");
    hideModal(); // Close the modal after the menu has been generated
  };

  const containerStyle = { backgroundColor: "white", padding: 20, margin: 40 };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <TodayRecipe />
        <View>
          <Pressable style={styles.buttonRecipe}>
            <Text style={styles.buttonText}>Ver receta</Text>
          </Pressable>
        </View>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}
          >
            {/* Pass the handleMenuGenerated callback to NewMenu */}
            <NewMenu onMenuGenerated={handleMenuGenerated} />
          </Modal>
        </Portal>
        <Pressable style={styles.newMenuButton} onPress={showModal}>
          <Text style={styles.buttonText}>CREAR MENÚ NUEVO</Text>
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
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 10,
    borderColor: "gray",
    borderWidth: 1,
  },
  newMenuButton: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 10,
    backgroundColor: "#f08a6e",
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
});
