import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import UserCard from "../components/Cards/UserCard";

interface User {
  id: string;
  name: string;
}

const DATA: User[] = [
  { id: "1", name: "Sakuma Daisuke" },
  { id: "2", name: "Fukazawa Tatsuya" },
  { id: "3", name: "Mukai Koji" },
];

const ManageUsers = () => {
  return (
    <View>
      <ScrollView>
        {DATA && DATA.map((user) => <UserCard name={user.name} id={user.id} />)}
      </ScrollView>
    </View>
  );
};

export default ManageUsers;

const styles = StyleSheet.create({});
