import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiService } from "@/services/apiService";
import { Appointment } from "@/interfaces/common-interfaces";

export default function AgendarServico() {
  const router = useRouter();
  const [barbeiro, setBarbeiro] = useState<number | null>(null);
  const [data, setData] = useState("");
  const [servico, setServico] = useState<number | null>(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [barbeiros, setBarbeiros] = useState<any[]>([]);
  const [servicos, setServicos] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [barbersResponse, servicesResponse] = await Promise.all([
        apiService.getBarbers(),
        apiService.getServices(),
      ]);
      setBarbeiros(barbersResponse);
      setServicos(servicesResponse);
    } catch (error) {
      console.error("Erro ao buscar barbeiros e serviços:", error);
      Alert.alert("Erro", "Não foi possível carregar os barbeiros ou serviços.");
    } finally {
      setLoading(false);
    }
  };

  const agendar = async () => {
    console.log('chamou a função');
    if (!barbeiro || !data || !servico) {
        Alert.alert("Erro", "Por favor, preencha todos os campos.");
        return;
    }

    const clientId = await AsyncStorage.getItem("user");
    console.log('Client ID:', clientId);
    if (!clientId) {
        Alert.alert("Erro", "Usuário não autenticado.");
        return;
    }

    const selectedService = servicos.find((s) => s.id === servico);
    const selectedBarber = barbeiros.find((b) => b.id === barbeiro);
    console.log('Serviço Selecionado:', selectedService);

    if (!selectedService || !selectedBarber) {
        Alert.alert("Erro", "Serviço ou barbeiro não encontrado.");
        return;
    }

    const price = parseFloat(selectedService.price);

    const dateParts = data.split(', ')[1].split(' às ');
    const date = dateParts[0].split(' de ');
    const time = dateParts[1].split(':');

    const monthMapping = {
        janeiro: '01',
        fevereiro: '02',
        março: '03',
        abril: '04',
        maio: '05',
        junho: '06',
        julho: '07',
        agosto: '08',
        setembro: '09',
        outubro: '10',
        novembro: '11',
        dezembro: '12',
    };

    const monthKey = date[1].toLowerCase() as keyof typeof monthMapping;
    const monthNumber = monthMapping[monthKey];

    const formattedDate = `${date[2]}-${monthNumber}-${date[0]} ${time[0]}:${time[1]}:00`;

    const appointment: Appointment = {
        client_id: JSON.parse(clientId).id,
        barber_id: barbeiro,
        service_id: servico,
        appointment_date: formattedDate,
        status: "confirmado",
        value: price,
    };

    console.log('Tentando criar agendamento com:', appointment);

    Alert.alert(
        "Confirmar Agendamento",
        `Você escolheu:\nBarbeiro: ${selectedBarber.name}\nData: ${new Date(formattedDate).toLocaleString("pt-BR")}\nServiço: ${selectedService.description}\nPreço: R$ ${price.toFixed(2)}\n\nDeseja confirmar o agendamento?`,
        [
            {
                text: "Cancelar",
                onPress: () => console.log("Agendamento cancelado"),
                style: "cancel",
            },
            {
                text: "Confirmar",
                onPress: async () => {
                    try {
                        await apiService.createAppointment(appointment);
                        Alert.alert("Agendamento Confirmado", "O seu serviço foi agendado com sucesso!");
                        router.push("/");
                    } catch (error) {
                        console.error("Erro ao criar agendamento:", error);
                        Alert.alert("Erro", "Não foi possível agendar o serviço.");
                    }
                },
            },
        ]
    );
};






  const handleDateConfirm = (date: Date) => {
    const formattedDate = date.toLocaleString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
    setData(formattedDate);
    setDatePickerVisibility(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, styles.bold]}>Agendar Serviço</Text>
        <TouchableOpacity onPress={fetchData}>
          <Text>Atualizar 🔁</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <Text style={styles.loadingText}>Carregando...</Text>
      ) : (
        <>
          <Text style={styles.inputLabel}>Escolha o Barbeiro:</Text>
          <View style={styles.selectContainer}>
            {barbeiros.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[styles.selectOption, barbeiro === item.id && styles.selectedOption]}
                onPress={() => setBarbeiro(item.id)}
              >
                <Text style={[styles.selectText, barbeiro === item.id && styles.selectedText]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.inputLabel}>Escolha a Data:</Text>
          <Button
            title={data ? data : "Escolha uma data"}
            onPress={() => setDatePickerVisibility(true)}
            color="#4F2E2E"
          />

          <Text style={styles.inputLabel}>Escolha o Serviço:</Text>
          <View style={styles.selectContainer}>
            {servicos.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[styles.selectOption, servico === item.id && styles.selectedOption]}
                onPress={() => setServico(item.id)}
              >
                <Text style={[styles.selectText, servico === item.id && styles.selectedText]}>
                  {item.description} - R$ {item.price}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Button title="Agendar" onPress={agendar} color="#4F2E2E" />
        </>
      )}

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleDateConfirm}
        onCancel={() => setDatePickerVisibility(false)}
        date={new Date()}
        locale="pt-BR"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    fontFamily: "Montserrat-Regular",
    flex: 1,
    padding: 20,
    backgroundColor: "#E6D9C0",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  title: {
    fontSize: 15,
    color: "#4F2E2E",
  },
  bold: {
    fontWeight: "bold",
  },
  inputLabel: {
    fontSize: 14,
    color: "#4F2E2E",
    marginBottom: 5,
    marginTop: 10,
  },
  selectContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 15,
  },
  selectOption: {
    backgroundColor: "#F0E7D8",
    padding: 10,
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#4F2E2E",
  },
  selectedOption: {
    backgroundColor: "#4F2E2E",
  },
  selectText: {
    color: "#4F2E2E",
    textAlign: "center",
  },
  selectedText: {
    color: "#F0E7D8",
  },
  loadingText: {
    fontSize: 16,
    color: "#4F2E2E",
    textAlign: "center",
    marginVertical: 20,
  },
});
