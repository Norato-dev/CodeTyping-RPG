import React from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

const AuthScreen = () => {
  return (
    <motion.div 
      key="locked" 
      className="flex flex-col items-center justify-center py-20"
    >
      <div className="bg-slate-900/50 border-2 border-red-500/50 p-12 rounded-[50px] max-w-xl text-center min-h-[400px] flex flex-col justify-center relative backdrop-blur-md">
        <Lock size={40} className="text-red-500 mx-auto mb-6" />
        <h2 className="text-3xl font-black uppercase italic mb-4">
          Acceso <span className="text-red-500">Restringido</span>
        </h2>
        <p className="text-slate-400 font-mono text-sm mb-10 leading-relaxed uppercase tracking-widest">
          Se requiere una firma digital válida para acceder a la base de datos de misiones. 
          Por favor, autentíquese.
        </p>
      </div>
    </motion.div>
  );
};

export default AuthScreen;
