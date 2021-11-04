import './App.css';

import getPeon from './utils/getPeon';
import getCellBackground from './utils/getCellBackground';

const ROWS = 8;
const COLUMNS = 10;

const cells = [...Array(ROWS * COLUMNS)].map((_, index) => ({
  cellNumber: index,
  peon: getPeon(index, COLUMNS, ROWS),
  backgroundColor: getCellBackground(index, COLUMNS),
}));

function App() {
  const whitePoints =
    (COLUMNS * 3) / 2 - cells.filter(({ peon }) => peon === 'B').length;

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
