import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, X, CheckCircle, AlertCircle } from 'lucide-react';
import { auth } from '../firebase';
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';

const ChangePasswordModal = ({ isOpen, onClose }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setMessage('');

    // Validaciones
    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessageType('error');
      setMessage('⚠ Completa todos los campos');
      return;
    }

    if (newPassword.length < 6) {
      setMessageType('error');
      setMessage('⚠ La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessageType('error');
      setMessage('⚠ Las contraseñas no coinciden');
      return;
    }

    if (newPassword === currentPassword) {
      setMessageType('error');
      setMessage('⚠ La nueva contraseña debe ser diferente');
      return;
    }

    try {
      setIsLoading(true);
      const user = auth.currentUser;

      // Reautenticar al usuario
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);

      // Actualizar contraseña
      await updatePassword(user, newPassword);

      setMessageType('success');
      setMessage('✓ Contraseña actualizada correctamente');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');

      setTimeout(() => {
        onClose();
        setMessage('');
      }, 2000);
    } catch (error) {
      setMessageType('error');
      if (error.message.includes('wrong-password')) {
        setMessage('⚠ Contraseña actual incorrecta');
      } else if (error.message.includes('requires-recent-login')) {
        setMessage('⚠ Inicia sesión nuevamente para cambiar contraseña');
      } else {
        setMessage('⚠ Error: ' + error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* OVERLAY */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* MODAL */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-slate-950/98 backdrop-blur-xl border-2 border-slate-800 p-8 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] z-50"
          >
            {/* HEADER */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black italic flex items-center gap-2 text-cyan-400">
                <Lock size={24} /> CAMBIAR_PASSWORD
              </h2>
              <button
                onClick={onClose}
                className="text-slate-500 hover:text-pink-500 transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>

            {/* MENSAJES */}
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-6 p-3 rounded-lg border text-xs font-bold flex items-center gap-2 ${
                  messageType === 'success'
                    ? 'bg-green-500/20 border-green-500 text-green-400'
                    : 'bg-red-500/20 border-red-500 text-red-400'
                }`}
              >
                {messageType === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                {message}
              </motion.div>
            )}

            {/* FORMULARIO */}
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div className="relative">
                <label className="text-xs font-bold text-slate-400 uppercase block mb-2">
                  Contraseña Actual
                </label>
                <input
                  type="password"
                  placeholder="CONTRASEÑA_ACTUAL"
                  className="w-full bg-slate-900 border border-slate-800 p-3 rounded-xl text-xs font-mono focus:border-cyan-500 outline-none transition-all"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>

              <div className="relative">
                <label className="text-xs font-bold text-slate-400 uppercase block mb-2">
                  Nueva Contraseña
                </label>
                <input
                  type="password"
                  placeholder="NUEVA_PASSWORD"
                  className="w-full bg-slate-900 border border-slate-800 p-3 rounded-xl text-xs font-mono focus:border-cyan-500 outline-none transition-all"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>

              <div className="relative">
                <label className="text-xs font-bold text-slate-400 uppercase block mb-2">
                  Confirmar Contraseña
                </label>
                <input
                  type="password"
                  placeholder="CONFIRMAR_PASSWORD"
                  className="w-full bg-slate-900 border border-slate-800 p-3 rounded-xl text-xs font-mono focus:border-cyan-500 outline-none transition-all"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 rounded-xl font-black text-xs uppercase tracking-widest bg-slate-800 hover:bg-slate-700 transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 py-3 rounded-xl font-black text-xs uppercase tracking-widest bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 transition-all shadow-[0_0_15px_#0891b2]"
                >
                  {isLoading ? 'PROCESANDO...' : 'ACTUALIZAR'}
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ChangePasswordModal;
