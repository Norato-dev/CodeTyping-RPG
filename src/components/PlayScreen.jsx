import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Clock, AlertTriangle, Zap, Target, Star } from 'lucide-react';
import Game from './Game';

const PlayScreen = ({
  currentChallenge,
  lives,
  timeLeft,
  isGameOver,
  isDefeated,
  isAttacking,
  gainedXP,
  liveStats,
  themes,
  onComplete,
  onMistake,
  onStatsUpdate
}) => {
  return (
    <div className="max-w-6xl mx-auto w-full flex flex-col items-center py-10">
      {/* HUD SUPERIOR */}
      <div className="w-full max-w-4xl flex justify-between items-center mb-8 bg-slate-900/50 p-6 rounded-3xl border border-slate-800 backdrop-blur-md">
        <div className="flex items-center gap-6">
          <div className="flex gap-2">
            {[...Array(5)].map((_, i) => (
              <Shield 
                key={i} 
                size={28} 
                fill={i < lives ? "#ec4899" : "transparent"} 
                className={i < lives ? "text-pink-500 drop-shadow-[0_0_8px_#ec4899]" : "text-slate-800"} 
              />
            ))}
          </div>
          <span className="text-[10px] font-black text-pink-500 uppercase tracking-widest">
            Integridad
          </span>
        </div>
        <div className={`flex items-center gap-3 text-3xl font-black ${
          timeLeft < 10 ? 'text-red-500 animate-pulse' : 'text-cyan-400'
        }`}>
          <Clock size={28} /> {timeLeft}s
        </div>
      </div>

      {isGameOver ? (
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center py-20">
          <AlertTriangle size={100} className="text-red-500 mx-auto mb-6 animate-pulse" />
          <h2 className="text-6xl font-black italic text-white uppercase">Hack Fallido</h2>
          <p className="text-red-500 font-mono text-xl mt-4 uppercase">
            Señal rastreada... desconectando.
          </p>
        </motion.div>
      ) : (
        <>
          {/* ÁREA DEL ENEMIGO */}
          <div className="relative mb-8 text-center">
            <motion.div 
              animate={
                isDefeated 
                  ? { rotate: 90, opacity: 0 } 
                  : isAttacking 
                  ? { scale: 1.3, filter: "brightness(2)" } 
                  : { y: [0, -15, 0] }
              } 
              transition={{ duration: 0.2 }}
            >
              <img 
                src={`https://api.dicebear.com/7.x/${themes[currentChallenge.difficulty].sprite}/svg?seed=${currentChallenge.id}`} 
                className="w-64 h-64 relative z-10 drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]" 
                alt="Enemy"
              />
            </motion.div>
            <AnimatePresence>
              {gainedXP && (
                <motion.div 
                  initial={{ y: 20, opacity: 0 }} 
                  animate={{ y: -50, opacity: 1 }} 
                  className="absolute inset-0 flex items-center justify-center text-4xl font-black text-yellow-400 z-50"
                >
                  <Star className="mr-2" fill="currentColor" /> +{gainedXP} XP
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* LIVE STATS RECUADROS (WPM & SYNC) */}
          <div className="flex gap-4 mb-6">
            <div className="bg-black/40 border border-cyan-500/30 px-6 py-2 rounded-2xl flex items-center gap-3 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
              <Zap size={16} className="text-cyan-400" />
              <span className="text-2xl font-black text-white">{liveStats.wpm}</span>
              <span className="text-[10px] text-cyan-500 font-bold uppercase">WPM</span>
            </div>
            <div className="bg-black/40 border border-pink-500/30 px-6 py-2 rounded-2xl flex items-center gap-3 shadow-[0_0_15px_rgba(236,72,153,0.1)]">
              <Target size={16} className="text-pink-500" />
              <span className="text-2xl font-black text-white">{liveStats.progress}%</span>
              <span className="text-[10px] text-pink-500 font-bold uppercase">Sync</span>
            </div>
          </div>

          {/* EDITOR DE CÓDIGO */}
          <Game 
            codeSnippet={currentChallenge.code} 
            onComplete={onComplete} 
            onMistake={onMistake} 
            onStatsUpdate={onStatsUpdate}
            lives={lives}
          />
        </>
      )}
    </div>
  );
};

export default PlayScreen;
