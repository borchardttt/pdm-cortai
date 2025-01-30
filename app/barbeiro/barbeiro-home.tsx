import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";

export default function BarbeiroHome() {
  const navigation = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData));
          console.log('dados do usuário:', userData);
        }
      } catch (error) {
        console.error("Erro ao recuperar os dados do usuário:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.cardWelcome}>
        <Image
          source={require("@/assets/icons/logo.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>
					{/* @ts-ignore */}
          Seja bem vindo, barbeiro <Text style={styles.bold}>{user ? user.name.split(' ')[0] : 'Barbeiro'}</Text>.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("/(tabs)/agendar-servico")}
      >
        <Image
          source={require("@/assets/icons/calendar.png")}
          style={styles.icon}
        />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Ganhos Mensais</Text>
          <Text style={styles.cardDescription}>
            Visualize os valores acumulados do seu mês.
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("/(tabs)/servicos-agendados")}
      >
        <Image
          source={require("@/assets/icons/schedule.png")}
          style={styles.icon}
        />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Serviços Agendados</Text>
          <Text style={styles.cardDescription}>
            Confira aqui suas agendas e o status atual delas!
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    fontFamily: "Montserrat_400Regular",
    flex: 1,
    padding: 20,
    backgroundColor: "#E6D9C0",
  },
  logo: {
    height: 100,
    width: 100,
  },
  title: {
    fontSize: 15,
    color: "#4F2E2E",
  },
  bold: {
    fontWeight: "bold",
  },
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#F0E7D8",
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  cardWelcome: {
    marginTop: "5%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0E7D8",
    padding: 10,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
    textAlign: "justify",
    flexWrap: "wrap",
    maxWidth: "95%",
  },
  icon: {
    height: 80,
    width: 80,
    marginRight: 15,
  },
});
