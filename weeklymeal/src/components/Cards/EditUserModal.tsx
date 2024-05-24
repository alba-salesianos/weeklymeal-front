import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState, useContext } from "react";
import { Button } from "react-native-paper";

import Container, { Toast } from "toastify-react-native";
import { UserInfo } from "../../types/UserInfo";
import { UserInfoContext } from "../../contexts/UserInfoContext";
import UserService from "../../services/user.service";

interface EditUserModalProps {
  user: UserInfo;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ user }) => {
  const [newUsername, setNewUsername] = useState(user.userName);
  const [newPassword, setNewPassword] = useState("");
  const { setUsers } = useContext(UserInfoContext);

  const handleUpdateUser = async () => {
    try {
      const userUpdate = {
        userName: newUsername,
        email: user.email,
        password: newPassword,
      };
      await UserService.updateUser(userUpdate, user.id);
      setUsers((prevUsers: UserInfo[]) =>
        prevUsers.map((u) =>
          u.id === user.id ? { ...u, userName: newUsername } : u
        )
      );
      Toast.success("Usuario actualizado con éxito.", "top");
    } catch (error) {
      Toast.error("Error al actualizar el usuario. Inténtalo de nuevo.", "top");
      console.error("Error updating user:", error);
    }
  };

  return (
    <View>
      <Container width={370} />
      <Text style={styles.modalTitle}>Editar Usuario</Text>
      <TextInput
        style={styles.input}
        placeholder="Introduzca nombre..."
        value={newUsername}
        onChangeText={setNewUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Introduzca contraseña..."
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />
      <Button mode="contained" onPress={handleUpdateUser}>
        Guardar Cambios
      </Button>
    </View>
  );
};

export default EditUserModal;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderRadius: 10,
    height: 45,
    marginVertical: 10,
    borderWidth: 1,
    padding: 12,
    backgroundColor: "white",
    borderColor: "gray",
  },
});
