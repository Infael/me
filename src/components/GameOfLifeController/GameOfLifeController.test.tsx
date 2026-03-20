import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { GameOfLifeController } from './GameOfLifeController';

describe('GameOfLifeController', () => {
  it('calls callbacks when checkboxes are toggled', () => {
    const togglePauseGame = vi.fn();
    const resetGame = vi.fn();

    render(
      <GameOfLifeController
        togglePauseGame={togglePauseGame}
        resetGame={resetGame}
      />,
    );

    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);
    fireEvent.click(checkboxes[1]);

    expect(togglePauseGame).toHaveBeenCalledTimes(1);
    expect(resetGame).toHaveBeenCalledTimes(1);
  });
});
