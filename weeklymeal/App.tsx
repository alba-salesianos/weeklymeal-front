import "react-native-gesture-handler";

import { PaperProvider } from "react-native-paper";
import { StyleSheet } from "react-native";
import React from "react";
import Header from "./src/header/Header";
import RecipeProvider from "./src/providers/RecipeProvider";
import AuthHomepage from "./src/components/Authentification/AuthHomepage";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <RecipeProvider>
      <PaperProvider>
        <NavigationContainer>
          <Header />
          <AuthHomepage />
        </NavigationContainer>
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
