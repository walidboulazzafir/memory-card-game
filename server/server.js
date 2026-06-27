import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
app.use(cors());
app.use(express.json());

const DB_FILE = "./scores.json";

function readScores() {
    if (!fs.existsSync(DB_FILE)) return [];
    return JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
}

function writeScores(scores) {
    fs.writeFileSync(DB_FILE, JSON.stringify(scores, null, 2));
}

// GET /api/scores -> top 10, FEWEST moves first (best score = fewest moves)
app.get("/api/scores", (req, res) => {
    const top = readScores()
        .sort((a, b) => a.moves - b.moves)
        .slice(0, 10);
    res.json(top);
});

// POST /api/scores -> submit a finished game
app.post("/api/scores", (req, res) => {
    const { name, moves } = req.body;

    if (!name || typeof moves !== "number") {
        return res.status(400).json({ error: "name and moves (number) are required" });
    }

    const scores = readScores();
    scores.push({ name, moves, date: new Date().toISOString() });
    writeScores(scores);

    res.status(201).json({ message: "Score saved!" });
});

app.listen(3001, () => console.log("API running on http://localhost:3001"));