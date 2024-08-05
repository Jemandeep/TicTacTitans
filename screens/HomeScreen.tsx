import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const HomeScreen: React.FC<{ onStartGame: () => void }> = ({ onStartGame }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>TIC TAC TITAN</Text>
      <TouchableOpacity style={styles.button} onPress={onStartGame}>
        <Text style={styles.buttonText}>SMASH IT</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => console.log('SETTINGS pressed')}>
        <Text style={styles.buttonText}>SETTINGS</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0', // Light gray background color
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: 5,
  },
  button: {
    backgroundColor: '#4A90E2',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;
