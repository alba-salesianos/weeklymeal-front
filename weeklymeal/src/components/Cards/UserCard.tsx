import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface UserCardProps {
  name: string;
  id: string;
}

const UserCard: React.FC<UserCardProps> = ({ name, id }) => {
  const handleEdit = () => {
    // Lógica para editar el usuario
    console.log("Editar usuario con id:", id);
  };

  const handleDelete = () => {
    // Lógica para eliminar el usuario
    console.log("Eliminar usuario con id:", id);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.userName}>{name}</Text>
      <View style={styles.buttons}>
        <TouchableOpacity onPress={handleEdit} style={styles.button}>
          <Ionicons name="pencil" size={20} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDelete} style={styles.button}>
          <Ionicons name="trash" size={20} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    width: "95%",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  userName: {
    fontSize: 16,
    color: "#333",
  },
  buttons: {
    flexDirection: "row",
  },
  button: {
    marginLeft: 10,
  },
});

export default UserCard;
