import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock } from 'lucide-react';
import { ACHIEVEMENTS } from '../data/achievements';

const Achievements = ({ unlockedAchievements, newAchievements }) => {
  // Estilos de shimmer para badges nuevos
  const shimmerStyle = `
    @keyframes shimmer {
      0% { background-position: -1000px 0; }
      100% { background-position: 1000px 0; }
    }
    .shimmer-badge {
      animation: shimmer 2s infinite;
      background-size: 1000px 100%;
    }
  `;
  return (
    <div className="bg-slate-900/50 border-2 border-slate-800 rounded-3xl p-8 shadow-xl">
      <style>{shimmerStyle}</style>
      <div className="flex items-center gap-3 mb-8 border-l-4 border-yellow-500 pl-4">
        <span className="text-3xl">🏆</span>
        <h3 className="text-xl font-black italic uppercase text-white">Logros_Desbloqueados</h3>
        <span className="ml-auto text-sm font-bold text-yellow-500">
          {unlockedAchievements.length} / {Object.keys(ACHIEVEMENTS).length}
        </span>
      </div>

      {/* NOTIFICACIÓN DE NUEVO LOGRO */}
      <AnimatePresence>
        {newAchievements.map(achievementId => {
          const achievement = Object.values(ACHIEVEMENTS).find(a => a.id === achievementId);
          return (
            <motion.div
              key={achievementId}
              initial={{ opacity: 0, y: -20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.8 }}
              className="mb-4 p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-2 border-yellow-500/50 rounded-xl"
            >
              <p className="text-yellow-400 font-bold text-center">
                🎉 ¡Nuevo Logro Desbloqueado! {achievement.icon} {achievement.title}
              </p>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* GRID DE LOGROS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {Object.values(ACHIEVEMENTS).map((achievement) => {
          const isUnlocked = unlockedAchievements.includes(achievement.id);
          const isNewAchievement = newAchievements.includes(achievement.id);
          
          return (
            <motion.div
              key={achievement.id}
              whileHover={isUnlocked ? { scale: 1.05 } : {}}
              className={`relative group cursor-pointer transition-all`}
            >
              {/* MEDALLITA */}
              <div
                className={`w-full aspect-square flex flex-col items-center justify-center rounded-2xl border-2 transition-all ${
                  isUnlocked
                    ? `bg-gradient-to-br ${achievement.color} border-yellow-400/50 shadow-[0_0_20px_rgba(250,204,21,0.3)] ${isNewAchievement ? 'shimmer-badge' : ''}`
                    : 'bg-slate-800/50 border-slate-700 opacity-50'
                }`}
              >
                {isUnlocked ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.1 }}
                    className="text-5xl"
                  >
                    {achievement.icon}
                  </motion.div>
                ) : (
                  <Lock size={32} className="text-slate-600" />
                )}
              </div>

              {/* TOOLTIP */}
              <div
                className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-40 p-3 rounded-lg text-center text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none ${
                  isUnlocked
                    ? 'bg-gradient-to-r ' + achievement.color + ' text-white'
                    : 'bg-slate-700 text-slate-300'
                }`}
              >
                <p className="font-black text-sm">{achievement.title}</p>
                <p className="text-[10px] mt-1 opacity-90">{achievement.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Achievements;
