export type PeonsColor = 'white' | 'black';

export type CellBackground = 'bg-light' | 'bg-dark';

export interface CellData {
  cellNumber: number;
  peon: PeonsColor | null;
  backgroundColor: CellBackground;
  selected: boolean;
}
