'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface ScrollTextLinesProps {
  lines: string[];
  className?: string;
}

export default function ScrollTextLines({ lines, className = '' }: ScrollTextLinesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <div ref={containerRef} className={className}>
      {lines.map((line, index) => (
        <motion.div
          key={index}
          initial={{ y: 60, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 60, opacity: 0 }}
          transition={{
            duration: 0.8,
            delay: index * 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="overflow-hidden"
        >
          <span className="block">{line}</span>
        </motion.div>
      ))}
    </div>
  );
}
