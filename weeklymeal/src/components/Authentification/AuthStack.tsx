import { StyleSheet, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "./AuthHomepage";
import ButtonGroup from "./ButtonGroup";
import Login from "./Login";
import Signup from "./Signup";

const AuthStack = () => {
  const Stack = createStackNavigator<RootStackParamList>();

  return (
    <View style={styles.container}>
      <Stack.Navigator
        initialRouteName="ButtonGroup"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="ButtonGroup" component={ButtonGroup} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
      </Stack.Navigator>
    </View>
  );
};

export default AuthStack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
