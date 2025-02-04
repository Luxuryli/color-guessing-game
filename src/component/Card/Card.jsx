import React, { useState, useEffect } from 'react';
import stylee from './Card.module.css';
import ColorDisplay from '../ColorDisplay/ColorDisplay';
import ColorOptions from '../ColorOptions/ColorOptions';
import GameStatus from '../GameStatus/GameStatus';

const generateBaseColor = () => {
  const random = () => Math.floor(Math.random() * 256);
  return { r: random(), g: random(), b: random() };
};

const adjustShade = (color, factor) => {
  return `rgb(
    ${Math.max(0, Math.min(255, color.r + factor))}, 
    ${Math.max(0, Math.min(255, color.g + factor))}, 
    ${Math.max(0, Math.min(255, color.b + factor))}
  )`;
};

const generateOptions = (baseColors) => {
  const options = new Set();

  baseColors.forEach(color => options.add(adjustShade(color, 0)));

  while (options.size < 6) {
    const randomColor = baseColors[Math.floor(Math.random() * baseColors.length)];
    const randomFactor = Math.floor(Math.random() * 80) - 40;
    options.add(adjustShade(randomColor, randomFactor));
  }

  return Array.from(options).sort(() => Math.random() - 0.5);
};

const Card = () => {
  const [baseColors, setBaseColors] = useState([generateBaseColor(), generateBaseColor(), generateBaseColor()]);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);
  const [targetColor, setTargetColor] = useState(adjustShade(baseColors[0], 0));

  useEffect(() => {
    setOptions(generateOptions(baseColors));
    setTargetColor(adjustShade(baseColors[Math.floor(Math.random() * baseColors.length)], 0));
  }, [baseColors]);

  const handleGuess = (color) => {
    if (color === targetColor) {
      setScore((prevScore) => prevScore + 1);
      setStatusMessage('Correct! Well done');
      setTimeout(() => {
        const newBaseColors = [generateBaseColor(), generateBaseColor(), generateBaseColor()];
        setBaseColors(newBaseColors);
        setStatusMessage('');
      }, 1000);
    } else {
      setStatusMessage('Wrong! Game Over');
      setIsGameOver(true);
      setTimeout(() => {
        resetGame();
      }, 3000);
    }
  };

  const resetGame = () => {
    setScore(0);
    setBaseColors([generateBaseColor(), generateBaseColor(), generateBaseColor()]);
    setStatusMessage('');
    setIsGameOver(false);
  };

  const endGame = () => {
    setIsGameOver(true);
    setTimeout(() => {
      resetGame();
    }, 3000);
  };

  return (
    <div className={stylee.appcontainer}>
      <div className={stylee.top}>
        <h1 className={stylee.apptitle}>Color Guessing Game 🎨</h1>
        <p data-testid="score" className={stylee.score}>Score: {score}</p>
      </div>

      <ColorDisplay color={targetColor} />
      <GameStatus statusMessage={statusMessage} />
      <ColorOptions options={options} handleGuess={handleGuess} />

      <div className={stylee.buttonContainer}>
        <button data-testid="newGameButton" className={stylee.newgamebutton} onClick={resetGame}>
          New Game
        </button>
        <button data-testid="endGameButton" className={stylee.endgamebutton} onClick={endGame}>
          End Game
        </button>
      </div>

      {isGameOver && (
        <div className={stylee.modalOverlay}>
          <div className={stylee.modalContent}>
            <h2>Game Over 🎉</h2>
            <p>Your Final Score: <strong>{score}</strong></p>
            <p>Resetting in 3 seconds...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;