import React from 'react';
import { Terminal, Github, ExternalLink, Heart } from 'lucide-react';

const Footer = ({ githubUrl, developerName }) => {
  return (
    <footer className="mt-auto border-t-2 border-green-500/10 bg-slate-950/50 backdrop-blur-xl py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Columna 1: Branding */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="bg-green-500/20 p-2 rounded-lg border border-green-500/50">
              <Terminal className="text-green-500" size={20} />
            </div>
            <span className="font-black italic uppercase tracking-tighter text-lg">
              CODE-TYPING <span className="text-pink-500">RPG</span>
            </span>
          </div>
          <p className="text-slate-500 text-xs font-mono leading-relaxed">
            Sistema de entrenamiento avanzado para operativos de élite. 
            Domina el código, hackea el mainframe y sube de nivel.
          </p>
        </div>

        {/* Columna 2: Estado del Sistema (Decorativo) */}
        <div className="flex flex-col space-y-3">
          <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">System Status</h4>
          <div className="flex items-center gap-2 text-xs font-mono text-green-400">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"></div>
            MAINFRAME: ONLINE
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <div className="w-2 h-2 bg-cyan-500 rounded-full shadow-[0_0_8px_#06b6d4]"></div>
            DATABASE: ENCRYPTED
          </div>
        </div>

        {/* Columna 3: Links y Créditos */}
        <div className="flex flex-col space-y-4 md:items-end">
          <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">Developer Access</h4>
          <div className="flex gap-4">
            <a 
              href={githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-2 bg-slate-900 border border-slate-700 px-4 py-2 rounded-xl hover:border-pink-500 transition-all duration-300"
            >
              <Github size={18} className="text-slate-400 group-hover:text-pink-500" />
              <span className="text-xs font-bold uppercase group-hover:text-white">GitHub</span>
              <ExternalLink size={12} className="text-slate-600" />
            </a>
          </div>
          <p className="text-[10px] font-mono text-slate-600 flex items-center gap-1">
            Hecho con <Heart size={10} className="text-pink-600 fill-pink-600" /> por <span className="text-slate-400 font-bold">{developerName}</span>
          </p>
        </div>

      </div>
      
      {/* Línea final */}
      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] font-mono text-slate-700 uppercase tracking-[0.2em]">
        <span>© 2026 Operación Code-Typing.</span>
        <span className="hidden md:block">v2.1.0 - Stable_Branch</span>
      </div>
    </footer>
  );
};

export default Footer;