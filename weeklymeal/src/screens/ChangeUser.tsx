import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState, useContext } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { UserInfo } from "../types/UserInfo";
import { DataStackParamList } from "../navigation/UserDataStack";
import { UserInfoContext } from "../contexts/UserInfoContext";

type Props = StackScreenProps<DataStackParamList, "ChangeUser">;

const ChangeUser: React.FC<Props> = (props) => {
  const { setUser } = useContext(UserInfoContext);
  const [newUsername, setNewUsername] = useState("");

  const handleChangeUsername = () => {
    setUser((prevUser: UserInfo) => ({
      ...prevUser,
      name: newUsername,
    }));
    props.navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greetingText}>Cambiar Nombre de Usuario</Text>
      <TextInput
        style={styles.input}
        placeholder="Introduzca un nuevo nombre..."
        value={newUsername}
        onChangeText={setNewUsername}
      />
      <Pressable style={styles.button} onPress={handleChangeUsername}>
        <Text style={styles.buttonText}>Aceptar</Text>
      </Pressable>
    </View>
  );
};

export default ChangeUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  greetingText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderColor: "grey",
    borderWidth: 1,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 80,
    borderRadius: 10,
    backgroundColor: "#dbeed0",
    borderColor: "grey",
    borderWidth: 1,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#333",
  },
});
