// src/screens/LoginScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';

// Definindo o tipo do Stack Navigator
type RootStackParamList = {
  Login: undefined;
  BookList: undefined;
};

// Definindo o tipo de `navigation`
type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

// Definindo o tipo das props do componente
interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
}

// Definindo o tipo da resposta da API
interface LoginResponse {
  token: string;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    try {
      const response = await api.post<LoginResponse>('/login', { email, password });
      const { token } = response.data;
      await AsyncStorage.setItem('token', token);
      Alert.alert('Login realizado com sucesso');
      navigation.navigate('BookList'); // Navega para a lista de livros
    } catch (error: any) {
      Alert.alert('Erro ao fazer login', error.response?.data?.error || 'Erro desconhecido');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
