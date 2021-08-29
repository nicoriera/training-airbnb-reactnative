import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const RoomCard = ({ item }) => {
  return (
    <View>
      <View style={styles.container_photo}>
        <Image
          style={styles.photo}
          source={{
            uri: `${item.photos[0].url}`,
          }}
        />
        <Text style={styles.container_photo_price}>{item.price} €</Text>
      </View>

      <Text numberOfLines={1}>{item.title}</Text>
      {/* <Image
        style={styles.photo}
        source={{
          uri: `${item.user.photo.url}`,
        }}
      /> */}
      <View style={styles.container_rating}>
        <Text>{item.ratingValue}</Text>
        <Text>{item.reviews} reviews</Text>
      </View>
    </View>
  );
};

export default RoomCard;

const styles = StyleSheet.create({
  container_photo: {
    marginBottom: 20,
  },
  container_photo_price: {
    position: "absolute",

    backgroundColor: "black",
    color: "white",
    fontWeight: "bold",
    bottom: 10,
    padding: 10,
  },
  photo: {
    height: 200,
    width: 400,
  },
  container_rating: {
    paddingBottom: 20,
    marginBottom: 20,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 2,
  },
});
