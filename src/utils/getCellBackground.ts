export default function getCellBackground(
  cellNumber: number,
  columns: number
): string {
  return Math.floor(cellNumber / columns + cellNumber) % 2 === 0
    ? 'bg-light'
    : 'bg-dark';
}
