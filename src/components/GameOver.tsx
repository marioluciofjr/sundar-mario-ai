import { motion } from "motion/react";
import { RotateCcw, Trophy } from "lucide-react";
import { Lang, translations } from "../lib/i18n";
import { ScoreEntry } from "../App";

interface GameOverProps {
  score: number;
  onRestart: () => void;
  lang: Lang;
  history: ScoreEntry[];
  isNewRecord: boolean;
}

export function GameOver({ score, onRestart, lang, history, isNewRecord }: GameOverProps) {
  const t = translations[lang];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#050505] p-6 text-center py-12">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-2xl bg-white/5 p-8 md:p-12 rounded-3xl border border-white/10 backdrop-blur-sm w-full"
      >
        <h2 className="text-4xl md:text-5xl font-mono font-bold mb-2 text-brand-yellow">{t.gameover_title}</h2>
        <p className="text-gray-400 font-sans mb-8">{t.gameover_subtitle}</p>
        
        {isNewRecord && (
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.6, duration: 0.8 }}
            className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-brand-yellow text-black uppercase tracking-widest font-bold font-mono rounded-full text-sm shadow-[0_0_20px_rgba(251,188,4,0.5)]"
          >
            <Trophy size={16} />
            {t.new_record}
          </motion.div>
        )}

        <div className="text-8xl font-mono font-black text-transparent bg-clip-text bg-gradient-to-br from-brand-green to-brand-blue mb-10">
          {score}
        </div>
        
        <motion.button
          onClick={onRestart}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white/10 text-white px-8 py-4 rounded-full font-mono font-bold text-xl inline-flex items-center gap-3 hover:bg-white/20 transition-colors border border-white/20 mb-12"
        >
          <RotateCcw size={24} />
          {t.gameover_button}
        </motion.button>

        {/* Score History Table */}
        {history.length > 0 && (
          <div className="text-left w-full max-w-sm mx-auto">
            <h3 className="text-xl font-mono text-white mb-4 flex items-center justify-center gap-2">
              <Trophy size={20} className="text-brand-yellow" />
              {t.score_history}
            </h3>
            <div className="bg-black/50 rounded-xl overflow-hidden border border-white/10">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-white/5 text-gray-400 border-b border-white/10 font-mono">
                    <th className="py-2 px-4 text-left font-normal">{t.date}</th>
                    <th className="py-2 px-4 text-right font-normal">{t.score}</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((entry, idx) => (
                    <tr key={idx} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                      <td className="py-2 px-4 text-gray-300 font-sans">
                        {new Date(entry.date).toLocaleDateString(lang === 'en' ? 'en-US' : lang === 'pt' ? 'pt-BR' : 'fr-FR', {
                          month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                        })}
                      </td>
                      <td className="py-2 px-4 text-right font-mono text-brand-green font-bold">
                        {entry.score}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </motion.div>
    </div>
  );
}
