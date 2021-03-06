import { CellData } from './../types';
import getCellBackground from './getCellBackground';
import getPeon from './getPeon';

export default function generateInitialBoard(
  rows: number,
  columns: number
): CellData[] {
  return [...Array(rows * columns)].map((_, index) => ({
    cellNumber: index,
    peon: getPeon(index, columns, rows),
    backgroundColor: getCellBackground(index, columns),
    selected: false,
  }));
}
