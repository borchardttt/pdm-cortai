import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

export default function ServicosAgendados() {
  const agendamentos = [
    {
      id: "1",
      barbeiro: "Carlos",
      data: "2024-12-01T10:30:00",
      servico: "Corte Simples",
      status: "Confirmado",
      preco: 30,
    },
    {
      id: "2",
      barbeiro: "Marcos",
      data: "2024-12-01T14:00:00",
      servico: "Barba e Corte",
      status: "Pendente",
      preco: 50,
    },
    {
      id: "3",
      barbeiro: "Ana",
      data: "2024-12-05T16:00:00",
      servico: "Alisamento",
      status: "Cancelado",
      preco: 70,
    },
  ];

  const formatarData = (dataISO: any) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const optionsHora = { hour: "2-digit", minute: "2-digit" };

    const data = new Date(dataISO);
    //@ts-ignore
    const dataFormatada = data.toLocaleDateString("pt-BR", options);
    //@ts-ignore
    const horaFormatada = data.toLocaleTimeString("pt-BR", optionsHora);

    return `${dataFormatada} às ${horaFormatada}`;
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.barbeiro}</Text>
        <Text style={styles.cardDescription}>
          Data: {formatarData(item.data)}
        </Text>
        <Text style={styles.cardDescription}>Serviço: {item.servico}</Text>
        <Text style={styles.cardDescription}>Preço: R${item.preco}</Text>
        <Text style={styles.cardDescription}>Status: {item.status}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={agendamentos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingTop: 10 }}
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
