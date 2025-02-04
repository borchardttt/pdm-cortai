import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform
} from "react-native";
import { useRouter } from "expo-router";
import { apiService } from "@/services/apiService";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true);
    try {
      const response = await apiService.authenticate(email, password);
      Alert.alert("Login bem-sucedido!", `Bem-vindo, ${response.user.name}!`);
      await AsyncStorage.setItem('user', JSON.stringify(response.user));

      if (response.user.type === 'barbeiro') {
        router.push("/barbeiro/barbeiro-home");
      } else {
        router.push("/");
      }
    } catch (error: any) {
      console.error("Erro ao autenticar:", error?.response?.data || error.message);
      Alert.alert(
        "Erro de login",
        error?.response?.data?.message || "Usuário ou senha inválidos."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Image source={require("@/assets/icons/logo.png")} style={styles.logo} />
          <Text style={styles.title}>Login</Text>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Digite seu email"
            placeholderTextColor="#000"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.inputLabel}>Senha</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Digite sua senha"
            placeholderTextColor="#000"
            secureTextEntry
          />

          {loading ? (
            <ActivityIndicator size="large" color="#4F2E2E" />
          ) : (
            <Button title="Entrar" onPress={handleLogin} color="#4F2E2E" />
          )}
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6D9C0",
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
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

