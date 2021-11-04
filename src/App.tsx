import './App.css';

import getPeon from './utils/getPeon';
import getCellBackground from './utils/getCellBackground';
import getPeonsQuantityByColors from './utils/getPeonsQuantityByColor';
import { Cell } from './types';

const ROWS = 8;
const COLUMNS = 10;
const peonsPerColor = (COLUMNS * 3) / 2;

const cells: Cell[] = [...Array(ROWS * COLUMNS)].map((_, index) => ({
  cellNumber: index,
  peon: getPeon(index, COLUMNS, ROWS),
  backgroundColor: getCellBackground(index, COLUMNS),
}));

function App() {
  const whitePoints = peonsPerColor - getPeonsQuantityByColors(cells, 'B');
  const blackPoints = peonsPerColor - getPeonsQuantityByColors(cells, 'W');

  return (
    <main>
      <section className='board'>
        {cells.map(({ cellNumber, peon, backgroundColor }) => (
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
