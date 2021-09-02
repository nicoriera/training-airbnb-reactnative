import React, { useState } from "react";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/core";
import {
  ScrollView,
  Text,
  TextInput,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";

import Logo from "../components/Logo";

export default function SignInScreen({ setToken }) {
  const [errorMessage, setErrorMessage] = useState("");
  const navigation = useNavigation();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const handleSubmit = async () => {
    try {
      // vérifier si password === confirmPassword
      if (password === token) {
        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/log_in",
          {
            email,
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
        setErrorMessage("Wrong password/email or both");
      }
    } catch (error) {
      console.log(error.message);
      console.log(error.response);
      if (error.response.data.error === "This email have no account.") {
        setErrorMessage("Account no already create");
      }
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAwareScrollView>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Logo image={require("../assets/logo_airbnb.png")} text={"Sign In"} />

          <TextInput
            placeholder="email"
            style={styles.textInput}
            onChangeText={(text) => setEmail(text)}
            autoCapitalize="none"
          />

          <TextInput
            onChangeText={(text) => setPassword(text)}
            placeholder="password"
            style={styles.textInput}
            secureTextEntry
          />

          <Text>{errorMessage}</Text>
          <TouchableOpacity style={styles.button_sign} onPress={handleSubmit}>
            <Text>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              onPress={() => {
                navigation.navigate("SignUp");
              }}
            >
              No account ? Register
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
