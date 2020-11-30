import { DecoratorType } from 'components/Decorator';

export enum CellType {
  blank = 'blank',
  cell = 'cell'
}

export interface Line {
  horizontal: string[];
  vertical: string[];
}

export interface PlanCell {
  type: CellType;
  legend?: string;
  decorator?: DecoratorType;
  line?: Line;
}

export type Plan = PlanCell[][];

export const plan3: string = 'w9h9xa5o2xnx2olo3x3nax2aoxa2onox2aoorxoxnao7xnox2axoxaonolaxoxoxoxnxox3oxaornao3xoloxo';

export const plan: Plan = [
  [
    { type: CellType.blank },
    { type: CellType.cell, legend: '1.' },
    { type: CellType.cell, legend: '2.' },
    { type: CellType.cell, legend: '3.' },
    { type: CellType.cell, legend: '4.' },
    { type: CellType.cell, legend: '5.' },
    { type: CellType.cell },
    { type: CellType.cell },
    { type: CellType.blank }
  ],
  [
    { type: CellType.blank },
    { type: CellType.blank },
    { type: CellType.cell, decorator: 'vth' },
    { type: CellType.cell },
    { type: CellType.cell },
    { type: CellType.cell },
    { type: CellType.blank },
    { type: CellType.blank },
    { type: CellType.blank }
  ],
  [
    { type: CellType.cell, legend: '6.' },
    { type: CellType.blank },
    { type: CellType.blank },
    { type: CellType.cell, legend: '7.' },
    { type: CellType.cell },
    { type: CellType.blank },
    { type: CellType.cell, legend: '8.' },
    { type: CellType.cell, legend: '9.' },
    { type: CellType.cell }
  ],
  [
    { type: CellType.cell },
    { type: CellType.blank },
    { type: CellType.blank },
    { type: CellType.cell, legend: '10.' },
    { type: CellType.cell },
    { type: CellType.cell, decorator: 'htv' },
    { type: CellType.blank },
    { type: CellType.cell },
    { type: CellType.blank }
  ],
  [
    { type: CellType.cell, legend: '11.' },
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
    { type: CellType.cell, legend: '12.' },
    { type: CellType.blank },
    { type: CellType.cell },
    { type: CellType.blank },
    { type: CellType.cell, legend: '13.' },
    { type: CellType.cell }
  ],
  [
    { type: CellType.cell, decorator: 'vth' },
    { type: CellType.cell, legend: '14.' },
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
    { type: CellType.cell, legend: '15.' },
    { type: CellType.cell, decorator: 'htv' }
  ],
  [
    { type: CellType.cell, legend: '16.' },
    { type: CellType.cell },
    { type: CellType.cell },
    { type: CellType.cell },
    { type: CellType.blank },
    { type: CellType.cell, decorator: 'vth' },
    { type: CellType.cell },
    { type: CellType.blank },
    { type: CellType.cell }
  ]
];
