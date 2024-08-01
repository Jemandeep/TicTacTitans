import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal } from 'react-native';
import GameBoard from '../components/GameBoard';

const GameBoardScreen: React.FC<{ onGoHome: () => void }> = ({ onGoHome }) => {
    const [score, setScore] = useState({ player1: 0, player2: 0 });
    const [currentPlayer, setCurrentPlayer] = useState<'P1' | 'P2'>('P1');
    const [status, setStatus] = useState<'MOVING' | 'WINNING'>('MOVING');
    const [board, setBoard] = useState<(null | 'X' | 'O')[]>(Array(9).fill(null));
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [winner, setWinner] = useState<'P1' | 'P2' | 'DRAW' | null>(null);
  
    const handleCellPress = (index: number) => {
      if (board[index] !== null || status === 'WINNING') return;
  
      const newBoard = [...board];
      newBoard[index] = currentPlayer === 'P1' ? 'X' : 'O';
      setBoard(newBoard);
  
      const winner = calculateWinner(newBoard);
      if (winner) {
        setStatus('WINNING');
        setGameOver(true);
        setWinner(currentPlayer);
        if (winner === 'X') {
          setScore((prevScore) => ({ ...prevScore, player1: prevScore.player1 + 1 }));
          setCurrentPlayer('P1');
        } else {
          setScore((prevScore) => ({ ...prevScore, player2: prevScore.player2 + 1 }));
          setCurrentPlayer('P2');
        }
      } else if (newBoard.every((cell) => cell !== null)) {
        setStatus('WINNING');
        setGameOver(true);
        setWinner('DRAW');
      } else {
        setCurrentPlayer((prevPlayer) => (prevPlayer === 'P1' ? 'P2' : 'P1'));
      }
    };
  
    const handleRestart = () => {
      setBoard(Array(9).fill(null));
      setStatus('MOVING');
      setGameOver(false);
      setWinner(null);
    };
  
    const handleRematch = () => {
      handleRestart();
    };
  
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.playerText}>X</Text>
          <Text style={styles.vsText}>VS</Text>
          <Text style={styles.playerText}>O</Text>
        </View>
        <View style={styles.statusContainer}>
          <TouchableOpacity style={styles.statusButton} onPress={handleRestart}>
            <Text style={styles.statusButtonText}>{status}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.statusButton}>
            <Text style={styles.statusButtonText}>{currentPlayer}</Text>
          </TouchableOpacity>
        </View>
        <GameBoard board={board} onCellPress={handleCellPress} />
        <View style={styles.statusContainer}>
          <TouchableOpacity style={styles.statusButton}>
            <Text style={styles.statusButtonText}>WINNING</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.statusButton}>
            <Text style={styles.statusButtonText}>{currentPlayer}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <Text style={styles.scoreText}>{score.player1} - {score.player2}</Text>
        </View>
        <TouchableOpacity style={styles.goHomeButton} onPress={onGoHome}>
          <Text style={styles.goHomeButtonText}>GO HOME</Text>
        </TouchableOpacity>
        {gameOver && (
          <Modal
            transparent={true}
            animationType="slide"
            visible={gameOver}
            onRequestClose={() => setGameOver(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modal}>
                <Text style={styles.modalText}>
                  {winner === 'DRAW' ? "It's a Draw!" : `${winner} Wins!`}
                </Text>
                <TouchableOpacity style={styles.modalButton} onPress={handleRematch}>
                  <Text style={styles.modalButtonText}>Rematch</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={onGoHome}>
                  <Text style={styles.modalButtonText}>Go Home</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
      </View>
    );
  };
  
  const calculateWinner = (board: (null | 'X' | 'O')[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#e0e0e0',
      padding: 20,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      paddingVertical: 20,
    },
    playerText: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    vsText: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    statusContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      width: '100%',
      marginBottom: 20,
    },
    statusButton: {
      backgroundColor: '#4A90E2',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
      margin: 10,
    },
    statusButtonText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      marginVertical: 20,
    },
    scoreText: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#4A90E2',
    },
    goHomeButton: {
      backgroundColor: '#4A90E2',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
    },
    goHomeButtonText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modal: {
      width: 300,
      backgroundColor: '#ffffff',
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
    },
    modalText: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    modalButton: {
      backgroundColor: '#4A90E2',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
      marginVertical: 10,
    },
    modalButtonText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  
  export default GameBoardScreen;