import { CellType, Plan, DecoratorType } from 'types/Types';
import { parsePlanCode } from './parsePlanCode';

describe('Parse plan code', () => {
  it('Returns array of correct height', () => {
    // Arrange
    const planCode =
      'w9h10a5o2xxnx2olo3x3nax2aoxa2onox2aoorxoxnao7xnox2axoxaonolaxoxoxoxnxox3oxaornao3xoloxonx9';

    // Act
    const [result] = parsePlanCode(planCode);

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

  it('Converts a an entire plan correctly', () => {
    // Arrange
    const planCode =
      'w9h9xa5o2xnx2olo3x3nax2aoxa2onox2aoorxoxnao7xnox2axoxaonolaxoxoxoxnxox3oxaornao3xoloxo';

    // Act
    const [result] = parsePlanCode(planCode);

    // Assert
    const expectedPlan: Plan = [
      [
        {
          type: CellType.blank
        },
        {
          type: CellType.cell,
          legend: 1,
          line: {
            horizontal: [
              'x1y0',
              'x2y0',
              'x3y0',
              'x4y0',
              'x5y0',
              'x6y0',
              'x7y0'
            ],
            vertical: ['x1y0']
          }
        },
        {
          type: CellType.cell,
          legend: 2,
          line: {
            horizontal: [
              'x1y0',
              'x2y0',
              'x3y0',
              'x4y0',
              'x5y0',
              'x6y0',
              'x7y0'
            ],
            vertical: ['x2y0', 'x2y1', 'x3y1', 'x4y1', 'x5y1']
          }
        },
        {
          type: CellType.cell,
          legend: 3,
          line: {
            horizontal: [
              'x1y0',
              'x2y0',
              'x3y0',
              'x4y0',
              'x5y0',
              'x6y0',
              'x7y0'
            ],
            vertical: ['x3y0', 'x3y1', 'x3y2', 'x3y3', 'x3y4', 'x3y5', 'x3y6']
          }
        },
        {
          type: CellType.cell,
          legend: 4,
          line: {
            horizontal: [
              'x1y0',
              'x2y0',
              'x3y0',
              'x4y0',
              'x5y0',
              'x6y0',
              'x7y0'
            ],
            vertical: ['x4y0', 'x4y1', 'x4y2', 'x4y3', 'x4y4']
          }
        },
        {
          type: CellType.cell,
          legend: 5,
          line: {
            horizontal: [
              'x1y0',
              'x2y0',
              'x3y0',
              'x4y0',
              'x5y0',
              'x6y0',
              'x7y0'
            ],
            vertical: ['x5y0', 'x5y1']
          }
        },
        {
          type: CellType.cell,
          line: {
            horizontal: [
              'x1y0',
              'x2y0',
              'x3y0',
              'x4y0',
              'x5y0',
              'x6y0',
              'x7y0'
            ],
            vertical: ['x6y0']
          }
        },
        {
          type: CellType.cell,
          line: {
            horizontal: [
              'x1y0',
              'x2y0',
              'x3y0',
              'x4y0',
              'x5y0',
              'x6y0',
              'x7y0'
            ],
            vertical: ['x7y0']
          }
        },
        {
          type: CellType.blank
        }
      ],
      [
        {
          type: CellType.blank
        },
        {
          type: CellType.blank
        },
        {
          type: CellType.cell,
          decorator: DecoratorType.vth,
          line: {
            horizontal: ['x2y0', 'x2y1', 'x3y1', 'x4y1', 'x5y1'],
            vertical: ['x2y0', 'x2y1', 'x3y1', 'x4y1', 'x5y1']
          }
        },
        {
          type: CellType.cell,
          line: {
            horizontal: ['x2y0', 'x2y1', 'x3y1', 'x4y1', 'x5y1'],
            vertical: ['x3y0', 'x3y1', 'x3y2', 'x3y3', 'x3y4', 'x3y5', 'x3y6']
          }
        },
        {
          type: CellType.cell,
          line: {
            horizontal: ['x2y0', 'x2y1', 'x3y1', 'x4y1', 'x5y1'],
            vertical: ['x4y0', 'x4y1', 'x4y2', 'x4y3', 'x4y4']
          }
        },
        {
          type: CellType.cell,
          line: {
            horizontal: ['x2y0', 'x2y1', 'x3y1', 'x4y1', 'x5y1'],
            vertical: ['x5y0', 'x5y1']
          }
        },
        {
          type: CellType.blank
        },
        {
          type: CellType.blank
        },
        {
          type: CellType.blank
        }
      ],
      [
        {
          type: CellType.cell,
          legend: 6,
          line: {
            horizontal: ['x0y2'],
            vertical: ['x0y2', 'x0y3', 'x0y4', 'x0y5', 'x0y6', 'x1y6']
          }
        },
        {
          type: CellType.blank
        },
        {
          type: CellType.blank
        },
        {
          type: CellType.cell,
          legend: 7,
          line: {
            horizontal: ['x3y2', 'x4y2'],
            vertical: ['x3y0', 'x3y1', 'x3y2', 'x3y3', 'x3y4', 'x3y5', 'x3y6']
          }
        },
        {
          type: CellType.cell,
          line: {
            horizontal: ['x3y2', 'x4y2'],
            vertical: ['x4y0', 'x4y1', 'x4y2', 'x4y3', 'x4y4']
          }
        },
        {
          type: CellType.blank
        },
        {
          type: CellType.cell,
          legend: 8,
          line: {
            horizontal: ['x6y2', 'x7y2', 'x8y2'],
            vertical: ['x6y2']
          }
        },
        {
          type: CellType.cell,
          legend: 9,
          line: {
            horizontal: ['x6y2', 'x7y2', 'x8y2'],
            vertical: ['x7y2', 'x7y3', 'x7y4', 'x7y5', 'x7y6', 'x7y7']
          }
        },
        {
          type: CellType.cell,
          line: {
            horizontal: ['x6y2', 'x7y2', 'x8y2'],
            vertical: ['x8y2']
          }
        }
      ],
      [
        {
          type: CellType.cell,
          line: {
            horizontal: ['x0y3'],
            vertical: ['x0y2', 'x0y3', 'x0y4', 'x0y5', 'x0y6', 'x1y6']
          }
        },
        {
          type: CellType.blank
        },
        {
          type: CellType.blank
        },
        {
          type: CellType.cell,
          legend: 10,
          line: {
            horizontal: [
              'x3y3',
              'x4y3',
              'x5y3',
              'x5y4',
              'x5y5',
              'x5y6',
              'x5y7',
              'x5y8',
              'x6y8'
            ],
            vertical: ['x3y0', 'x3y1', 'x3y2', 'x3y3', 'x3y4', 'x3y5', 'x3y6']
          }
        },
        {
          type: CellType.cell,
          line: {
            horizontal: [
              'x3y3',
              'x4y3',
              'x5y3',
              'x5y4',
              'x5y5',
              'x5y6',
              'x5y7',
              'x5y8',
              'x6y8'
            ],
            vertical: ['x4y0', 'x4y1', 'x4y2', 'x4y3', 'x4y4']
          }
        },
        {
          type: CellType.cell,
          decorator: DecoratorType.htv,
          line: {
            horizontal: [
              'x3y3',
              'x4y3',
              'x5y3',
              'x5y4',
              'x5y5',
              'x5y6',
              'x5y7',
              'x5y8',
              'x6y8'
            ],
            vertical: [
              'x3y3',
              'x4y3',
              'x5y3',
              'x5y4',
              'x5y5',
              'x5y6',
              'x5y7',
              'x5y8',
              'x6y8'
            ]
          }
        },
        {
          type: CellType.blank
        },
        {
          type: CellType.cell,
          line: {
            horizontal: ['x7y3'],
            vertical: ['x7y2', 'x7y3', 'x7y4', 'x7y5', 'x7y6', 'x7y7']
          }
        },
        {
          type: CellType.blank
        }
      ],
      [
        {
          type: CellType.cell,
          legend: 11,
          line: {
            horizontal: [
              'x0y4',
              'x1y4',
              'x2y4',
              'x3y4',
              'x4y4',
              'x5y4',
              'x6y4',
              'x7y4'
            ],
            vertical: ['x0y2', 'x0y3', 'x0y4', 'x0y5', 'x0y6', 'x1y6']
          }
        },
        {
          type: CellType.cell,
          line: {
            horizontal: [
              'x0y4',
              'x1y4',
              'x2y4',
              'x3y4',
              'x4y4',
              'x5y4',
              'x6y4',
              'x7y4'
            ],
            vertical: ['x1y4']
          }
        },
        {
          type: CellType.cell,
          line: {
            horizontal: [
              'x0y4',
              'x1y4',
              'x2y4',
              'x3y4',
              'x4y4',
              'x5y4',
              'x6y4',
              'x7y4'
            ],
            vertical: ['x2y4']
          }
        },
        {
          type: CellType.cell,
          line: {
            horizontal: [
              'x0y4',
              'x1y4',
              'x2y4',
              'x3y4',
              'x4y4',
              'x5y4',
              'x6y4',
              'x7y4'
            ],
            vertical: ['x3y0', 'x3y1', 'x3y2', 'x3y3', 'x3y4', 'x3y5', 'x3y6']
          }
        },
        {
          type: CellType.cell,
          line: {
            horizontal: [
              'x0y4',
              'x1y4',
              'x2y4',
              'x3y4',
              'x4y4',
              'x5y4',
              'x6y4',
              'x7y4'
            ],
            vertical: ['x4y0', 'x4y1', 'x4y2', 'x4y3', 'x4y4']
          }
        },
        {
          type: CellType.cell,
          line: {
            horizontal: [
              'x0y4',
              'x1y4',
              'x2y4',
              'x3y4',
              'x4y4',
              'x5y4',
              'x6y4',
              'x7y4'
            ],
            vertical: [
              'x3y3',
              'x4y3',
              'x5y3',
              'x5y4',
              'x5y5',
              'x5y6',
              'x5y7',
              'x5y8',
              'x6y8'
            ]
          }
        },
        {
          type: CellType.cell,
          line: {
            horizontal: [
              'x0y4',
              'x1y4',
              'x2y4',
              'x3y4',
              'x4y4',
              'x5y4',
              'x6y4',
              'x7y4'
            ],
            vertical: ['x6y4']
          }
        },
        {
          type: CellType.cell,
          line: {
            horizontal: [
              'x0y4',
              'x1y4',
              'x2y4',
              'x3y4',
              'x4y4',
              'x5y4',
              'x6y4',
              'x7y4'
            ],
            vertical: ['x7y2', 'x7y3', 'x7y4', 'x7y5', 'x7y6', 'x7y7']
          }
        },
        {
          type: CellType.blank
        }
      ],
      [
        {
          type: CellType.cell,
          line: {
            horizontal: ['x0y5'],
            vertical: ['x0y2', 'x0y3', 'x0y4', 'x0y5', 'x0y6', 'x1y6']
          }
        },
        {
          type: CellType.blank
        },
        {
          type: CellType.blank
        },
        {
          type: CellType.cell,
          legend: 12,
          line: {
            horizontal: ['x3y5'],
            vertical: ['x3y0', 'x3y1', 'x3y2', 'x3y3', 'x3y4', 'x3y5', 'x3y6']
          }
        },
        {
          type: CellType.blank
        },
        {
          type: CellType.cell,
          line: {
            horizontal: ['x5y5'],
            vertical: [
              'x3y3',
              'x4y3',
              'x5y3',
              'x5y4',
              'x5y5',
              'x5y6',
              'x5y7',
              'x5y8',
              'x6y8'
            ]
          }
        },
        {
          type: CellType.blank
        },
        {
          type: CellType.cell,
          legend: 13,
          line: {
            horizontal: ['x7y5', 'x8y5'],
            vertical: ['x7y2', 'x7y3', 'x7y4', 'x7y5', 'x7y6', 'x7y7']
          }
        },
        {
          type: CellType.cell,
          line: {
            horizontal: ['x7y5', 'x8y5'],
            vertical: ['x8y5']
          }
        }
      ],
      [
        {
          type: CellType.cell,
          decorator: DecoratorType.vth,
          line: {
            horizontal: ['x0y2', 'x0y3', 'x0y4', 'x0y5', 'x0y6', 'x1y6'],
            vertical: ['x0y2', 'x0y3', 'x0y4', 'x0y5', 'x0y6', 'x1y6']
          }
        },
        {
          type: CellType.cell,
          legend: 14,
          line: {
            horizontal: ['x0y2', 'x0y3', 'x0y4', 'x0y5', 'x0y6', 'x1y6'],
            vertical: ['x1y6', 'x1y7', 'x1y8']
          }
        },
        {
          type: CellType.blank
        },
        {
          type: CellType.cell,
          line: {
            horizontal: ['x3y6'],
            vertical: ['x3y0', 'x3y1', 'x3y2', 'x3y3', 'x3y4', 'x3y5', 'x3y6']
          }
        },
        {
          type: CellType.blank
        },
        {
          type: CellType.cell,
          line: {
            horizontal: ['x5y6'],
            vertical: [
              'x3y3',
              'x4y3',
              'x5y3',
              'x5y4',
              'x5y5',
              'x5y6',
              'x5y7',
              'x5y8',
              'x6y8'
            ]
          }
        },
        {
          type: CellType.blank
        },
        {
          type: CellType.cell,
          line: {
            horizontal: ['x7y6'],
            vertical: ['x7y2', 'x7y3', 'x7y4', 'x7y5', 'x7y6', 'x7y7']
          }
        },
        {
          type: CellType.blank
        }
      ],
      [
        {
          type: CellType.blank
        },
        {
          type: CellType.cell,
          line: {
            horizontal: ['x1y7'],
            vertical: ['x1y6', 'x1y7', 'x1y8']
          }
        },
        {
          type: CellType.blank
        },
        {
          type: CellType.blank
        },
        {
          type: CellType.blank
        },
        {
          type: CellType.cell,
          line: {
            horizontal: ['x5y7'],
            vertical: [
              'x3y3',
              'x4y3',
              'x5y3',
              'x5y4',
              'x5y5',
              'x5y6',
              'x5y7',
              'x5y8',
              'x6y8'
            ]
          }
        },
        {
          type: CellType.blank
        },
        {
          type: CellType.cell,
          legend: 15,
          line: {
            horizontal: ['x7y7', 'x8y7', 'x8y8'],
            vertical: ['x7y2', 'x7y3', 'x7y4', 'x7y5', 'x7y6', 'x7y7']
          }
        },
        {
          type: CellType.cell,
          decorator: DecoratorType.htv,
          line: {
            horizontal: ['x7y7', 'x8y7', 'x8y8'],
            vertical: ['x7y7', 'x8y7', 'x8y8']
          }
        }
      ],
      [
        {
          type: CellType.cell,
          legend: 16,
          line: {
            horizontal: ['x0y8', 'x1y8', 'x2y8', 'x3y8'],
            vertical: ['x0y8']
          }
        },
        {
          type: CellType.cell,
          line: {
            horizontal: ['x0y8', 'x1y8', 'x2y8', 'x3y8'],
            vertical: ['x1y6', 'x1y7', 'x1y8']
          }
        },
        {
          type: CellType.cell,
          line: {
            horizontal: ['x0y8', 'x1y8', 'x2y8', 'x3y8'],
            vertical: ['x2y8']
          }
        },
        {
          type: CellType.cell,
          line: {
            horizontal: ['x0y8', 'x1y8', 'x2y8', 'x3y8'],
            vertical: ['x3y8']
          }
        },
        {
          type: CellType.blank
        },
        {
          type: CellType.cell,
          decorator: DecoratorType.vth,
          line: {
            horizontal: [
              'x3y3',
              'x4y3',
              'x5y3',
              'x5y4',
              'x5y5',
              'x5y6',
              'x5y7',
              'x5y8',
              'x6y8'
            ],
            vertical: [
              'x3y3',
              'x4y3',
              'x5y3',
              'x5y4',
              'x5y5',
              'x5y6',
              'x5y7',
              'x5y8',
              'x6y8'
            ]
          }
        },
        {
          type: CellType.cell,
          line: {
            horizontal: [
              'x3y3',
              'x4y3',
              'x5y3',
              'x5y4',
              'x5y5',
              'x5y6',
              'x5y7',
              'x5y8',
              'x6y8'
            ],
            vertical: ['x6y8']
          }
        },
        {
          type: CellType.blank
        },
        {
          type: CellType.cell,
          line: {
            horizontal: ['x8y8'],
            vertical: ['x7y7', 'x8y7', 'x8y8']
          }
        }
      ]
    ];
    expect(result).toEqual(expectedPlan);
  });
});
