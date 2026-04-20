'use client';

import { useRef } from 'react';
import { useScroll, useTransform, MotionValue } from 'framer-motion';

interface ScrollProgressResult {
  scrollYProgress: MotionValue<number>;
  progress: MotionValue<number>;
}

export function useScrollProgress(
  offset: [string, string] = ['start start', 'end end']
): ScrollProgressResult {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  return {
    scrollYProgress,
    progress: scrollYProgress,
  };
}

export function useTransformScroll(
  outputRange: [number, number] | [string, string],
  offset?: [string, string]
) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset || ['start end', 'end start'],
  });

  const transformed = useTransform(
    scrollYProgress,
    [0, 1],
    outputRange
  );

  return { ref, value: transformed };
}
