import { CellPosition } from 'types/Types';
import { cellPositionEqual } from './cellPositionEqual';

describe('Cell position equal', () => {
  it('Returns true when same position', () => {
    // Arrange
    const cell1: CellPosition = {
      x: 5,
      y: 7
    };
    const cell2: CellPosition = {
      x: 5,
      y: 7
    };

    // Act
    const result = cellPositionEqual(cell1, cell2);

    // Assert
    expect(result).toEqual(true);
  });

  it('Returns false when different position', () => {
    // Arrange
    const cell1: CellPosition = {
      x: 5,
      y: 7
    };
    const cell2: CellPosition = {
      x: 7,
      y: 5
    };

    // Act
    const result = cellPositionEqual(cell1, cell2);

    // Assert
    expect(result).toEqual(false);
  });
});
