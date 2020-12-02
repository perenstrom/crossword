import { CellType, DecoratorType, Plan, PlanCell, Size } from 'types/Types';
import { calculateLines } from './calculateLines';

enum CellCode {
  blank = 'x',
  cell = 'o',
  wordStart = 'a',
  htv = 'r',
  vth = 'l',
  newLine = 'n'
}

const exciseSize = (planCode: string): [Size, string] => {
  const sizeRegex = /^w(\d+)h(\d+)/;
  const sizeMatches = planCode.match(sizeRegex);
  if (!sizeMatches) {
    throw new Error('Plan code invalid: no sizing data');
  }
  const xSize = parseInt(sizeMatches[1], 10);
  const ySize = parseInt(sizeMatches[2], 10);

  const newPlanCode = planCode.replace(sizeRegex, '');

  return [
    {
      x: xSize,
      y: ySize
    },
    newPlanCode
  ];
};

const splitRows = (planCode: string, size: Size): string[] => {
  const rowCodes = planCode.split(CellCode.newLine);
  if (rowCodes.length !== size.y) {
    throw new Error('Plan code invalid: wrong number of rows');
  }
  return rowCodes;
};

const convertToCell = (cellCode: string): PlanCell => {
  let type: CellType;
  let legend: number = null;
  let decorator: DecoratorType = null;

  switch (cellCode[0]) {
    case CellCode.wordStart:
      type = CellType.cell;
      legend = 0;
      break;
    case CellCode.cell:
      type = CellType.cell;
      break;
    case CellCode.blank:
      type = CellType.blank;
      break;
  }

  if (cellCode.length > 1) {
    switch (cellCode[1]) {
      case CellCode.htv:
        decorator = DecoratorType.htv;
        break;
      case CellCode.vth:
        decorator = DecoratorType.vth;
        break;
    }
  }

  const legendObj = legend !== null ? { legend } : {};
  const decoratorObj = decorator !== null ? { decorator } : {};
  return {
    type,
    ...legendObj,
    ...decoratorObj
  };
};

const extrudeRowPart = (
  rowCode: string,
  rowNumber: number
): [PlanCell[], string] => {
  const firstChar = rowCode[0];
  if (
    ![CellCode.blank, CellCode.cell, CellCode.wordStart].includes(
      firstChar as CellCode
    )
  ) {
    throw new Error(
      `Plan code invalid: encountered wrong character (${firstChar}) in row ${
        rowNumber + 1
      }`
    );
  }

  const remaining = rowCode.slice(1);
  const modifierRegex = new RegExp(`^(\\d+|${CellCode.htv}|${CellCode.vth})`);
  const remainingMatch = remaining.match(modifierRegex);
  const modifier = remainingMatch ? remainingMatch[1] : '';
  const modifierLength = modifier.length;

  const modifierIsDecorator = [CellCode.htv, CellCode.vth].includes(
    modifier as CellCode
  );
  const cells: PlanCell[] =
    remainingMatch && modifierIsDecorator
      ? [convertToCell(`${firstChar}${modifier}`)]
      : remainingMatch
      ? new Array(parseInt(modifier, 10)).fill(convertToCell(firstChar))
      : [convertToCell(firstChar)];
  const nextRowCodePart = rowCode.slice(1 + modifierLength);

  return [cells, nextRowCodePart];
};

const parseRowPart = (rowCode: string, rowNumber: number): PlanCell[] => {
  const [cells, remaining] = extrudeRowPart(rowCode, rowNumber);
  let result = [...cells];

  if (remaining) {
    const innerResult = parseRowPart(remaining, rowNumber);
    result = [...cells, ...innerResult];
  }

  return result;
};

const parseRow = (
  rowCode: string,
  rowNumber: number,
  size: Size
): PlanCell[] => {
  const row = parseRowPart(rowCode, rowNumber);

  if (row.length !== size.x) {
    throw new Error(
      `Plan code invalid: wrong number of columns in row ${rowNumber + 1}`
    );
  }
  return row;
};

const parseRows = (rowCodes: string[], size: Size): Plan => {
  const plan = rowCodes.map((rowCode, rowNumber) =>
    parseRow(rowCode, rowNumber, size)
  );

  return plan;
};

const fillLegends = (plan: Plan): Plan => {
  let startNumber = 1;
  const newPlan = plan.map((row) =>
    row.map((cell) => {
      const newCell: PlanCell = { ...cell };
      if (newCell.legend === 0) {
        newCell.legend = startNumber;
        startNumber += 1;
      }
      return newCell;
    })
  );
  return newPlan;
};

export const parsePlanCode = (planCode: string): [Plan, Size] => {
  const [size, planCodeWithoutSize] = exciseSize(planCode);
  const rowCodes = splitRows(planCodeWithoutSize, size);
  const plan = parseRows(rowCodes, size);
  const planWithLegends = fillLegends(plan);
  const planWithLines = calculateLines(planWithLegends, size);

  return [planWithLines, size];
};
