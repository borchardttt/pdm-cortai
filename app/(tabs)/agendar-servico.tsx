import React, { useState } from "react";
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

export default function AgendarServico() {
  const router = useRouter();
  const [barbeiro, setBarbeiro] = useState("");
  const [data, setData] = useState("");
  const [servico, setServico] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const barbeiros = ["Carlos", "Marcos", "Ana"];
  const servicos = ["Corte Simples", "Barba e Corte", "Alisamento"];

  const agendar = () => {
    Alert.alert(
      "Confirmar Agendamento",
      `Você escolheu:\nBarbeiro: ${barbeiro}\nData: ${data}\nServiço: ${servico}\n\nDeseja confirmar o agendamento?`,
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Agendamento cancelado"),
          style: "cancel",
        },
        {
          text: "Confirmar",
          onPress: () => {
            console.log(
              "Barbeiro:",
              barbeiro,
              "Data:",
              data,
              "Serviço:",
              servico
            );
            Alert.alert(
              "Agendamento Confirmado",
              "O seu serviço foi agendado com sucesso!"
            );
            router.push("/");
          },
        },
      ]
    );
  };

  const handleDateConfirm = (date: any) => {
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
      <Text style={[styles.title, styles.bold]}>Agendar Serviço</Text>

      <Text style={styles.inputLabel}>Escolha o Barbeiro:</Text>
      <View style={styles.selectContainer}>
        {barbeiros.map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.selectOption,
              barbeiro === item && styles.selectedOption,
            ]}
            onPress={() => setBarbeiro(item)}
          >
            <Text
              style={[
                styles.selectText,
                barbeiro === item && styles.selectedText,
              ]}
            >
              {item}
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

      {/* Serviço */}
      <Text style={styles.inputLabel}>Escolha o Serviço:</Text>
      <View style={styles.selectContainer}>
        {servicos.map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.selectOption,
              servico === item && styles.selectedOption,
            ]}
            onPress={() => setServico(item)}
          >
            <Text
              style={[
                styles.selectText,
                servico === item && styles.selectedText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Button title="Agendar" onPress={agendar} color="#4F2E2E" />

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
});
