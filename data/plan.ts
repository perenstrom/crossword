import { DecoratorType } from 'components/Decorator';

export enum CellType {
  blank = 'blank',
  cell = 'cell'
}

interface PlanCell {
  type: CellType;
  legend?: string;
  decorator?: DecoratorType;
}

export const plan: PlanCell[][] = [
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
    { type: CellType.cell },
    { type: CellType.blank }
  ],
  [
    { type: CellType.cell, decorator: 'vth' },
    { type: CellType.cell, legend: '13.' },
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
    { type: CellType.cell, legend: '14.' },
    { type: CellType.cell, decorator: 'htv' }
  ],
  [
    { type: CellType.cell, legend: '15.' },
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
