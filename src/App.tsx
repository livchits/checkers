import * as React from 'react';

import './App.css';
import Cell from './components/Cell';
import Points from './components/Points';
import { COLUMNS, ROWS } from './constants';
import { PeonsColor } from './types';
import generateInitialBoard from './utils/generateInitialBoard';
import getPeonsQuantityByColors from './utils/getPeonsQuantityByColor';
import getValidMoves from './utils/getValidMoves';

const peonsPerColor = (COLUMNS * 3) / 2;

function App() {
  const [board, setBoard] = React.useState(() =>
    generateInitialBoard(ROWS, COLUMNS)
  );

  const whitePoints = peonsPerColor - getPeonsQuantityByColors(board, 'black');
  const blackPoints = peonsPerColor - getPeonsQuantityByColors(board, 'white');
  const winner = whitePoints === peonsPerColor || blackPoints === peonsPerColor;

  const selectedPeon = board.find(({ selected }) => selected === true);

  const colorPlaying = React.useRef<PeonsColor>('white');
  const possibleMoves = React.useRef<number[]>();

  const handlePlay = (cellNumber: number) => {
    const clickedCell = board[cellNumber];
    const isInvalidSelection =
      (!selectedPeon && clickedCell.peon !== colorPlaying.current) || winner;

    //the user clicked on a peon of wrong color, on an empty cell or there is a winner
    if (isInvalidSelection) {
      return;
    }

    const newBoard = [...board];
    //there isn't a selected peon and there is a peon in the cell. Correct selection
    if (!selectedPeon) {
      newBoard[cellNumber].selected = true;
      possibleMoves.current = getValidMoves(cellNumber, board);
      return setBoard(newBoard);
    }

    //there is a selected peon and clicked cell is a possible move
    if (possibleMoves.current?.includes(cellNumber)) {
      newBoard[cellNumber].peon = colorPlaying.current;
      newBoard[selectedPeon.cellNumber].peon = null;
      newBoard[selectedPeon.cellNumber].selected = false;

      //check if the move implies take a peon
      if (Math.abs(selectedPeon.cellNumber - cellNumber) > COLUMNS + 1) {
        const cellOfTakenPeon =
          board[(selectedPeon.cellNumber - cellNumber) / 2 + cellNumber];
        newBoard[cellOfTakenPeon.cellNumber].peon = null;
      }

      colorPlaying.current =
        colorPlaying.current === 'white' ? 'black' : 'white';
    }

    //the user clicked on an already selected peon, thus it's deselected
    if (cellNumber === selectedPeon.cellNumber) {
      newBoard[cellNumber].selected = false;
    }
    return setBoard(newBoard);
  };

  const checkersBoard = board.map((cell) => (
    <Cell key={cell.cellNumber} cellData={cell} onPlay={handlePlay} />
  ));

  return (
    <main>
      <h1>Checkers</h1>
      <section className='board'>{checkersBoard}</section>
      <section className='turn'>
        It&apos;s <span>{colorPlaying.current}</span>&apos;s turn
      </section>
      <Points
        blackPoints={blackPoints}
        peonsPerColor={peonsPerColor}
        whitePoints={whitePoints}
      />
    </main>
  );
}

export default App;
