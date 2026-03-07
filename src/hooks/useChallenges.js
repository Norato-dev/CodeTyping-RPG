import { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

export const useChallenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [myCustomChallenges, setMyCustomChallenges] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "challenges"), orderBy("createdAt", "desc"));
    const unsubData = onSnapshot(q, (snap) => {
      const allLevels = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setChallenges(allLevels.filter(c => !c.userId));
      setMyCustomChallenges(allLevels.filter(c => c.userId === auth.currentUser?.uid));
    });

    return () => unsubData();
  }, []);

  return { challenges, myCustomChallenges };
};
