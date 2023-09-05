import { useEffect, useState } from "react";
import { FormEvent } from "react";
import Game from "./component/Game";
import BestScores from "./component/BestScores";

function App() {
  const [userName, setUserName] = useState("");
  const [isGameStarted, setIsGameStarted] = useState(false);

  const [bestScores, setBestScores] = useState([]);

  useEffect(() => {
    const savedScores = localStorage.getItem("bestScores");
    if (savedScores) {
      setBestScores(JSON.parse(savedScores));
    } else {
      setBestScores([]);
    }
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsGameStarted(true);
  };

  return (
    <>
      {isGameStarted ? (
        <Game userName={userName} />
      ) : (
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              minLength={3}
              required
              pattern="[A-Za-z]+"
              placeholder="Enter Your Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <br />
            <button type="submit">PLAY</button>
            <br />
          </form>
          <BestScores bestScores={bestScores} />
        </div>
      )}
    </>
  );
}

export default App;
