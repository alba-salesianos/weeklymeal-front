import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { DataStackParamList } from "../../navigation/UserDataStack";
import { UserInfoContext } from "../../contexts/UserInfoContext";

type Props = StackScreenProps<DataStackParamList, "AdminDataButtonGroup">;

const AdminDataButtonGroup: React.FC<Props> = (props) => {
  const { user } = React.useContext(UserInfoContext);

  return (
    <View style={styles.container}>
      <Text style={styles.greetingText}>Hola, {user.name}</Text>
      <View style={styles.buttonGroup}>
        <Pressable
          style={styles.button}
          onPress={() => props.navigation.push("ChangeUser")}
        >
          <Text style={styles.buttonText}>Cambiar usuario</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => props.navigation.push("ChangePassword")}
        >
          <Text style={styles.buttonText}>Cambiar contraseña</Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => props.navigation.push("ManageUsers")}
        >
          <Text style={styles.buttonText}>Administrar usuarios</Text>
        </Pressable>

        <Pressable style={[styles.button, styles.logoutButton]}>
          <Text style={[styles.buttonText, styles.logoutButtonText]}>
            Cerrar sesión
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default AdminDataButtonGroup;

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
  buttonGroup: {
    width: "100%",
    justifyContent: "space-around",
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
  logoutButton: {
    backgroundColor: "#f28966",
  },
  logoutButtonText: {
    color: "#fff",
  },
});
