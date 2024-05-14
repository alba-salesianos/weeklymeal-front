import { StyleSheet } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AuthStack from "./AuthStack";
import BottomTabNav from "../../navigation/BottomTabNav";

export type RootStackParamList = {
  BottomTabNav: undefined;
  AuthStack: undefined;
  ButtonGroup: undefined;
  Login: undefined;
  Signup: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AuthHomepage = () => {
  return (
    <Stack.Navigator
      initialRouteName="BottomTabNav"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="BottomTabNav" component={BottomTabNav} />
      <Stack.Screen name="AuthStack" component={AuthStack} />
    </Stack.Navigator>
  );
};

export default AuthHomepage;

const styles = StyleSheet.create({});
