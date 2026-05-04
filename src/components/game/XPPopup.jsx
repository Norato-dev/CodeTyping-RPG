import { motion } from 'framer-motion';

const XPPopup = ({ xp, isVisible }) => {
  return (
    <motion.div
      className="fixed left-1/2 top-1/3 pointer-events-none text-center"
      initial={{ opacity: 0, y: 0, scale: 0.5 }}
      animate={
        isVisible
          ? { opacity: 1, y: -100, scale: 1 }
          : { opacity: 0, y: 0, scale: 0.5 }
      }
      transition={{ duration: 1.5 }}
      style={{ transform: 'translateX(-50%)' }}
    >
      <div className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent drop-shadow-lg">
        +{xp} XP
      </div>
    </motion.div>
  );
};

export default XPPopup;
