import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { DataStackParamList } from "../../navigation/UserDataStack";
import { UserInfoContext } from "../../contexts/UserInfoContext";
import UserService from "../../services/user.service";

type Props = StackScreenProps<DataStackParamList, "DataButtonGroup">;

const DataButtonGroup: React.FC<Props> = (props) => {
  const { currentUser, setCurrentUser, setisLogged } =
    React.useContext(UserInfoContext);

  const handleLogout = async () => {
    try {
      await UserService.logout();
      setCurrentUser(null);
      setisLogged(false);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greetingText}>Hola, {currentUser.username}</Text>
      <View style={styles.buttonGroup}>
        <Pressable
          style={styles.button}
          onPress={() => props.navigation.push("ChangeUser")}
        >
          <Text style={styles.buttonText}>Cambiar nombre usuario</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => props.navigation.push("ChangePassword")}
        >
          <Text style={styles.buttonText}>Cambiar contraseña</Text>
        </Pressable>

        <Pressable
          style={[styles.button, styles.logoutButton]}
          onPress={handleLogout}
        >
          <Text style={[styles.buttonText, styles.logoutButtonText]}>
            Cerrar sesión
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default DataButtonGroup;

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
