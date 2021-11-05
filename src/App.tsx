import * as React from 'react';
import './App.css';
import { Cell, PeonsColor } from './types';
import getCellBackground from './utils/getCellBackground';
import getPeon from './utils/getPeon';
import getPeonsQuantityByColors from './utils/getPeonsQuantityByColor';
import getPossibleMoves from './utils/getPossibleMoves';

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

  const selectedPeon = React.useRef<number | null>(null);
  const colorPlaying = React.useRef<PeonsColor>('white');
  const possibleMoves = React.useRef<number[]>();

  const selectPeon = (cellNumber: number) => {
    const newBoard = [...board];
    const clickedCell = board[cellNumber];

    //the user clicked over a peon of wrong color. Not it's turn
    if (clickedCell.peon !== colorPlaying.current) {
      return;
      //there isn't a selected peon and there is a peon in the cell. Correct selection
    } else if (!selectedPeon.current && clickedCell.peon) {
      newBoard[cellNumber].selected = true;
      selectedPeon.current = cellNumber;
      possibleMoves.current = getPossibleMoves(cellNumber, board);
      //the user is clicking on the already selected peon, thus it's deselected
    } else if (selectedPeon.current === cellNumber) {
      newBoard[cellNumber].selected = false;
      selectedPeon.current = null;
    }
    setBoard(newBoard);
  };

  return (
    <main>
      <section className='board'>
        {board.map(({ cellNumber, peon, backgroundColor, selected }) => (
          <div
            key={cellNumber}
            className={`cell ${backgroundColor} ${selected ? 'selected' : ''}`}
            onClick={() => selectPeon(cellNumber)}
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
        <p>{`White: ${whitePoints}`}</p>
        <p>{`Black: ${blackPoints}`}</p>
      </section>
    </main>
  );
}

export default App;
