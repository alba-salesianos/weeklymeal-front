import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

const Homescreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hoy toca: Papas </Text>
      <View>
        <Pressable style={styles.buttonRecipe}>
          <Text style={styles.buttonText}>Ver receta</Text>
        </Pressable>
        <Pressable style={styles.buttonSeeMenu}>
          <Text style={styles.buttonText}>Ver menú</Text>
        </Pressable>
      </View>

      <Pressable style={styles.newMenuButton}>
        <Text style={styles.buttonText}>CREAR MENÚ NUEVO</Text>
      </Pressable>
    </View>
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
