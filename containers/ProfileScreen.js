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
  Platform,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
// import GetPicture from "../components/GetPicture";
// import TakePicture from "../components/TakePicture";

export default function ProfileScreen() {
  const [isLoading, setIsLoading] = useState(false);
  // const [data, setData] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [description, setDescription] = useState("");

  const [selectPicture, setSelectPicture] = useState("");
  const [takenPicture, setTakenPicture] = useState("");

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
  const getPermissionAndGetPicture = async () => {
    try {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status === "granted") {
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
          console.log(result);
          if (!result.cancelled) {
            setSelectPicture(result.uri);
          }
        } else {
          alert("Picture not selected");
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getPermissionAndTakePicture = async () => {
    try {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status === "granted") {
          const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
          console.log(result);
          if (!result.cancelled) {
            setTakenPicture(result.uri);
          }
        } else {
          alert("Picture not taken");
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

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
          <View>
            <Image
              source={{ uri: selectPicture }}
              style={{
                width: 150,
                height: 150,

                borderRadius: 75,
                borderColor: "red",
                borderWidth: 1,
                marginRight: 20,
              }}
            />
          </View>

          <View>
            {/* <GetPicture image={image} /> */}
            {/* <TakePicture image={image} /> */}
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FontAwesome5
                onPress={getPermissionAndGetPicture}
                style={{ marginTop: 20 }}
                name="images"
                size={24}
                color="grey"
              />
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FontAwesome5
                onPress={getPermissionAndTakePicture}
                style={{ marginTop: 20 }}
                name="camera"
                size={24}
                color="grey"
              />
            </View>
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
