'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface FloatingElementProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
}

export function FloatingElement({
  children,
  delay = 0,
  duration = 6,
  distance = 10,
  className = '',
}: FloatingElementProps) {
  return (
    <motion.div
      animate={{
        y: [-distance, distance, -distance],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface ParticleProps {
  className?: string;
}

export function CosmeticParticle({ className = '' }: ParticleProps) {
  return (
    <motion.div
      className={`absolute w-2 h-2 rounded-full bg-[var(--rose-gold)]/40 ${className}`}
      animate={{
        y: [-20, 20, -20],
        x: [-10, 10, -10],
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

interface FloatingElementsProps {
  count?: number;
  className?: string;
}

export default function FloatingElements({ count = 15, className = '' }: FloatingElementsProps) {
  const particles = [...Array(count)].map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: Math.random() * 3,
    duration: 4 + Math.random() * 4,
    size: 2 + Math.random() * 4,
  }));

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-[var(--rose-gold)]/30"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [-15, 15, -15],
            x: [-8, 8, -8],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// Glowing Particles
export function GlowingParticles({ count = 20 }: { count?: number }) {
  const particles = [...Array(count)].map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 rounded-full bg-white"
          style={{
            left: particle.left,
            top: particle.top,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// Makeup Powder Explosion Effect
export function PowderExplosion({ active }: { active: boolean }) {
  const particles = [...Array(30)].map((_, i) => ({
    id: i,
    angle: (360 / 30) * i,
    distance: 50 + Math.random() * 100,
    duration: 0.5 + Math.random() * 0.5,
  }));

  if (!active) return null;

  return (
    <div className="absolute inset-0 pointer-events-none">
      {particles.map((particle) => {
        const radians = (particle.angle * Math.PI) / 180;
        const x = Math.cos(radians) * particle.distance;
        const y = Math.sin(radians) * particle.distance;

        return (
          <motion.div
            key={particle.id}
            className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full bg-[var(--rose-light)]/60"
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{
              x,
              y,
              opacity: 0,
              scale: 0,
            }}
            transition={{
              duration: particle.duration,
              ease: 'easeOut',
            }}
          />
        );
      })}
    </div>
  );
}
