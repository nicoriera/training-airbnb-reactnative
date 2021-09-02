import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

export default function ProfileScreen({ route }) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [description, setDescription] = useState("");
  // const id = route.params.id;

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `https://express-airbnb-api.herokuapp.com/user/${id}`
  //       );
  //       setData(response.data);
  //       console.log(response.data);
  //       setIsLoading(false);
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   };
  //   fetchData();
  // }, [id]);

  return (
    <ScrollView style={styles.scrollview}>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 50,
            marginTop: 30,
          }}
        >
          <Image
            style={{
              width: 150,
              height: 150,
              backgroundColor: "lightgrey",
              borderRadius: 75,
              borderColor: "red",
              borderWidth: 1,
              marginRight: 20,
            }}
          />
          <View>
            <FontAwesome5 name="images" size={24} color="grey" />
            <FontAwesome5
              style={{ marginTop: 20 }}
              name="camera"
              size={24}
              color="grey"
            />
          </View>
        </View>
        <TextInput
          placeholder="email"
          style={styles.textInput}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
          value={email}
        />
        <TextInput
          placeholder="username"
          style={styles.textInput}
          onChangeText={(text) => setUserName(text)}
          value={userName}
        />
        <TextInput
          style={styles.input_describe}
          onChangeText={(text) => setDescription(text)}
          placeholder="Describe yourself"
          multiline={true}
          numberOfLines={10}
        />
        {isLoading === true ? (
          <ActivityIndicator size="small" color="red" />
        ) : (
          <TouchableOpacity
            style={styles.button_sign}
            onPress={async () => {
              setIsLoading(true);
              try {
                const response = await axios.put(
                  "https://express-airbnb-api.herokuapp.com/user/update",
                  {
                    email,
                    description,
                    username,
                  }
                );
                console.log("AXIOS");

                setData(response.data);
                setIsLoading(false);
              } catch (error) {
                alert("An error occured");
              }
            }}
          >
            <Text>Update</Text>
          </TouchableOpacity>
        )}

        {isLoading === true ? (
          <ActivityIndicator size="small" color="red" />
        ) : (
          <TouchableOpacity style={styles.button_logout}>
            <Text>Log Out</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollview: {
    backgroundColor: "white",
    flex: 1,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  button_sign: {
    borderColor: "red",
    borderWidth: 2,
    borderRadius: 30,
    paddingHorizontal: 50,
    paddingVertical: 15,
    marginBottom: 20,
  },
  button_logout: {
    borderColor: "red",
    borderWidth: 2,
    borderRadius: 30,
    paddingHorizontal: 50,
    paddingVertical: 15,
    marginBottom: 20,
    backgroundColor: "lightgrey",
  },
  textInput: {
    borderBottomColor: "pink",
    borderBottomWidth: 1,
    width: "80%",
    marginBottom: 40,
    paddingBottom: 10,
  },
  input_describe: {
    marginBottom: 40,
    borderColor: "pink",
    borderWidth: 2,
    width: "80%",
    height: 80,
  },
});
