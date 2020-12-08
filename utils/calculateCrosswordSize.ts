import { PixelSize, Size } from 'types/Types';

export const calculateCrosswordSize = (
  wrapperSize: PixelSize,
  crosswordSize: Size
): PixelSize => {
  const areaRatio = wrapperSize.width / wrapperSize.height;
  const planRatio = crosswordSize.x / crosswordSize.y;

  if (areaRatio >= planRatio) {
    // Height limiting factor
    const height = wrapperSize.height;
    const cellSize = height / crosswordSize.y;
    const width = cellSize * crosswordSize.x;
    return { height, width };
  } else if (areaRatio < planRatio) {
    // Width limiting factor
    const width = wrapperSize.width;
    const cellSize = width / crosswordSize.x;
    const height = cellSize * crosswordSize.y;
    return { height, width };
  }
};
