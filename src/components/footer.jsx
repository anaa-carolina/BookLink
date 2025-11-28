import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const PRIMARY_BLACK = "#050308";
const LILAC = "#A47DAB";

export function Footer({ navigation }) {
  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Text style={styles.footerItem}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("AddLivro")}>
        <Text style={styles.footerItem}>Adicionar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Perfil")}>
        <Text style={styles.footerItem}>Perfil</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    height: 60,
    borderTopWidth: 1,
    borderTopColor: "#241737",
    backgroundColor: "#6e4d74ff",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 16,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  footerItem: {
    color: "#d7bfdbff",
    fontSize: 14,
    fontWeight: "600",
  },
});
