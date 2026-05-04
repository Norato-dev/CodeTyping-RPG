import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CounterAnimation = ({ value, duration = 1 }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const increment = value / (duration * 60); // 60 frames per second
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(interval);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, 1000 / 60);

    return () => clearInterval(interval);
  }, [value, duration]);

  return <>{displayValue}</>;
};

export default CounterAnimation;
