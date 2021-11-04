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
}));

function App() {
  const [board, setBoard] = React.useState(initialBoard);

  const whitePoints = peonsPerColor - getPeonsQuantityByColors(board, 'B');
  const blackPoints = peonsPerColor - getPeonsQuantityByColors(board, 'W');

  return (
    <main>
      <section className='board'>
        {board.map(({ cellNumber, peon, backgroundColor }) => (
          <div key={cellNumber} className={`cell ${backgroundColor}`}>
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
