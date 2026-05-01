import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Lang, translations } from "../lib/i18n";

interface Phase1Props {
  onComplete: () => void;
  lang: Lang;
}

const PLAYER_SIZE = 60;
const STAR_SIZE = 60;
const SPEED = 6;
const TOTAL_STARS = 10;

interface Star {
  id: number;
  x: number;
  y: number;
  active: boolean;
}

export function Phase1({ onComplete, lang }: Phase1Props) {
  const t = translations[lang];
  const [playerPos, setPlayerPos] = useState({ x: 100, y: 100 });
  const [stars, setStars] = useState<Star[]>([]);
  const [captured, setCaptured] = useState(0);
  const keysRef = useRef<{ [key: string]: boolean }>({});
  const requestRef = useRef<number>(0);
  const playAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Randomize star positions
    if (typeof window !== "undefined") {
      const newStars: Star[] = [];
      const MIN_DIST = 140; // minimum spread distance
      for (let i = 0; i < TOTAL_STARS; i++) {
        let placed = false;
        let attempts = 0;
        let x = 0, y = 0;
        while (!placed && attempts < 150) {
          x = Math.max(50, Math.random() * (window.innerWidth - STAR_SIZE - 100));
          y = Math.max(50, Math.random() * (window.innerHeight - STAR_SIZE - 100));
          
          const tooClose = newStars.some(star => Math.hypot(star.x - x, star.y - y) < MIN_DIST);
          if (!tooClose) {
            placed = true;
          }
          attempts++;
        }
        newStars.push({
          id: i,
          x,
          y,
          active: true,
        });
      }
      setStars(newStars);
      setPlayerPos({ x: 50, y: window.innerHeight / 2 });
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current[e.key] = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.key] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const update = () => {
      setPlayerPos((prev) => {
        let { x, y } = prev;
        if (keysRef.current["ArrowUp"] || keysRef.current["w"]) y -= SPEED;
        if (keysRef.current["ArrowDown"] || keysRef.current["s"]) y += SPEED;
        if (keysRef.current["ArrowLeft"] || keysRef.current["a"]) x -= SPEED;
        if (keysRef.current["ArrowRight"] || keysRef.current["d"]) x += SPEED;

        // Boundaries
        if (typeof window !== "undefined") {
          x = Math.max(0, Math.min(x, window.innerWidth - PLAYER_SIZE));
          y = Math.max(0, Math.min(y, window.innerHeight - PLAYER_SIZE));
        }

        return { x, y };
      });

      requestRef.current = requestAnimationFrame(update);
    };
    requestRef.current = requestAnimationFrame(update);

    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  // Collision detection
  useEffect(() => {
    setStars(prevStars => {
      let anyChanged = false;
      const updatedStars = prevStars.map(star => {
        if (!star.active) return star;

        const pCenter = { x: playerPos.x + PLAYER_SIZE / 2, y: playerPos.y + PLAYER_SIZE / 2 };
        const sCenter = { x: star.x + STAR_SIZE / 2, y: star.y + STAR_SIZE / 2 };
        const dist = Math.hypot(pCenter.x - sCenter.x, pCenter.y - sCenter.y);

        if (dist < (PLAYER_SIZE + STAR_SIZE) / 2 - 11) {
          anyChanged = true;
          return { ...star, active: false };
        }
        return star;
      });

      if (anyChanged) {
        const remaining = updatedStars.filter(s => s.active).length;
        setCaptured(TOTAL_STARS - remaining);
        if (remaining === 0) {
          setTimeout(onComplete, 500); // 500ms delay to see the last star disappear
        }
      }

      return anyChanged ? updatedStars : prevStars;
    });
  }, [playerPos, onComplete]);

  return (
    <div 
      ref={playAreaRef} 
      className="relative w-full h-screen bg-[#050505] overflow-hidden"
    >
      {/* Background Grid Elements */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
           style={{
             backgroundImage: 'linear-gradient(#34a853 1px, transparent 1px), linear-gradient(90deg, #34a853 1px, transparent 1px)',
             backgroundSize: '40px 40px'
           }}
      />
      
      {/* Giant Countdown Number */}
      {captured > 0 && (
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <motion.div 
            key={captured}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.15 }}
            exit={{ scale: 1.5, opacity: 0 }}
            className="text-[40vw] font-mono font-black text-white mix-blend-overlay"
          >
            {TOTAL_STARS - captured + 1}
          </motion.div>
        </div>
      )}

      <div className="absolute top-4 w-full text-center z-10 pointer-events-none">
        <h2 className="text-xl font-mono text-brand-green bg-black/50 inline-block px-4 py-2 rounded-full backdrop-blur-sm">
          {t.phase1_hint}
        </h2>
      </div>

      {/* Player (Sundar Mario) */}
      <div
        className="absolute z-30 flex items-center justify-center text-5xl drop-shadow-[0_0_15px_rgba(234,67,53,0.5)]"
        style={{
          left: playerPos.x,
          top: playerPos.y,
          width: PLAYER_SIZE,
          height: PLAYER_SIZE,
        }}
      >
        🧑🏽‍💻<span className="absolute -top-2 -right-2 text-2xl">🍄</span>
      </div>

      {/* AI Stars */}
      <AnimatePresence>
        {stars.map((star) => (
          star.active && (
            <motion.div
              key={star.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0], opacity: 1 }}
              exit={{ scale: 0, opacity: 0, transition: { duration: 0.2 } }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute z-20 flex items-center justify-center text-brand-yellow font-bold text-lg drop-shadow-[0_0_20px_rgba(251,188,4,0.6)]"
              style={{
                left: star.x,
                top: star.y,
                width: STAR_SIZE,
                height: STAR_SIZE,
              }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="absolute w-full h-full opacity-80" aria-hidden="true">
                <path d="M12 0C12 0 12 10.5 24 12C12 13.5 12 24 12 24C12 24 12 13.5 0 12C12 10.5 12 0 12 0Z" />
              </svg>
              <span className="relative z-10 text-[#050505] font-mono tracking-tighter">AI</span>
            </motion.div>
          )
        ))}
      </AnimatePresence>
    </div>
  );
}
