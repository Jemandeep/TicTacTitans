import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
interface CellProps {
    value: 'X' | 'O' | null;
    onPress: () => void;
  }
  
  const Cell: React.FC<CellProps> = ({ value, onPress }) => {
    return (
      <TouchableOpacity style={styles.cell} onPress={onPress}>
        <Text style={styles.cellText}>{value}</Text>
      </TouchableOpacity>
    );
  };
  
  const styles = StyleSheet.create({
    cell: {
      width: 100,
      height: 100,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#000000',
    },
    cellText: {
      fontSize: 32,
      fontWeight: 'bold',
    },
  });
  
  export default Cell;