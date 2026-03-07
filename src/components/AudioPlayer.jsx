import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, Volume1, VolumeX } from 'lucide-react';
import { useAudioPlayer } from '../hooks/useAudioPlayer';

const AudioPlayer = () => {
  const { isPlaying, togglePlay, volume, setVolume } = useAudioPlayer('/music/ambient.mp3');

  const getVolumeIcon = () => {
    if (volume === 0) return <VolumeX size={18} />;
    if (volume < 0.5) return <Volume1 size={18} />;
    return <Volume2 size={18} />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="fixed bottom-6 right-6 z-40"
    >
      <div className="bg-gradient-to-br from-cyan-900/90 to-slate-900/90 backdrop-blur-xl border-2 border-cyan-500/50 p-6 rounded-2xl shadow-[0_0_20px_rgba(6,182,212,0.3)] w-72">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎵</span>
            <span className="text-[10px] font-black text-cyan-300 uppercase tracking-widest">
              Música_Ambiente
            </span>
          </div>
          {isPlaying && (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.6, repeat: Infinity }}
              className="w-2 h-2 bg-cyan-400 rounded-full"
            />
          )}
        </div>

        {/* PLAY/PAUSE BUTTON */}
        <button
          onClick={togglePlay}
          className="w-full py-3 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white rounded-xl font-black text-xs uppercase flex items-center justify-center gap-2 mb-4 transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)]"
        >
          {isPlaying ? (
            <>
              <Pause size={16} fill="currentColor" /> PAUSAR
            </>
          ) : (
            <>
              <Play size={16} fill="currentColor" /> REPRODUCIR
            </>
          )}
        </button>

        {/* VOLUMEN CONTROL */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            {getVolumeIcon()}
            <span className="text-xs font-bold text-cyan-300">
              {Math.round(volume * 100)}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-full h-2 bg-cyan-900/50 rounded-full accent-cyan-500 cursor-pointer hover:accent-cyan-400 transition-all"
          />
        </div>

        {/* INFO */}
        <p className="text-[8px] text-cyan-400/50 text-center mt-4 italic">
          Carga tu MP3 en public/music/ambient.mp3
        </p>
      </div>
    </motion.div>
  );
};

export default AudioPlayer;
