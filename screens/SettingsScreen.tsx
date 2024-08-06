import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal } from 'react-native';
import GameBoard from '../components/GameBoard';
import { useTheme } from '@/ThemeContext';

const SettingsScreen: React.FC<{ onGoHome: () => void }> = ({ onGoHome }) => {
    const { theme, toggleTheme } = useTheme();
  
    return (
      <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
        <Text style={[styles.text, { color: theme.textColor }]}>Settings Page</Text>
        <TouchableOpacity style={[styles.button, { backgroundColor: theme.buttonColor }]} onPress={toggleTheme}>
          <Text style={[styles.buttonText, { color: theme.buttonTextColor }]}>Toggle Theme</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: theme.buttonColor }]} onPress={onGoHome}>
          <Text style={[styles.buttonText, { color: theme.buttonTextColor }]}>Go Home</Text>
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
    text: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
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
  
  export default SettingsScreen;