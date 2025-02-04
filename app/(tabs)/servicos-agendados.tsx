import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert, Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiService } from "@/services/apiService";
import { Appointment } from "@/interfaces/common-interfaces";
import { useRouter } from "expo-router";

export default function ServicosAgendados() {
  const [agendamentos, setAgendamentos] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useRouter();
  const [barbers, setBarbers] = useState<{ [key: string]: string }>({});
  const [services, setServices] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    fetchAppointments();
    fetchBarbers();
    fetchServices();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        const clientId = user.id;

        const appointments = await apiService.getClientAppointments(clientId);
        console.log(appointments);
        setAgendamentos(appointments);
      }
    } catch (error) {
      console.error("Erro ao recuperar agendamentos:", error);
      Alert.alert("Erro", "Não foi possível carregar os agendamentos.");
    } finally {
      setLoading(false);
    }
  };

  const fetchBarbers = async () => {
    try {
      const barbersList = await apiService.getBarbers();
      const barberMap = barbersList.reduce((acc, barber) => {
        // @ts-ignore
        acc[barber.id] = barber.name;
        return acc;
      }, {});
      setBarbers(barberMap);
    } catch (error) {
      console.error("Erro ao recuperar barbeiros:", error);
    }
  };

  const fetchServices = async () => {
    try {
      const servicesList = await apiService.getServices();
      const serviceMap = servicesList.reduce((acc, service) => {
        // @ts-ignore
        acc[service.id] = service.name;
        return acc;
      }, {});
      setServices(serviceMap);
    } catch (error) {
      console.error("Erro ao recuperar serviços:", error);
    }
  };

  const formatarData = (dataISO: string) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const optionsHora = { hour: "2-digit", minute: "2-digit" };

    const data = new Date(dataISO);
        // @ts-ignore
    const dataFormatada = data.toLocaleDateString("pt-BR", options);
        // @ts-ignore
    const horaFormatada = data.toLocaleTimeString("pt-BR", optionsHora);

    return `${dataFormatada} às ${horaFormatada}`;
  };

  const renderItem = ({ item }: { item: Appointment }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>Barbeiro: {barbers[item.barber_id] || 'Desconhecido'}</Text>
        <Text style={styles.cardDescription}>
          Data: {formatarData(item.appointment_date)}
        </Text>
        <Text style={styles.cardDescription}>Serviço: {services[item.service_id] || 'Desconhecido'}</Text>
        <Text style={styles.cardDescription}>Preço: R${item.value}</Text>
        <Text style={styles.cardDescription}>Status: {item.status}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Button title="Atualizar" onPress={fetchAppointments} color="#4F2E2E" />
      {loading ? (
        <ActivityIndicator size="large" color="#4F2E2E" />
      ) : agendamentos.length > 0 ? (
        <FlatList
          data={agendamentos}
          keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingTop: 10 }}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyMessage}>
            Você não tem agendamentos ainda no Cortaí 🥹
          </Text>
          <Button
            title="Agendar um Serviço"
            onPress={() => navigation.navigate("/(tabs)/agendar-servico")}
            color="#4F2E2E"
          />
        </View>
      )}
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
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyMessage: {
    fontSize: 18,
    color: "#4F2E2E",
    marginBottom: 20,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4F2E2E",
  },
  cardDescription: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
    textAlign: "justify",
    flexWrap: "wrap",
    maxWidth: "95%",
  },
});
