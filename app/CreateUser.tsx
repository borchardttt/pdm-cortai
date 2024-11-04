import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { createUser } from '../services/apiService';

const CreateUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneContact, setPhoneContact] = useState('');
  const [type, setType] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateUser = async () => {
    if (!name || !email || !phoneContact || !type || !password) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return;
    }

    try {
      const newUser = await createUser(name, email, phoneContact, type, password);
      Alert.alert('Usuário criado', `ID: ${newUser.id}, Nome: ${newUser.name}`);
      setName('');
      setEmail('');
      setPhoneContact('');
      setType('');
      setPassword('');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível criar o usuário. Tente novamente.');
    }
  };

  return (
    <View style={{backgroundColor: '#E6D9C0', height: '100%'}}>
      <TextInput
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, borderRadius: 10, margin: 10, padding: 8, color: 'black' }}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={{ borderWidth: 1,borderRadius: 10, margin: 10, padding: 8, color: 'black' }}
      />
      <TextInput
        placeholder="Telefone"
        value={phoneContact}
        onChangeText={setPhoneContact}
        keyboardType="phone-pad"
        style={{ borderWidth: 1,borderRadius: 10, margin: 10, padding: 8, color: 'black' }}
      />
      <TextInput
        placeholder="Tipo (user/admin)"
        value={type}
        onChangeText={setType}
        style={{ borderWidth: 1, borderRadius: 10,margin: 10, padding: 8, color: 'black' }}
      />
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, borderRadius: 10,margin: 10, padding: 8, color: 'black' }}
      />
      <Button title="Criar Usuário" onPress={handleCreateUser} />
    </View>
  );
};

export default CreateUser;
