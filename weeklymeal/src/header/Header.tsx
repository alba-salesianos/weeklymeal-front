import { StyleSheet } from "react-native";
import React from "react";
import { Appbar } from "react-native-paper";

const Header = () => {
  return (
    <Appbar.Header mode={"center-aligned"}>
      <Appbar.Content title="Meal Planner" />
    </Appbar.Header>
  );
};

export default Header;

const styles = StyleSheet.create({});
