import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, getDocs } from 'firebase/firestore';

export const useLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    // Escuchar cambios en la colección de jugadores en tiempo real
    const unsubscribePlayers = onSnapshot(collection(db, "players"), async (playersSnap) => {
      try {
        const playersData = [];

        // Para cada jugador, obtener sus stats
        for (const playerDoc of playersSnap.docs) {
          const playerInfo = playerDoc.data();
          const userStats = {
            uid: playerDoc.id,
            name: playerInfo.name || 'Anónimo',
            email: playerInfo.email,
            xp: playerInfo.xp || 0,
            battlesWon: playerInfo.battlesWon || 0,
            photoURL: playerInfo.photoURL || `https://api.dicebear.com/7.x/identicon/svg?seed=${playerInfo.email}`
          };

          // Obtener WPM promedio desde gameHistory
          try {
            const gameHistorySnap = await getDocs(
              collection(db, "players", playerDoc.id, "gameHistory")
            );
            
            let totalWpm = 0;
            gameHistorySnap.docs.forEach(doc => {
              totalWpm += doc.data().wpm || 0;
            });
            
            userStats.averageWpm = gameHistorySnap.docs.length > 0 
              ? Math.round(totalWpm / gameHistorySnap.docs.length) 
              : 0;
          } catch (error) {
            userStats.averageWpm = 0;
          }

          playersData.push(userStats);
        }

        // Ordenar por XP descendente y tomar top 10
        playersData.sort((a, b) => b.xp - a.xp);
        setLeaderboard(playersData.slice(0, 10));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
        setLoading(false);
      }
    });

    // Limpiar el listener cuando se desmonta el componente
    return () => unsubscribePlayers();
  }, []);

  return { leaderboard, loading };
};
