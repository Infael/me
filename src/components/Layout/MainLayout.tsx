import { FC, useMemo, useState } from "react";
import styles from "./MainLayout.module.css";
import { GameOfLife } from "../../gameOfLife";
import { useMeasure } from "@uidotdev/usehooks";
import classNames from "classnames";
import {
  AboutBackground,
  AboutMe,
  Canvas,
  Checkbox,
  Contacts,
  GameOfLifeController,
  Menu,
  ModeSwitcher,
  MyProjects,
} from "..";

export type Section = "aboutMe" | "myProjects" | "aboutBackground" | "contacts";

export const MainLayout: FC = () => {
  const [ref, { width, height }] = useMeasure();

  const [textShowed, setTextShowed] = useState(true);
  const [activeSection, setActiveSection] = useState<Section>("aboutMe");

  const gameOfLife = useMemo<GameOfLife | null>(
    () =>
      width && height ? new GameOfLife(100, width / 10, height / 10) : null,
    [width, height]
  );

  const getActiveSection = () => {
    switch (activeSection) {
      case "aboutMe":
        return <AboutMe />;
      case "contacts":
        return <Contacts />;
      case "myProjects":
        return <MyProjects />;
      case "aboutBackground":
        return <AboutBackground />;
    }
  };

  return (
    <div className={styles.page}>
      <GameOfLifeController
        togglePauseGame={gameOfLife?.togglePauseGame}
        resetGame={gameOfLife?.resetGame}
      />
      <ModeSwitcher />
      <div className={styles.textController}>
        <Checkbox
          checked={textShowed}
          onChange={setTextShowed}
          label={textShowed ? "hide text" : "show text"}
        />
      </div>
      <div className={styles.mainBorder} ref={ref}>
        {gameOfLife !== null && (
          <div className={styles.canvasBackground}>
            <Canvas draw={gameOfLife.render} update={gameOfLife.update} />
          </div>
        )}
        {textShowed && (
          <div className={styles.contentBox}>
            <div className={styles.context}>{getActiveSection()}</div>
            <div className={classNames(styles.menu, styles.context)}>
              <Menu
                activeSection={activeSection}
                setActiveSection={setActiveSection}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

