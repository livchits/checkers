import { CellData, PeonsColor } from './../types';

export default function getPeonsQuantityByColors(
  board: CellData[],
  peonColor: PeonsColor
) {
  return board.filter(({ peon }) => peon === peonColor).length;
}
