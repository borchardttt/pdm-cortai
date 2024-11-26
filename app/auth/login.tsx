// app/auth/Login.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import { useRouter } from "expo-router";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email === "admin@cortai.com" && password === "123") {
      Alert.alert("Login bem-sucedido!", "Bem-vindo de volta!");
      router.push("/");
    } else {
      Alert.alert("Erro de login", "Usuário ou senha inválidos.");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("@/assets/icons/logo.png")} style={styles.logo} />
      <Text style={styles.title}>Login</Text>
      <Text style={styles.inputLabel}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Digite seu email"
        keyboardType="email-address"
      />
      <Text style={styles.inputLabel}>Senha</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Digite sua senha"
        secureTextEntry
      />
      <Button title="Entrar" onPress={handleLogin} color="#4F2E2E" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E6D9C0",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: "#4F2E2E",
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "#4F2E2E",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
    color: "#4F2E2E",
    width: "100%",
  },
  logo: {
    height: 200,
    width: 200,
    marginBottom: 30,
  },
});
