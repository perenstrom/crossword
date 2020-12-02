import { CellPosition, CellType, DecoratorType, Direction, LineItem, Plan, Size } from 'types/Types';
import { positionShorthandToLong } from './positionShorthandToLong';

const getNextCellPosition = (
  direction: Direction,
  position: CellPosition,
  decorator: DecoratorType
): [CellPosition, Direction] => {
  const newDirection =
    direction === Direction.horizontal && decorator === 'htv'
      ? Direction.vertical
      : direction === Direction.vertical && decorator === 'vth'
      ? Direction.horizontal
      : direction;

  const newPosition: CellPosition = {
    x: newDirection === Direction.horizontal ? position.x + 1 : position.x,
    y: newDirection === Direction.horizontal ? position.y : position.y + 1
  };

  return [newPosition, newDirection];
};

const calculateLine = (
  plan: Plan,
  direction: Direction,
  start: CellPosition,
  size: Size
): LineItem[] => {
  const decorator = plan[start.y][start.x].decorator;

  let result: LineItem[] = [
    {
      cellPosition: `x${start.x}y${start.y}`,
      direction: decorator ? 'both' : direction
    }
  ];

  const [nextCellPosition, newDirection] = getNextCellPosition(
    direction,
    start,
    decorator
  );
  const directionAxis = newDirection === Direction.horizontal ? 'x' : 'y';

  if (
    nextCellPosition[directionAxis] < size[directionAxis] &&
    plan[nextCellPosition.y][nextCellPosition.x].type === CellType.cell
  ) {
    const innerResult = calculateLine(
      plan,
      newDirection,
      nextCellPosition,
      size
    );
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
              const fullPosition = positionShorthandToLong(
                cellInLine.cellPosition
              );
              if (!plan[fullPosition.y][fullPosition.x].line) {
                plan[fullPosition.y][fullPosition.x].line = {
                  [Direction.horizontal]: [],
                  [Direction.vertical]: []
                };
              }

              if (
                cellInLine.direction === Direction.horizontal ||
                cellInLine.direction === 'both'
              ) {
                plan[fullPosition.y][fullPosition.x].line[
                  Direction.horizontal
                ] = line.map((l) => l.cellPosition);
              }

              if (
                cellInLine.direction === Direction.vertical ||
                cellInLine.direction === 'both'
              ) {
                plan[fullPosition.y][fullPosition.x].line[
                  Direction.vertical
                ] = line.map((l) => l.cellPosition);
              }
            });
          }
        });
      }
    });
  });

  return plan;
};
