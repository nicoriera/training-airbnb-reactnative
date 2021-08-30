import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Profil = ({ item }) => {
  const displayStars = (ratingValue) => {
    const tab = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= ratingValue) {
        tab.push(<Ionicons key={i} name="ios-star" size={20} color="gold" />);
      } else {
        tab.push(<Ionicons key={i} name="ios-star" size={20} color="grey" />);
      }
    }
    return tab;
  };
  return (
    <View style={styles.container_profil}>
      <View style={styles.container_title}>
        <Text numberOfLines={1} style={styles.title}>
          {item.title}
        </Text>
        <View style={styles.container_rating}>
          <View style={styles.stars}>{displayStars(item.ratingValue)}</View>
          <Text style={styles.reviews}>{item.reviews} reviews</Text>
        </View>
      </View>
      <View style={styles.container_photo_profil}>
        <Image
          style={styles.photo_profil}
          source={{
            uri: item.user.account.photo.url,
          }}
        />
      </View>
    </View>
  );
};

export default Profil;

const styles = StyleSheet.create({
  container_profil: {
    flexDirection: "row",
    paddingBottom: 10,
    marginBottom: 20,
  },
  container_title: {
    width: "80%",
  },

  title: {
    fontSize: 18,
  },
  photo_profil: {
    height: 65,
    width: 65,
    borderRadius: 50,
    backgroundColor: "black",
  },
  container_rating: {
    flexDirection: "row",
  },
  stars: {
    flexDirection: "row",
    marginRight: 10,
  },
  reviews: {
    color: "lightgrey",
    fontSize: 15,
  },
});
