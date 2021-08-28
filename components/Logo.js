import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const Logo = ({ text, image }) => {
  return (
    <View style={styles.container_logo}>
      <Image style={styles.logo} source={image} />
      <Text style={styles.text_logo}>{text}</Text>
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({
  container_logo: {
    justifyContent: "center",
    alignItems: "center",
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
});
