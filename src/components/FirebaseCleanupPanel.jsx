import React, { useState } from 'react';
import { findOrphanedUsers, deleteOrphanedUser, cleanupDuplicateEmail } from '../utils/firebaseCleanup';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, AlertTriangle, CheckCircle, Search, Loader } from 'lucide-react';

const FirebaseCleanupPanel = () => {
  const [orphanedUsers, setOrphanedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [emailToClean, setEmailToClean] = useState('');

  const handleFindOrphaned = async () => {
    setIsLoading(true);
    setMessage('');
    try {
      const orphaned = await findOrphanedUsers();
      setOrphanedUsers(orphaned);
      if (orphaned.length === 0) {
        setMessageType('success');
        setMessage('✓ No hay usuarios huérfanos');
      } else {
        setMessageType('warning');
        setMessage(`⚠ ${orphaned.length} usuario(s) huérfano(s) encontrado(s)`);
      }
    } catch (error) {
      setMessageType('error');
      setMessage('✗ Error: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteOrphaned = async (uid) => {
    setIsLoading(true);
    try {
      const success = await deleteOrphanedUser(uid);
      if (success) {
        setOrphanedUsers(orphanedUsers.filter(u => u.uid !== uid));
        setMessageType('success');
        setMessage('✓ Usuario eliminado correctamente');
      } else {
        setMessageType('error');
        setMessage('✗ Error al eliminar');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCleanupEmail = async (e) => {
    e.preventDefault();
    if (!emailToClean) return;

    setIsLoading(true);
    setMessage('');
    try {
      const result = await cleanupDuplicateEmail(emailToClean);
      if (result.success) {
        setMessageType('success');
        setMessage(`✓ ${result.message}`);
        setEmailToClean('');
      } else {
        setMessageType('info');
        setMessage(result.message);
      }
    } catch (error) {
      setMessageType('error');
      setMessage('✗ Error: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* LIMPIAR POR EMAIL */}
      <div className="bg-slate-900/50 border-2 border-slate-800 p-6 rounded-2xl">
        <h3 className="text-lg font-black text-orange-500 mb-4 flex items-center gap-2">
          <AlertTriangle size={20} /> LIMPIAR_EMAIL_DUPLICADO
        </h3>
        <form onSubmit={handleCleanupEmail} className="space-y-4">
          <input
            type="email"
            placeholder="email@example.com"
            className="w-full bg-slate-900 border border-slate-800 p-3 rounded-xl text-xs font-mono focus:border-orange-500 outline-none"
            value={emailToClean}
            onChange={(e) => setEmailToClean(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 bg-orange-600 hover:bg-orange-500 disabled:opacity-50 text-white font-bold text-xs uppercase rounded-lg transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? <Loader className="animate-spin" size={16} /> : <Search size={16} />}
            LIMPIAR_FIRESTORY
          </button>
        </form>
      </div>

      {/* BUSCAR USUARIOS HUÉRFANOS */}
      <div className="bg-slate-900/50 border-2 border-slate-800 p-6 rounded-2xl">
        <h3 className="text-lg font-black text-cyan-500 mb-4 flex items-center gap-2">
          <AlertTriangle size={20} /> USUARIOS_HUÉRFANOS
        </h3>
        <button
          onClick={handleFindOrphaned}
          disabled={isLoading}
          className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-bold text-xs uppercase rounded-lg transition-all flex items-center justify-center gap-2 mb-4"
        >
          {isLoading ? <Loader className="animate-spin" size={16} /> : <Search size={16} />}
          ESCANEAR
        </button>

        {/* MENSAJES */}
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`mb-4 p-3 rounded-lg text-xs font-bold ${
                messageType === 'success'
                  ? 'bg-green-500/20 border border-green-500 text-green-400'
                  : messageType === 'error'
                  ? 'bg-red-500/20 border border-red-500 text-red-400'
                  : messageType === 'warning'
                  ? 'bg-yellow-500/20 border border-yellow-500 text-yellow-400'
                  : 'bg-blue-500/20 border border-blue-500 text-blue-400'
              }`}
            >
              {message}
            </motion.div>
          )}
        </AnimatePresence>

        {/* LISTADO DE USUARIOS HUÉRFANOS */}
        {orphanedUsers.length > 0 && (
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {orphanedUsers.map((user) => (
              <motion.div
                key={user.uid}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-black/40 border border-slate-700 p-3 rounded-lg flex justify-between items-center text-xs"
              >
                <div className="flex-1">
                  <p className="font-bold text-white">{user.name}</p>
                  <p className="text-slate-400 font-mono">{user.email}</p>
                  <p className="text-[10px] text-slate-600">{user.timestamp}</p>
                </div>
                <button
                  onClick={() => handleDeleteOrphaned(user.uid)}
                  disabled={isLoading}
                  className="p-2 bg-red-500/20 hover:bg-red-500 text-red-500 hover:text-white rounded transition-all disabled:opacity-50"
                  title="Eliminar usuario"
                >
                  <Trash2 size={16} />
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FirebaseCleanupPanel;
