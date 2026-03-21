import { describe, expect, it } from 'vitest';

import {
  DoubleGliderGunScene,
  centerInfiniteGrowthScene,
  createScene,
  weekenderCollision,
} from './Scenes';

describe('Scenes', () => {
  it('places shapes according to selected positions', () => {
    const scene = createScene(
      30,
      30,
      {
        leftTopCorner: [[0, 0]],
        center: [[0, 0]],
      },
      [0, 0, 0, 0],
    );

    expect(scene).toContainEqual([0, 0]);
    expect(scene).toContainEqual([15, 15]);
  });

  it('generates predefined scenes inside bounds', () => {
    const width = 80;
    const height = 60;

    [
      DoubleGliderGunScene(width, height),
      centerInfiniteGrowthScene(width, height),
      weekenderCollision(width, height),
    ].forEach((shape) => {
      expect(shape.length).toBeGreaterThan(0);
      expect(
        shape.every(([x, y]) => x >= 0 && y >= 0 && x < width && y < height),
      ).toBe(true);
    });
  });
});
