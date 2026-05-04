import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, X, CheckCircle } from 'lucide-react';

const TOUR_STEPS = [
  {
    id: 'menu',
    title: 'PANTALLA_PRINCIPAL',
    description: 'Aquí ves todos los desafíos disponibles. Elige uno para comenzar la partida.',
    target: null,
    position: 'center'
  },
  {
    id: 'play',
    title: 'DURANTE_LA_PARTIDA',
    description: 'Escribe el código en el editor. Arriba ves tu progreso, vidas y tiempo restante. ¡Sé rápido y preciso!',
    target: null,
    position: 'center'
  },
  {
    id: 'dashboard',
    title: 'TU_PERFIL',
    description: 'Aquí ves tu progreso: XP, batallas ganadas, WPM promedio y los logros desbloqueados.',
    target: null,
    position: 'center'
  },
  {
    id: 'leaderboard',
    title: 'RANKING_GLOBAL',
    description: 'Compite contra otros jugadores. Sube haciendo partidas y acumulando XP.',
    target: null,
    position: 'center'
  }
];

const OnboardingTour = ({ isOpen, tourStep, onNext, onPrevious, onEnd }) => {
  const currentStep = TOUR_STEPS[tourStep];
  const progress = Math.round((tourStep / (TOUR_STEPS.length - 1)) * 100);

  return (
    <AnimatePresence>
      {isOpen && currentStep && (
        <>
          {/* OVERLAY */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* TOOLTIP */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 w-full max-w-md z-50"
          >
            <div className="bg-gradient-to-br from-cyan-900/95 to-slate-900/95 backdrop-blur-xl border-2 border-cyan-500/60 p-6 rounded-2xl shadow-[0_20px_60px_rgba(6,182,212,0.3)]">
              {/* PROGRESS BAR */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black text-cyan-300 uppercase">
                    Paso {tourStep + 1} de {TOUR_STEPS.length}
                  </span>
                  <button
                    onClick={onEnd}
                    className="text-slate-500 hover:text-white transition-colors p-1"
                  >
                    <X size={18} />
                  </button>
                </div>
                <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                  />
                </div>
              </div>

              {/* CONTENT */}
              <div className="mb-6">
                <motion.h2
                  key={`title-${tourStep}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xl font-black text-cyan-300 mb-2 italic uppercase"
                >
                  {currentStep.title}
                </motion.h2>
                <motion.p
                  key={`desc-${tourStep}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-slate-300 text-sm leading-relaxed"
                >
                  {currentStep.description}
                </motion.p>
              </div>

              {/* NAVIGATION BUTTONS */}
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onPrevious}
                  disabled={tourStep === 0}
                  className="flex-1 py-2 px-3 bg-slate-700 hover:bg-slate-600 disabled:opacity-30 disabled:cursor-not-allowed text-white font-black text-xs uppercase rounded-lg flex items-center justify-center gap-2 transition-all"
                >
                  <ChevronLeft size={14} /> ATRÁS
                </motion.button>

                {tourStep === TOUR_STEPS.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onEnd}
                    className="flex-1 py-2 px-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-black text-xs uppercase rounded-lg flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(34,197,94,0.4)]"
                  >
                    <CheckCircle size={14} /> COMPLETADO
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onNext}
                    className="flex-1 py-2 px-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-black text-xs uppercase rounded-lg flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                  >
                    SIGUIENTE <ChevronRight size={14} />
                  </motion.button>
                )}
              </div>

              {/* TIPS */}
              <div className="mt-4 p-3 bg-slate-800/50 border border-slate-700 rounded-lg text-[11px] text-slate-400 text-center">
                💡 Puedes saltarte el tour en cualquier momento (botón X)
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default OnboardingTour;
