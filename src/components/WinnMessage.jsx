import { useState, useEffect } from "react";

const API_URL = "http://localhost:3001/api/scores";

function WinnMessage({ moves }) {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(setLeaderboard)
      .catch((err) => console.error("Failed to load leaderboard:", err));
  }, []);

  const handleSubmit = async () => {
    if (!name.trim()) return;

    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, moves }),
      });
      setSubmitted(true);

      const updated = await fetch(API_URL).then((res) => res.json());
      setLeaderboard(updated);
    } catch (err) {
      console.error("Failed to submit score:", err);
    }
  };

  return (
    <div className="win-message">
      <h2>🎉 You won in {moves} moves!</h2>

      {!submitted ? (
        <div className="win-message-form">
          <input
            className="win-message-input"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
          <button
            className="win-message-submit"
            onClick={handleSubmit}
            disabled={!name.trim()}
          >
            Save my score
          </button>
        </div>
      ) : (
        <p className="win-message-saved">✅ Score saved!</p>
      )}

      <div className="leaderboard">
        <h3>🏆 Best Scores (fewest moves)</h3>
        <ol className="leaderboard-list">
          {leaderboard.map((entry, i) => (
            <li className="leaderboard-item" key={i}>
              <span className="leaderboard-rank">#{i + 1}</span>
              <span className="leaderboard-name">{entry.name}</span>
              <span className="leaderboard-moves">{entry.moves} moves</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default WinnMessage;