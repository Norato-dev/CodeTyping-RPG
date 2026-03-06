import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Lock } from 'lucide-react';

const MissionGrid = ({ challenges, onStart, completedLevels, themes }) => {
  const categories = ["Fácil", "Medio", "Difícil"];

  return (
    <div className="space-y-16">
      {categories.map(cat => {
        const filtered = challenges.filter(c => c.difficulty === cat);
        if (filtered.length === 0) return null;

        return (
          <section key={cat}>
            <div className="flex items-center gap-4 mb-8">
              <h2 className={`text-2xl font-black uppercase italic ${themes[cat].accent}`}>{cat}</h2>
              <div className="h-[2px] flex-1 bg-slate-800"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(item => {
                const isDone = completedLevels?.includes(item.id);
                const theme = themes[item.difficulty];

                return (
                  <motion.div 
                    key={item.id}
                    whileHover={{ y: -5 }}
                    className={`relative p-6 rounded-2xl border-2 transition-all ${isDone ? 'border-green-500/30 bg-green-500/5' : 'border-slate-800 bg-slate-900/40'}`}
                  >
                    {isDone && (
                      <div className="absolute -top-3 -right-3 bg-green-500 text-black p-1 rounded-full shadow-[0_0_15px_#22c55e]">
                        <CheckCircle2 size={20} />
                      </div>
                    )}

                    <h3 className={`text-lg font-bold mb-2 ${isDone ? 'text-green-400' : 'text-white'}`}>
                      {item.title}
                    </h3>
                    
                    <div className="font-mono text-[10px] text-slate-500 bg-black/40 p-3 rounded-lg mb-6 h-16 overflow-hidden italic">
                      {item.code}
                    </div>

                    <button 
                      onClick={() => onStart(item)}
                      className={`w-full py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${isDone ? 'bg-slate-800 text-slate-400' : `${theme.bg} text-black hover:brightness-110`}`}
                    >
                      {isDone ? 'REPETIR_MISIÓN' : 'ATACAR_SISTEMA'}
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default MissionGrid;