'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

interface ParallaxCardProps {
  image: string;
  title: string;
  description: string;
  price?: string;
  index?: number;
}

export function ParallaxCard({ image, title, description, price, index = 0 }: ParallaxCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const bgY = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity }}
      className="group relative overflow-hidden rounded-2xl bg-card shadow-lg hover:shadow-2xl transition-shadow duration-500"
    >
      {/* Background Layer - Slower */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 z-10"
      />

      {/* Image Layer - Faster */}
      <motion.div style={{ y: imageY }} className="relative h-80 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </motion.div>

      {/* Gradient Overlay on Hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--rose-gold)]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-30">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <h3 className="text-xl font-semibold text-white mb-2 drop-shadow-lg">{title}</h3>
          <p className="text-white/80 text-sm mb-3 line-clamp-2">{description}</p>
          {price && (
            <span className="text-lg font-medium text-[var(--rose-light)]">{price}</span>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

interface ParallaxCardsGridProps {
  cards: ParallaxCardProps[];
}

export default function ParallaxCardsGrid({ cards }: ParallaxCardsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <ParallaxCard key={index} {...card} index={index} />
      ))}
    </div>
  );
}
