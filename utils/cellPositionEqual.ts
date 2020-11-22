import { CellPosition } from 'types/Types';

export const cellPositionEqual = (
  cell1: CellPosition,
  cell2: CellPosition
): boolean => {
  return cell1?.x === cell2?.x && cell1?.y === cell2?.y;
};
