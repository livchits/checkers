export default function getCellBackground(cellNumber: number, columns: number) {
  return Math.floor(cellNumber / columns + cellNumber) % 2 === 0
    ? 'papayawhipli'
    : 'darkgoldenrod';
}
