import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const Confetti = ({ trigger }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (trigger) {
      // Crear 50 partículas de confetti
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.3,
        duration: 2 + Math.random() * 1,
        rotation: Math.random() * 360,
        size: Math.random() * 8 + 4,
        color: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE'][Math.floor(Math.random() * 7)]
      }));
      setParticles(newParticles);
    }
  }, [trigger]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full"
          style={{
            backgroundColor: particle.color,
            left: `${particle.left}%`,
            top: '-10px',
          }}
          initial={{ opacity: 1, y: 0, rotate: 0 }}
          animate={{
            opacity: 0,
            y: window.innerHeight + 10,
            rotate: particle.rotation,
            x: (Math.random() - 0.5) * 100,
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            ease: 'easeIn',
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;
