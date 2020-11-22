import { DecoratorType } from 'components/Decorator';

interface PlanCell {
  type: 'blank' | 'cell';
  legend?: string;
  decorator?: DecoratorType;
}

export const plan: PlanCell[][] = [
  [
    { type: 'blank' },
    { type: 'cell', legend: '1.' },
    { type: 'cell', legend: '2.' },
    { type: 'cell', legend: '3.' },
    { type: 'cell', legend: '4.' },
    { type: 'cell', legend: '5.' },
    { type: 'cell' },
    { type: 'cell' },
    { type: 'blank' }
  ],
  [
    { type: 'blank' },
    { type: 'blank' },
    { type: 'cell', decorator: 'vth' },
    { type: 'cell' },
    { type: 'cell' },
    { type: 'cell' },
    { type: 'blank' },
    { type: 'blank' },
    { type: 'blank' }
  ],
  [
    { type: 'cell', legend: '6.' },
    { type: 'blank' },
    { type: 'blank' },
    { type: 'cell', legend: '7.' },
    { type: 'cell' },
    { type: 'blank' },
    { type: 'cell', legend: '8.' },
    { type: 'cell', legend: '9.' },
    { type: 'cell' }
  ],
  [
    { type: 'cell' },
    { type: 'blank' },
    { type: 'blank' },
    { type: 'cell', legend: '10.' },
    { type: 'cell' },
    { type: 'cell', decorator: 'htv' },
    { type: 'blank' },
    { type: 'cell' },
    { type: 'blank' }
  ],
  [
    { type: 'cell', legend: '11.' },
    { type: 'cell' },
    { type: 'cell' },
    { type: 'cell' },
    { type: 'cell' },
    { type: 'cell' },
    { type: 'cell' },
    { type: 'cell' },
    { type: 'blank' }
  ],
  [
    { type: 'cell' },
    { type: 'blank' },
    { type: 'blank' },
    { type: 'cell', legend: '12.' },
    { type: 'blank' },
    { type: 'cell' },
    { type: 'blank' },
    { type: 'cell' },
    { type: 'blank' }
  ],
  [
    { type: 'cell', decorator: 'vth' },
    { type: 'cell', legend: '13.' },
    { type: 'blank' },
    { type: 'cell' },
    { type: 'blank' },
    { type: 'cell' },
    { type: 'blank' },
    { type: 'cell' },
    { type: 'blank' }
  ],
  [
    { type: 'blank' },
    { type: 'cell' },
    { type: 'blank' },
    { type: 'blank' },
    { type: 'blank' },
    { type: 'cell' },
    { type: 'blank' },
    { type: 'cell', legend: '14.' },
    { type: 'cell', decorator: 'htv' }
  ],
  [
    { type: 'cell', legend: '15.' },
    { type: 'cell' },
    { type: 'cell' },
    { type: 'cell' },
    { type: 'blank' },
    { type: 'cell', decorator: 'vth' },
    { type: 'cell' },
    { type: 'blank' },
    { type: 'cell' }
  ]
];
