import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import HomeStackNavigator from './HomeStackNavigator';
import FavoritesScreen from '../screens/FavoritesScreen';
import AboutScreen from '../screens/AboutScreen';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#0284c7',
        tabBarInactiveTintColor: '#94a3b8',
      }}
    >
      <Tab.Screen
        name="InicioStack"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: 'Início',
          tabBarIcon: ({ color }) => <Text style={{ color }}>🏠</Text>,
        }}
      />
      <Tab.Screen
        name="Favoritos"
        component={FavoritesScreen}
        options={{
          headerShown: true,
          title: 'Favoritos',
          tabBarLabel: 'Favoritos',
          tabBarIcon: ({ color }) => <Text style={{ color }}>⭐</Text>,
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Drawer.Navigator screenOptions={{ headerTintColor: '#0284c7' }}>
      <Drawer.Screen
        name="AppTabs"
        component={TabNavigator}
        options={{ title: 'Início' }}
      />
      <Drawer.Screen
        name="Sobre"
        component={AboutScreen}
        options={{ title: 'Sobre o App' }}
      />
    </Drawer.Navigator>
  );
}
