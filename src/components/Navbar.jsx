import React, { useState } from 'react';
import { Terminal, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Auth from './Auth';

const Navbar = ({ user, screen, onScreenChange, onLogoutRequest }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (screenName) => {
    onScreenChange(screenName);
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="border-b-2 border-green-500/20 p-4 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => handleNavClick('menu')}
          >
            <div className="bg-green-500 p-2 rounded-lg transition-transform group-hover:rotate-12 group-hover:shadow-[0_0_15px_rgba(34,197,94,0.7)]">
              <Terminal className="text-black" size={24} />
            </div>
            <h1 className="text-xl font-black italic uppercase tracking-tighter transition-colors group-hover:text-green-500 hidden sm:block">
              CODE-TYPING <span className="text-pink-500">RPG</span>
            </h1>
          </div>
          
          {/* MENÚ DESKTOP */}
          <div className="hidden md:flex items-center gap-4">
            {user && (
              <>
                <button 
                  onClick={() => handleNavClick('create')} 
                  className={`text-[10px] font-black uppercase px-4 py-2 rounded-lg transition-all ${
                    screen === 'create'
                      ? 'bg-pink-500/30 text-pink-400 border border-pink-500/50'
                      : 'text-pink-500 hover:bg-pink-500/10'
                  }`}
                >
                  INYECTAR
                </button>
                <button 
                  onClick={() => handleNavClick('dashboard')} 
                  className={`text-[10px] font-black uppercase px-4 py-2 rounded-lg transition-all ${
                    screen === 'dashboard'
                      ? 'bg-cyan-500/30 text-cyan-400 border border-cyan-500/50'
                      : 'border border-slate-700 text-cyan-400 hover:border-cyan-500'
                  }`}
                >
                  [ PERFIL ]
                </button>
                <button 
                  onClick={() => handleNavClick('leaderboard')} 
                  className={`text-[10px] font-black uppercase px-4 py-2 rounded-lg transition-all ${
                    screen === 'leaderboard'
                      ? 'bg-yellow-500/30 text-yellow-400 border border-yellow-500/50'
                      : 'text-yellow-500 hover:bg-yellow-500/10'
                  }`}
                >
                  🏆 RANKING
                </button>
              </>
            )}
            <Auth user={user} onLogoutRequest={onLogoutRequest} />
          </div>

          {/* MENÚ MÓVIL */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-green-500 hover:text-green-400 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Auth user={user} onLogoutRequest={onLogoutRequest} />
          </div>
        </div>
      </nav>

      {/* MENÚ DESPLEGABLE MÓVIL */}
      <AnimatePresence>
        {isMenuOpen && user && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-900/95 border-b border-green-500/20 backdrop-blur-xl z-40"
          >
            <div className="max-w-7xl mx-auto p-4 flex flex-col gap-3">
              <button 
                onClick={() => handleNavClick('create')} 
                className={`text-sm font-black uppercase px-4 py-3 rounded-lg transition-all text-left ${
                  screen === 'create'
                    ? 'bg-pink-500/30 text-pink-400 border border-pink-500/50'
                    : 'text-pink-500 hover:bg-pink-500/10'
                }`}
              >
                INYECTAR
              </button>
              <button 
                onClick={() => handleNavClick('dashboard')} 
                className={`text-sm font-black uppercase px-4 py-3 rounded-lg transition-all text-left ${
                  screen === 'dashboard'
                    ? 'bg-cyan-500/30 text-cyan-400 border border-cyan-500/50'
                    : 'border border-slate-700 text-cyan-400 hover:border-cyan-500'
                }`}
              >
                [ PERFIL ]
              </button>
              <button 
                onClick={() => handleNavClick('leaderboard')} 
                className={`text-sm font-black uppercase px-4 py-3 rounded-lg transition-all text-left ${
                  screen === 'leaderboard'
                    ? 'bg-yellow-500/30 text-yellow-400 border border-yellow-500/50'
                    : 'text-yellow-500 hover:bg-yellow-500/10'
                }`}
              >
                🏆 RANKING
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
