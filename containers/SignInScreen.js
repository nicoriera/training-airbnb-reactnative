import React, { useState } from "react";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import {
  ScrollView,
  Text,
  TextInput,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import Logo from "../components/Logo";
import { Ionicons } from "@expo/vector-icons";

export default function SignInScreen({ setToken, navigation }) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isRevealedPassword, setIsRevealedPassword] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [onSubmission, setOnSubmission] = useState(false);

  const handleSubmit = async () => {
    try {
      if (email && password) {
        setErrorMessage(""), setOnSubmission(true);
        const response = await axios.post(
          "https://airbnb-api-nicolas-riera.herokuapp.com/user/log_in",
          {
            email,
            password,
          }
        );
        if (response.data.token) {
          setOnSubmission(false);
          setToken(
            response.data.token,
            response.data.id,
            response.data.account.username
          );
        }
      } else {
        setErrorMessage("All the fields must be filled in");
      }
    } catch (error) {
      setOnSubmission(false);
      if (error.response.data.message === "Unauthorized") {
        setErrorMessage("Wrong email or password");
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
            value={email}
          />

          <View style={styles.view_password}>
            <TextInput
              onChangeText={(text) => setPassword(text)}
              placeholder="password"
              style={styles.textInput}
              secureTextEntry={isRevealedPassword}
              value={password}
            />
            {isRevealedPassword ? (
              <Ionicons
                style={styles.iconEye}
                name="eye"
                size={24}
                color="black"
                onPress={() => setIsRevealedPassword(!isRevealedPassword)}
              />
            ) : (
              <Ionicons
                style={styles.iconEye}
                name="eye-off"
                size={24}
                color="black"
                onPress={() => setIsRevealedPassword(isRevealedPassword)}
              />
            )}
          </View>

          <Text>{errorMessage}</Text>

          {onSubmission && <ActivityIndicator size="small" color="red" />}
          <TouchableOpacity
            style={styles.button_sign}
            onPress={handleSubmit}
            disabled={onSubmission}
          >
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
    width: 300,
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
  viewPassWord: {
    position: "relative",
    width: "80%",
  },
  iconEye: {
    position: "absolute",
    right: 0,
  },
});
