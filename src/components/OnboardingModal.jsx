import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Target, Trophy, ArrowRight, X } from 'lucide-react';

const OnboardingModal = ({ isOpen, onStartTour, onSkip }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* OVERLAY */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onSkip}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          {/* MODAL */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl z-50"
          >
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-2 border-cyan-500/50 p-8 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
              {/* CLOSE BUTTON */}
              <button
                onClick={onSkip}
                className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              {/* HEADER */}
              <div className="mb-8 text-center">
                <motion.h1
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl font-black italic mb-2"
                >
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    BIENVENIDO_AL_SISTEMA
                  </span>
                </motion.h1>
                <p className="text-slate-400 font-mono text-sm">Code Typing RPG - Tu arena de programación</p>
              </div>

              {/* FEATURES */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {/* FEATURE 1 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-black/40 border border-cyan-500/30 p-4 rounded-xl text-center"
                >
                  <Zap className="w-8 h-8 mx-auto text-yellow-400 mb-2" />
                  <h3 className="font-black text-white mb-1 text-sm">Juega & Aprende</h3>
                  <p className="text-[12px] text-slate-400">
                    Escribe código rápido en desafíos emocionantes
                  </p>
                </motion.div>

                {/* FEATURE 2 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-black/40 border border-pink-500/30 p-4 rounded-xl text-center"
                >
                  <Trophy className="w-8 h-8 mx-auto text-pink-400 mb-2" />
                  <h3 className="font-black text-white mb-1 text-sm">Gana Logros</h3>
                  <p className="text-[12px] text-slate-400">
                    Desbloquea badges y sube en el ranking global
                  </p>
                </motion.div>

                {/* FEATURE 3 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-black/40 border border-green-500/30 p-4 rounded-xl text-center"
                >
                  <Target className="w-8 h-8 mx-auto text-green-400 mb-2" />
                  <h3 className="font-black text-white mb-1 text-sm">Mejora tu Skill</h3>
                  <p className="text-[12px] text-slate-400">
                    Aumenta WPM y domina nuevos desafíos
                  </p>
                </motion.div>
              </div>

              {/* STEPS */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-slate-900/50 border border-slate-700 p-6 rounded-xl mb-8 space-y-3"
              >
                <h3 className="font-black text-cyan-400 text-sm mb-4">🎮 CÓMO JUGAR</h3>
                <div className="space-y-2 text-[13px]">
                  <p className="flex items-start gap-2">
                    <span className="text-pink-500 font-black">1.</span>
                    <span className="text-slate-300">Selecciona un desafío (Fácil, Medio, Difícil)</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-pink-500 font-black">2.</span>
                    <span className="text-slate-300">Tienes 5 vidas. Escribe el código correctamente</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-pink-500 font-black">3.</span>
                    <span className="text-slate-300">Completa antes de que se acabe el tiempo</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-pink-500 font-black">4.</span>
                    <span className="text-slate-300">¡Gana XP, logros y sube el ranking!</span>
                  </p>
                </div>
              </motion.div>

              {/* BUTTONS */}
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onSkip}
                  className="flex-1 py-3 px-4 bg-slate-800 hover:bg-slate-700 text-white font-black text-xs uppercase rounded-lg transition-all"
                >
                  Saltar
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onStartTour}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-black text-xs uppercase rounded-lg flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                >
                  EMPEZAR_TOUR <ArrowRight size={16} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default OnboardingModal;
