import { PlanCell, CellType, Plan, DecoratorType } from '../types/Types';
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
    const expectedFirstRow: PlanCell[] = [
      { type: CellType.cell, legend: 1 },
      { type: CellType.cell, legend: 2 },
      { type: CellType.cell, legend: 3 },
      { type: CellType.cell, legend: 4 },
      { type: CellType.cell, legend: 5 },
      { type: CellType.cell },
      { type: CellType.cell },
      { type: CellType.blank },
      { type: CellType.blank }
    ];
    expect(result[0]).toEqual(expectedFirstRow);
  });

  it('Converts a an entire plan correctly', () => {
    // Arrange
    const planCode =
      'w9h9xa5o2xnx2olo3x3nax2aoxa2onox2aoorxoxnao7xnox2axoxaonolaxoxoxoxnxox3oxaornao3xoloxo';

    // Act
    const result = parsePlanCode(planCode);

    // Assert
    const expectedPlan: Plan = [
      [
        { type: CellType.blank },
        { type: CellType.cell, legend: 1 },
        { type: CellType.cell, legend: 2 },
        { type: CellType.cell, legend: 3 },
        { type: CellType.cell, legend: 4 },
        { type: CellType.cell, legend: 5 },
        { type: CellType.cell },
        { type: CellType.cell },
        { type: CellType.blank }
      ],
      [
        { type: CellType.blank },
        { type: CellType.blank },
        { type: CellType.cell, decorator: DecoratorType.vth },
        { type: CellType.cell },
        { type: CellType.cell },
        { type: CellType.cell },
        { type: CellType.blank },
        { type: CellType.blank },
        { type: CellType.blank }
      ],
      [
        { type: CellType.cell, legend: 6 },
        { type: CellType.blank },
        { type: CellType.blank },
        { type: CellType.cell, legend: 7 },
        { type: CellType.cell },
        { type: CellType.blank },
        { type: CellType.cell, legend: 8 },
        { type: CellType.cell, legend: 9 },
        { type: CellType.cell }
      ],
      [
        { type: CellType.cell },
        { type: CellType.blank },
        { type: CellType.blank },
        { type: CellType.cell, legend: 10 },
        { type: CellType.cell },
        { type: CellType.cell, decorator: DecoratorType.htv },
        { type: CellType.blank },
        { type: CellType.cell },
        { type: CellType.blank }
      ],
      [
        { type: CellType.cell, legend: 11 },
        { type: CellType.cell },
        { type: CellType.cell },
        { type: CellType.cell },
        { type: CellType.cell },
        { type: CellType.cell },
        { type: CellType.cell },
        { type: CellType.cell },
        { type: CellType.blank }
      ],
      [
        { type: CellType.cell },
        { type: CellType.blank },
        { type: CellType.blank },
        { type: CellType.cell, legend: 12 },
        { type: CellType.blank },
        { type: CellType.cell },
        { type: CellType.blank },
        { type: CellType.cell, legend: 13 },
        { type: CellType.cell }
      ],
      [
        { type: CellType.cell, decorator: DecoratorType.vth },
        { type: CellType.cell, legend: 14 },
        { type: CellType.blank },
        { type: CellType.cell },
        { type: CellType.blank },
        { type: CellType.cell },
        { type: CellType.blank },
        { type: CellType.cell },
        { type: CellType.blank }
      ],
      [
        { type: CellType.blank },
        { type: CellType.cell },
        { type: CellType.blank },
        { type: CellType.blank },
        { type: CellType.blank },
        { type: CellType.cell },
        { type: CellType.blank },
        { type: CellType.cell, legend: 15 },
        { type: CellType.cell, decorator: DecoratorType.htv }
      ],
      [
        { type: CellType.cell, legend: 16 },
        { type: CellType.cell },
        { type: CellType.cell },
        { type: CellType.cell },
        { type: CellType.blank },
        { type: CellType.cell, decorator: DecoratorType.vth },
        { type: CellType.cell },
        { type: CellType.blank },
        { type: CellType.cell }
      ]
    ];
    expect(result).toEqual(expectedPlan);
  });
});
