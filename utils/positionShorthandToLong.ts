import { CellPosition } from 'types/Types';

export const positionShorthandToLong = (position: string): CellPosition => {
  const regex = /x(\d+)y(\d+)/;
  const match = position.match(regex);
  const longPosition = { x: parseInt(match[1], 10), y: parseInt(match[2], 10) };

  return longPosition;
};
