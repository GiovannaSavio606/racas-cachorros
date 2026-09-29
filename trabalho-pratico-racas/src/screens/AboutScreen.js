import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🐕 Raças de Cachorro</Text>
      <Text style={styles.subtext}>API utilizada: Dog CEO API (https://dog.ceo/dog-api/)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: '#f8fafc' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12, color: '#0f172a' },
  text: { fontSize: 15, textAlign: 'center', color: '#475569', marginBottom: 8 },
  subtext: { fontSize: 13, color: '#94a3b8', textAlign: 'center' },
});
