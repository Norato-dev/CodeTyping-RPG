import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, Zap, Trophy, Heart, Clock, Volume2, RotateCw } from 'lucide-react';

const HELP_TIPS = [
  {
    icon: <Zap size={18} className="text-yellow-400" />,
    title: 'XP & Progreso',
    content: 'Ganas XP completando desafíos. Completa rápido y sin errores para más recompensas.',
    color: 'yellow'
  },
  {
    icon: <Trophy size={18} className="text-pink-400" />,
    title: 'Logros Especiales',
    content: 'Desbloquea 8 logros diferentes completando objetivos. Algunos son secretos, ¡descúbrelos!',
    color: 'pink'
  },
  {
    icon: <Heart size={18} className="text-red-400" />,
    title: 'Sistema de Vidas',
    content: 'Tienes 5 escudos al inicio. Pierdes uno por cada error. 0 escudos = FIN DEL JUEGO.',
    color: 'red'
  },
  {
    icon: <Clock size={18} className="text-cyan-400" />,
    title: 'Tiempo es Oro',
    content: 'Cada dificultad tiene un tiempo límite. Cuanto más rápido lo hagas, más puntos ganas.',
    color: 'cyan'
  },
  {
    icon: <Volume2 size={18} className="text-green-400" />,
    title: 'Música Ambiental',
    content: 'Ajusta el volumen en la esquina inferior derecha. ¡Una música calmada mejora tu enfoque!',
    color: 'green'
  },
  {
    icon: <RotateCw size={18} className="text-blue-400" />,
    title: 'WPM (Velocidad)',
    content: 'Tu velocidad de escritura se calcula en Palabras Por Minuto. Mira tu progress en el navbar.',
    color: 'blue'
  }
];

const HelpPanel = ({ isOpen, onClose, onResetTour }) => {
  const [expandedIndex, setExpandedIndex] = React.useState(0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* OVERLAY */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* PANEL */}
          <motion.div
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            className="fixed right-0 top-0 h-full w-full max-w-lg bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-l-2 border-cyan-500/50 shadow-[-20px_0_60px_rgba(0,0,0,0.8)] overflow-y-auto z-50"
          >
            {/* HEADER */}
            <div className="sticky top-0 bg-gradient-to-b from-slate-900 to-transparent p-6 border-b border-cyan-500/30">
              <div className="flex items-center gap-3 mb-2">
                <HelpCircle className="text-cyan-400" size={24} />
                <h2 className="text-2xl font-black italic text-cyan-300">CENTRO_DE_AYUDA</h2>
              </div>
              <p className="text-slate-400 text-sm font-mono">Aprende a dominar el juego</p>
              <button
                onClick={onClose}
                className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors p-1"
              >
                ✕
              </button>
            </div>

            {/* TIPS */}
            <div className="p-6 space-y-3">
              {HELP_TIPS.map((tip, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-slate-900/50 border border-slate-700 rounded-lg overflow-hidden hover:border-cyan-500/50 transition-all"
                >
                  <button
                    onClick={() => setExpandedIndex(expandedIndex === idx ? -1 : idx)}
                    className="w-full p-4 flex items-center gap-3 hover:bg-slate-800/50 transition-colors"
                  >
                    <div className="text-lg">{tip.icon}</div>
                    <div className="flex-1 text-left">
                      <h3 className="font-black text-white text-sm">{tip.title}</h3>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedIndex === idx ? 180 : 0 }}
                      className="text-slate-600"
                    >
                      <ChevronDown size={18} />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {expandedIndex === idx && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-slate-700 bg-slate-950/50"
                      >
                        <p className="p-4 text-slate-300 text-sm leading-relaxed">
                          {tip.content}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* FOOTER */}
            <div className="p-6 border-t border-cyan-500/30 space-y-3 sticky bottom-0 bg-gradient-to-t from-slate-900 to-transparent">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  onResetTour();
                  onClose();
                }}
                className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-black text-xs uppercase rounded-lg transition-all"
              >
                🎓 REPETIR_TOUR_INICIAL
              </motion.button>
              <button
                onClick={onClose}
                className="w-full py-2 bg-slate-700 hover:bg-slate-600 text-white font-black text-xs uppercase rounded-lg transition-all"
              >
                CERRAR
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default HelpPanel;
