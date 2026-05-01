import { useState, useEffect } from "react";
import { Intro } from "./components/Intro";
import { Phase1 } from "./components/Phase1";
import { Phase2 } from "./components/Phase2";
import { GameOver } from "./components/GameOver";
import { Lang } from "./lib/i18n";

type GameState = "intro" | "phase1" | "phase2" | "gameover";

export interface ScoreEntry {
  date: string;
  score: number;
}

export default function App() {
  const [gameState, setGameState] = useState<GameState>("intro");
  const [finalScore, setFinalScore] = useState(0);
  const [lang, setLang] = useState<Lang>("en");
  const [isNewRecord, setIsNewRecord] = useState(false);
  
  const [history, setHistory] = useState<ScoreEntry[]>(() => {
    const saved = localStorage.getItem("sundarmario_history");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    return [];
  });

  const highScore = history.length > 0 ? Math.max(...history.map(h => h.score)) : 0;

  const startPhase1 = () => {
    setGameState("phase1");
  };

  const completePhase1 = () => {
    setGameState("phase2");
  };

  const completePhase2 = (score: number) => {
    setFinalScore(score);
    setIsNewRecord(score > highScore && score > 0);
    
    const newRecord: ScoreEntry = { date: new Date().toISOString(), score };
    const newHistory = [newRecord, ...history].slice(0, 10);
    setHistory(newHistory);
    localStorage.setItem("sundarmario_history", JSON.stringify(newHistory));
    
    setGameState("gameover");
  };

  const restartGame = () => {
    setFinalScore(0);
    setIsNewRecord(false);
    setGameState("intro");
  };

  const resetScores = () => {
    setHistory([]);
    localStorage.removeItem("sundarmario_history");
  };

  return (
    <main className="w-full h-screen bg-[#050505] text-white overflow-hidden">
      {gameState === "intro" && <Intro onStart={startPhase1} lang={lang} setLang={setLang} highScore={highScore} onResetScores={resetScores} />}
      {gameState === "phase1" && <Phase1 onComplete={completePhase1} lang={lang} />}
      {gameState === "phase2" && <Phase2 onComplete={completePhase2} lang={lang} />}
      {gameState === "gameover" && <GameOver score={finalScore} onRestart={restartGame} lang={lang} history={history} isNewRecord={isNewRecord} />}
    </main>
  );
}
