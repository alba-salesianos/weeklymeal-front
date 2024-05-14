import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { DataStackParamList } from "./UserDataStack";

type Props = StackScreenProps<DataStackParamList, "AdminDataButtonGroup">;

const AdminDataButtonGroup: React.FC<Props> = (props) => {
  return (
    <View style={styles.container}>
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

        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Administrar usuarios</Text>
        </Pressable>

        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Cerrar sesión</Text>
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
  },
  buttonGroup: {
    height: 200,
    justifyContent: "space-around",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    paddingVertical: 12,
    paddingHorizontal: 80,
    borderRadius: 10,
    backgroundColor: "royalblue",
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
