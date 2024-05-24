import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import UserCard from "../components/Cards/UserCard";
import { UserInfoContext } from "../contexts/UserInfoContext";
import UserService from "../services/user.service";

const ManageUsers = () => {
  const { users, setUsers } = useContext(UserInfoContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await UserService.getAllUsers();
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <View>
      <ScrollView>
        {users.length > 0 ? (
          users.map((user) => (
            <UserCard key={user.id} name={user.userName} id={user.id} />
          ))
        ) : (
          <Text>No users found</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default ManageUsers;

const styles = StyleSheet.create({});
