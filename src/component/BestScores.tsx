import { useState } from "react";

function BestScores({ bestScores }: { bestScores: any[] }) {
  const [isHidden, setIsHidden] = useState(true);
  const handleClick = () => {
    setIsHidden(!isHidden);
  };

  return (
    <>
      <button className="btn btn-outline-dark btn-sm m-3" onClick={handleClick}>
        Best Scores
      </button>
      <div hidden={isHidden}>
        <h3>
          <strong>The Best Scores</strong>
        </h3>
        <ul className="list-group">
          {bestScores.map((score: any, index: number) => (
            <li
              key={index}
              className="list-group-item list-group-item-light d-flex justify-content-between align-items-center fw-semibold"
            >
              {score.name}
              <span className="badge bg-dark rounded-pill">{score.score}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default BestScores;
