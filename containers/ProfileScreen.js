import React, { useState, useCallback, useEffect } from "react";
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
import * as ImagePicker from "expo-image-picker";
// import GetPicture from "../components/GetPicture";
// import TakePicture from "../components/TakePicture";

export default function ProfileScreen({ userId, setUser, userToken }) {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState();
  const [imageModified, setImageModified] = useState(false);
  const [infoModified, setInfoModified] = useState(false);

  const apiUrl = "https://airbnb-api-nicolas-riera.herokuapp.com";

  const authAxios = axios.create({
    baseURL: apiUrl,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://airbnb-api-nicolas-riera.herokuapp.com/users/${userId}`,
          {
            headers: {
              authorization: `Bearer" ${userToken}`,
            },
          }
        );
        // console.log("Coucou ===>", response.data);
        setEmail(response.data.email);
        setUsername(response.data.account.username);
        setDescription(response.data.account.description);
        setImage(response.data.account.photo);
      } catch (error) {
        console.log(error.message);
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  const handleUpdate = async () => {
    try {
      setIsLoading(true);
      if (imageModified) {
        const uri = image;
        const uriParts = uri.split(".");
        const fileType = uriParts[uriParts.length - 1];
        const formData = new FormData();
        formData.append("photo", {
          uri,
          name: `photo.${fileType}`,
          type: `image/${fileType}`,
        });
        const response = await axios.put(
          `https://airbnb-api-nicolas-riera.herokuapp.com/user/upload_picture/${userId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer" ${userToken}`,
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Upload image ===>", response.data);
      }
      if (infoModified) {
        const response = await axios.put(
          `https://airbnb-api-nicolas-riera.herokuapp.com/user/update`,
          { email, description, username },
          {
            headers: {
              Authorization: `Bearer" ${userToken}`,
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Update infos ===>", response.data);
        if (response.status === 200) {
          fetchData();
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      console.log(error.response.data);
    }
  };

  const handelePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setImage(result.uri);
        setImageModified(true);
      } else {
        alert("No selected image!");
      }
    }
  };

  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status === "granted") {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setImage(result.uri);
        setImageModified(true);
      }
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
            {!image ? (
              <View
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 75,
                  borderColor: "red",
                  borderWidth: 1,
                  marginRight: 20,
                  backgroundColor: "lightgrey",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FontAwesome5 name="user-alt" size={60} color="grey" />
              </View>
            ) : (
              <Image
                source={{ uri: image }}
                resizeMode="contain"
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 75,
                  borderColor: "red",
                  borderWidth: 1,
                  marginRight: 20,
                }}
              />
            )}
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
                onPress={handelePickImage}
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
                onPress={handleTakePhoto}
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
          onChangeText={(text) => {
            setEmail(text);
            setInfoModified(true);
          }}
          autoCapitalize="none"
          value={email}
        />
        <TextInput
          placeholder="username"
          style={styles.textInput}
          onChangeText={(text) => {
            setUsername(text);
            setInfoModified(true);
          }}
          value={username}
        />
        <TextInput
          style={styles.input_describe}
          onChangeText={(text) => {
            setDescription(text);
            setInfoModified(true);
          }}
          placeholder="Describe yourself"
          multiline={true}
          value={description}
        />
        {isLoading === true ? (
          <ActivityIndicator size="small" color="red" />
        ) : (
          <TouchableOpacity style={styles.button_sign} onPress={handleUpdate}>
            <Text>Update</Text>
          </TouchableOpacity>
        )}

        {isLoading === true ? (
          <ActivityIndicator size="small" color="red" />
        ) : (
          <TouchableOpacity
            onPress={() => setUser(null, null, null)}
            style={styles.button_logout}
          >
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
  uploading: {
    alignItems: "center",
    justifyContent: "center",
  },
});
