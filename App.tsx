// App.tsx
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import GameBoardScreen from './screens/GameBoardScreen';

const App: React.FC = () => {
    const [isGameBoardVisible, setIsGameBoardVisible] = useState(false);
  
    const handleStartGame = () => {
      setIsGameBoardVisible(true);
    };
  
    const handleGoHome = () => {
      setIsGameBoardVisible(false);
    };
  
    return (
      <View style={styles.container}>
        {isGameBoardVisible ? (
          <GameBoardScreen onGoHome={handleGoHome} />
        ) : (
          <HomeScreen onStartGame={handleStartGame} />
        )}
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
  });
  
  export default App;