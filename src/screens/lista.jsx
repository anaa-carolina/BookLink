import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function MeusLivros({ navigation }) {
  // Lista de livros curtidos ou “ler mais tarde”
  const livrosCurtidos = [
    {
      id: 1,
      titulo: "1984",
      autor: "George Orwell",
      imagem: "https://picsum.photos/212",
      spoiler: false,
    },
    {
      id: 2,
      titulo: "Dom Casmurro",
      autor: "Machado de Assis",
      imagem: "https://picsum.photos/213",
      spoiler: true,
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 16 }}
    >
      <Text style={styles.title}>Meus Livros</Text>
      {livrosCurtidos.map((livro) => (
        <View key={livro.id} style={styles.card}>
          <Image source={{ uri: livro.imagem }} style={styles.image} />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.bookTitle}>{livro.titulo}</Text>
            <Text style={styles.bookAuthor}>{livro.autor}</Text>
            {livro.spoiler && (
              <Text style={styles.spoiler}>⚠️ Contém spoiler</Text>
            )}
          </View>
          <TouchableOpacity>
            <Text style={styles.removeButton}>Remover</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F3FF" },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#8B5CF6",
    marginBottom: 16,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#EDE9FE",
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    alignItems: "center",
  },
  image: { width: 60, height: 80, borderRadius: 8 },
  bookTitle: { fontSize: 16, fontWeight: "700", color: "#4C1D95" },
  bookAuthor: { fontSize: 14, color: "#6B21A8" },
  spoiler: { fontSize: 12, color: "#B91C1C", marginTop: 4 },
  removeButton: {
    color: "#fff",
    backgroundColor: "#C084FC",
    padding: 6,
    borderRadius: 8,
    textAlign: "center",
    marginTop: 8,
  },
});
