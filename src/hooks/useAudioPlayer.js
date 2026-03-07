import { useState, useEffect, useRef } from 'react';

export const useAudioPlayer = (audioPath = '/music/ambient.mp3') => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);

  // Inicializar audio
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(audioPath);
      audioRef.current.loop = true;
      audioRef.current.volume = volume;

      // Event listeners
      audioRef.current.addEventListener('play', () => setIsPlaying(true));
      audioRef.current.addEventListener('pause', () => setIsPlaying(false));
      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current.duration);
      });
      audioRef.current.addEventListener('timeupdate', () => {
        setCurrentTime(audioRef.current.currentTime);
      });
      // Asegurar que se repita automáticamente cuando termine
      audioRef.current.addEventListener('ended', () => {
        if (audioRef.current.loop) {
          audioRef.current.currentTime = 0;
          audioRef.current.play().catch(e => console.log('Error restarting:', e));
        }
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  // Actualizar volumen
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log('Error playing:', e));
    }
  };

  return {
    isPlaying,
    togglePlay,
    volume,
    setVolume,
    duration,
    currentTime,
    audioRef
  };
};
