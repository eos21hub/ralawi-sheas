import type { Variants, Transition } from 'framer-motion';

export const ease = {
  out: [0.16, 1, 0.3, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
};

export const duration = {
  fast: 0.4,
  base: 0.7,
  slow: 1.1,
};

export const baseTransition: Transition = {
  duration: duration.base,
  ease: ease.out,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: ease.out },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.slow, ease: ease.out },
  },
};

export const staggerParent = (childStagger = 0.06, delay = 0): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: childStagger,
      delayChildren: delay,
    },
  },
});

export const wordReveal: Variants = {
  hidden: { y: '110%', opacity: 0 },
  visible: {
    y: '0%',
    opacity: 1,
    transition: { duration: 0.9, ease: ease.out },
  },
};
