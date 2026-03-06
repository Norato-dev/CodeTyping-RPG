import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Game = ({ codeSnippet, onComplete, onMistake, onStatsUpdate }) => {
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [isError, setIsError] = useState(false);

  const handleKeyDown = useCallback((e) => {

    if (e.key === ' ') {
      e.preventDefault();
    }

    if (e.key.length !== 1 && e.key !== 'Enter') return;

    const nextChar = codeSnippet[userInput.length];
    const pressedKey = e.key === 'Enter' ? '\n' : e.key;

    if (pressedKey === nextChar) {
      if (!startTime) setStartTime(Date.now());
      
      const newValue = userInput + pressedKey;
      setUserInput(newValue);
      setIsError(false);

      // Calcular y enviar estadísticas en tiempo real
      const progress = Math.round((newValue.length / codeSnippet.length) * 100);
      const timeSpent = startTime ? (Date.now() - startTime) / 1000 / 60 : 0.01;
      const currentWpm = Math.round((newValue.length / 5) / timeSpent);
      
      onStatsUpdate({ wpm: currentWpm || 0, progress });

      if (newValue.length === codeSnippet.length) {
        onComplete(currentWpm);
      }
    } else {
      setIsError(true);
      onMistake(); 
      setTimeout(() => setIsError(false), 150);
    }
  }, [userInput, codeSnippet, startTime, onComplete, onMistake, onStatsUpdate]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="w-full max-w-5xl relative">
      <AnimatePresence>
        {isError && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.3 }} exit={{ opacity: 0 }}
            className="absolute -inset-4 bg-red-600 rounded-[50px] z-0 blur-2xl"
          />
        )}
      </AnimatePresence>

      <motion.div animate={isError ? { x: [-5, 5, -5, 5, 0] } : {}} transition={{ duration: 0.1 }}
        className="bg-black/90 border-2 border-slate-800 p-12 rounded-[40px] shadow-2xl relative z-10 min-h-[250px] flex items-center overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500/20"></div>
        <pre className="font-mono text-3xl leading-relaxed tracking-wide whitespace-pre-wrap break-all w-full select-none">
          {codeSnippet.split("").map((char, index) => {
            let color = "text-slate-700";
            if (index < userInput.length) {
              color = "text-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.4)]";
            } else if (index === userInput.length) {
              color = "text-white border-b-4 border-cyan-500 animate-pulse";
            }
            return (
              <span key={index} className={`${color} transition-colors duration-75`}>
                {char === '\n' ? '↵\n' : char}
              </span>
            );
          })}
        </pre>
      </motion.div>
    </div>
  );
};

export default Game;