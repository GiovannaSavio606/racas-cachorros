import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, RefreshControl } from 'react-native';
import { fetchBreeds } from '../services/api';

export default function HomeScreen({ navigation }) {
  const [breeds, setBreeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      setError(null);
      const list = await fetchBreeds();
      setBreeds(list);
    } catch (err) {
      setError(err.message || 'Erro ao carregar dados.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadData();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0284c7" />
        <Text style={styles.feedbackText}>Carregando raças...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadData}>
          <Text style={styles.retryText}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={breeds}
        keyExtractor={(item) => item}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.breedTitle}>{item.toUpperCase()}</Text>
              <Text style={styles.subtitle}>Raça canina</Text>
            </View>
            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => navigation.navigate('Detalhes', { breed: item })}
            >
              <Text style={styles.detailsButtonText}>Ver detalhes</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc', padding: 12 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  feedbackText: { marginTop: 10, color: '#64748b', fontSize: 16 },
  errorText: { color: '#ef4444', fontSize: 16, textAlign: 'center', marginBottom: 12 },
  retryButton: { backgroundColor: '#0284c7', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 6 },
  retryText: { color: '#fff', fontWeight: 'bold' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },
  breedTitle: { fontSize: 16, fontWeight: 'bold', color: '#1e293b' },
  subtitle: { fontSize: 12, color: '#94a3b8' },
  detailsButton: { backgroundColor: '#0284c7', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 6 },
  detailsButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
});
