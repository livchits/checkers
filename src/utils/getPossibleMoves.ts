import { Cell } from '../types';

export default function getPossibleMoves(cellNumber: number, board: Cell[]) {
  const possibleMoves: number[] =
    board[cellNumber].peon === 'white'
      ? [cellNumber + 9, cellNumber + 11]
      : [cellNumber - 9, cellNumber - 11];

  return possibleMoves.filter(
    (cellNumber) =>
      board[cellNumber].backgroundColor === 'bg-dark' && !board[cellNumber].peon
  );
}
