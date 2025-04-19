import { useState } from 'react';
import StartScreen from './components/StartScreen';
import PuzzleScreen from './components/PuzzleScreen';
import ResultScreen from './components/ResultScreen';
import WinScreen from './components/WinScreen';
import DragDropPuzzle from './components/DragDropPuzzle';
import puzzles from './data/puzzles';

function App() {
  const [screen, setScreen] = useState('start');
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleStart = () => {
    setCurrentPuzzle(0);
    setScreen('puzzle');
  };

  const handleAnswer = (correct) => {
    setIsCorrect(correct);
    setScreen('result');
  };

  const handleNext = () => {
    const nextPuzzle = currentPuzzle + 1;

    if (nextPuzzle < puzzles.length) {
      setCurrentPuzzle(nextPuzzle);
      setScreen('puzzle');
    } else if (nextPuzzle === puzzles.length) {
      setScreen('drag'); // Show drag-and-drop puzzle
    } else {
      setScreen('win'); // Final win screen
    }
  };

  const handleRestart = () => {
    setCurrentPuzzle(0);
    setScreen('start');
  };

  return (
    <div className="App">
      {screen === 'start' && <StartScreen onStart={handleStart} />}
      {screen === 'puzzle' && (
        <PuzzleScreen puzzle={puzzles[currentPuzzle]} onAnswer={handleAnswer} />
      )}
      {screen === 'result' && (
        <ResultScreen isCorrect={isCorrect} onNext={handleNext} />
      )}
      {screen === 'drag' && (
        <DragDropPuzzle onFinish={handleAnswer} />
      )}
      {screen === 'win' && <WinScreen onRestart={handleRestart} />}
    </div>
  );
}

export default App;
