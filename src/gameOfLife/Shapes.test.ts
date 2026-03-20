import { describe, expect, it } from 'vitest';
import {
  basicBlock,
  flipShapeDiaognally,
  flipShapeHorizontally,
  flipShapeVertically,
  normalizeShape,
  rotateShape90,
  rotateShape270,
} from './Shapes';

const sortShape = (shape: Array<[number, number]>) =>
  [...shape].sort(([x1, y1], [x2, y2]) => x1 - x2 || y1 - y2);

describe('Shapes utilities', () => {
  it('normalizes shape coordinates to start at zero', () => {
    const shape: Array<[number, number]> = [
      [2, 3],
      [4, 5],
    ];

    expect(normalizeShape(shape)).toEqual([
      [0, 0],
      [2, 2],
    ]);
  });

  it('keeps a symmetric block unchanged on transforms', () => {
    const expected = sortShape(basicBlock);

    expect(sortShape(flipShapeHorizontally(basicBlock))).toEqual(expected);
    expect(sortShape(flipShapeVertically(basicBlock))).toEqual(expected);
    expect(sortShape(flipShapeDiaognally(basicBlock))).toEqual(expected);
    expect(sortShape(rotateShape90(basicBlock))).toEqual(expected);
    expect(sortShape(rotateShape270(basicBlock))).toEqual(expected);
  });
});
