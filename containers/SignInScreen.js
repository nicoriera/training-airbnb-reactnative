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
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import Logo from "../components/Logo";
import { Ionicons } from "@expo/vector-icons";

// azerty
// riera@gmail.com

export default function SignInScreen({ setUser, navigation }) {
  const [password, setPassword] = useState("azerty");
  const [email, setEmail] = useState("riera@gmail.com");
  const [isRevealedPassword, setIsRevealedPassword] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [onSubmission, setOnSubmission] = useState(false);

  const handleSubmit = async () => {
    setOnSubmission(true);
    try {
      // vérifier si password === confirmPassword
      
      const response = await axios.post(
        "https://airbnb-api-nicolas-riera.herokuapp.com/user/log_in",
        {
          email,
          password,
        }
      );
      console.log("Hola ===>", response.data._id);
      if (response.data.token) {
        // si j'ai un token
        // j'appelle setUser(token, id)
        setUser(response.data.token, response.data._id);
        
      }
      setOnSubmission(false);
    } catch (error) {
      console.log(error.message);
      console.log(error.response.data);
      if (error.response.data.error === "This email already has an account.") {
        setErrorMessage("Cet email a déjà un compte.");
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

          <Text>{errorMessage}</Text>

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

          
          <View>
          {
onSubmission === true ? <ActivityIndicator style={styles.activity} size="small" color="red" /> : 
<TouchableOpacity
            style={styles.button_sign}
            onPress={handleSubmit}
            disabled={onSubmission}
          >
            <Text>Sign In</Text>
          </TouchableOpacity>
          }
          
          </View>

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
  activity: {
    margin: 10,
  }
});
