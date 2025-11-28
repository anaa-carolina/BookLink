import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { Footer } from "../components/footer";
import { Header } from "../components/header";

export default function AddLivro({ navigation }) {
  const [form, setForm] = useState({
    titulo: "",
    autor: "",
    descricao: "",
  });
  const [image, setImage] = useState(null);

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (!form.titulo || !form.autor || !form.descricao) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }
    console.log({ ...form, image });
    Alert.alert("Sucesso", "Livro adicionado!");
    navigation.goBack();
  };

  return (
    <View style={styles.screen}>
      {/* HEADER ocupa toda a largura, sem margem */}
      <Header siteName="BookLink" />

      {/* CONTEÚDO SCROLLÁVEL */}
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        indicatorStyle="white"
      >
        {/* Card com margin */}
        <View style={styles.form}>
          <Text style={styles.label}>Título</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o título"
            placeholderTextColor="#A47DAB"
            value={form.titulo}
            onChangeText={(text) => setForm({ ...form, titulo: text })}
          />

          <Text style={styles.label}>Autor</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o autor"
            placeholderTextColor="#A47DAB"
            value={form.autor}
            onChangeText={(text) => setForm({ ...form, autor: text })}
          />

          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Digite a descrição"
            placeholderTextColor="#A47DAB"
            value={form.descricao}
            onChangeText={(text) => setForm({ ...form, descricao: text })}
            multiline
            numberOfLines={4}
          />

          <Text style={styles.label}>Imagem</Text>
          <TouchableOpacity
            style={styles.imagePicker}
            onPress={handlePickImage}
          >
            {image ? (
              <Image source={{ uri: image }} style={styles.imagePreview} />
            ) : (
              <Text style={styles.imageText}>Selecionar imagem</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Adicionar Livro</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Footer navigation={navigation} />
    </View>
  );
}

const PRIMARY_BLACK = "#050308";
const CARD_DARK = "#151021";
const LILAC = "#A47DAB";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: PRIMARY_BLACK,
  },
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  form: {
    backgroundColor: CARD_DARK,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: LILAC,
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    color: "#E5E5E5",
  },
  input: {
    backgroundColor: "#1A1625",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: LILAC,
    color: "#FFFFFF",
  },
  textArea: {
    height: 110,
    textAlignVertical: "top",
  },
  imagePicker: {
    backgroundColor: "#1A1625",
    height: 160,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: LILAC,
    overflow: "hidden",
  },
  imagePreview: {
    width: "100%",
    height: "100%",
  },
  imageText: {
    color: "#A47DAB",
    fontSize: 14,
  },
  button: {
    backgroundColor: LILAC,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 4,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});
