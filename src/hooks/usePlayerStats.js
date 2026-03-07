import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

export const usePlayerStats = (userId) => {
  const [stats, setStats] = useState({
    averageWpm: 0,
    totalTimeSeconds: 0,
    totalGames: 0
  });

  useEffect(() => {
    if (!userId) return;

    // Escuchar el historial de partidas del usuario
    const q = query(
      collection(db, "players", userId, "gameHistory"),
      where("completed", "==", true)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      let totalWpm = 0;
      let totalSeconds = 0;
      const gameCount = snapshot.docs.length;

      snapshot.docs.forEach(doc => {
        const { wpm = 0, duration = 0 } = doc.data();
        totalWpm += wpm;
        totalSeconds += duration;
      });

      const averageWpm = gameCount > 0 ? Math.round(totalWpm / gameCount) : 0;

      setStats({
        averageWpm,
        totalTimeSeconds: totalSeconds,
        totalGames: gameCount
      });
    });

    return () => unsubscribe();
  }, [userId]);

  return stats;
};
