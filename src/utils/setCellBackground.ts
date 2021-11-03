export default function setCellBackground(cellNumber: number, columns: number) {
  return Math.floor(cellNumber / columns + cellNumber) % 2 === 0
    ? 'papayawhip'
    : 'darkgoldenrod';
}
