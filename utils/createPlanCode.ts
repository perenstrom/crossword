import { CellCode, CellType, DecoratorType, Plan, PlanCell } from 'types/Types';

const getWidth = (plan: Plan): number => {
  const firstRowLength = plan[0].length;
  const allRowsSameLength = plan.every((row) => row.length === firstRowLength);

  if (!allRowsSameLength) {
    throw new Error('Plan invalid: rows are different lengths');
  }

  return firstRowLength;
};

const getNonBlankBaseCode = (cell: PlanCell): CellCode => {
  if (cell.legend || cell.legend === 0) {
    return CellCode.wordStart;
  } else {
    return CellCode.cell;
  }
};

const getNonBlankDecoratorCode = (cell: PlanCell): CellCode => {
  switch (cell.decorator) {
    case DecoratorType.htv:
      return CellCode.htv;
    case DecoratorType.vth:
      return CellCode.vth;
    default:
      return null;
  }
};

const getNonBlankCode = (cell: PlanCell): string => {
  const baseCode = getNonBlankBaseCode(cell);
  const decoratorCode = getNonBlankDecoratorCode(cell) ?? '';

  return `${baseCode}${decoratorCode}`;
};

const getCellCode = (cell: PlanCell): string => {
  switch (cell.type) {
    case CellType.cell:
      return getNonBlankCode(cell);
    case CellType.blank:
      return CellCode.blank;
  }
};

export const createPlanCode = (plan: Plan): string => {
  const height = plan.length;
  const width = getWidth(plan);
  const sizePart = `${CellCode.width}${width}${CellCode.height}${height}`;

  const planCode = plan
    .map((row) => row.map((cell) => getCellCode(cell)).join(''))
    .join(CellCode.newLine);

  return `${sizePart}${planCode}`;
};
