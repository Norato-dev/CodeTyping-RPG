import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Zap, Target } from 'lucide-react';

const Leaderboard = ({ leaderboard, loading }) => {
  const getMedalColor = (position) => {
    switch (position) {
      case 1:
        return { bg: 'from-yellow-500 to-orange-500', border: 'border-yellow-400', text: 'text-yellow-400', medal: '🥇' };
      case 2:
        return { bg: 'from-slate-400 to-slate-500', border: 'border-slate-300', text: 'text-slate-300', medal: '🥈' };
      case 3:
        return { bg: 'from-orange-600 to-amber-700', border: 'border-orange-500', text: 'text-orange-400', medal: '🥉' };
      default:
        return { bg: 'from-slate-700 to-slate-800', border: 'border-slate-600', text: 'text-slate-400', medal: `${position}` };
    }
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto">
        <div className="bg-slate-900/50 border-2 border-slate-800 rounded-3xl p-8 text-center min-h-[400px] flex items-center justify-center">
          <div className="text-cyan-500 font-mono animate-pulse text-xl">
            CONSULTANDO SERVIDORES...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto pb-20">
      <div className="bg-slate-900/50 border-2 border-slate-800 rounded-3xl p-8 shadow-xl">
        {/* HEADER */}
        <div className="flex items-center gap-3 mb-8 border-l-4 border-yellow-500 pl-4">
          <Trophy className="text-yellow-500" size={32} />
          <h2 className="text-3xl font-black italic uppercase text-white">Ranking_Global</h2>
          <span className="ml-auto text-sm font-bold text-yellow-500 bg-yellow-500/10 px-4 py-2 rounded-lg">
            TOP 10
          </span>
        </div>

        {/* TABLA */}
        <div className="space-y-3">
          {leaderboard.map((player, index) => {
            const { bg, border, text, medal } = getMedalColor(index + 1);
            
            return (
              <motion.div
                key={player.uid}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`group relative bg-gradient-to-r ${bg} border-2 ${border} p-[2px] rounded-2xl overflow-hidden cursor-pointer transition-all hover:shadow-[0_0_20px_rgba(250,204,21,0.3)]`}
              >
                <div className="bg-black/60 p-5 rounded-2xl backdrop-blur-sm flex items-center gap-6 group-hover:bg-black/40 transition-all">
                  {/* POSICIÓN */}
                  <div className={`w-14 h-14 flex items-center justify-center font-black text-2xl rounded-full ${
                    index < 3 ? `bg-gradient-to-r ${bg} ${text}` : 'bg-slate-800 text-slate-400'
                  }`}>
                    {index < 3 ? medal : index + 1}
                  </div>

                  {/* AVATAR Y NOMBRE */}
                  <div className="flex items-center gap-4 flex-1">
                    <img
                      src={player.photoURL}
                      alt={player.name}
                      className="w-16 h-16 rounded-full border-2 border-slate-700"
                    />
                    <div className="min-w-0">
                      <p className="font-black text-lg text-white truncate">{player.name}</p>
                      <p className="text-xs text-slate-400 truncate">{player.email}</p>
                    </div>
                  </div>

                  {/* STATS */}
                  <div className="flex items-center gap-8 text-right">
                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-2">
                        <Zap className="text-yellow-500" size={18} />
                        <span className="font-black text-xl text-white">{player.xp.toLocaleString()}</span>
                      </div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold">XP</p>
                    </div>

                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-2">
                        <Trophy className="text-pink-500" size={18} />
                        <span className="font-black text-xl text-white">{player.battlesWon}</span>
                      </div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold">Hacks</p>
                    </div>

                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-2">
                        <Target className="text-cyan-500" size={18} />
                        <span className="font-black text-xl text-white">{player.averageWpm}</span>
                      </div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold">WPM</p>
                    </div>
                  </div>
                </div>

                {/* EFECTO GLOW */}
                <div className={`absolute inset-0 bg-gradient-to-r ${bg} opacity-0 group-hover:opacity-20 blur-xl transition-opacity -z-10`} />
              </motion.div>
            );
          })}
        </div>

        {/* FOOTER */}
        {leaderboard.length === 0 && (
          <div className="text-center py-20 text-slate-400">
            <p className="font-mono">No hay jugadores en el ranking aún</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
