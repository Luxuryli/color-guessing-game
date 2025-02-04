import style from './ColorOptions.module.css';

const ColorOptions = ({ options, handleGuess }) => {
  return (
    <div className={style.wrpp}>
      {options.map((color, index) => (
        <button
          key={index}
          data-testid="colorOption"
          className={style.wrps}
          style={{ backgroundColor: color }}
          onClick={() => handleGuess(color)}
        />
      ))}
    </div>
  );
};

export default ColorOptions;