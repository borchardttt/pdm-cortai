import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from 'expo-router';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.cardWelcome}>
        <Image source={require('@/assets/icons/logo.png')} style={styles.logo} />
        <Text style={styles.title}>
          E aí, <Text style={styles.bold}>Usuário</Text>. O que manda hoje?
        </Text>
      </View>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('CreateUser')}>
        <Image source={require('@/assets/icons/calendar.png')} style={styles.icon} />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Agendar Serviço</Text>
          <Text style={styles.cardDescription}>
            Visualize as datas disponíveis para seu barbeiro favorito, escolha seu serviço e agende, fácil fácil né?
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card}>
        <Image source={require('@/assets/icons/schedule.png')} style={styles.icon} />
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
    fontFamily: 'Montserrat_400Regular',
    flex: 1,
    padding: 20,
    backgroundColor: '#E6D9C0',
  },
  logo: {
    height: 100,
    width: 100,
  },
  title: {
    fontSize: 15,
    color: '#4F2E2E',
  },
  bold: {
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F0E7D8',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  cardWelcome: {
    marginTop: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0E7D8',
    padding: 10,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#000',
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
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
    textAlign: 'justify',
    flexWrap: 'wrap',
    maxWidth: '95%',
  },
  icon: {
    height: 80,
    width: 80,
    marginRight: 15,
  },
});
