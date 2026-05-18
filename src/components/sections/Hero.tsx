import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import RevealText from '@/components/RevealText';
import heroPoster from '@/assets/products/hero-poster.webp';

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Parallax scroll-out — disabled under prefers-reduced-motion
  const y = useTransform(scrollYProgress, [0, 1], ['0%', reduceMotion ? '0%' : '14%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduceMotion ? 1 : 1.08]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', reduceMotion ? '0%' : '-22%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, reduceMotion ? 1 : 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-espresso text-cream"
    >
      {/* Media layer */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 will-change-transform"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={heroPoster}
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden="true"
        >
          <source src="/media/hero.webm" type="video/webm" />
          <source src="/media/hero.mp4" type="video/mp4" />
        </video>
        {/* Fallback color tint behind everything */}
        <div className="absolute inset-0 bg-espresso/30" aria-hidden="true" />
      </motion.div>

      {/* Gradient overlays for legibility */}
      <div className="absolute inset-0 gradient-cream-down pointer-events-none" aria-hidden="true" />

      {/* Soft grain (CSS only, very subtle) */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage:
            'url("data:image/svg+xml;utf8,<svg xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"160\\" height=\\"160\\" viewBox=\\"0 0 160 160\\"><filter id=\\"n\\"><feTurbulence type=\\"fractalNoise\\" baseFrequency=\\"0.9\\" numOctaves=\\"2\\" stitchTiles=\\"stitch\\"/><feColorMatrix values=\\"0 0 0 0 0.8 0 0 0 0 0.7 0 0 0 0 0.5 0 0 0 0.6 0\\"/></filter><rect width=\\"100%\\" height=\\"100%\\" filter=\\"url(%23n)\\"/></svg>")',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center will-change-transform"
      >
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="font-sans text-xs uppercase tracking-widest text-cream/80 mb-8"
        >
          Ralawi&nbsp;Sheas&nbsp;&nbsp;·&nbsp;&nbsp;Made in&nbsp;Ghana
        </motion.span>

        <RevealText
          as="h1"
          text="Raised by the sun."
          className="font-serif text-display text-cream"
          stagger={0.08}
        />
        <RevealText
          as="h1"
          text="Pressed by hand."
          className="font-serif text-display italic font-light text-cream"
          stagger={0.08}
          delay={0.3}
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1.5 }}
          className="mt-10 max-w-prose text-base text-cream/85 font-light"
        >
          One ingredient. Pure unrefined shea butter, hand-pressed from kernels harvested in
          northern Ghana. For skin, hair, baby care, and the kitchen pot.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1.8 }}
          className="mt-12 flex flex-col sm:flex-row items-center gap-6"
        >
          <a href="#products" className="btn-primary bg-cream !text-espresso hover:!bg-shea hover:!text-cream">
            Explore the range
            <span aria-hidden="true">→</span>
          </a>
          <a href="#story" className="font-sans text-xs uppercase tracking-widest text-cream/80 hover:text-cream transition-colors">
            Our story
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut', delay: 2.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 text-cream/70"
      >
        <span className="font-sans text-[10px] uppercase tracking-widest">Scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="block h-8 w-px bg-cream/40"
        />
      </motion.div>
    </section>
  );
}
