export type PeonsColor = 'W' | 'B';

export type CellBackground = 'bg-light' | 'bg-dark';

export interface Cell {
  cellNumber: number;
  peon: PeonsColor | null;
  backgroundColor: CellBackground;
  selected: boolean;
}
