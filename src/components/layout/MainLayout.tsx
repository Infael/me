import { useMeasure } from '@uidotdev/usehooks';
import { FC, MouseEvent, useMemo, useState } from 'react';

import {
  Canvas,
  Checkbox,
  GameOfLifeController,
  Menu,
  ModeSwitcher,
  Section,
  Sections,
} from '@components';
import { GameOfLife } from '@gameOfLife';
import { classNames } from '@utils';

import styles from './MainLayout.module.css';

export const MainLayout: FC = () => {
  const [ref, { width, height }] = useMeasure();

  const [textShowed, setTextShowed] = useState(true);
  const [activeSection, setActiveSection] = useState<Section>('aboutMe');

  const gameOfLife = useMemo<GameOfLife | null>(
    () =>
      width && height ? new GameOfLife(100, width / 10, height / 10) : null,
    [width, height],
  );

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
          onChange={(value) => {
            setTextShowed(value);
            gameOfLife?.toggleControllable();
          }}
          label={textShowed ? 'hide text' : 'show text'}
        />
      </div>
      <div
        className={classNames(styles.mainBorder, 'anaglyph-target')}
        ref={ref}
      >
        {gameOfLife !== null && (
          <div className={styles.canvasBackground}>
            <Canvas
              draw={gameOfLife.render}
              update={gameOfLife.update}
              clickController={(event: MouseEvent<HTMLCanvasElement>) => {
                const rect = event.currentTarget.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;
                gameOfLife.clickHandler(x, y);
              }}
              hoverController={(event: MouseEvent<HTMLCanvasElement>) => {
                const rect = event.currentTarget.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;
                gameOfLife.hoverHandler(x, y);
              }}
            />
          </div>
        )}
        {textShowed && (
          <div className={styles.contentBox}>
            <div className={styles.context}>
              <Sections activeSection={activeSection} />
            </div>
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
