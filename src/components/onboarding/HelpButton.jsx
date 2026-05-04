import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';

const HelpButton = ({ onClick }) => {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="fixed bottom-6 left-6 z-30 w-14 h-14 bg-gradient-to-br from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:shadow-[0_0_30px_rgba(6,182,212,0.7)] transition-all"
      title="Centro de Ayuda"
    >
      <HelpCircle size={24} />
    </motion.button>
  );
};

export default HelpButton;
