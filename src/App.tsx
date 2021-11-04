import './App.css';

import getPeon from './utils/getPeon';
import getCellBackground from './utils/getCellBackground';

const ROWS = 8;
const COLUMNS = 10;

const cellsQuantity = ROWS * COLUMNS;

const cells = [...Array(cellsQuantity)].map((_, index) => ({
  cellNumber: index,
  peon: getPeon(index, COLUMNS, ROWS),
  backgroundColor: getCellBackground(index, COLUMNS),
}));

function App() {
  return (
    <main>
      {cells.map(({ cellNumber, peon, backgroundColor }) => (
        <div key={cellNumber} className={`cell ${backgroundColor}`}>
          {peon}
        </div>
      ))}
    </main>
  );
}

export default App;
