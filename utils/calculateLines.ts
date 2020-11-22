import { CellType, Plan } from 'data/plan';
import { CellPosition, Direction, Size } from 'types/Types';
import { positionShorthandToLong } from './positionShorthandToLong';

const calculateLine = (
  plan: Plan,
  direction: Direction,
  start: CellPosition,
  size: Size
): string[] => {
  let result: string[] = [`x${start.x}y${start.y}`];

  const directionAxis = direction === Direction.horizontal ? 'x' : 'y';
  const nextCellPosition: CellPosition = {
    x: direction === Direction.horizontal ? start.x + 1 : start.x,
    y: direction === Direction.horizontal ? start.y : start.y + 1
  };

  if (
    nextCellPosition[directionAxis] < size[directionAxis] &&
    plan[nextCellPosition.y][nextCellPosition.x].type === CellType.cell
  ) {
    const innerResult = calculateLine(plan, direction, nextCellPosition, size);
    result = [...result, ...innerResult];
  }

  return result;
};

export const calculateLines = (plan: Plan, size: Size): Plan => {
  plan.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell.type === CellType.cell) {
        ['horizontal', 'vertical'].forEach((direction) => {
          if (!cell.line?.[direction] || cell.line?.[direction]?.length === 0) {
            const line = calculateLine(
              plan,
              Direction[direction],
              { x, y },
              size
            );

            line.forEach((cellInLine) => {
              const fullPosition = positionShorthandToLong(cellInLine);
              if (!plan[fullPosition.y][fullPosition.x].line) {
                plan[fullPosition.y][fullPosition.x].line = {
                  [Direction.horizontal]: [],
                  [Direction.vertical]: []
                };
              }
              plan[fullPosition.y][fullPosition.x].line[direction] = line;
            });
          }
        });
      }
    });
  });

  return plan;
};
