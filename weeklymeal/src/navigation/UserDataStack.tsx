import { StyleSheet } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DataButtonGroup from "../components/UserStacks/DataButtonGroup";
import AdminDataButtonGroup from "../components/UserStacks/AdminDataButtonGroup";
import ChangeUser from "../screens/ChangeUser";
import ChangePassword from "../screens/ChangePassword";
import ManageUsers from "../screens/ManageUsers";

export type DataStackParamList = {
  DataButtonGroup: undefined;
  AdminDataButtonGroup: undefined;
  ChangeUser: undefined;
  ChangePassword: undefined;
  ManageUsers: undefined;
};

const Stack = createStackNavigator<DataStackParamList>();

const UserDataStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="AdminDataButtonGroup"
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
      <Stack.Screen name="ManageUsers" component={ManageUsers} />
    </Stack.Navigator>
  );
};

export default UserDataStack;

const styles = StyleSheet.create({});
