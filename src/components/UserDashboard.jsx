import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { doc, updateDoc, deleteDoc, collection, query, where, onSnapshot } from 'firebase/firestore';
import { Trophy, Zap, Activity, Trash2, Edit2, Code, X, Check } from 'lucide-react';

const UserDashboard = ({ user, userData }) => {
  const [myChallenges, setMyChallenges] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', code: '', difficulty: '' });

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "challenges"), where("userId", "==", user.uid));
    const unsub = onSnapshot(q, (snap) => {
      setMyChallenges(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, [user]);

  // Función para iniciar la edición
  const startEdit = (ch) => {
    setEditingId(ch.id);
    setEditForm({ title: ch.title, code: ch.code, difficulty: ch.difficulty });
  };

  // Función para guardar cambios
  const handleUpdate = async (id) => {
    try {
      const docRef = doc(db, "challenges", id);
      await updateDoc(docRef, {
        title: editForm.title,
        code: editForm.code,
        difficulty: editForm.difficulty
      });
      setEditingId(null);
    } catch (error) {
      console.error("Error al actualizar:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que deseas purgar este script de la base de datos?")) {
      await deleteDoc(doc(db, "challenges", id));
    }
  };

  if (!userData) return <div className="text-center p-20 text-cyan-500 font-mono animate-pulse">CONECTANDO AL MAINFRAME...</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      {/* Perfil y Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-slate-900/50 border-2 border-slate-800 p-8 rounded-3xl text-center backdrop-blur-sm">
          <div className="relative inline-block mb-6">
            <img 
              src={userData.photoURL || `https://api.dicebear.com/7.x/identicon/svg?seed=${user.email}`} 
              className="w-32 h-32 rounded-full border-4 border-cyan-500 shadow-[0_0_20px_#06b6d444]"
              alt="Avatar"
            />
          </div>
          <h2 className="text-2xl font-black text-white italic">{userData.name}</h2>
          <p className="text-[10px] text-cyan-400 font-mono font-bold uppercase mt-2">{userData.role || 'Hacker Novato'}</p>
        </div>

        <div className="md:col-span-2 bg-slate-900/50 border-2 border-slate-800 p-8 rounded-3xl flex flex-col justify-center">
          <h3 className="text-xl font-black italic mb-6 text-green-500 uppercase flex items-center gap-2"><Activity size={20}/> LOG_DE_COMBATE</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-black/40 p-5 rounded-2xl border border-slate-800 text-center">
              <p className="text-slate-500 text-[9px] uppercase font-bold mb-1">XP TOTAL</p>
              <div className="flex items-center justify-center gap-2 text-white font-black text-3xl"><Zap className="text-yellow-500" size={18}/>{userData.xp || 0}</div>
            </div>
            <div className="bg-black/40 p-5 rounded-2xl border border-slate-800 text-center">
              <p className="text-slate-500 text-[9px] uppercase font-bold mb-1">HACKS COMPLETADOS</p>
              <div className="flex items-center justify-center gap-2 text-white font-black text-3xl"><Trophy className="text-pink-500" size={18}/>{userData.battlesWon || 0}</div>
            </div>
          </div>
        </div>
      </div>

      {/* GESTOR DE NIVELES PROPIOS */}
      <div className="bg-slate-900/50 border-2 border-slate-800 rounded-3xl p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-8 border-l-4 border-cyan-500 pl-4">
          <Code className="text-cyan-500" size={24} />
          <h3 className="text-xl font-black italic uppercase text-white">Mis_Scripts_Privados</h3>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {myChallenges.map((ch) => (
            <div key={ch.id} className="bg-black/60 border border-slate-800 p-5 rounded-2xl transition-all">
              {editingId === ch.id ? (
                /* MODO EDICIÓN */
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input 
                      className="bg-slate-900 border border-slate-700 p-2 rounded text-white text-sm"
                      value={editForm.title}
                      onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                      placeholder="Título"
                    />
                    <select 
                      className="bg-slate-900 border border-slate-700 p-2 rounded text-white text-sm"
                      value={editForm.difficulty}
                      onChange={(e) => setEditForm({...editForm, difficulty: e.target.value})}
                    >
                      <option value="Fácil">Fácil</option>
                      <option value="Medio">Medio</option>
                      <option value="Difícil">Difícil</option>
                    </select>
                  </div>
                  <textarea 
                    className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-green-400 font-mono text-xs h-24"
                    value={editForm.code}
                    onChange={(e) => setEditForm({...editForm, code: e.target.value})}
                  />
                  <div className="flex gap-2 justify-end">
                    <button onClick={() => setEditingId(null)} className="flex items-center gap-1 px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded text-white text-xs font-bold uppercase">
                      <X size={14}/> Cancelar
                    </button>
                    <button onClick={() => handleUpdate(ch.id)} className="flex items-center gap-1 px-3 py-1 bg-green-600 hover:bg-green-500 rounded text-black text-xs font-bold uppercase">
                      <Check size={14}/> Guardar
                    </button>
                  </div>
                </div>
              ) : (
                /* MODO VISTA */
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-white text-lg">{ch.title}</h4>
                    <div className="flex items-center gap-4 mt-1">
                      <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded border ${
                        ch.difficulty === 'Difícil' ? 'border-pink-500 text-pink-500' : 
                        ch.difficulty === 'Medio' ? 'border-cyan-500 text-cyan-500' : 'border-green-500 text-green-500'
                      }`}>
                        {ch.difficulty}
                      </span>
                      <span className="text-[9px] text-slate-500 font-mono">ID: {ch.id.substring(0,8)}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => startEdit(ch)} className="p-3 bg-cyan-500/10 hover:bg-cyan-500 text-cyan-500 hover:text-black rounded-xl transition-all">
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => handleDelete(ch.id)} className="p-3 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
          {myChallenges.length === 0 && (
            <p className="text-center text-slate-600 py-10 italic">No has inyectado scripts todavía.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;