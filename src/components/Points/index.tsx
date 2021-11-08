import './Points.css';

interface PointsProps {
  whitePoints: number;
  blackPoints: number;
  peonsPerColor: number;
}

function Points({ whitePoints, blackPoints, peonsPerColor }: PointsProps) {
  return (
    <section>
      <h2>Points:</h2>
      <p>
        {`White: ${whitePoints}`}
        <span>{whitePoints === peonsPerColor && 'White wins!'}</span>
      </p>
      <p>
        {`Black: ${blackPoints}`}
        <span>{blackPoints === peonsPerColor && 'Black wins!'}</span>
      </p>
    </section>
  );
}

export default Points;
