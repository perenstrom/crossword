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

interface RowCodeAccumulator {
  compressedRowCode: string;
  previousCellCode: string;
  repeatCounter: number;
}

const reduceRowCode = (rowCode: string[]): string => {
  const defaultAccumulator: RowCodeAccumulator = {
    compressedRowCode: '',
    previousCellCode: '',
    repeatCounter: 1
  };

  // ooox
  const reducedRowCode = rowCode.reduce<RowCodeAccumulator>(
    (
      accumulator: RowCodeAccumulator,
      currentCellCode: string,
      currentIndex,
      rowCode
    ): RowCodeAccumulator => {
      const lastCell = currentIndex === rowCode.length - 1;
      const cellIsCompressible = currentCellCode.length === 1;

      const cellIsRepeating =
        cellIsCompressible && currentCellCode === accumulator.previousCellCode;

      const repeatCounter = cellIsRepeating ? accumulator.repeatCounter + 1 : 1;

      const repeatCode =
        !cellIsRepeating && accumulator.repeatCounter !== 1
          ? `${accumulator.repeatCounter}`
          : lastCell && repeatCounter !== 1
          ? `${repeatCounter}`
          : '';

      const nextAccumulatedRowCode =
        cellIsRepeating && !lastCell
          ? accumulator.compressedRowCode
          : cellIsRepeating && lastCell
          ? `${accumulator.compressedRowCode}${repeatCode}`
          : `${accumulator.compressedRowCode}${repeatCode}${currentCellCode}`;

      return {
        compressedRowCode: nextAccumulatedRowCode,
        previousCellCode: currentCellCode,
        repeatCounter: repeatCounter
      };
    },
    defaultAccumulator
  );

  return reducedRowCode.compressedRowCode;
};

const getRowCode = (row: PlanCell[]): string => {
  const rowCode = row.map((cell) => getCellCode(cell));
  const reducedRowCode = reduceRowCode(rowCode);

  return reducedRowCode;
};

export const createPlanCode = (plan: Plan): string => {
  const height = plan.length;
  const width = getWidth(plan);
  const sizePart = `${CellCode.width}${width}${CellCode.height}${height}`;

  const planCode = plan.map((row) => getRowCode(row)).join(CellCode.newLine);

  return `${sizePart}${planCode}`;
};
