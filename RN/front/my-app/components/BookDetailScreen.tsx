// src/screens/BookDetailScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import api from './api';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Definindo os tipos do Stack Navigator
type RootStackParamList = {
  BookDetail: { id: number };  // Adapte isso conforme sua navegação
};

// Definindo o tipo da propriedade de rota
type BookDetailScreenRouteProp = RouteProp<RootStackParamList, 'BookDetail'>;

// Definindo o tipo das props do componente
interface BookDetailScreenProps {
  route: BookDetailScreenRouteProp;
}

// Definindo o tipo do objeto `book`
interface Book {
  id: number;
  name: string;
  author: string;
  year_release: number;
  book_img?: string;  // `book_img` é opcional
}

const BookDetailScreen: React.FC<BookDetailScreenProps> = ({ route }) => {
  const { id } = route.params;
  
  // Definindo o estado com o tipo `Book | null`
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await api.get(`/books/${id}`);
        setBook(response.data);
      } catch (error) {
        console.log('Erro ao carregar detalhes do livro', error);
      }
    };

    fetchBook();
  }, [id]);

  if (!book) {
    return <Text>Carregando...</Text>;
  }

  return (
    <View>
      <Text>{book.name}</Text>
      <Text>{book.author}</Text>
      <Text>{book.year_release}</Text>
      {book.book_img && (
        <Image
          source={{ uri: book.book_img }}
          style={{ width: 100, height: 150 }}
        />
      )}
    </View>
  );
};

export default BookDetailScreen;
