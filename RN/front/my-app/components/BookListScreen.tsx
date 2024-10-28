// src/screens/BookListScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import api from './api';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

// Definindo o tipo do Stack Navigator
type RootStackParamList = {
  BookList: undefined;
  BookDetail: { id: number };
};

// Definindo o tipo de `navigation`
type BookListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'BookList'>;

// Definindo o tipo das props do componente
interface BookListScreenProps {
  navigation: BookListScreenNavigationProp;
}

// Definindo o tipo do objeto `Book`
interface Book {
  id: number;
  name: string;
  author: string;
  year_release: number;
  book_img?: string;
}

const BookListScreen: React.FC<BookListScreenProps> = ({ navigation }) => {
  // Estado tipado como um array de `Book`
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get('/returnBooks');
        setBooks(response.data);
      } catch (error) {
        console.log('Erro ao carregar livros', error);
      }
    };

    fetchBooks();
  }, []);

  const renderItem = ({ item }: { item: Book }) => (
    <TouchableOpacity onPress={() => navigation.navigate('BookDetail', { id: item.id })}>
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        data={books}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default BookListScreen;
