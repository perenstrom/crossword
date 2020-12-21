export interface CellPosition {
  x: number;
  y: number;
}

export enum Direction {
  horizontal = 'horizontal',
  vertical = 'vertical'
}

export interface Size {
  x: number;
  y: number;
}

export interface PixelSize {
  width: number;
  height: number;
}

export interface LineItem {
  cellPosition: string;
  direction: Direction | 'both';
}

export enum CellType {
  blank = 'blank',
  cell = 'cell'
}

export interface Line {
  horizontal: string[];
  vertical: string[];
}

export enum DecoratorType {
  htv = 'htv',
  vth = 'vth'
}

export interface PlanCell {
  type: CellType;
  legend?: number;
  decorator?: DecoratorType;
  line?: Line;
}

export type Plan = PlanCell[][];

export enum EditMode {
  cell = 'cell',
  wordStart = 'wordStart',
  decorator = 'decorator'
}

export enum CellCode {
  blank = 'x',
  cell = 'o',
  wordStart = 'a',
  htv = 'r',
  vth = 'l',
  newLine = 'n',
  width = 'w',
  height = 'h'
}
