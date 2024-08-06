// app/settings.tsx
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../ThemeContext';

const Settings: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Text style={[styles.title, { color: theme.textColor }]}>Settings Page</Text>
      <TouchableOpacity style={[styles.button, { backgroundColor: theme.buttonColor }]} onPress={toggleTheme}>
        <Text style={[styles.buttonText, { color: theme.buttonTextColor }]}>Toggle Theme</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: theme.buttonColor }]} onPress={() => navigation.goBack()}>
        <Text style={[styles.buttonText, { color: theme.buttonTextColor }]}>Go Back</Text>
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

export default Settings;
