import React, { useState, useCallback } from "react";
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

  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [description, setDescription] = useState("");

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleImagePicked = useCallback(async (pickerResult) => {
    let uploadResponse, uploadResult;
    try {
      setUploading(true);
      if (!pickerResult.cancelled) {
        if (Constants.isDevice) {
          apiUrl = `https://your-ngrok-subdomain.ngrok.io/upload`;
        } else {
          apiUrl = `http://localhost:3000/upload`;
        }
        const uri = pickerResult.uri;
        const uriParts = uri.split(".");
        const fileType = uriParts[uriParts.length - 1];
        const formData = new FormData();
        formData.append("photo", {
          uri,
          name: `photo.${fileType}`,
          type: `image/${fileType}`,
        });
        uploadResponse = await axios.put(
          // Ici, il faut envoyer l'id du user en query
          // id rentré en dur dans l'exemple, mais doit être dynamique dans votre code
          "https://express-airbnb-api.herokuapp.com/user/upload_picture",
          formData,
          {
            headers: {
              Authorization:
                "Bearer ev5BO5RfKqrCW4mTCt3GNxDo8Zdgt6WG5gSVskqDfyOnPZcnt7AHlc5uvBqAxUfm",
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("log1 ===>", uploadResponse.data.photo[0].url);
        if (
          Array.isArray(uploadResponse.data.photo) === true &&
          uploadResponse.data.photo.length > 0
        ) {
          setImage(uploadResponse.data.photo[0].url);
        }
      }
    } catch (e) {
      console.log("log2 ===>", { uploadResponse });
      console.log("log3 ===>", { uploadResult });
      console.log("log4 ===>", { e });
      alert("Upload failed, sorry :(");
    } finally {
      setUploading(false);
    }
  });

  const selectPicture = async () => {
    const cameraRollPerm =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (cameraRollPerm.status === "granted") {
      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      handleImagePicked(pickerResult);
    }
  };

  const takePicture = async () => {
    const cameraPerm = await ImagePicker.requestCameraPermissionsAsync();
    const cameraRollPerm =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (
      cameraPerm.status === "granted" &&
      cameraRollPerm.status === "granted"
    ) {
      const pickerResult = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      handleImagePicked(pickerResult);
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
            {uploading && (
              <View style={[StyleSheet.absoluteFill, styles.uploading]}>
                <ActivityIndicator color="red" size="large" />
              </View>
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
                onPress={selectPicture}
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
                onPress={takePicture}
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
  uploading: {
    alignItems: "center",
    justifyContent: "center",
  },
});
