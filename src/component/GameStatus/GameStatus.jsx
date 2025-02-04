import design from './GameStatus.module.css';

const GameStatus = ({ statusMessage }) => {
  return (
    <div className={design.statusContainer}>
      <p className={design.instruction} data-testid="gameInstructions">Guess the correct color by selecting the color that matches below </p>
      {statusMessage && (
        <p className={statusMessage.includes('Correct') ? design.correct : design.wrong} data-testid="gameStatus">
          {statusMessage}
        </p>
      )}
    </div>
  );
};

export default GameStatus;