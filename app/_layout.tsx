// app/_layout.tsx
import React from 'react';
import { Slot, Tabs } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function Layout() {
  return (
    <View style={styles.container}>
      <Slot />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
