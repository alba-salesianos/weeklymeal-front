import { Pressable, StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import { UserInfoContext } from "../../contexts/UserInfoContext";
import type { StackScreenProps } from "@react-navigation/stack";
import Container, { Toast } from "toastify-react-native";
import { RootStackParamList } from "../../navigation/AuthHomepage";
import UserService from "../../services/user.service";
import { LoginPetition } from "../../types/UserInfo";

type Props = StackScreenProps<RootStackParamList, "Login">;

const Login: React.FC<Props> = (props) => {
  const { currentUser, setisLogged, setCurrentUser } =
    React.useContext(UserInfoContext);

  const [formData, setFormData] = React.useState({
    userName: "",
    password: "",
  });

  // Function that handles the input from the keyboard from the user, updating the formData useState at any time
  const handleInputChange = async (
    field: keyof LoginPetition,
    value: string
  ) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  // Function that handles the login with the information in formData. It will send a HTTP petition to the API, and if
  // it's successfull it will set the currentUser and it will navigate to BottomTabNav, otherwise it will show
  // an error message to the user.
  const handleLogin = async () => {
    if (formData.userName === "" || formData.password === "") {
      Toast.warn("Capón, rellena los 2 campos.", "top");
    } else {
      try {
        const loggedUser = await UserService.login(formData);
        if (loggedUser) {
          setCurrentUser(loggedUser);
          setisLogged(true);

          props.navigation.push("BottomTabNav");
        } else {
          Toast.error("Usuario o contraseña incorrecta.", "top");
        }
      } catch (error) {
        console.error("Error during login:", error);
        Toast.error("Error during login.", "top");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Container width={370} />
      <View style={styles.buttonGroup}>
        <TextInput
          style={styles.input}
          placeholder="Usuario"
          onChangeText={(value) => handleInputChange("userName", value)}
          value={formData.userName}
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
