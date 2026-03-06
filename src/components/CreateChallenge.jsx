import React, { useState } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { Terminal, Code, BarChart3, Save } from 'lucide-react';

const CreateChallenge = ({ onSuccess }) => {
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [difficulty, setDifficulty] = useState('Fácil');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !code) return alert("Completa todos los campos");
    
    setLoading(true);
    try {
      await addDoc(collection(db, "challenges"), {
        title,
        code,
        difficulty,
        userId: auth.currentUser.uid,
        createdAt: new Date(),
        isCustom: true // Para diferenciarlos de los niveles base
      });
      onSuccess();
    } catch (error) {
      console.error("Error al inyectar código:", error);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto bg-slate-900/50 border-2 border-slate-800 p-8 rounded-3xl backdrop-blur-md">
      <div className="flex items-center gap-3 mb-8 border-l-4 border-pink-500 pl-4">
        <Code className="text-pink-500" size={28} />
        <h2 className="text-2xl font-black italic uppercase tracking-tighter text-white">Inyectar_Nuevo_Script</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Identificador del Módulo</label>
          <input 
            value={title} onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-black border border-slate-800 p-4 rounded-xl text-white outline-none focus:border-pink-500 transition-all"
            placeholder="Ej: Algoritmo de Encriptación"
          />
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Nivel de Seguridad (Dificultad)</label>
          <div className="grid grid-cols-3 gap-3">
            {['Fácil', 'Medio', 'Difícil'].map((lvl) => (
              <button
                key={lvl} type="button"
                onClick={() => setDifficulty(lvl)}
                className={`p-3 rounded-xl font-black text-[10px] uppercase border-2 transition-all ${
                  difficulty === lvl 
                  ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]' 
                  : 'bg-black text-slate-500 border-slate-800 hover:border-slate-600'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Fragmento de Código</label>
          <textarea 
            value={code} onChange={(e) => setCode(e.target.value)}
            className="w-full bg-black border border-slate-800 p-4 rounded-xl text-green-400 font-mono text-sm h-32 outline-none focus:border-green-500 transition-all"
            placeholder="const hack = () => { console.log('Infiltrado'); };"
          />
        </div>

        <button 
          disabled={loading}
          className="w-full bg-pink-600 hover:bg-pink-500 text-white font-black py-4 rounded-xl uppercase tracking-[0.2em] shadow-[0_0_20px_#db277766] transition-all flex items-center justify-center gap-2"
        >
          {loading ? 'Subiendo...' : <><Save size={18}/> Compilar_e_Inyectar</>}
        </button>
      </form>
    </div>
  );
};

export default CreateChallenge;