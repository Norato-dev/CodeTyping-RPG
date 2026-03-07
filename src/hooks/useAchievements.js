import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { ACHIEVEMENTS } from '../data/achievements';

export const useAchievements = (userId, userData, playerStats) => {
  const [unlockedAchievements, setUnlockedAchievements] = useState([]);
  const [newAchievements, setNewAchievements] = useState([]);

  useEffect(() => {
    if (!userId || !userData || !playerStats) return;

    const checkAchievements = async () => {
      try {
        // Obtener logros desbloqueados previamente
        const achievementsRef = doc(db, "players", userId, "achievements", "unlocked");
        const achievementsSnap = await getDoc(achievementsRef);
        const previouslyUnlocked = achievementsSnap.exists() ? achievementsSnap.data().list || [] : [];

        // Detectar nuevos logros desbloqueados
        const nowUnlocked = [];
        const newlyUnlocked = [];

        Object.values(ACHIEVEMENTS).forEach(achievement => {
          const isUnlocked = achievement.check(userData, playerStats);
          
          if (isUnlocked) {
            nowUnlocked.push(achievement.id);
            if (!previouslyUnlocked.includes(achievement.id)) {
              newlyUnlocked.push(achievement.id);
            }
          }
        });

        // Guardar logros desbloqueados
        if (nowUnlocked.length > 0) {
          await setDoc(achievementsRef, { 
            list: nowUnlocked,
            lastUpdated: new Date()
          });
        }

        setUnlockedAchievements(nowUnlocked);
        setNewAchievements(newlyUnlocked);

        // Limpiar notificación de nuevos logros después de 5 segundos
        if (newlyUnlocked.length > 0) {
          setTimeout(() => setNewAchievements([]), 5000);
        }
      } catch (error) {
        console.error("Error checking achievements:", error);
      }
    };

    checkAchievements();
  }, [userId, userData, playerStats]);

  return { unlockedAchievements, newAchievements };
};
