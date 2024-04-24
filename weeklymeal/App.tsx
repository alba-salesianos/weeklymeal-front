import { BottomNavigation, PaperProvider } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "./src/header/Header";
import BottomTabNav from "./src/navigation/BottomTabNav";
import RecipeProvider from "./src/providers/RecipeProvider";

export default function App() {
  return (
    <RecipeProvider>
      <PaperProvider>
        <Header />
        <BottomTabNav />
      </PaperProvider>
    </RecipeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
