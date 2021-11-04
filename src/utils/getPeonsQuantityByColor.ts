import { Cell, PeonsColor } from './../types';

export default function getPeonsQuantityByColors(
  cells: Cell[],
  peonColor: PeonsColor
) {
  return cells.filter(({ peon }) => peon === peonColor).length;
}
