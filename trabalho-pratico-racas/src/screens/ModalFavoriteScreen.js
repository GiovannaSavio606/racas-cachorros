import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ModalFavoriteScreen({ route, navigation }) {
  const { breed, isFavorite } = route.params;

  const handleToggleFavorite = async () => {
    try {
      const stored = await AsyncStorage.getItem('@favoritos_racas');
      let list = stored ? JSON.parse(stored) : [];

      if (isFavorite) {
        list = list.filter((item) => item !== breed);
      } else {
        if (!list.includes(breed)) list.push(breed);
      }

      await AsyncStorage.setItem('@favoritos_racas', JSON.stringify(list));
      navigation.goBack();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.dialog}>
        <Text style={styles.modalTitle}>{breed.toUpperCase()}</Text>
        <Text style={styles.description}>
          {isFavorite
            ? 'Este item está nos seus favoritos. Deseja removê-lo?'
            : 'Deseja adicionar esta raça aos seus favoritos?'}
        </Text>

        <TouchableOpacity
          style={[styles.actionBtn, isFavorite ? styles.btnDanger : styles.btnSuccess]}
          onPress={handleToggleFavorite}
        >
          <Text style={styles.actionBtnText}>
            {isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.cancelBtnText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.4)' },
  dialog: { backgroundColor: '#fff', padding: 24, borderTopLeftRadius: 16, borderTopRightRadius: 16, alignItems: 'center' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#1e293b' },
  description: { fontSize: 14, color: '#64748b', marginVertical: 14, textAlign: 'center' },
  actionBtn: { width: '100%', padding: 14, borderRadius: 8, alignItems: 'center', marginBottom: 10 },
  btnSuccess: { backgroundColor: '#0284c7' },
  btnDanger: { backgroundColor: '#ef4444' },
  actionBtnText: { color: '#fff', fontWeight: 'bold' },
  cancelBtn: { width: '100%', padding: 12, alignItems: 'center' },
  cancelBtnText: { color: '#64748b' },
});
