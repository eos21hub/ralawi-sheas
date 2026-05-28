import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { ease } from '@/lib/motion';
import RevealText from '@/components/RevealText';
import ctaBg from '@/assets/products/cinemagraph-poster.webp';

export default function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Slow scroll parallax + drift
  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '12%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.18]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('@')) setSubmitted(true);
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative isolate min-h-[95svh] w-full overflow-hidden text-cream"
    >
      {/* Background image — Ken Burns infinite zoom + scroll parallax */}
      <motion.div
        aria-hidden="true"
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 -z-20 will-change-transform"
      >
        <motion.img
          src={ctaBg}
          alt=""
          className="h-full w-full object-cover"
          animate={
            reduceMotion
              ? undefined
              : { scale: [1, 1.08, 1], x: ['0%', '1.5%', '0%'], y: ['0%', '-1%', '0%'] }
          }
          transition={{
            duration: 22,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'mirror',
          }}
        />
      </motion.div>

      {/* Warm dark overlay for legibility */}
      <div
        className="absolute inset-0 -z-10 bg-espresso/65"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-espresso/30 via-espresso/20 to-espresso/85"
        aria-hidden="true"
      />

      {/* Decorative shea-gold gradient blob (floats slowly) */}
      <motion.div
        aria-hidden="true"
        className="absolute -top-32 right-[-10%] w-[44rem] h-[44rem] rounded-full blur-3xl pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(closest-side, rgba(229,198,143,0.35), transparent 70%)',
        }}
        animate={
          reduceMotion
            ? undefined
            : { x: [0, -40, 0], y: [0, 25, 0], opacity: [0.7, 1, 0.7] }
        }
        transition={{ duration: 18, ease: 'easeInOut', repeat: Infinity }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute bottom-[-15%] -left-32 w-[40rem] h-[40rem] rounded-full blur-3xl pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(closest-side, rgba(122,137,112,0.32), transparent 70%)',
        }}
        animate={
          reduceMotion
            ? undefined
            : { x: [0, 30, 0], y: [0, -20, 0], opacity: [0.5, 0.9, 0.5] }
        }
        transition={{ duration: 24, ease: 'easeInOut', repeat: Infinity }}
      />

      {/* Subtle grain */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none mix-blend-overlay -z-10"
        style={{
          backgroundImage:
            'url("data:image/svg+xml;utf8,<svg xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"180\\" height=\\"180\\"><filter id=\\"n\\"><feTurbulence type=\\"fractalNoise\\" baseFrequency=\\"0.9\\" numOctaves=\\"2\\"/><feColorMatrix values=\\"0 0 0 0 0.8 0 0 0 0 0.7 0 0 0 0 0.5 0 0 0 0.65 0\\"/></filter><rect width=\\"100%\\" height=\\"100%\\" filter=\\"url(%23n)\\"/></svg>")',
        }}
        aria-hidden="true"
      />

      <div className="container-page relative py-30 lg:py-38 flex flex-col items-center text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: ease.out }}
          className="font-sans text-xs uppercase tracking-widest text-shea-light mb-10 inline-flex items-center gap-3"
        >
          <span
            aria-hidden="true"
            className="block h-px w-10 bg-shea-light"
          />
          Stay close
          <span
            aria-hidden="true"
            className="block h-px w-10 bg-shea-light"
          />
        </motion.span>

        <RevealText
          as="h2"
          inView
          stagger={0.07}
          text="A small letter, every season."
          className="font-serif text-4xl lg:text-5xl text-cream max-w-3xl leading-[1.04]"
        />
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, ease: ease.out, delay: 0.4 }}
          className="block font-serif text-4xl lg:text-5xl italic font-light text-shea-light mt-1"
        >
          From <span className="underline decoration-shea/60 underline-offset-[0.18em] decoration-1">Wa</span>, with love.
        </motion.span>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.1, ease: ease.out, delay: 0.55 }}
          className="mt-10 max-w-prose text-cream/80"
        >
          Harvest notes, kitchen recipes, the occasional photograph from the
          press house. No campaigns. Maybe four letters a year, never more.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.1, ease: ease.out, delay: 0.7 }}
          onSubmit={handleSubmit}
          className="mt-14 w-full max-w-md"
        >
          {submitted ? (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: ease.out }}
              className="font-serif text-xl text-shea-light italic"
              role="status"
            >
              Thank you — the first letter posts at the next new moon.
            </motion.p>
          ) : (
            <div className="flex items-end gap-4 border-b border-cream/30 pb-3 focus-within:border-shea-light transition-colors duration-500 ease-out">
              <label htmlFor="email" className="sr-only">
                Enter email address
              </label>
              <input
                id="email"
                type="email"
                required
                inputMode="email"
                autoComplete="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent text-cream placeholder:text-cream/40 outline-none font-sans py-2 text-base"
              />
              <button
                type="submit"
                className="font-sans text-xs uppercase tracking-widest text-cream hover:text-shea-light transition-colors cursor-pointer"
              >
                Subscribe →
              </button>
            </div>
          )}
          <p className="mt-4 text-[10px] uppercase tracking-widest text-cream/40">
            No marketing. Unsubscribe with one click.
          </p>
        </motion.form>
      </div>
    </section>
  );
}
