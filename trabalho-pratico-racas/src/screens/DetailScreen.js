import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchBreedImage } from '../services/api';

export default function DetailScreen({ route, navigation }) {
  const { breed } = route.params;
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  const checkFavorite = async () => {
    try {
      const stored = await AsyncStorage.getItem('@favoritos_racas');
      const list = stored ? JSON.parse(stored) : [];
      setIsFavorite(list.includes(breed));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    checkFavorite();
    const unsubscribe = navigation.addListener('focus', checkFavorite);
    return unsubscribe;
  }, [navigation, breed]);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetchBreedImage(breed)
      .then((url) => {
        if (isMounted) setImageUrl(url);
      })
      .catch(() => {})
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => { isMounted = false; };
  }, [breed]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{breed.toUpperCase()}</Text>
      <Text style={styles.subtitle}>Informações detalhadas</Text>

      {loading ? (
        <View style={styles.imagePlaceholder}>
          <ActivityIndicator size="large" color="#0284c7" />
        </View>
      ) : (
        <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
      )}

      <TouchableOpacity
        style={[styles.button, isFavorite ? styles.buttonRemove : styles.buttonAdd]}
        onPress={() => navigation.navigate('ModalFavorito', { breed, isFavorite })}
      >
        <Text style={styles.buttonText}>
          {isFavorite ? '★ Nos favoritos – gerenciar' : '☆ Adicionar aos favoritos'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.outlineButton}
        onPress={() => navigation.push('Detalhes', { breed: 'hound' })}
      >
        <Text style={styles.outlineButtonText}>🔄 Ver item relacionado (push)</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>⬅ Voltar para a lista</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc', padding: 20, alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#0f172a', marginTop: 10 },
  subtitle: { fontSize: 14, color: '#64748b', marginBottom: 16 },
  image: { width: 220, height: 220, borderRadius: 110, marginBottom: 24 },
  imagePlaceholder: { width: 220, height: 220, borderRadius: 110, backgroundColor: '#e2e8f0', justifyContent: 'center', alignItems: 'center', marginBottom: 24 },
  button: { width: '100%', padding: 14, borderRadius: 8, alignItems: 'center', marginBottom: 12 },
  buttonAdd: { backgroundColor: '#f59e0b' },
  buttonRemove: { backgroundColor: '#eab308' },
  buttonText: { color: '#000', fontWeight: 'bold', fontSize: 15 },
  outlineButton: { width: '100%', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#0284c7', alignItems: 'center', marginBottom: 12 },
  outlineButtonText: { color: '#0284c7', fontWeight: 'bold' },
  backButton: { width: '100%', padding: 12, borderRadius: 8, backgroundColor: '#e2e8f0', alignItems: 'center' },
  backButtonText: { color: '#334155', fontWeight: 'bold' },
});
