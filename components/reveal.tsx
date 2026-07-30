"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode, ComponentProps } from "react";

type RevealProps = ComponentProps<typeof motion.div> & {
  children: ReactNode;
  delay?: number;
};

export function Reveal({ 
  children, 
  delay = 0, 
  className = "",
  ...props
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  
  return (
    <motion.div 
      className={className} 
      initial={reduceMotion ? false : { opacity: 0, y: 20 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true, amount: 0.16 }} 
      transition={{ 
        duration: reduceMotion ? 0 : 0.75, 
        delay, 
        ease: [0.22, 1, 0.36, 1] 
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
