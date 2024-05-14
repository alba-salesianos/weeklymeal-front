import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import ChangeUser from "./ChangeUser";
import ChangePassword from "./ChangePassword";
import DataButtonGroup from "./DataButtonGroup";
import AdminDataButtonGroup from "./AdminDataButtonGroup";

export type DataStackParamList = {
  DataButtonGroup: undefined;
  AdminDataButtonGroup: undefined;
  ChangeUser: undefined;
  ChangePassword: undefined;
};

const Stack = createStackNavigator<DataStackParamList>();

const UserDataStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="DataButtonGroup"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="DataButtonGroup" component={DataButtonGroup} />
      <Stack.Screen name="ChangeUser" component={ChangeUser} />
      <Stack.Screen
        name="AdminDataButtonGroup"
        component={AdminDataButtonGroup}
      />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
    </Stack.Navigator>
  );
};

export default UserDataStack;

const styles = StyleSheet.create({});
