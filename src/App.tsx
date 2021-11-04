import * as React from 'react';
import './App.css';
import { Cell } from './types';
import getCellBackground from './utils/getCellBackground';
import getPeon from './utils/getPeon';
import getPeonsQuantityByColors from './utils/getPeonsQuantityByColor';

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

  const whitePoints = peonsPerColor - getPeonsQuantityByColors(board, 'B');
  const blackPoints = peonsPerColor - getPeonsQuantityByColors(board, 'W');

  const selectedPeon = React.useRef<number | null>(null);

  const selectPeon = (cellNumber: number) => {
    const newBoard = [...board];
    //there isn't a selected peon and there is a peon in the cell
    if (!selectedPeon.current && board[cellNumber].peon) {
      newBoard[cellNumber].selected = true;
      selectedPeon.current = cellNumber;
      //the user is clicking on the already selected peon
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
      <section>
        <h2>Points:</h2>
        <p>{`White: ${whitePoints}`}</p>
        <p>{`Black: ${blackPoints}`}</p>
      </section>
    </main>
  );
}

export default App;
