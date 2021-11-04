import { CellBackground } from '../types';

export default function getCellBackground(
  cellNumber: number,
  columns: number
): CellBackground {
  return Math.floor(cellNumber / columns + cellNumber) % 2 === 0
    ? 'bg-light'
    : 'bg-dark';
}
