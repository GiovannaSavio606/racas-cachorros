import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import ModalFavoriteScreen from '../screens/ModalFavoriteScreen';

const Stack = createNativeStackNavigator();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Lista">
      <Stack.Screen name="Lista" component={HomeScreen} options={{ title: 'Início' }} />
      <Stack.Screen name="Detalhes" component={DetailScreen} options={{ title: 'Detalhes da Raça' }} />
      <Stack.Screen
        name="ModalFavorito"
        component={ModalFavoriteScreen}
        options={{
          presentation: 'transparentModal',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
