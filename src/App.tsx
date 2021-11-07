import * as React from 'react';
import './App.css';
import { Cell, PeonsColor } from './types';
import getCellBackground from './utils/getCellBackground';
import getPeon from './utils/getPeon';
import getPeonsQuantityByColors from './utils/getPeonsQuantityByColor';
import getValidMoves from './utils/getValidMoves';

const ROWS = 8;
const COLUMNS = 10;
const peonsPerColor = (COLUMNS * 3) / 2;

const initialBoard: Cell[] = [...Array(ROWS * COLUMNS)].map((_, index) => ({
  cellNumber: index,
  peon: getPeon(index, COLUMNS, ROWS),
  backgroundColor: getCellBackground(index, COLUMNS),
  selected: false,
}));

function App() {
  const [board, setBoard] = React.useState(initialBoard);

  const whitePoints = peonsPerColor - getPeonsQuantityByColors(board, 'black');
  const blackPoints = peonsPerColor - getPeonsQuantityByColors(board, 'white');

  const selectedPeon = board.find(({ selected }) => selected === true);

  const colorPlaying = React.useRef<PeonsColor>('white');
  const possibleMoves = React.useRef<number[]>();

  const handlePlay = (cellNumber: number) => {
    const clickedCell = board[cellNumber];
    const newBoard = [...board];

    //the user clicked on a peon of wrong color or on an empty cell
    if (!selectedPeon && clickedCell.peon !== colorPlaying.current) {
      return;
    }

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

  return (
    <main>
      <section className='board'>
        {board.map(({ cellNumber, peon, backgroundColor, selected }) => (
          <div
            key={cellNumber}
            className={`cell ${backgroundColor} ${selected ? 'selected' : ''}`}
            onClick={() => handlePlay(cellNumber)}
          >
            {peon}
          </div>
        ))}
      </section>
      <section className='turn'>
        It's the turn of {colorPlaying.current}
      </section>
      <section>
        <h2>Points:</h2>
        <p>
          {`White: ${whitePoints}`}
          <span>{whitePoints === peonsPerColor && 'White wins!'}</span>
        </p>
        <p>
          {`Black: ${blackPoints}`}
          <span>{blackPoints === peonsPerColor && 'Black wins!'}</span>
        </p>
      </section>
    </main>
  );
}

export default App;
