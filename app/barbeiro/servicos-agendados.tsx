import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from "react-native";
import { apiService } from "@/services/apiService";

export default function ServicosAgendados() {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        if (userData) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error("Erro ao recuperar os dados do usuário:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) return;

      try {
        const [appointmentsData, servicesData, clientsData] = await Promise.all([
          apiService.getBarberAppointments(user.id),
          apiService.getServices(),
          apiService.getUsers(),
        ]);

        setAppointments(appointmentsData);
        setServices(servicesData);
        setClients(clientsData);
      } catch (error) {
        console.error("Erro ao recuperar dados:", error);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  const getServiceName = (serviceId) => {
    if (!services || services.length === 0) return "Carregando...";

    const service = services.find((s) => s.id === serviceId);
    return service ? service.description : "Serviço Desconhecido";
  };

  const getClientName = (clientId) => {
    const client = clients.find((c) => c.id === clientId);
    return client ? client.name : "Cliente Desconhecido";
  };

  const handleMarkAsDone = async (appointment) => {
    try {
      await apiService.completeAppointment(appointment.id);

      const updatedAppointments = await apiService.getBarberAppointments(user.id);
      setAppointments(updatedAppointments);

      Alert.alert("Sucesso", "Agendamento concluído com sucesso!");
    } catch (error) {
      console.error("Erro ao concluir agendamento:", error);
    }
  };

  const formatAppointmentDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const renderStatusPill = (status) => {
    const pillStyle = {
      backgroundColor: status === "realizado" ? "#B2E5B2" : "#B2DFF7",
      padding: 5,
      borderRadius: 15,
      alignSelf: "flex-start",
      marginVertical: 5,
    };

    return <View style={pillStyle}><Text>{status.charAt(0).toUpperCase() + status.slice(1)}</Text></View>;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Serviços Agendados</Text>
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {renderStatusPill(item.status)}
            <Text style={styles.serviceText}>Serviço: {getServiceName(item.service_id)}</Text>
            <Text style={styles.serviceText}>{formatAppointmentDate(item.appointment_date)}</Text>
            <Text style={styles.clientText}>Cliente: {getClientName(item.client_id)}</Text>
            <Text style={styles.priceText}>R$ {item.value}</Text>
            {/* Exibe o botão apenas se o status não for "realizado" */}
            {item.status !== "realizado" && (
              <TouchableOpacity onPress={() => handleMarkAsDone(item)} style={styles.button}>
                <Text style={styles.buttonText}>✔️ Concluir</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#E6D9C0",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#4F2E2E",
  },
  card: {
    backgroundColor: "#F0E7D8",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  serviceText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4F2E2E",
  },
  clientText: {
    fontSize: 14,
    color: "#4F2E2E",
    marginVertical: 5,
  },
  priceText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4F2E2E",
  },
  button: {
    backgroundColor: "#4F2E2E",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
