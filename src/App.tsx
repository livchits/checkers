import './App.css';

import setPeon from './utils/setPeon';
import setCellBackground from './utils/setCellBackground';

const ROWS = 8;
const COLUMNS = 10;

const cellsQuantity = ROWS * COLUMNS;

const cells = [...Array(cellsQuantity)].map((_, index) => ({
  cellNumber: index,
  peon: setPeon(index, COLUMNS, ROWS),
  backgroundColor: setCellBackground(index, COLUMNS),
}));

function App() {
  return (
    <main>
      {cells.map(({ cellNumber, peon, backgroundColor }) => (
        <div
          key={cellNumber}
          className='cell'
          style={{
            backgroundColor,
          }}
        >
          {peon}
        </div>
      ))}
    </main>
  );
}

export default App;
