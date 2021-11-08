import { CellData } from '../types';
import './Cell.css';

interface CellProps {
  cellData: CellData;
  onPlay: (cellNumber: number) => void;
}

function Cell({ cellData, onPlay }: CellProps) {
  const { backgroundColor, cellNumber, selected, peon } = cellData;
  const peonColor = peon === 'white' ? 'white' : 'black';
  const isSelected = selected ? 'selected' : '';

  return (
    <div
      aria-hidden='true'
      className={`cell ${backgroundColor}`}
      onClick={() => onPlay(cellNumber)}
    >
      {peon && <div className={`peon ${peonColor} ${isSelected}`} />}
    </div>
  );
}

export default Cell;
