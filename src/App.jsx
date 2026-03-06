import React, { useState, useEffect } from 'react';
import { db, auth } from './firebase';
import { 
  collection, onSnapshot, doc, updateDoc, increment, 
  query, orderBy, arrayUnion 
} from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';

import Game from './components/Game';
import CreateChallenge from './components/CreateChallenge';
import Auth from './components/Auth';
import UserDashboard from './components/UserDashboard';
import ConfirmModal from './components/ConfirmModal';
import MissionGrid from './components/MissionGrid';

import { Terminal, Star, Shield, Lock, Clock, AlertTriangle, Zap, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DIFFICULTY_THEMES = {
  Fácil: { accent: "text-green-400", bg: "bg-green-500", border: "border-green-500/50", shadow: "shadow-[0_0_30px_#22c55e33]", sprite: "bottts-neutral", color: "#22c55e", time: 60 },
  Medio: { accent: "text-cyan-400", bg: "bg-cyan-500", border: "border-cyan-500/50", shadow: "shadow-[0_0_30px_#06b6d433]", sprite: "avataaars", color: "#06b6d4", time: 45 },
  Difícil: { accent: "text-pink-500", bg: "bg-pink-500", border: "border-pink-500/50", shadow: "shadow-[0_0_30px_#ec489933]", sprite: "pixel-art", color: "#ec4899", time: 30 }
};

// FIX: Enlaces de audio más estables y manejo de errores mejorado
const playSound = (type) => {
  const audio = new Audio(`/sounds/${type}.wav`);
  audio.volume = 0.4;
  audio.play().catch((e) => console.warn("Error al reproducir sonido:", e));
};

function App() {
  const [screen, setScreen] = useState('menu'); 
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [challenges, setChallenges] = useState([]); 
  const [myCustomChallenges, setMyCustomChallenges] = useState([]); 
  const [currentChallenge, setCurrentChallenge] = useState(null);
  
  // ESTADOS DE JUEGO Y ESTADÍSTICAS
  const [isAttacking, setIsAttacking] = useState(false);
  const [isDefeated, setIsDefeated] = useState(false);
  const [gainedXP, setGainedXP] = useState(null);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [liveStats, setLiveStats] = useState({ wpm: 0, progress: 0 });

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
        setScreen('menu');
      }
    });

    const q = query(collection(db, "challenges"), orderBy("createdAt", "desc"));
    const unsubData = onSnapshot(q, (snap) => {
      const allLevels = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setChallenges(allLevels.filter(c => !c.userId));
      setMyCustomChallenges(allLevels.filter(c => c.userId === auth.currentUser?.uid));
    });

    return () => { unsubAuth(); unsubData(); };
  }, [user]);

  useEffect(() => {
    let timer;
    if (screen === 'play' && timeLeft > 0 && !isGameOver && !isDefeated) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && screen === 'play' && !isDefeated && !isGameOver) {
      handleGameOver();
    }
    return () => clearInterval(timer);
  }, [timeLeft, screen, isGameOver, isDefeated]);

  const startChallenge = (c) => {
    playSound('click');
    setCurrentChallenge(c);
    setLives(3);
    setTimeLeft(DIFFICULTY_THEMES[c.difficulty].time);
    setLiveStats({ wpm: 0, progress: 0 });
    setIsGameOver(false);
    setIsDefeated(false);
    setGainedXP(null);
    setScreen('play');
  };

  const handleGameOver = () => {
    setIsGameOver(true);
    playSound('fail');
    setTimeout(() => {
      setScreen('menu');
      setIsGameOver(false);
      setCurrentChallenge(null);
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
        setIsDefeated(false);
        setScreen('menu');
        setCurrentChallenge(null);
      }, 3000);
    }, 600);
  };

  return (
    <div className="min-h-screen w-full bg-[#020617] text-slate-100 selection:bg-cyan-500/30">
      <ConfirmModal isOpen={showLogoutModal} onClose={() => setShowLogoutModal(false)} onConfirm={() => { signOut(auth); setShowLogoutModal(false); }} />

      {/* NAVBAR */}
      <nav className="border-b-2 border-green-500/20 p-4 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setScreen('menu')}>
            <div className="bg-green-500 p-2 rounded-lg transition-transform group-hover:rotate-12">
              <Terminal className="text-black" size={24} />
            </div>
            <h1 className="text-xl font-black italic uppercase tracking-tighter">
              CODE-TYPING <span className="text-pink-500">RPG</span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            {user && (
              <>
                <button onClick={() => setScreen('create')} className="text-[10px] font-black uppercase px-4 py-2 rounded-lg text-pink-500 hover:bg-pink-500/10">INYECTAR</button>
                <button onClick={() => setScreen('dashboard')} className="text-[10px] font-black uppercase px-4 py-2 rounded-lg border border-slate-700 text-cyan-400 hover:border-cyan-500 transition-all">[ PERFIL ]</button>
              </>
            )}
            <Auth user={user} onLogoutRequest={() => setShowLogoutModal(true)} />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-6">
        <AnimatePresence mode="wait">
          {!user ? (
            <motion.div key="locked" className="flex flex-col items-center justify-center py-20">
               <div className="bg-slate-900/50 border-2 border-red-500/50 p-12 rounded-[50px] max-w-xl text-center min-h-[400px] flex flex-col justify-center relative backdrop-blur-md">
                  <Lock size={40} className="text-red-500 mx-auto mb-6" />
                  <h2 className="text-3xl font-black uppercase italic mb-4">Acceso <span className="text-red-500">Restringido</span></h2>
                  <p className="text-slate-400 text-xs font-mono mb-8">INICIE SESIÓN PARA ACCEDER AL MAINFRAME</p>
                  <div className="flex justify-center scale-125 relative z-50"><Auth user={user} onLogoutRequest={() => {}} /></div>
               </div>
            </motion.div>
          ) : (
            <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {screen === 'menu' && (
                <div className="space-y-20">
                  <section>
                    <div className="border-l-4 border-green-500 pl-6 mb-8">
                      <h2 className="text-4xl font-black uppercase italic">Misiones <span className="text-green-500">Base</span></h2>
                    </div>
                    <MissionGrid challenges={challenges} onStart={startChallenge} completedLevels={userData?.completedLevels || []} themes={DIFFICULTY_THEMES} />
                  </section>
                  {myCustomChallenges.length > 0 && (
                    <section>
                      <div className="border-l-4 border-pink-600 pl-6 mb-8">
                        <h2 className="text-4xl font-black uppercase italic text-pink-500">Mis Inyecciones</h2>
                      </div>
                      <MissionGrid challenges={myCustomChallenges} onStart={startChallenge} completedLevels={userData?.completedLevels || []} themes={DIFFICULTY_THEMES} />
                    </section>
                  )}
                </div>
              )}

              {screen === 'play' && currentChallenge && (
                <div className="max-w-6xl mx-auto w-full flex flex-col items-center py-10">
                  {/* HUD SUPERIOR */}
                  <div className="w-full max-w-4xl flex justify-between items-center mb-8 bg-slate-900/50 p-6 rounded-3xl border border-slate-800 backdrop-blur-md">
                    <div className="flex items-center gap-6">
                      <div className="flex gap-2">
                        {[...Array(3)].map((_, i) => (
                          <Shield key={i} size={28} fill={i < lives ? "#ec4899" : "transparent"} className={i < lives ? "text-pink-500 drop-shadow-[0_0_8px_#ec4899]" : "text-slate-800"} />
                        ))}
                      </div>
                      <span className="text-[10px] font-black text-pink-500 uppercase tracking-widest">Integridad</span>
                    </div>
                    <div className={`flex items-center gap-3 text-3xl font-black ${timeLeft < 10 ? 'text-red-500 animate-pulse' : 'text-cyan-400'}`}>
                      <Clock size={28} /> {timeLeft}s
                    </div>
                  </div>

                  {isGameOver ? (
                    <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center py-20">
                      <AlertTriangle size={100} className="text-red-500 mx-auto mb-6 animate-pulse" />
                      <h2 className="text-6xl font-black italic text-white uppercase">Hack Fallido</h2>
                      <p className="text-red-500 font-mono text-xl mt-4 uppercase">Señal rastreada... desconectando.</p>
                    </motion.div>
                  ) : (
                    <>
                      {/* ÁREA DEL ENEMIGO */}
                      <div className="relative mb-8 text-center">
                        <motion.div animate={isDefeated ? { rotate: 90, opacity: 0 } : isAttacking ? { scale: 1.3, filter: "brightness(2)" } : { y: [0, -15, 0] }} transition={{ duration: 0.2 }}>
                          <img src={`https://api.dicebear.com/7.x/${DIFFICULTY_THEMES[currentChallenge.difficulty].sprite}/svg?seed=${currentChallenge.id}`} className="w-64 h-64 relative z-10 drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]" />
                        </motion.div>
                        <AnimatePresence>
                          {gainedXP && (
                            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: -50, opacity: 1 }} className="absolute inset-0 flex items-center justify-center text-4xl font-black text-yellow-400 z-50">
                              <Star className="mr-2" fill="currentColor" /> +{gainedXP} XP
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* LIVE STATS RECUADROS (WPM & SYNC) */}
                      <div className="flex gap-4 mb-6">
                         <div className="bg-black/40 border border-cyan-500/30 px-6 py-2 rounded-2xl flex items-center gap-3 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                            <Zap size={16} className="text-cyan-400" />
                            <span className="text-2xl font-black text-white">{liveStats.wpm}</span>
                            <span className="text-[10px] text-cyan-500 font-bold uppercase">WPM</span>
                         </div>
                         <div className="bg-black/40 border border-pink-500/30 px-6 py-2 rounded-2xl flex items-center gap-3 shadow-[0_0_15px_rgba(236,72,153,0.1)]">
                            <Target size={16} className="text-pink-500" />
                            <span className="text-2xl font-black text-white">{liveStats.progress}%</span>
                            <span className="text-[10px] text-pink-500 font-bold uppercase">Sync</span>
                         </div>
                      </div>

                      {/* EDITOR DE CÓDIGO */}
                      <Game 
                        codeSnippet={currentChallenge.code} 
                        onComplete={handleWin} 
                        onMistake={() => {
                          const newLives = lives - 1;
                          setLives(newLives);
                          if (newLives <= 0) handleGameOver();
                        }} 
                        onStatsUpdate={(stats) => setLiveStats(stats)}
                      />
                    </>
                  )}
                </div>
              )}
              {screen === 'dashboard' && <UserDashboard user={user} userData={userData} />}
              {screen === 'create' && <CreateChallenge onSuccess={() => setScreen('menu')} />}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;