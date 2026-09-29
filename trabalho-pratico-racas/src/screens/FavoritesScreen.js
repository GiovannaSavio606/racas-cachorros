import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FavoritesScreen({ navigation }) {
  const [favorites, setFavorites] = useState([]);

  const loadFavorites = async () => {
    try {
      const stored = await AsyncStorage.getItem('@favoritos_racas');
      setFavorites(stored ? JSON.parse(stored) : []);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadFavorites);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.emptyText}>Nenhuma raça favoritada ainda.</Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.title}>{item.toUpperCase()}</Text>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                  navigation.navigate('InicioStack', {
                    screen: 'Detalhes',
                    params: { breed: item },
                  });
                }}
              >
                <Text style={styles.btnText}>Ver detalhes</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc', padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: '#94a3b8', fontSize: 16 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },
  title: { fontSize: 16, fontWeight: 'bold', color: '#1e293b' },
  btn: { backgroundColor: '#0284c7', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 6 },
  btnText: { color: '#fff', fontWeight: 'bold' },
});
