// src/screens/home.jsx
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { FontAwesome } from "@expo/vector-icons";

const PRIMARY_BLACK = "#050308";
const CARD_DARK = "#151021";
const LILAC = "#A47DAB";
const LILAC_STRONG = "#BF8CFF";

export default function Home({ navigation, route }) {
  const userLogado = route?.params?.user || null;
  console.log("Home userLogado:", userLogado);

  const [livros, setLivros] = useState([
    {
      id: 1,
      titulo: "O Hobbit",
      autor: "J.R.R. Tolkien",
      usuario: {
        id: 1,
        nome: "Ana",
        email: "ana@exemplo.com",
        descricao: "Leitora apaixonada por fantasia.",
      },
      imagem: "https://imagens.disal.com.br/produtos/ampliada/5724465.jpg",
      spoiler: false,
      curtidas: 12,
      comentarios: ["Amei!"],
      liked: false,
    },
    {
      id: 2,
      titulo: "Game of Thrones",
      autor: "George R.R. Martin",
      usuario: {
        id: 2,
        nome: "Lucas",
        email: "lucas@exemplo.com",
        descricao: "Curte tramas políticas e fantasia adulta.",
      },
      imagem:
        "https://cdn.kobo.com/book-images/fbd29721-fa99-4f12-86d0-23805cdb97b0/1200/1200/False/a-game-of-thrones.jpg",
      spoiler: true,
      curtidas: 8,
      comentarios: [],
      liked: false,
    },
  ]);

  const likeAnim = useRef(new Animated.Value(1)).current;

  const handleLike = (livroId) => {
    Animated.sequence([
      Animated.timing(likeAnim, {
        toValue: 1.5,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(likeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();

    setLivros((prev) =>
      prev.map((l) =>
        l.id === livroId
          ? {
              ...l,
              liked: !l.liked,
              curtidas: l.liked ? l.curtidas - 1 : l.curtidas + 1,
            }
          : l
      )
    );
  };

  const handleComment = (livroId) => {
    const novoComentario = "Comentário de teste";
    setLivros((prev) =>
      prev.map((l) =>
        l.id === livroId
          ? { ...l, comentarios: [...l.comentarios, novoComentario] }
          : l
      )
    );
  };

  // PERFIL DO USUÁRIO LOGADO
  const handlePerfilLogado = () => {
    if (!userLogado) {
      console.log("Nenhum userLogado recebido na Home");
      return;
    }
    console.log("Indo para Perfil com userLogado:", userLogado);
    navigation.navigate("Perfil", { user: userLogado });
  };

  return (
    <View style={styles.screen}>
      <Header siteName="BookLink" showSearch={true} />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        indicatorStyle="white"
      >
        {/* Botão simples pra ir pro próprio perfil */}
        <TouchableOpacity
          style={styles.meuPerfilButton}
          onPress={handlePerfilLogado}
        >
          <FontAwesome name="user" size={18} color="#FFFFFF" />
          <Text style={styles.meuPerfilText}>Ver meu perfil</Text>
        </TouchableOpacity>

        {livros.map((livro) => (
          <View key={livro.id} style={styles.card}>
            <View style={styles.cardTop}>
              <Image source={{ uri: livro.imagem }} style={styles.image} />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.bookTitle}>{livro.titulo}</Text>
                <Text style={styles.bookAuthor}>{livro.autor}</Text>
                <Text style={styles.postedBy}>
                  Postado por {livro.usuario.nome}
                </Text>
                {livro.spoiler && (
                  <Text style={styles.spoiler}>⚠️ Contém spoiler</Text>
                )}
              </View>
            </View>

            <View style={styles.actionsRow}>
              <TouchableOpacity onPress={() => handleLike(livro.id)}>
                <Animated.View style={{ transform: [{ scale: likeAnim }] }}>
                  <FontAwesome
                    name="heart"
                    size={24}
                    color={livro.liked ? "#FF4D6D" : "#fff"}
                  />
                  <Text style={styles.counter}>{livro.curtidas}</Text>
                </Animated.View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handleComment(livro.id)}>
                <FontAwesome name="comment" size={24} color="#fff" />
                <Text style={styles.counter}>{livro.comentarios.length}</Text>
              </TouchableOpacity>
            </View>

            {livro.comentarios.map((c, i) => (
              <Text key={i} style={styles.comment}>
                {c}
              </Text>
            ))}
          </View>
        ))}
      </ScrollView>

      {/* Footer sem passar user por enquanto */}
      <Footer navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: PRIMARY_BLACK,
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 80,
  },
  meuPerfilButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    marginBottom: 12,
    backgroundColor: CARD_DARK,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: LILAC,
  },
  meuPerfilText: {
    color: "#FFFFFF",
    marginLeft: 6,
    fontSize: 12,
    fontWeight: "600",
  },
  card: {
    backgroundColor: CARD_DARK,
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: LILAC,
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 80,
    borderRadius: 8,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  bookAuthor: {
    fontSize: 14,
    color: LILAC,
  },
  postedBy: {
    fontSize: 12,
    color: "#FFFFFF80",
    marginTop: 2,
  },
  spoiler: {
    fontSize: 12,
    color: "#F97373",
    marginTop: 4,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 12,
  },
  counter: {
    color: "#FFFFFF90",
    fontSize: 12,
    marginTop: 2,
    textAlign: "center",
  },
  comment: {
    fontSize: 12,
    color: "#FFFFFF80",
    marginTop: 4,
    marginLeft: 8,
  },
  addButton: {
    backgroundColor: LILAC_STRONG,
    padding: 16,
    borderRadius: 24,
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 160,
  },
});
