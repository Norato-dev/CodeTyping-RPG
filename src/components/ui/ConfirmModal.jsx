import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, Check } from 'lucide-react';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Overlay oscuro con blur */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
          />
          
          {/* Caja del Modal */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-slate-900 border-2 border-pink-500/50 p-8 rounded-3xl shadow-[0_0_50px_rgba(236,72,153,0.2)] max-w-sm w-full text-center"
          >
            <div className="bg-pink-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 border border-pink-500/30">
              <AlertTriangle className="text-pink-500" size={32} />
            </div>
            
            <h3 className="text-2xl font-black italic text-white mb-2 uppercase tracking-tighter">
              {title || '¿TERMINAR_SESIÓN?'}
            </h3>
            <p className="text-slate-400 text-sm font-mono mb-8">
              {message || 'Se interrumpirá la conexión segura con el mainframe.'}
            </p>
            
            <div className="flex gap-4">
              <button 
                onClick={onClose}
                className="flex-1 py-3 rounded-xl border border-slate-700 text-slate-400 font-bold text-xs hover:bg-slate-800 transition-all uppercase tracking-widest"
              >
                CANCELAR
              </button>
              <button 
                onClick={onConfirm}
                className="flex-1 py-3 rounded-xl bg-pink-600 text-white font-black text-xs hover:bg-pink-500 shadow-[0_0_20px_rgba(219,39,119,0.4)] transition-all uppercase tracking-widest flex items-center justify-center gap-2"
              >
                <Check size={16} /> CONFIRMAR
              </button>
            </div>

            {/* Decoración de esquina */}
            <div className="absolute top-4 right-4 text-slate-800">
              <X size={20} className="cursor-pointer hover:text-white transition-colors" onClick={onClose} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;