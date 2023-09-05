import { useState } from "react";

function BestScores({ bestScores }: { bestScores: any[] }) {
  const [isHidden, setIsHidden] = useState(true);
  const handleClick = () => {
    setIsHidden(!isHidden);
  };

  return (
    <>
      <button onClick={handleClick}>Best Scores</button>
      <div hidden={isHidden}>
        <h2>The Best Scores</h2>
        <ul className="list-group">
          {bestScores.map((score: any, index: number) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {score.name}
              <span className="badge bg-primary rounded-pill">
                {score.score}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default BestScores;
