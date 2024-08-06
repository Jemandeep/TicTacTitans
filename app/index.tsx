
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import HomeScreen from '@/screens/HomeScreen';
import SettingsScreen from '@/screens/SettingsScreen';
import GameBoardScreen from '@/screens/GameBoardScreen';
import { lightTheme, darkTheme , ThemeProvider} from '@/ThemeContext';
const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<'Home' | 'Game' | 'Settings'>('Home');

  const handleNavigate = (screen: 'Home' | 'Game' | 'Settings') => {
    setCurrentScreen(screen);
  };

  return (
    <ThemeProvider>
      <View style={styles.container}>
        {currentScreen === 'Home' && <HomeScreen onNavigate={handleNavigate} />}
        {currentScreen === 'Game' && <GameBoardScreen onGoHome={() => handleNavigate('Home')} />}
        {currentScreen === 'Settings' && <SettingsScreen onGoHome={() => handleNavigate('Home')} />}
      </View>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;