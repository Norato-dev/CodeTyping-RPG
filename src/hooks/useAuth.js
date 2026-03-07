import { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        const userRef = doc(db, "players", u.uid);
        onSnapshot(userRef, (docSnap) => {
          if (docSnap.exists()) setUserData(docSnap.data());
        });
      } else {
        setUserData(null);
      }
    });

    return () => unsubAuth();
  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  return { user, userData, logout };
};
