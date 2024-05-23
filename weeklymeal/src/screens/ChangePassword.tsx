import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState, useContext } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { DataStackParamList } from "../navigation/UserDataStack";
import { UserInfoContext } from "../contexts/UserInfoContext";

type Props = StackScreenProps<DataStackParamList, "ChangePassword">;

const ChangePassword: React.FC<Props> = (props) => {
  const { user, setUser } = useContext(UserInfoContext);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleChangePassword = () => {
    if (newPassword === confirmPassword) {
      // Aquí deberías implementar la lógica para cambiar la contraseña en tu servidor
      // setUser((prevUser) => ({
      //   ...prevUser,
      //   password: newPassword,
      // }));
      props.navigation.goBack();
    } else {
      setError("Las contraseñas no coinciden");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greetingText}>Cambiar Contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="Nueva contraseña"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar nueva contraseña"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <Pressable style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Aceptar</Text>
      </Pressable>
    </View>
  );
};

export default ChangePassword;

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
  errorText: {
    color: "red",
    marginBottom: 20,
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
