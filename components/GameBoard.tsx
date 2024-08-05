import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'; // Import the Text component

interface GameBoardProps {
  board: (null | 'X' | 'O')[];
  onCellPress: (index: number) => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ board, onCellPress }) => {
  return (
    <View style={styles.board}>
      {board.map((cell, index) => (
        <TouchableOpacity key={index} style={styles.cell} onPress={() => onCellPress(index)}>
          <Text style={styles.cellText}>{cell}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 300,
    height: 300,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  cell: {
    width: '33.33%',
    height: '33.33%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cellText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
});

export default GameBoard;