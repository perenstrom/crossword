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

export interface LineItem {
  cellPosition: string;
  direction: Direction | 'both';
}
