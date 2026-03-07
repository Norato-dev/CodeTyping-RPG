import { useEffect } from 'react';

export const useAppNavigation = (user, screen, currentChallenge, setScreen) => {
  // Redirige a menú cuando no hay usuario
  useEffect(() => {
    if (!user) setScreen('menu');
  }, [user, setScreen]);

  // Maneja el retorno al menú cuando termina el juego (victoria o derrota)
  useEffect(() => {
    if (currentChallenge === null && screen === 'play') {
      setScreen('menu');
    }
  }, [currentChallenge, screen, setScreen]);

  // Scroll al top cuando cambia de pantalla
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [screen]);
};
