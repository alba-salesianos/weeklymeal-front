import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { RecipeContext } from "../contexts/RecipeContext";
import { Modal, PaperProvider, Portal } from "react-native-paper";
import NewMenu from "../components/NewMenu";
import TodayRecipe from "../components/TodayRecipe";

const Homescreen = () => {
  const { todaysRecipe } = React.useContext(RecipeContext);

  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", margin: 40 };

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
            <NewMenu />
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
    margin: "auto",
  },
  title: {
    borderRadius: 30,
    margin: 30,
    padding: 20,
    textAlign: "center",
    fontSize: 40,
    fontWeight: "500",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "grey",
  },

  buttonSeeMenu: {
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
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
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
    paddingVertical: 30,
    paddingHorizontal: 50,
    borderRadius: 20,
    backgroundColor: "#f08a6e",
    borderColor: "gray",
    borderWidth: 1,
  },
});
