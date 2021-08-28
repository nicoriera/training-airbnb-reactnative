import React, { useState } from "react";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/core";
import {
  Text,
  TextInput,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from "react-native";

import Logo from "../components/Logo";

export default function SignUpScreen({ setToken }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      // vérifier si password === confirmPassword
      if (password === confirmPassword) {
        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/sign_up",
          {
            email,
            username,
            description,
            password,
          }
        );
        if (response.data.token) {
          // si j'ai un token
          // j'appelle setToken(token)
          setToken(response.data.token);
        }

        console.log(response.data);
      } else {
        // afficher une erreur
        setErrorMessage("Les mots de passe doivent être identiques !");
      }
    } catch (error) {
      console.log(error.message);
      console.log(error.response);
      if (error.response.data.error === "This email already has an account.") {
        setErrorMessage("Cet email a déjà un compte.");
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAwareScrollView>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Logo image={require("../assets/logo_airbnb.png")} text={"Sign Up"} />

          <TextInput
            placeholder="email"
            style={styles.textInput}
            onChangeText={(text) => setEmail(text)}
            autoCapitalize="none"
          />
          <TextInput
            placeholder="username"
            style={styles.textInput}
            onChangeText={(text) => setUsername(text)}
          />
          <TextInput
            style={styles.input_describe}
            onChangeText={(text) => setDescription(text)}
            placeholder="Describe yourself"
            multiline={true}
            numberOfLines={10}
          />
          <TextInput
            onChangeText={(text) => setPassword(text)}
            placeholder="password"
            style={styles.textInput}
            secureTextEntry
          />
          <TextInput
            onChangeText={(text) => {
              setConfirmPassword(text);
              if (text === password) {
                setErrorMessage("");
              } else {
                setErrorMessage("Les mots de passe doivent être identiques ! ");
              }
            }}
            placeholder="confirm password"
            style={styles.textInput}
            secureTextEntry
          />
          <Text>{errorMessage}</Text>
          <TouchableOpacity style={styles.button_sign} onPress={handleSubmit}>
            <Text>Sign up</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              onPress={() => {
                navigation.navigate("SignIn");
              }}
            >
              Already have an account? Sign in
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderBottomColor: "pink",
    borderBottomWidth: 1,
    width: "80%",
    marginBottom: 40,
    paddingBottom: 10,
  },
  scrollView: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  logo: {
    height: 120,
    width: 120,
  },
  text_logo: {
    color: "grey",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 30,
  },
  input_describe: {
    marginBottom: 40,
    borderColor: "pink",
    borderWidth: 2,
    width: "80%",
    height: 80,
  },
  button_sign: {
    borderColor: "red",
    borderWidth: 2,
    borderRadius: 30,
    paddingHorizontal: 50,
    paddingVertical: 15,
    marginBottom: 20,
  },
});
