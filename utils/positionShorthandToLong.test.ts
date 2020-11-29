import { CellPosition } from 'types/Types';
import { positionShorthandToLong } from './positionShorthandToLong';

describe('Position short hand to long', () => {
  it('Returns correct position for single digit sizes', () => {
    // Arrange
    const input = 'x2y8';

    // Act
    const result = positionShorthandToLong(input);

    // Assert
    const expectedResult: CellPosition = {
      x: 2,
      y: 8
    };
    expect(result).toEqual(expectedResult);
  });

  it('Returns correct position for double digit sizes', () => {
    // Arrange
    const input = 'x21y84';

    // Act
    const result = positionShorthandToLong(input);

    // Assert
    const expectedResult: CellPosition = {
      x: 21,
      y: 84
    };
    expect(result).toEqual(expectedResult);
  });

  it('Throws correct error for misformed input', () => {
    // Arrange
    const input = 'x21o0';

    // Act & Assert
    expect(() => positionShorthandToLong(input)).toThrow(
      "Input not in format 'x{number}y{number}'"
    );
  });
});
