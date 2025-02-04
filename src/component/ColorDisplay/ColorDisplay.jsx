import styles from './ColorDisplay.module.css';

const ColorDisplay = ({ color }) => {
  return (
    <div
      data-testid="colorBox"
      className={styles.wrp}
      style={{ backgroundColor: color }}
    />
  );
};

export default ColorDisplay;