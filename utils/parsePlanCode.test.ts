import { CellPosition } from 'types/Types';
import { cellPositionEqual } from './cellPositionEqual';
import { parsePlanCode } from './parsePlanCode';

describe('Parse plan code', () => {
  it('Returns array of correct height', () => {
    // Arrange
    const planCode =
      'w9h10a5o2xxnx2olo3x3nax2aoxa2onox2aoorxoxnao7xnox2axoxaonolaxoxoxoxnxox3oxaornao3xoloxonx9';

    // Act
    const result = parsePlanCode(planCode);

    // Assert
    expect(result.length).toEqual(10);
  });

  it('Throws if code lacks sizing data', () => {
    // Arrange
    const planCode =
      'a5o2xnx2olo3x3nax2aoxa2onox2aoorxoxnao7xnox2axoxaonolaxoxoxoxnxox3oxaornao3xoloxo';

    // Act
    const assertion = () => parsePlanCode(planCode);

    // Assert
    expect(assertion).toThrow('Plan code invalid: no sizing data');
  });

  it('Throws if number of rows does not match sizing data', () => {
    // Arrange
    const planCode =
      'w9h9a5o2xxnx2olo3x3nax2aoxa2onox2aoorxoxnao7xnox2axoxaonolaxoxoxoxnxox3oxaor';

    // Act
    const assertion = () => parsePlanCode(planCode);

    // Assert
    expect(assertion).toThrow('Plan code invalid: wrong number of rows');
  });

  it('Throws if number of columns does not match sizing data', () => {
    // Arrange
    const planCode =
      'w9h8a5o2xxnx3olo3x3nax2aoxa2onox2aoorxoxnao7xnox2axoxaonolaxoxoxoxnxox3oxaor';

    // Act
    const assertion = () => parsePlanCode(planCode);

    // Assert
    expect(assertion).toThrow(
      'Plan code invalid: wrong number of columns in row 2'
    );
  });

  it('Throws if wrong character in row parse', () => {
    // Arrange
    const planCode =
      'w9h8la5o2xnx3olo3x3nax2aoxa2onox2aoorxoxnao7xnox2axoxaonolaxoxoxoxnxox3oxaor';

    // Act
    const assertion = () => parsePlanCode(planCode);

    // Assert
    expect(assertion).toThrow(
      'Plan code invalid: encountered wrong character (l) in row 1'
    );
  });

  it('Converts a row code correctly', () => {
    // Arrange
    const planCode =
      'w9h8a5o2xxnx3olo3x2nax2aoxa2onox2aoorxoxnao7xnox2axoxaonolaxoxoxoxnxox3oxaor';

    // Act
    const result = parsePlanCode(planCode);

    // Assert
    const expectedFirstRow = ['a', 'a', 'a', 'a', 'a', 'o', 'o', 'x', 'x'];
    expect(result[0]).toEqual(expectedFirstRow);
  });
});
