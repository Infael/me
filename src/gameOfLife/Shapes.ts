export const basicGlider: Array<[number, number]> = [
  [0, 0],
  [1, 0],
  [2, 0],
  [0, 1],
  [1, 2],
];

export const basicBlock: Array<[number, number]> = [
  [0, 0],
  [1, 0],
  [0, 1],
  [1, 1],
];

export const basicBeehive: Array<[number, number]> = [
  [1, 0],
  [2, 0],
  [0, 1],
  [3, 1],
  [1, 2],
  [2, 2],
];

export const gliderGun: Array<[number, number]> = [
  [1, 5],
  [1, 6],
  [2, 5],
  [2, 6],
  [11, 5],
  [11, 6],
  [11, 7],
  [12, 4],
  [12, 8],
  [13, 3],
  [13, 9],
  [14, 3],
  [14, 9],
  [15, 6],
  [16, 4],
  [16, 8],
  [17, 5],
  [17, 6],
  [17, 7],
  [18, 6],
  [21, 3],
  [21, 4],
  [21, 5],
  [22, 3],
  [22, 4],
  [22, 5],
  [23, 2],
  [23, 6],
  [25, 1],
  [25, 2],
  [25, 6],
  [25, 7],
  [35, 3],
  [35, 4],
  [36, 3],
  [36, 4],
];

export const copperhead: Array<[number, number]> = [
  [5, 0],
  [7, 0],
  [8, 0],
  [4, 1],
  [11, 1],
  [3, 2],
  [4, 2],
  [8, 2],
  [11, 2],
  [0, 3],
  [1, 3],
  [3, 3],
  [9, 3],
  [10, 3],
  [0, 4],
  [1, 4],
  [3, 4],
  [9, 4],
  [10, 4],
  [3, 5],
  [4, 5],
  [8, 5],
  [11, 5],
  [4, 6],
  [11, 6],
  [5, 7],
  [7, 7],
  [8, 7],
];

export const paulCallehans10cellInfiniteGrowth: Array<[number, number]> = [
  [6, 0],
  [4, 1],
  [6, 1],
  [7, 1],
  [4, 2],
  [6, 2],
  [4, 3],
  [2, 4],
  [0, 5],
  [2, 5],
];

export const weekender: Array<[number, number]> = [
  [1, 0],
  [14, 0],
  [1, 1],
  [14, 1],
  [0, 2],
  [2, 2],
  [13, 2],
  [15, 2],
  [1, 3],
  [14, 3],
  [1, 4],
  [14, 4],
  [2, 5],
  [6, 5],
  [7, 5],
  [8, 5],
  [9, 5],
  [13, 5],
  [6, 6],
  [7, 6],
  [8, 6],
  [9, 6],
  [2, 7],
  [3, 7],
  [4, 7],
  [5, 7],
  [10, 7],
  [11, 7],
  [12, 7],
  [13, 7],
  [4, 9],
  [11, 9],
  [5, 10],
  [6, 10],
  [9, 10],
  [10, 10],
];

export const achimsp16Oscillator: Array<[number, number]> = [
  [7, 0],
  [8, 0],
  [7, 1],
  [9, 1],
  [2, 2],
  [7, 2],
  [9, 2],
  [10, 2],
  [1, 3],
  [2, 3],
  [8, 3],
  [0, 4],
  [3, 4],
  [0, 5],
  [1, 5],
  [2, 5],

  [12, 7],
  [11, 7],
  [10, 7],
  [12, 8],
  [9, 8],
  [11, 9],
  [10, 9],
  [4, 9],
  [2, 10],
  [3, 10],
  [5, 10],
  [10, 10],
  [3, 11],
  [5, 11],
  [4, 12],
  [5, 12],
];

export const flipShapeHorizontally = (
  shape: Array<[number, number]>
): Array<[number, number]> => {
  return normalizeShape(shape.map(([x, y]) => [x, -y]));
};

export const flipShapeVertically = (
  shape: Array<[number, number]>
): Array<[number, number]> => {
  return normalizeShape(shape.map(([x, y]) => [-x, y]));
};

export const flipShapeDiaognally = (
  shape: Array<[number, number]>
): Array<[number, number]> => {
  return normalizeShape(shape.map(([x, y]) => [y, x]));
};

export const rotateShape90 = (
  shape: Array<[number, number]>
): Array<[number, number]> => {
  return normalizeShape(shape.map(([x, y]) => [y, -x]));
};

export const rotateShape270 = (
  shape: Array<[number, number]>
): Array<[number, number]> => {
  return normalizeShape(shape.map(([x, y]) => [-y, x]));
};

// normalizeShape transforms a shape to not have negative coordinates
export const normalizeShape = (
  shape: Array<[number, number]>
): Array<[number, number]> => {
  const minX = Math.min(...shape.map(([x]) => x));
  const minY = Math.min(...shape.map(([, y]) => y));

  return shape.map(([x, y]) => [x - minX, y - minY]);
};

