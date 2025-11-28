import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";

const PRIMARY_BLACK = "#050308";
const LILAC = "#A47DAB";
const DARK_INPUT = "#1A1625";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      let data = {};
      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (response.ok) {
        // data deve ser o usuário { id, nome, email, descricao, ... }
        console.log("Usuário logado:", data);
        navigation.replace("Home", { user: data });
      } else {
        Alert.alert("Erro", data.error || "Email ou senha inválidos");
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível conectar ao servidor");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Bem-vindo(a) ao BookLink!</Text>
      <Text style={styles.subtitle}>O maior app para leitores!</Text>
      <Text style={styles.subtitle}>Entre para continuar</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#A47DAB"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#A47DAB"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text
          style={styles.link}
          onPress={() => navigation.navigate("Cadastro")}
        >
          Criar conta
        </Text>
        <Text
          style={styles.link}
          onPress={() => navigation.navigate("ForgotPassword")}
        >
          Esqueci a senha
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: PRIMARY_BLACK,
    alignItems: "center",
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: LILAC,
    textAlign: "center",
    marginBottom: 32,
  },
  input: {
    backgroundColor: DARK_INPUT,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: LILAC,
    color: "#FFFFFF",
    width: "100%",
  },
  button: {
    backgroundColor: LILAC,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  link: {
    color: LILAC,
    fontWeight: "600",
    fontSize: 14,
  },
});
