import React from 'react';
import { StyleSheet, View } from 'react-native';
import Cell from './Cell';

interface GameBoardProps {
  board: (null | 'X' | 'O')[];
  onCellPress: (index: number) => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ board, onCellPress }) => {
  return (
    <View style={styles.board}>
      {board.map((value, index) => (
        <Cell key={index} value={value} onPress={() => onCellPress(index)} />
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
  },
});

export default GameBoard;
