import { useState } from "react";
import BestScores from "./BestScores";
import { FormEvent } from "react";

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
      setComparisonResult("Enter a number between 0 - 100"), setGuessNumber("");
    } else if (randomNumber > parseInt(guessNumber)) {
      setComparisonResult("More"), setScore(score + 1), setGuessNumber("");
    } else if (randomNumber < parseInt(guessNumber)) {
      setComparisonResult("Less"), setScore(score + 1), setGuessNumber("");
    } else if (randomNumber === parseInt(guessNumber)) {
      setScore(score + 1), setIsHiddenStart(true), setIsHiddenReset(false);
      setComparisonResult("Exactly! You did it in " + (score + 1) + " shoot!"),
        addBestScore(props.userName, score + 1),
        setGuessNumber("");
    } else {
      setComparisonResult("Enter a Valid Number!"), setGuessNumber("");
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="background text-center bg-dark-subtle text-emphasis-dark">
        <h1>
          <strong>Guess The Number Game</strong>
        </h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="guess">
            Guess The Number between <br /> <strong>0 - 100</strong>
          </label>
          <br />
          <input
            type="text"
            id="guess"
            autoComplete="off"
            className="form-control text-dark border-dark m-1"
            value={guessNumber}
            onChange={(e) => setGuessNumber(e.target.value)}
          />
          <button
            className="btn btn-dark btn-m  m-1"
            type="submit"
            onClick={compareNumber}
            hidden={isHiddenStart}
          >
            Submit
          </button>
          <button
            className="btn btn-dark  btn-m  m-1"
            onClick={Reset}
            hidden={isHiddenReset}
          >
            Play Again
          </button>
          {comparisonResult && <p className="m-1">{comparisonResult}</p>}
          <br />
          <p hidden={isHiddenStart}>Score: {score}</p>
        </form>
        <BestScores bestScores={bestScores} />
      </div>
    </>
  );
}

export default Game;
