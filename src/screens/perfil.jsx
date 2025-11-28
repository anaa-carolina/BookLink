import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Footer } from "../components/footer";
import { Header } from "../components/header";

const PRIMARY_BLACK = "#050308";
const CARD_DARK = "#151021";
const LILAC = "#A47DAB";

export default function Perfil({ navigation, route }) {
  const user = route?.params?.user || {
    nome: "Usuário Exemplo",
    email: "usuario@exemplo.com",
    descricao: "Descrição não informada.",
    avatar: null,
  };

  const [avatar, setAvatar] = useState(user.avatar);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.screen}>
      <Header siteName="BookLink" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        indicatorStyle="white"
      >
        {/* Imagem de capa */}
        <Image
          source={{
            uri: "https://cdn.pixabay.com/photo/2017/06/06/21/14/book-2378479_1280.jpg",
          }}
          style={styles.cover}
        />

        {/* Avatar + nome + descrição */}
        <View style={styles.profileHeader}>
          <TouchableOpacity onPress={pickImage}>
            <Image
              source={
                avatar ? { uri: avatar } : require("../../assets/profile.jpeg")
              }
              style={styles.avatar}
            />
          </TouchableOpacity>
          <Text style={styles.name}>{user.nome}</Text>
          <Text style={styles.description}>{user.descricao}</Text>
        </View>

        {/* Card com info básica */}
        <View style={styles.card}>
          <Text style={styles.label}>Nome</Text>
          <Text style={styles.value}>{user.nome}</Text>

          <Text style={styles.label}>E-mail</Text>
          <Text style={styles.value}>{user.email}</Text>

          <Text style={styles.label}>Descrição</Text>
          <Text style={styles.value}>{user.descricao}</Text>

          <Text style={styles.label}>ID</Text>
          <Text style={styles.value}>{user.id}</Text>
        </View>
      </ScrollView>

      <Footer navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: PRIMARY_BLACK,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingBottom: 40,
  },
  cover: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
  },
  profileHeader: {
    alignItems: "center",
    marginTop: -48,
    marginBottom: 24,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 2,
    borderColor: LILAC,
    marginBottom: 12,
    backgroundColor: "#333",
  },
  name: {
    fontSize: 20,
    color: "#FFFFFF",
    fontWeight: "700",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: LILAC,
    textAlign: "center",
  },
  card: {
    width: "100%",
    height: "auto",
    backgroundColor: CARD_DARK,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: LILAC,
    margin: 5,
  },
  label: {
    fontSize: 12,
    color: "#A1A1AA",
    marginTop: 8,
  },
  value: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
