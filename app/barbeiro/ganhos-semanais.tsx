import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import { BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { apiService } from "@/services/apiService";

export default function GanhosSemanais() {
  const navigation = useRouter();
  const [user, setUser] = useState(null);
  const [earnings, setEarnings] = useState([0, 0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error("Erro ao recuperar os dados do usuário:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchEarnings = async () => {
			// @ts-ignore
      if (!user?.id) return;

      try {
        const data = await apiService.getBarberEarnings(user.id);
				console.log(data);
        const weeklyEarnings = [0, 0, 0, 0, 0, 0, 0];
        data.forEach((entry) => {
          const dayIndex = new Date(entry.earning_date).getDay();
			// @ts-ignore

          weeklyEarnings[dayIndex] += parseFloat(entry.value);
        });

        setEarnings(weeklyEarnings);
      } catch (error) {
        console.error("Erro ao recuperar ganhos:", error);
      }
    };

    if (user) {
      fetchEarnings();
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <View style={styles.cardWelcome}>
        <Image source={require("@/assets/icons/logo.png")} style={styles.logo} />
        <Text style={styles.title}>
          {/* @ts-ignore */}
          Ganhos da semana - <Text style={styles.bold}>{user ? user.name.split(" ")[0] : "Barbeiro"}</Text>.
        </Text>
      </View>
{/* @ts-ignore */}
      <BarChart
        data={{
          labels: ["D", "S", "T", "Q", "Q", "S", "S"],
          datasets: [{ data: earnings }],
        }}
        width={Dimensions.get("window").width - 40}
        height={250}
        yAxisLabel="R$"
        chartConfig={{
          backgroundGradientFrom: "#E6D9C0",
          backgroundGradientTo: "#E6D9C0",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(79, 46, 46, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(79, 46, 46, ${opacity})`,
          style: { borderRadius: 10 },
          barPercentage: 0.6,
        }}
        style={{
          marginVertical: 20,
          borderRadius: 10,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    fontFamily: "Montserrat_400Regular",
    flex: 1,
    padding: 20,
    backgroundColor: "#E6D9C0",
    alignItems: "center",
  },
  logo: {
    height: 80,
    width: 80,
  },
  title: {
    fontSize: 15,
    color: "#4F2E2E",
    textAlign: "center",
    marginLeft: 10,
  },
  bold: {
    fontWeight: "bold",
  },
  cardWelcome: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0E7D8",
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    width: "100%",
  },
});
