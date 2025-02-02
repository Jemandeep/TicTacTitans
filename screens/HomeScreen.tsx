// screens/HomeScreen.tsx
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../ThemeContext';

const HomeScreen: React.FC<{ onNavigate: (screen: 'Home' | 'Settings' | 'Game') => void }> = ({ onNavigate }) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Text style={[styles.title, { color: theme.textColor }]}>TIC TAC TITAN</Text>
      <TouchableOpacity style={[styles.button, { backgroundColor: theme.buttonColor }]} onPress={() => onNavigate('Game')}>
        <Text style={[styles.buttonText, { color: theme.buttonTextColor }]}>SMASH IT</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: theme.buttonColor }]} onPress={() => onNavigate('Settings')}>
        <Text style={[styles.buttonText, { color: theme.buttonTextColor }]}>SETTINGS</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: 5,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;