import { BottomNavigation, PaperProvider } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import BottomTabNav from "./navigation/BottomTabNav";
import Header from "./header/Header";

export default function App() {
  return (
    <PaperProvider>
      <Header />
      <BottomTabNav />
    </PaperProvider>
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
