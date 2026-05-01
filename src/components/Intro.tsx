import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, BookOpen, X, Globe, Trophy, Trash2 } from "lucide-react";
import { Lang, LANGUAGES, translations } from "../lib/i18n";

export function Intro({ onStart, lang, setLang, highScore, onResetScores }: { onStart: () => void, lang: Lang, setLang: (l: Lang) => void, highScore: number, onResetScores: () => void }) {
  const [showRules, setShowRules] = useState(false);
  const t = translations[lang];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#050505] p-6 text-center">
      
      {/* Language Selector */}
      <div className="absolute top-6 right-6 z-50 flex items-center bg-white/10 rounded-full py-2 px-4 backdrop-blur-md border border-white/20">
        <Globe size={18} className="text-white mr-2" />
        <select 
          value={lang} 
          onChange={(e) => setLang(e.target.value as Lang)}
          className="bg-transparent text-white font-mono uppercase text-sm outline-none cursor-pointer appearance-none pr-4"
        >
          {LANGUAGES.map((l) => (
            <option key={l.code} value={l.code} className="bg-[#111] text-white">
              {l.label}
            </option>
          ))}
        </select>
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-2xl relative z-10"
      >
        <h1 className="text-5xl md:text-7xl font-mono font-bold mb-4 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-red to-brand-yellow">
          SUNDAR MARIO
          <br />
          <span className="text-white">AI</span>
        </h1>
        <p className="text-xl text-gray-400 mb-8 font-sans truncate whitespace-normal">
          {t.subtitle.split('AI Star').map((part: string, i: number, arr: string[]) => 
             i === arr.length - 1 ? part : <span key={i}>{part}<span className="text-brand-yellow font-bold">AI Star</span></span>
          )}
        </p>

        {highScore > 0 && (
          <div className="flex flex-col items-center justify-center mb-10 text-brand-green font-mono">
            <div className="flex items-center gap-2 text-2xl font-bold bg-brand-green/10 px-6 py-2 rounded-full border border-brand-green/30">
              <Trophy size={24} />
              {t.high_score}: {highScore}
            </div>
            <button 
              onClick={onResetScores}
              className="mt-3 text-xs text-gray-500 hover:text-red-400 flex items-center gap-1 transition-colors uppercase tracking-widest"
            >
              <Trash2 size={12} />
              {t.reset_scores}
            </button>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.button
            onClick={onStart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-brand-blue text-white px-8 py-4 rounded-full font-mono font-bold text-xl inline-flex items-center gap-3 hover:bg-brand-blue/80 transition-colors shadow-[0_0_40px_rgba(66,133,244,0.4)]"
          >
            <Play fill="currentColor" size={24} />
            {t.start}
          </motion.button>

          <motion.button
            onClick={() => setShowRules(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/10 text-white px-8 py-4 rounded-full font-mono font-bold text-xl inline-flex items-center gap-3 hover:bg-white/20 transition-colors border border-white/20"
          >
            <BookOpen size={24} />
            {t.rules_btn}
          </motion.button>
        </div>
      </motion.div>

      {/* Rules Modal */}
      <AnimatePresence>
        {showRules && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#111] border border-white/20 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto relative"
            >
              <button 
                onClick={() => setShowRules(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors bg-white/5 rounded-full p-2"
              >
                <X size={24} />
              </button>
              
              <h2 className="text-3xl font-mono text-brand-yellow mb-6 font-bold">{t.rules_title}</h2>
              
              <div className="flex flex-col gap-6 text-left">
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <h3 className="text-brand-blue font-bold font-mono mb-2 uppercase text-sm tracking-wider">
                    {LANGUAGES.find(l => l.code === lang)?.label}
                  </h3>
                  <p className="font-sans text-gray-200 text-lg leading-relaxed">{t.rules_text}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
