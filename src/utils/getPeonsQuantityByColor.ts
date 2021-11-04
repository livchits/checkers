import { Cell, PeonsColor } from './../types';

export default function getPeonsQuantityByColors(
  board: Cell[],
  peonColor: PeonsColor
) {
  return board.filter(({ peon }) => peon === peonColor).length;
}
