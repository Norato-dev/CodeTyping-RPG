import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, updateDoc, increment, arrayUnion } from 'firebase/firestore';

const playSound = (type) => {
  const audio = new Audio(`/sounds/${type}.wav`);
  audio.volume = 0.4;
  audio.play().catch((e) => console.warn("Error al reproducir sonido:", e));
};

const DIFFICULTY_THEMES = {
  Fácil: { accent: "text-green-400", bg: "bg-green-500", border: "border-green-500/50", shadow: "shadow-[0_0_30px_#22c55e33]", sprite: "bottts-neutral", color: "#22c55e", time: 60 },
  Medio: { accent: "text-cyan-400", bg: "bg-cyan-500", border: "border-cyan-500/50", shadow: "shadow-[0_0_30px_#06b6d433]", sprite: "avataaars", color: "#06b6d4", time: 45 },
  Difícil: { accent: "text-pink-500", bg: "bg-pink-500", border: "border-pink-500/50", shadow: "shadow-[0_0_30px_#ec489933]", sprite: "pixel-art", color: "#ec4899", time: 30 }
};

export const useGameLogic = (user) => {
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [lives, setLives] = useState(5);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isDefeated, setIsDefeated] = useState(false);
  const [isAttacking, setIsAttacking] = useState(false);
  const [gainedXP, setGainedXP] = useState(null);
  const [liveStats, setLiveStats] = useState({ wpm: 0, progress: 0 });

  // Timer del juego
  useEffect(() => {
    let timer;
    if (currentChallenge && timeLeft > 0 && !isGameOver && !isDefeated) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && currentChallenge && !isDefeated && !isGameOver) {
      handleGameOver();
    }
    return () => clearInterval(timer);
  }, [timeLeft, currentChallenge, isGameOver, isDefeated]);

  const startChallenge = (challenge) => {
    playSound('click');
    setCurrentChallenge(challenge);
    setLives(5);
    setTimeLeft(DIFFICULTY_THEMES[challenge.difficulty].time);
    setLiveStats({ wpm: 0, progress: 0 });
    setIsGameOver(false);
    setIsDefeated(false);
    setGainedXP(null);
  };

  const handleGameOver = () => {
    setIsGameOver(true);
    playSound('fail');
    setTimeout(() => {
      endGame();
    }, 3000);
  };

  const handleWin = async (finalWpm) => {
    if (isGameOver) return;
    const xpReward = (finalWpm * 10) + (lives * 50);
    setIsAttacking(true);
    playSound('attack');
    
    setTimeout(async () => {
      setIsAttacking(false);
      setIsDefeated(true);
      setGainedXP(xpReward);
      playSound('win');
      
      if (user) {
        const userRef = doc(db, "players", user.uid);
        await updateDoc(userRef, { 
          xp: increment(xpReward), 
          battlesWon: increment(1),
          completedLevels: arrayUnion(currentChallenge.id)
        });
      }

      setTimeout(() => {
        endGame();
      }, 3000);
    }, 600);
  };

  const handleMistake = () => {
    const newLives = lives - 1;
    setLives(newLives);
    playSound('error');
    if (newLives <= 0) handleGameOver();
  };

  const endGame = () => {
    setIsDefeated(false);
    setCurrentChallenge(null);
  };

  return {
    currentChallenge,
    lives,
    timeLeft,
    isGameOver,
    isDefeated,
    isAttacking,
    gainedXP,
    liveStats,
    startChallenge,
    handleWin,
    handleMistake,
    endGame,
    setLiveStats,
    DIFFICULTY_THEMES,
    playSound
  };
};
