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
  const [showRestartConfirm, setShowRestartConfirm] = useState<boolean>(false);

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
    setShowRestartConfirm(true);
  };

  const confirmRestart = () => {
    setBoard(Array(9).fill(null));
    setStatus('MOVING');
    setGameOver(false);
    setWinner(null);
    setCurrentPlayer('P1');
    setShowRestartConfirm(false);
  };

  const handleRematch = () => {
    confirmRestart();
  };

  const cancelRestart = () => {
    setShowRestartConfirm(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.playerText}>P1</Text>
        <View style={styles.vsContainer}>
          <Text style={styles.vsText}>X</Text>
          <Text style={styles.vsText}>VS</Text>
          <Text style={styles.vsText}>O</Text>
        </View>
        <Text style={styles.playerText}>P2</Text>
      </View>
      <Text style={styles.statusText}>
        {gameOver ? (winner === 'DRAW' ? "It's a Draw!" : `${winner} Wins!`) : `${currentPlayer === 'P1' ? 'Player 1' : 'Player 2'}'s Turn`}
      </Text>
      <GameBoard board={board} onCellPress={handleCellPress} />
      <View style={styles.footer}>
        <Text style={styles.scoreLabel}>P1</Text>
        <Text style={styles.scoreText}>{score.player1}</Text>
        <Text style={styles.scoreText}> - </Text>
        <Text style={styles.scoreText}>{score.player2}</Text>
        <Text style={styles.scoreLabel}>P2</Text>
      </View>
      <TouchableOpacity style={styles.goHomeButton} onPress={onGoHome}>
        <Text style={styles.goHomeButtonText}>GO HOME</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.restartButton} onPress={handleRestart}>
        <Text style={styles.restartButtonText}>RESTART</Text>
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
      <Modal
        transparent={true}
        animationType="slide"
        visible={showRestartConfirm}
        onRequestClose={cancelRestart}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text style={styles.modalText}>Are you sure you want to restart?</Text>
            <TouchableOpacity style={styles.modalButton} onPress={confirmRestart}>
              <Text style={styles.modalButtonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={cancelRestart}>
              <Text style={styles.modalButtonText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  vsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#4A90E2',
    borderRadius: 10,
  },
  playerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  vsText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginHorizontal: 5,
  },
  statusText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    marginVertical: 20,
  },
  scoreLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginHorizontal: 10,
  },
  scoreText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  restartButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  restartButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
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
