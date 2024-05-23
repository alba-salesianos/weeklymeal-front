import { Pressable, StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import { UserInfoContext } from "../../contexts/UserInfoContext";
import type { StackScreenProps } from "@react-navigation/stack";
import userService from "../../services/recipes.service";
import Container, { Toast } from "toastify-react-native";
import { RootStackParamList } from "./AuthHomepage";

type Props = StackScreenProps<RootStackParamList, "Login">;

const Login: React.FC<Props> = (props) => {
  const { setUser, setisLogged, setCurrentUser } =
    React.useContext(UserInfoContext);

  const loginUsers = async (): Promise<boolean> => {
    let response = true;
    try {
      const loggedUser = await userService.fetchUser(formData, "login");
      loggedUser != null ? setUser(loggedUser) : (response = false);
    } catch (error) {
      console.error("Error during registration:", error);
      response = false;
    }
    return response;
  };

  const [formData, setFormData] = React.useState({
    name: "",
    password: "",
  });

  const handleInputChange = async (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleLogin = async () => {
    if (formData.name == "" || formData.password == "") {
      Toast.warn("Capón, rellena los 2 campos.", "top");
    } else {
      (await loginUsers())
        ? (setCurrentUser(formData.name),
          setisLogged(true),
          props.navigation.push("BottomTabNav"))
        : Toast.error("Usuario o contraseña incorrecta.", "top");
    }
  };

  return (
    <View style={styles.container}>
      <Container width={370} />
      <View style={styles.buttonGroup}>
        <TextInput
          style={styles.input}
          placeholder="Usuario"
          onChangeText={(value) => handleInputChange("name", value)}
          value={formData.name}
        />
        <TextInput
          style={styles.input}
          onChangeText={(value) => handleInputChange("password", value)}
          placeholder="Contraseña"
          value={formData.password}
          secureTextEntry={true}
        />

        <Pressable style={styles.button} onPress={() => handleLogin()}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fce8e6",
  },
  buttonGroup: {
    height: 200,
    justifyContent: "space-around",
  },
  input: {
    borderRadius: 5,
    height: 45,
    margin: 12,
    borderWidth: 1,
    padding: 12,
    backgroundColor: "white",
    borderColor: "grey",
  },
  button: {
    marginTop: 12,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
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

export default Login;
