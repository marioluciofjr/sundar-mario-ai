import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Lang, translations } from "../lib/i18n";

interface Phase2Props {
  onComplete: (score: number) => void;
  lang: Lang;
}

interface Ball {
  id: number;
  letter: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  fontSize: string;
  color: string;
  isCorrect: boolean;
  active: boolean;
}

const BALL_RADIUS = 30;
const LETTERS_GEMINI = ["G", "E", "M", "I", "N", "I"];
const LETTERS_DECOY = ["A", "B", "C", "D", "F", "H", "J", "K", "L", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2"];

const COLORS = ["#4285f4", "#ea4335", "#fbbc04", "#34a853", "#a142f4", "#f442b3"];

export function Phase2({ onComplete, lang }: Phase2Props) {
  const t = translations[lang];
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const ballsRef = useRef<Ball[]>([]);
  const requestRef = useRef<number>(0);
  const playAreaRef = useRef<HTMLDivElement>(null);

  // Initialize balls
  useEffect(() => {
    if (typeof window === "undefined") return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const isMobile = w < 768;
    const ballRadius = isMobile ? 18 : 30;
    const ballFontSize = isMobile ? "text-lg" : "text-2xl";

    const initialBalls: Ball[] = [];
    const totalBalls = 60; // 20 correct, 40 decoy

    for (let i = 0; i < totalBalls; i++) {
      const isCorrect = i < 25; // 25 correct letters
      const letter = isCorrect 
          ? LETTERS_GEMINI[Math.floor(Math.random() * LETTERS_GEMINI.length)]
          : LETTERS_DECOY[Math.floor(Math.random() * LETTERS_DECOY.length)];
      
      initialBalls.push({
        id: i,
        letter,
        x: Math.random() * (w - ballRadius * 2),
        y: Math.random() * (h - ballRadius * 2),
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6,
        size: ballRadius * 2,
        fontSize: ballFontSize,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        isCorrect,
        active: true
      });
    }
    ballsRef.current = initialBalls;

    // Trigger explicit re-render to draw them
    setScore(s => s); 
  }, []);

  // Timer
  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete(score);
      return;
    }
    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, onComplete, score]);

  // Game Loop
  useEffect(() => {
    const update = () => {
      if (typeof window === "undefined") return;
      const w = window.innerWidth;
      const h = window.innerHeight;

      ballsRef.current.forEach(ball => {
        if (!ball.active) return;
        ball.x += ball.vx;
        ball.y += ball.vy;

        if (ball.x <= 0 || ball.x >= w - ball.size) {
          ball.vx *= -1;
          ball.x = Math.max(0, Math.min(ball.x, w - ball.size));
        }
        if (ball.y <= 0 || ball.y >= h - ball.size) {
          ball.vy *= -1;
          ball.y = Math.max(0, Math.min(ball.y, h - ball.size));
        }
      });
      // Force react render by updating ref - actually we shouldn't trigger state on every frame for 60 elements due to perf, 
      // but let's see if React handles it. Better: use direct DOM manipulation, or state.
      // Wait, direct state update 60 times a sec might be slow in React, but for 60 balls it's fine.
      setScore(s => s); // dummy update to re-render. Instead of doing this, let's keep balls in state? 
      // No, `setScore(s=>s)` doesn't rerender if state hasn't changed. We need a tick state.
      
      requestRef.current = requestAnimationFrame(update);
    };
    
    // To trigger re-render properly:
    // Let's use a tick state
    let lastTime = performance.now();
    const loop = (time: number) => {
        update();
    }
    
    requestRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  // Workaround: To actually re-render balls cleanly in React without a 60fps setState that might lag,
  // we could just use a canvas, but SVG or absolute divs are okay if we force update.
  // Let's use a standard forceUpdate hack:
  const [, setTick] = useState(0);
  useEffect(() => {
     let raf: number;
     const tickAnimation = () => {
         setTick(t => t + 1);
         raf = requestAnimationFrame(tickAnimation);
     };
     raf = requestAnimationFrame(tickAnimation);
     return () => cancelAnimationFrame(raf);
  }, []);

  const handleBallClick = (id: number) => {
    const ball = ballsRef.current.find(b => b.id === id);
    if (!ball || !ball.active) return;

    if (ball.isCorrect) {
      setScore(s => s + 10);
      ball.active = false; // Hide it
    } else {
      setScore(s => Math.max(0, s - 5)); // Penalty
    }
  };

  return (
    <div 
      ref={playAreaRef} 
      className="relative w-full h-screen bg-[#000] overflow-hidden select-none"
      style={{ cursor: "crosshair" }}
    >
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-8 px-8 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
        <div className="text-2xl font-mono text-white">
          {t.phase2_time}: <span className={timeLeft <= 3 ? "text-brand-red font-bold animate-pulse" : "text-brand-yellow font-bold"}>{timeLeft}s</span>
        </div>
        <div className="text-2xl font-mono text-white">
          {t.phase2_score}: <span className="text-brand-green font-bold">{score}</span>
        </div>
      </div>

      <div className="absolute top-24 w-full text-center z-10 pointer-events-none">
        <p className="text-gray-400 font-sans tracking-widest text-sm uppercase">{t.phase2_hint}</p>
      </div>

      {ballsRef.current.map(ball => (
        ball.active && (
          <motion.div
            key={ball.id}
            onPointerDown={() => handleBallClick(ball.id)}
            className={`absolute rounded-full flex items-center justify-center font-bold text-white cursor-pointer hover:scale-110 active:scale-90 ${ball.fontSize}`}
            style={{
              left: ball.x,
              top: ball.y,
              width: ball.size,
              height: ball.size,
              backgroundColor: ball.color,
              boxShadow: `inset -5px -5px 15px rgba(0,0,0,0.3), 0 0 10px ${ball.color}80`
            }}
          >
            {ball.letter}
          </motion.div>
        )
      ))}
    </div>
  );
}
