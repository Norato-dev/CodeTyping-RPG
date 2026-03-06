import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { LogIn, UserPlus, Mail, Lock, Chrome, LogOut, ChevronDown, User } from 'lucide-react';

const Auth = ({ user, onLogoutRequest }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const googleProvider = new GoogleAuthProvider();

  const createUserProfile = async (u) => {
    const userRef = doc(db, "players", u.uid);
    const snap = await getDoc(userRef);
    if (!snap.exists()) {
      await setDoc(userRef, {
        name: u.displayName || u.email.split('@')[0],
        email: u.email,
        role: "player",
        xp: 0,
        battlesWon: 0,
        createdAt: new Date()
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      await createUserProfile(res.user);
      setIsOpen(false);
    } catch (error) { console.error(error); }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        await createUserProfile(res.user);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      setIsOpen(false);
    } catch (error) { alert("Error de acceso: " + error.message); }
  };

  if (user) {
    return (
      <div className="flex items-center gap-4 bg-slate-900/50 border border-slate-800 p-1 pr-4 rounded-full shadow-lg">
        <img 
          src={user.photoURL || `https://api.dicebear.com/7.x/identicon/svg?seed=${user.email}`} 
          className="w-8 h-8 rounded-full border border-cyan-500 shadow-[0_0_10px_#22d3ee]" 
          alt="avatar" 
        />
        <div className="hidden md:block text-left">
          <p className="text-[10px] font-black text-cyan-400 leading-none uppercase tracking-tighter">Conectado</p>
          <p className="text-xs font-mono text-white truncate max-w-[100px]">{user.displayName || user.email.split('@')[0]}</p>
        </div>
        <button 
          onClick={onLogoutRequest} 
          className="text-slate-500 hover:text-pink-500 transition-colors p-1"
          title="Desconectar"
        >
          <LogOut size={18} />
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white text-black px-5 py-2 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-cyan-400 transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)]"
      >
        <User size={14} /> ACCESO_SISTEMA <ChevronDown size={14} className={isOpen ? 'rotate-180' : ''} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-4 w-80 bg-slate-950/98 backdrop-blur-xl border-2 border-slate-800 p-6 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] z-[100]">
          <h3 className="text-xl font-black italic mb-6 flex items-center gap-2">
            {isRegistering ? <UserPlus className="text-pink-500" /> : <LogIn className="text-cyan-400" />}
            {isRegistering ? 'NUEVA_CUENTA' : 'AUTENTICAR'}
          </h3>

          <form onSubmit={handleEmailAuth} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-slate-600" size={16} />
              <input 
                type="email" placeholder="EMAIL_HUB" 
                className="w-full bg-slate-900 border border-slate-800 p-3 pl-10 rounded-xl text-xs font-mono focus:border-cyan-500 outline-none transition-all"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-slate-600" size={16} />
              <input 
                type="password" placeholder="PASSWORD_KEY" 
                className="w-full bg-slate-900 border border-slate-800 p-3 pl-10 rounded-xl text-xs font-mono focus:border-cyan-500 outline-none transition-all"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className={`w-full py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${isRegistering ? 'bg-pink-600 hover:bg-pink-500 shadow-[0_0_15px_#db2777]' : 'bg-cyan-600 hover:bg-cyan-500 shadow-[0_0_15px_#0891b2]'}`}>
              {isRegistering ? 'REGISTRAR' : 'INGRESAR'}
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-1 h-[1px] bg-slate-800"></div>
            <span className="px-3 text-[10px] text-slate-600 font-mono italic">O</span>
            <div className="flex-1 h-[1px] bg-slate-800"></div>
          </div>

          <button 
            onClick={handleGoogleLogin} 
            className="w-full bg-white text-black py-3 rounded-xl font-black text-[10px] uppercase flex items-center justify-center gap-3 hover:bg-slate-200 transition-all shadow-md"
          >
            <Chrome size={16} /> GOOGLE_SYNC
          </button>

          <button 
            onClick={() => setIsRegistering(!isRegistering)} 
            className="w-full mt-6 text-center text-[9px] text-slate-500 hover:text-white font-mono uppercase tracking-widest"
          >
            {isRegistering ? '> ¿YA TIENES ACCESO? ENTRAR' : '> ¿SIN CREDENCIALES? REGÍSTRATE'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Auth;