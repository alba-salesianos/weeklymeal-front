import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { UserInfoContext } from "../contexts/UserInfoContext";

import UserDataStack from "../components/UserStacks/UserDataStack";

const UserScreen = () => {
  const { user } = React.useContext(UserInfoContext);
  return (
    <View style={styles.container}>
      <Text>Hola, {user.name}</Text>
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
