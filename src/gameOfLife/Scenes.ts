import {
  achimsp16Oscillator,
  copperhead,
  flipShapeHorizontally,
  flipShapeVertically,
  gliderGun,
  paulCallehans10cellInfiniteGrowth,
  rotateShape270,
  rotateShape90,
  weekender,
} from "./Shapes";

interface createSceneOptions {
  leftTopCorner?: Array<[number, number]>;
  leftBottomCorner?: Array<[number, number]>;
  rightTopCorner?: Array<[number, number]>;
  rightBottomCorner?: Array<[number, number]>;
  center?: Array<[number, number]>;
  centerBottom?: Array<[number, number]>;
  centerTop?: Array<[number, number]>;
  centerLeft?: Array<[number, number]>;
  centerRight?: Array<[number, number]>;
}

const validateShape = (
  width: number,
  height: number,
  shape: Array<[number, number]>
) => {
  return !shape.some(([x, y]) => x < 0 || y < 0 || x >= width || y >= height);
};

const centerShapeVertically = (
  shape: Array<[number, number]>
): Array<[number, number]> => {
  const greatestY = Math.max(...shape.map(([, y]) => y));
  return shape.map(([x, y]) => [x, y - Math.floor(greatestY / 2)]);
};

const centerShapeHorizontally = (
  shape: Array<[number, number]>
): Array<[number, number]> => {
  const greatestX = Math.max(...shape.map(([x]) => x));
  return shape.map(([x, y]) => [x - Math.floor(greatestX / 2), y]);
};

const centerShape = (
  shape: Array<[number, number]>
): Array<[number, number]> => {
  return centerShapeVertically(centerShapeHorizontally(shape));
};

export const createScene = (
  width: number,
  height: number,
  options: createSceneOptions,
  borderPadding: [number, number, number, number] = [10, 10, 10, 10] // left top right bottom
): Array<[number, number]> => {
  let scene: Array<[number, number]> = [];
  const {
    leftTopCorner: LeftUpperCorner,
    leftBottomCorner: LeftLowerCorner,
    rightTopCorner: RightUpperCorner,
    rightBottomCorner: RightLowerCorner,
    center,
    centerBottom,
    centerTop,
    centerLeft,
    centerRight,
  } = options;

  console.log(flipShapeHorizontally(weekender));

  if (LeftUpperCorner) {
    const editedShape: Array<[number, number]> = LeftUpperCorner.map(
      ([x, y]) => [x + borderPadding[0], y + borderPadding[1]]
    );

    if (validateShape(width, height, editedShape)) {
      scene = scene.concat(editedShape);
    }
  }
  if (LeftLowerCorner) {
    const greatestY = Math.max(...LeftLowerCorner.map(([, y]) => y));

    const editedShape: Array<[number, number]> = LeftLowerCorner.map(
      ([x, y]) => [
        x + borderPadding[0],
        y + height - 1 - borderPadding[3] - greatestY,
      ]
    );

    if (validateShape(width, height, editedShape)) {
      scene = scene.concat(editedShape);
    }
  }
  if (RightUpperCorner) {
    const greatestX = Math.max(...RightUpperCorner.map(([x]) => x));
    const editedShape: Array<[number, number]> = RightUpperCorner.map(
      ([x, y]) => [
        x + width - 1 - borderPadding[2] - greatestX,
        y + borderPadding[1],
      ]
    );

    if (validateShape(width, height, editedShape)) {
      scene = scene.concat(editedShape);
    }
  }
  if (RightLowerCorner) {
    const [greatestX, greatestY] = RightLowerCorner.reduce(
      ([greatestX, greatestY], [x, y]) => [
        Math.max(greatestX, x),
        Math.max(greatestY, y),
      ],
      [0, 0]
    );

    const editedShape: Array<[number, number]> = RightLowerCorner.map(
      ([x, y]) => [
        x + width - 1 - borderPadding[2] - greatestX,
        y + height - 1 - borderPadding[3] - greatestY,
      ]
    );

    if (validateShape(width, height, editedShape)) {
      scene = scene.concat(editedShape);
    }
  }
  if (center) {
    const centeredShape = centerShape(center);

    const editedShape: Array<[number, number]> = centeredShape.map(([x, y]) => [
      x + Math.floor(width / 2),
      y + Math.floor(height / 2),
    ]);

    if (validateShape(width, height, editedShape)) {
      scene = scene.concat(editedShape);
    }
  }

  if (centerBottom) {
    const greatestY = Math.max(...centerBottom.map(([, y]) => y));

    const centeredShape = centerShapeHorizontally(centerBottom);

    const editedShape: Array<[number, number]> = centeredShape.map(([x, y]) => [
      x + Math.floor(width / 2),
      y + height - 1 - borderPadding[3] - greatestY,
    ]);

    if (validateShape(width, height, editedShape)) {
      scene = scene.concat(editedShape);
    }
  }

  if (centerTop) {
    const centeredShape = centerShapeHorizontally(centerTop);

    const editedShape: Array<[number, number]> = centeredShape.map(([x, y]) => [
      x + Math.floor(width / 2),
      y + borderPadding[1],
    ]);

    if (validateShape(width, height, editedShape)) {
      scene = scene.concat(editedShape);
    }
  }

  if (centerLeft) {
    const centeredShape = centerShapeVertically(centerLeft);

    const editedShape: Array<[number, number]> = centeredShape.map(([x, y]) => [
      x + borderPadding[0],
      y + Math.floor(height / 2),
    ]);

    if (validateShape(width, height, editedShape)) {
      scene = scene.concat(editedShape);
    }
  }

  if (centerRight) {
    const greatestX = Math.max(...centerRight.map(([x]) => x));
    const centeredShape = centerShapeVertically(centerRight);

    const editedShape: Array<[number, number]> = centeredShape.map(([x, y]) => [
      x + width - 1 - borderPadding[2] - greatestX,
      y + Math.floor(height / 2),
    ]);

    if (validateShape(width, height, editedShape)) {
      scene = scene.concat(editedShape);
    }
  }

  return scene;
};

export const DoubleGliderGunScene = (width: number, height: number) =>
  createScene(width, height, {
    leftBottomCorner: flipShapeHorizontally(gliderGun),
    rightTopCorner: flipShapeVertically(gliderGun),
  });

export const centerInfiniteGrowthScene = (width: number, height: number) =>
  createScene(width, height, {
    center: paulCallehans10cellInfiniteGrowth,
  });

export const cornersCopperHeads = (width: number, height: number) =>
  createScene(width, height, {
    leftTopCorner: copperhead,
    rightTopCorner: rotateShape270(copperhead),
    leftBottomCorner: rotateShape90(copperhead),
    rightBottomCorner: flipShapeVertically(copperhead),
  });

export const weekenderCollision = (width: number, height: number) =>
  createScene(width, height, {
    centerBottom: weekender,
    centerTop: flipShapeHorizontally(weekender),
  });

export const weekenderQuadCollision = (width: number, height: number) =>
  createScene(width, height, {
    centerBottom: weekender,
    centerTop: flipShapeHorizontally(weekender),
    centerLeft: rotateShape270(weekender),
    centerRight: rotateShape90(weekender),
  });

export const weekenderVsCopperhead = (width: number, height: number) =>
  createScene(width, height, {
    centerBottom: weekender,
    centerTop: rotateShape270(copperhead),
  });

export const gliderGunWeekenderHunt = (width: number, height: number) =>
  createScene(width, height, {
    leftBottomCorner: flipShapeHorizontally(gliderGun),
    centerBottom: weekender,
    rightTopCorner: flipShapeHorizontally(weekender),
  });

export const quadGliderGuns = (width: number, height: number) =>
  createScene(width, height, {
    leftBottomCorner: flipShapeHorizontally(gliderGun),
    rightTopCorner: flipShapeVertically(gliderGun),
    leftTopCorner: gliderGun,
    rightBottomCorner: flipShapeHorizontally(flipShapeVertically(gliderGun)),
  });

export const centerOscilator = (width: number, height: number) =>
  createScene(width, height, {
    center: achimsp16Oscillator,
    leftBottomCorner: paulCallehans10cellInfiniteGrowth,
    rightBottomCorner: flipShapeVertically(paulCallehans10cellInfiniteGrowth),
    leftTopCorner: flipShapeHorizontally(paulCallehans10cellInfiniteGrowth),
    rightTopCorner: flipShapeHorizontally(
      flipShapeVertically(paulCallehans10cellInfiniteGrowth)
    ),
  });

export const rightCornersOscillators = (width: number, height: number) =>
  createScene(width, height, {
    rightBottomCorner: achimsp16Oscillator,
    rightTopCorner: achimsp16Oscillator,
  });

export const rightCornersOscillatorsWithCopperhead = (
  width: number,
  height: number
) =>
  createScene(width, height, {
    rightBottomCorner: achimsp16Oscillator,
    rightTopCorner: achimsp16Oscillator,
    leftBottomCorner: copperhead,
  });

export const quadGliderGunsWithCenterOscillator = (
  width: number,
  height: number
) =>
  createScene(width, height, {
    leftBottomCorner: flipShapeHorizontally(gliderGun),
    rightTopCorner: flipShapeVertically(gliderGun),
    leftTopCorner: gliderGun,
    rightBottomCorner: flipShapeHorizontally(flipShapeVertically(gliderGun)),
    center: achimsp16Oscillator,
  });

export const rightCornersOscillatorsWithCenterInfinite = (
  width: number,
  height: number
) =>
  createScene(width, height, {
    rightBottomCorner: achimsp16Oscillator,
    rightTopCorner: achimsp16Oscillator,
    center: paulCallehans10cellInfiniteGrowth,
  });

export const diagonalOscillatorsWithCenterInfinite = (
  width: number,
  height: number
) =>
  createScene(width, height, {
    leftBottomCorner: achimsp16Oscillator,
    rightTopCorner: achimsp16Oscillator,
    center: paulCallehans10cellInfiniteGrowth,
    rightBottomCorner: flipShapeVertically(copperhead),
  });

export const centerAndCornerInfiniteWithCopperRace = (
  width: number,
  height: number
) =>
  createScene(width, height, {
    rightBottomCorner: paulCallehans10cellInfiniteGrowth,
    center: achimsp16Oscillator,
    leftTopCorner: copperhead,
    centerLeft: copperhead,
  });

export const chaosScene = (width: number, height: number) =>
  createScene(width, height, {
    leftBottomCorner: copperhead,
    rightTopCorner: rotateShape270(copperhead),
    leftTopCorner: gliderGun,
    rightBottomCorner: flipShapeHorizontally(flipShapeVertically(gliderGun)),
    center: achimsp16Oscillator,
    centerTop: flipShapeHorizontally(weekender),
    centerRight: rotateShape90(weekender),
  });

