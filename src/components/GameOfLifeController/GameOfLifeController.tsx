import { FC, useState } from "react";
import { Checkbox } from "../Checkbox/Checkbox";

import styles from "./GameOfLifeController.module.css";

interface GameOfLifeControllerProps {
  togglePauseGame?: () => void;
  resetGame?: () => void;
}

export const GameOfLifeController: FC<GameOfLifeControllerProps> = ({
  togglePauseGame,
  resetGame,
}) => {
  const [paused, setPaused] = useState(false);

  return (
    <div className={styles.controller}>
      <Checkbox
        checked={paused}
        label="pause background"
        onChange={() => {
          if (!togglePauseGame) return;
          setPaused((prev) => !prev);
          togglePauseGame();
        }}
      />
      <Checkbox
        checked={true}
        label="reset background"
        onChange={() => {
          if (!resetGame) return;
          resetGame();
        }}
      />
    </div>
  );
};

