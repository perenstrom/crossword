import { Plan } from 'data/plan';
import { Size } from 'types/Types';

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

const extrudeRowPart = (
  rowCode: string,
  rowNumber: number
): [string[], string] => {
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
  const cellCodes =
    remainingMatch && modifierIsDecorator
      ? [`${firstChar}${modifier}`]
      : remainingMatch
      ? new Array(parseInt(modifier, 10)).fill(firstChar)
      : [firstChar];
  const nextRowCodePart = rowCode.slice(1 + modifierLength);

  return [cellCodes, nextRowCodePart];
};

const parseRowPart = (rowCode: string, rowNumber: number): string[] => {
  const [cellCodes, remaining] = extrudeRowPart(rowCode, rowNumber);
  let result = [...cellCodes];

  if (remaining) {
    const innerResult = parseRowPart(remaining, rowNumber);
    result = [...cellCodes, ...innerResult];
  }

  return result;
};

const parseRow = (rowCode: string, rowNumber: number, size: Size): string[] => {
  const row = parseRowPart(rowCode, rowNumber);

  if (row.length !== size.x) {
    throw new Error(
      `Plan code invalid: wrong number of columns in row ${rowNumber + 1}`
    );
  }
  return row;
};

const parseRows = (rowCodes: string[], size: Size): string[][] => {
  const plan = rowCodes.map((rowCode, rowNumber) =>
    parseRow(rowCode, rowNumber, size)
  );

  return plan;
};

export const parsePlanCode = (planCode: string): string[][] => {
  const [size, planCodeWithoutSize] = exciseSize(planCode);
  const rowCodes = splitRows(planCodeWithoutSize, size);
  const plan = parseRows(rowCodes, size);

  return plan;
};
