export default function getPeon(
  cellNumber: number,
  columns: number,
  rows: number
) {
  if (
    Math.floor(cellNumber / columns + cellNumber) % 2 !== 0 &&
    cellNumber < columns * 3
  ) {
    return 'W';
  }
  if (
    Math.floor(cellNumber / columns + cellNumber) % 2 !== 0 &&
    cellNumber >= rows * columns - columns * 3
  ) {
    return 'B';
  }
  return null;
}
