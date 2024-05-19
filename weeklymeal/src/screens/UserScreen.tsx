import { StyleSheet, Text, View } from "react-native";
import React from "react";
import UserDataStack from "../navigation/UserDataStack";

const UserScreen = () => {
  return (
    <View style={styles.container}>
      <UserDataStack />
    </View>
  );
};

export default UserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
