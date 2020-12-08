import { PixelSize, Size } from 'types/Types';
import { calculateCrosswordSize } from './calculateCrosswordSize';

describe('Calculate crossword size', () => {
  it('Returns correct for landscape plan and wider area', () => {
    // Arrange
    const crosswordArea: PixelSize = {
      width: 1000,
      height: 800
    };
    const size: Size = {
      x: 9,
      y: 8
    };

    // Act
    const crosswordSize = calculateCrosswordSize(crosswordArea, size);

    // Assert
    const expectedResult: PixelSize = { width: 900, height: 800 };
    expect(crosswordSize).toEqual(expectedResult);
  });

  it('Returns correct for landscape plan and less wide area', () => {
    // Arrange
    const crosswordArea: PixelSize = {
      width: 900,
      height: 800
    };
    const size: Size = {
      x: 10,
      y: 8
    };

    // Act
    const crosswordSize = calculateCrosswordSize(crosswordArea, size);

    // Assert
    const expectedResult: PixelSize = { width: 900, height: 720 };
    expect(crosswordSize).toEqual(expectedResult);
  });

  it('Returns correct for landscape plan and portrait area', () => {
    // Arrange
    const crosswordArea: PixelSize = {
      width: 800,
      height: 1000
    };
    const size: Size = {
      x: 10,
      y: 8
    };

    // Act
    const crosswordSize = calculateCrosswordSize(crosswordArea, size);

    // Assert
    const expectedResult: PixelSize = { width: 800, height: 640 };
    expect(crosswordSize).toEqual(expectedResult);
  });

  it('Returns correct for portrait plan and taller area', () => {
    // Arrange
    const crosswordArea: PixelSize = {
      width: 800,
      height: 1000
    };
    const size: Size = {
      x: 8,
      y: 9
    };

    // Act
    const crosswordSize = calculateCrosswordSize(crosswordArea, size);

    // Assert
    const expectedResult: PixelSize = { width: 800, height: 900 };
    expect(crosswordSize).toEqual(expectedResult);
  });

  it('Returns correct for portrait plan and less tall area', () => {
    // Arrange
    const crosswordArea: PixelSize = {
      width: 800,
      height: 900
    };
    const size: Size = {
      x: 8,
      y: 10
    };

    // Act
    const crosswordSize = calculateCrosswordSize(crosswordArea, size);

    // Assert
    const expectedResult: PixelSize = { width: 720, height: 900 };
    expect(crosswordSize).toEqual(expectedResult);
  });

  it('Returns correct for portrait plan and landscape area', () => {
    // Arrange
    const crosswordArea: PixelSize = {
      width: 1000,
      height: 800
    };
    const size: Size = {
      x: 8,
      y: 10
    };

    // Act
    const crosswordSize = calculateCrosswordSize(crosswordArea, size);

    // Assert
    const expectedResult: PixelSize = { width: 640, height: 800 };
    expect(crosswordSize).toEqual(expectedResult);
  });

  it('Returns correct for square plan and landscape area', () => {
    // Arrange
    const crosswordArea: PixelSize = {
      width: 1000,
      height: 800
    };
    const size: Size = {
      x: 10,
      y: 10
    };

    // Act
    const crosswordSize = calculateCrosswordSize(crosswordArea, size);

    // Assert
    const expectedResult: PixelSize = { width: 800, height: 800 };
    expect(crosswordSize).toEqual(expectedResult);
  });

  it('Returns correct for square plan and portrait area', () => {
    // Arrange
    const crosswordArea: PixelSize = {
      width: 800,
      height: 1000
    };
    const size: Size = {
      x: 10,
      y: 10
    };

    // Act
    const crosswordSize = calculateCrosswordSize(crosswordArea, size);

    // Assert
    const expectedResult: PixelSize = { width: 800, height: 800 };
    expect(crosswordSize).toEqual(expectedResult);
  });

  it('Returns correct for square plan and square area', () => {
    // Arrange
    const crosswordArea: PixelSize = {
      width: 1000,
      height: 1000
    };
    const size: Size = {
      x: 10,
      y: 10
    };

    // Act
    const crosswordSize = calculateCrosswordSize(crosswordArea, size);

    // Assert
    const expectedResult: PixelSize = { width: 1000, height: 1000 };
    expect(crosswordSize).toEqual(expectedResult);
  });
});
