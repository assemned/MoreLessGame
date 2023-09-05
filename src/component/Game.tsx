import { useState } from "react";
import BestScores from "./BestScores";

interface Props {
  userName: string;
}

function Game(props: Props) {
  const [randomNumber, setRandomNumber] = useState(
    Math.floor(Math.random() * 101)
  );
  const [guessNumber, setGuessNumber] = useState("");
  const [score, setScore] = useState(0);
  const [comparisonResult, setComparisonResult] = useState("");
  const [isHiddenStart, setIsHiddenStart] = useState(false);
  const [isHiddenReset, setIsHiddenReset] = useState(true);

  const Reset = () => {
    setRandomNumber(Math.floor(Math.random() * 101)),
      setScore(0),
      setGuessNumber(""),
      setComparisonResult("");
    setIsHiddenStart(false);
    setIsHiddenReset(true);
  };

  const compareNumber = () => {
    if (parseInt(guessNumber) > 100 || parseInt(guessNumber) < 0) {
      setComparisonResult("Enter a number between 0 - 100");
    } else if (randomNumber > parseInt(guessNumber)) {
      setComparisonResult("More"), setScore(score + 1);
    } else if (randomNumber < parseInt(guessNumber)) {
      setComparisonResult("Less"), setScore(score + 1);
    } else if (randomNumber === parseInt(guessNumber)) {
      setScore(score + 1), setIsHiddenStart(true), setIsHiddenReset(false);
      setComparisonResult("Exactly! You did it in " + (score + 1) + " shoot!"),
        addBestScore(props.userName, score + 1);
    } else {
      setComparisonResult("Enter a Valid Number!");
    }
  };

  const loadScoresFromLocalStorage = () => {
    const savedScores = localStorage.getItem("bestScores");
    return savedScores ? JSON.parse(savedScores) : [];
  };

  const saveScoresToLocalStorage = (scores: any[]) => {
    localStorage.setItem("bestScores", JSON.stringify(scores));
  };

  const [bestScores, setBestScores] = useState(loadScoresFromLocalStorage());

  const addBestScore = (userName: string, score: number) => {
    const newScore = { name: userName, score: score };
    const updatedScores = [...bestScores, newScore].sort(
      (a, b) => a.score - b.score
    );
    const top5Scores = updatedScores.slice(0, 5);

    setBestScores(top5Scores);
    saveScoresToLocalStorage(top5Scores);
  };

  return (
    <>
      <div>
        <h1>Game</h1>
        <label htmlFor="guess">Guess The Number between 0 - 100</label>
        <br />
        <input
          type="number"
          id="guess"
          value={guessNumber}
          onChange={(e) => setGuessNumber(e.target.value)}
        />
        <br />
        <button onClick={compareNumber} hidden={isHiddenStart}>
          Submit
        </button>
        <button onClick={Reset} hidden={isHiddenReset}>
          Play Again
        </button>
        {comparisonResult && <p>{comparisonResult}</p>}
        <br />
        <p hidden={isHiddenStart}>Score: {score}</p>
      </div>
      <BestScores bestScores={bestScores} />
    </>
  );
}

export default Game;
