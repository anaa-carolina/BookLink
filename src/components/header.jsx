// src/components/header.jsx
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const LILAC = "#A47DAB";

export function Header({ siteName = "BookLink" }) {
  return (
    <View style={styles.header}>
      <View style={styles.logoRow}>
        <Image
          source={require("../../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.siteName}>{siteName}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 72,
    borderBottomWidth: 1,
    borderBottomColor: "#241737",
    backgroundColor: "#6e4d74ff",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
  siteName: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
  },
});
