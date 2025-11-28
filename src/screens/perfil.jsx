import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Footer } from "../components/footer";
import { Header } from "../components/header";

const PRIMARY_BLACK = "#050308";
const CARD_DARK = "#151021";
const LILAC = "#A47DAB";

export default function Perfil({ navigation, route }) {
  const user = route?.params?.user;
  console.log("Perfil user:", user);

  if (!user) {
    return (
      <View style={styles.screen}>
        <Header siteName="BookLink" />
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", marginBottom: 8 }}>
            Nenhum usuário recebido.
          </Text>
          <TouchableOpacity onPress={() => navigation.replace("Login")}>
            <Text style={{ color: LILAC, fontWeight: "600" }}>
              Voltar para login
            </Text>
          </TouchableOpacity>
        </View>
        <Footer navigation={navigation} />
      </View>
    );
  }

  const [avatar, setAvatar] = useState(user.avatar || null);

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

  const handleEditInfo = () => {
    Alert.alert(
      "Editar informações",
      "Aqui você pode implementar a tela de edição de perfil."
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Apagar conta",
      "Tem certeza que deseja excluir sua conta? Essa ação não pode ser desfeita.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Apagar",
          style: "destructive",
          onPress: async () => {
            try {
              await fetch(`http://localhost:3000/api/usuarios/${user.id}`, {
                method: "DELETE",
              });
              navigation.replace("Login");
            } catch (error) {
              Alert.alert("Erro", "Não foi possível apagar a conta");
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.screen}>
      <Header siteName="BookLink" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        indicatorStyle="white"
      >
        <Image
          source={{
            uri: "https://cdn.pixabay.com/photo/2017/06/06/21/14/book-2378479_1280.jpg",
          }}
          style={styles.cover}
        />

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

        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>Informações da conta</Text>
            <TouchableOpacity
              style={styles.editButton}
              onPress={handleEditInfo}
            >
              <Text style={styles.editText}>Editar</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Nome</Text>
          <Text style={styles.value}>{user.nome}</Text>

          <Text style={styles.label}>E-mail</Text>
          <Text style={styles.value}>{user.email}</Text>

          <Text style={styles.label}>Descrição</Text>
          <Text style={styles.value}>{user.descricao}</Text>
        </View>
      </ScrollView>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => navigation.replace("Login")}
        >
          <Text style={styles.logoutText}>Sair da conta</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDeleteAccount}
        >
          <Text style={styles.deleteText}>Apagar conta</Text>
        </TouchableOpacity>
      </View>

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
    paddingHorizontal: 24,
  },
  card: {
    alignSelf: "center",
    maxWidth: "90%",
    width: "100%",
    backgroundColor: CARD_DARK,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: LILAC,
    marginVertical: 10,
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  cardTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  editButton: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "#241737",
  },
  editText: {
    color: LILAC,
    fontSize: 12,
    fontWeight: "600",
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
    flexWrap: "wrap",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: "#E63946",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  logoutText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#6A040F",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  deleteText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
});
