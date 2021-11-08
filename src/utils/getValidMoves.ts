import { CellData } from '../types';

export default function getValidMoves(cellNumber: number, board: CellData[]) {
  const selectedPeonColor = board[cellNumber].peon;

  const adjacentMoves: number[] =
    selectedPeonColor === 'white'
      ? [cellNumber + 9, cellNumber + 11]
      : [cellNumber - 9, cellNumber - 11];

  const possibleMoves = adjacentMoves
    .filter((move) => board[move]?.peon !== selectedPeonColor)
    .map((move) =>
      //check if the move is an enemy peon or an empty cell
      //if it's an enemy return the cell after take it
      !board[move]?.peon ? move : move - cellNumber + move
    )
    //remove moves with peons
    .filter((move) => board[move]?.peon === null)
    //remove cells where couldn't be a peon
    .filter((move) => board[move].backgroundColor === 'bg-dark');

  //check if there is a move that implies take an enemy peon
  const moveImpliesTakeEnemyPeon = (move: number) =>
    Math.abs(cellNumber - move) > 11;

  const cantTakeEnemyPeon = possibleMoves.some(moveImpliesTakeEnemyPeon);

  const validMoves = cantTakeEnemyPeon
    ? possibleMoves.filter(moveImpliesTakeEnemyPeon)
    : possibleMoves;

  return validMoves;
}
