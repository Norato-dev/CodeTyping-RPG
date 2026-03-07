import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification
} from 'firebase/auth';
import { doc, setDoc, getDoc, collection, query, where, getDocs, deleteDoc } from 'firebase/firestore';
import { LogIn, UserPlus, Mail, Lock, Chrome, LogOut, ChevronDown, User, AlertCircle, CheckCircle, Loader } from 'lucide-react';

const Auth = ({ user, onLogoutRequest }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

  // Función para limpiar emails huérfanos en Firestore
  const cleanupOrphanedEmail = async (emailToClean) => {
    try {
      const playersQuery = query(collection(db, "players"), where("email", "==", emailToClean));
      const snapshot = await getDocs(playersQuery);
      
      for (const docSnapshot of snapshot.docs) {
        await deleteDoc(doc(db, "players", docSnapshot.id));
      }
      
      return snapshot.docs.length;
    } catch (error) {
      console.error("Error limpiando email:", error);
      return 0;
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const res = await signInWithPopup(auth, googleProvider);
      await createUserProfile(res.user);
      setIsOpen(false);
    } catch (error) { 
      console.error(error);
      setMessageType('error');
      setMessage('⚠ Error al conectar con Google');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsLoading(true);
    try {
      if (isRegistering) {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(res.user);
        await createUserProfile(res.user);
        setMessageType('success');
        setMessage('✓ Cuenta creada. Verifica tu email para completar el registro.');
        setEmail('');
        setPassword('');
        setTimeout(() => {
          setIsRegistering(false);
          setMessage('');
        }, 4000);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        setIsOpen(false);
      }
    } catch (error) {
      // Si el email está "ya registrado", intentar limpiar y reparar
      if (error.message.includes('email-already-in-use') && isRegistering) {
        setMessageType('warning');
        setMessage('⚠ Email encontrado. Limpiando registro duplicado...');
        
        const cleanedCount = await cleanupOrphanedEmail(email);
        
        if (cleanedCount > 0) {
          setMessageType('info');
          setMessage(`ℹ Se limpió ${cleanedCount} registro(s). Intenta registrarte nuevamente en 5 segundos.`);
          setTimeout(() => setMessage(''), 5000);
        } else {
          setMessageType('error');
          setMessage('⚠ Email registrado en Authentication. Usa "¿Olvidaste tu password?" o contacta soporte.');
        }
      } else {
        setMessageType('error');
        setMessage('⚠ ' + (error.message.includes('user-not-found') ? 'Usuario no encontrado' : 
                   error.message.includes('wrong-password') ? 'Contraseña incorrecta' :
                   error.message.includes('email-already-in-use') ? 'Email ya registrado' :
                   error.message.includes('weak-password') ? 'Contraseña muy débil (mín 6 caracteres)' :
                   'Error: ' + error.message));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!email) {
      setMessageType('error');
      setMessage('⚠ Ingresa tu email para recuperar la contraseña');
      return;
    }
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setMessageType('success');
      setMessage('✓ Email de recuperación enviado. Revisa tu bandeja.');
      setEmail('');
      setTimeout(() => {
        setIsForgotPassword(false);
        setMessage('');
      }, 4000);
    } catch (error) {
      setMessageType('error');
      setMessage('⚠ ' + (error.message.includes('user-not-found') ? 'Email no encontrado' : 'Error al enviar email'));
    } finally {
      setIsLoading(false);
    }
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
            {isForgotPassword ? <AlertCircle className="text-orange-500" /> :
             isRegistering ? <UserPlus className="text-pink-500" /> : <LogIn className="text-cyan-400" />}
            {isForgotPassword ? 'RECUPERAR_PASSWORD' :
             isRegistering ? 'NUEVA_CUENTA' : 'AUTENTICAR'}
          </h3>

          {/* MENSAJES */}
          {message && (
            <div className={`mb-4 p-3 rounded-lg border text-xs font-bold flex items-center gap-2 ${
              messageType === 'success' 
                ? 'bg-green-500/20 border-green-500 text-green-400' 
                : 'bg-red-500/20 border-red-500 text-red-400'
            }`}>
              {messageType === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
              {message}
            </div>
          )}

          {isForgotPassword ? (
            // FORMULARIO RECUPERAR CONTRASEÑA
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-slate-600" size={16} />
                <input 
                  type="email" placeholder="EMAIL_REGISTRADO" 
                  className="w-full bg-slate-900 border border-slate-800 p-3 pl-10 rounded-xl text-xs font-mono focus:border-orange-500 outline-none transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button className="w-full py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all bg-orange-600 hover:bg-orange-500 shadow-[0_0_15px_#ea580c] disabled:opacity-50 flex items-center justify-center gap-2"
                disabled={isLoading}>
                {isLoading && <Loader className="animate-spin" size={14} />}
                ENVIAR_EMAIL_RECUPERACIÓN
              </button>
            </form>
          ) : (
            // FORMULARIO LOGIN / REGISTRO
            <form onSubmit={handleEmailAuth} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-slate-600" size={16} />
                <input 
                  type="email" placeholder="EMAIL_HUB" 
                  className="w-full bg-slate-900 border border-slate-800 p-3 pl-10 rounded-xl text-xs font-mono focus:border-cyan-500 outline-none transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-slate-600" size={16} />
                <input 
                  type="password" placeholder="PASSWORD_KEY" 
                  className="w-full bg-slate-900 border border-slate-800 p-3 pl-10 rounded-xl text-xs font-mono focus:border-cyan-500 outline-none transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button className={`w-full py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${isRegistering ? 'bg-pink-600 hover:bg-pink-500 shadow-[0_0_15px_#db2777]' : 'bg-cyan-600 hover:bg-cyan-500 shadow-[0_0_15px_#0891b2]'} disabled:opacity-50`}
                disabled={isLoading}>
                {isLoading && <Loader className="animate-spin" size={14} />}
                {isRegistering ? 'REGISTRAR' : 'INGRESAR'}
              </button>
            </form>
          )}

          <div className="flex items-center my-6">
            <div className="flex-1 h-[1px] bg-slate-800"></div>
            <span className="px-3 text-[10px] text-slate-600 font-mono italic">O</span>
            <div className="flex-1 h-[1px] bg-slate-800"></div>
          </div>

          {!isForgotPassword && (
            <button 
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full bg-white text-black py-3 rounded-xl font-black text-[10px] uppercase flex items-center justify-center gap-3 hover:bg-slate-200 transition-all shadow-md disabled:opacity-50"
            >
              {isLoading ? <Loader className="animate-spin" size={16} /> : <Chrome size={16} />}
              GOOGLE_SYNC
            </button>
          )}

          <button 
            onClick={() => {
              if (isForgotPassword) {
                setIsForgotPassword(false);
              } else {
                setIsRegistering(!isRegistering);
              }
              setMessage('');
            }} 
            className="w-full mt-4 text-center text-[9px] text-slate-500 hover:text-white font-mono uppercase tracking-widest"
          >
            {isForgotPassword && '> VOLVER AL LOGIN'}
            {!isForgotPassword && isRegistering && '> ¿YA TIENES ACCESO? ENTRAR'}
            {!isForgotPassword && !isRegistering && '> ¿SIN CREDENCIALES? REGÍSTRATE'}
          </button>

          {!isForgotPassword && !isRegistering && (
            <button 
              onClick={() => {
                setIsForgotPassword(true);
                setMessage('');
              }} 
              className="w-full mt-2 text-center text-[9px] text-orange-500 hover:text-orange-400 font-mono uppercase tracking-widest"
            >
              {'>'} ¿OLVIDASTE TU PASSWORD?
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Auth;