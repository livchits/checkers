export default function getPeon(
  cellNumber: number,
  columns: number,
  rows: number
) {
  if (
    Math.floor(cellNumber / columns + cellNumber) % 2 !== 0 &&
    cellNumber < columns * 3
  ) {
    return 'white';
  }
  if (
    Math.floor(cellNumber / columns + cellNumber) % 2 !== 0 &&
    cellNumber >= rows * columns - columns * 3
  ) {
    return 'black';
  }
  return null;
}
