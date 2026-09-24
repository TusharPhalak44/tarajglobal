import React from 'react';
import { motion } from 'framer-motion';

import { useReducedMotion } from '@hooks/useReducedMotion';

export const AnimatedCharacter = ({ activePoint }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div 
      className="w-full h-full relative flex justify-center items-center origin-bottom"
      // Static placement, no more whole-body gliding or waving
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-full h-full flex justify-center items-center"
        // Continuous subtle floating/breathing animation
        animate={prefersReducedMotion ? {} : { y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      >
        <img 
          src="/girl.svg" 
          alt="Lead Generation Character"
          className="w-[90%] h-[90%] object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.4)]"
        />
      </motion.div>
    </motion.div>
  );
};
