import { describe, expect, it, vi } from 'vitest';

import { GameOfLife } from './GameOfLife';

describe('GameOfLife', () => {
  it('updates and renders without throwing', () => {
    const game = new GameOfLife(0, 8, 8);
    const ctx = {
      fillStyle: '',
      fillRect: vi.fn(),
    } as unknown as CanvasRenderingContext2D;

    expect(() => game.update(16)).not.toThrow();
    expect(() => game.render(ctx, 0)).not.toThrow();
  });

  it('toggles pause and control modes safely', () => {
    const game = new GameOfLife(0, 6, 6);

    game.togglePauseGame();
    expect(() => game.update(16)).not.toThrow();

    game.toggleControllable();
    expect(() => game.clickHandler(5, 5)).not.toThrow();
    expect(() => game.hoverHandler(5, 5)).not.toThrow();

    game.resetGame();
    expect(() => game.update(16)).not.toThrow();
  });
});
