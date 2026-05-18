import { motion } from 'framer-motion';
import { useState } from 'react';
import { ease } from '@/lib/motion';
import ctaPoster from '@/assets/products/cinemagraph-poster.webp';

export default function FinalCTA() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire to real subscription endpoint
    if (email.includes('@')) {
      setSubmitted(true);
    }
  };

  return (
    <section
      id="contact"
      className="relative isolate min-h-[80svh] w-full overflow-hidden text-cream"
    >
      {/* Cinemagraph background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster={ctaPoster}
        preload="metadata"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        aria-hidden="true"
      >
        <source src="/media/cinemagraph.webm" type="video/webm" />
        <source src="/media/cinemagraph.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 -z-10 bg-espresso/55" aria-hidden="true" />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-espresso/30 via-transparent to-espresso/80"
        aria-hidden="true"
      />

      <div className="container-page py-30 lg:py-38 flex flex-col items-center text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: ease.out }}
          className="font-sans text-xs uppercase tracking-widest text-cream/70 mb-8"
        >
          Stay close
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.1, ease: ease.out }}
          className="font-serif text-4xl lg:text-5xl text-cream max-w-3xl"
        >
          A small letter, every season, from <em className="italic font-light">Wa</em>.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.1, ease: ease.out, delay: 0.15 }}
          className="mt-8 max-w-prose text-cream/80"
        >
          Harvest notes, kitchen recipes, the occasional photograph. No campaigns.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.1, ease: ease.out, delay: 0.3 }}
          onSubmit={handleSubmit}
          className="mt-12 w-full max-w-md"
        >
          {submitted ? (
            <p className="font-serif text-xl text-cream italic" role="status">
              Thank you — first letter posts at the next moon.
            </p>
          ) : (
            <div className="flex items-end gap-4 border-b border-cream/30 pb-3 focus-within:border-cream transition-colors duration-300">
              <label htmlFor="email" className="sr-only">
                Email address
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
                className="flex-1 bg-transparent text-cream placeholder:text-cream/40 outline-none font-sans py-2"
              />
              <button
                type="submit"
                className="font-sans text-xs uppercase tracking-widest text-cream hover:text-shea-light transition-colors cursor-pointer"
              >
                Subscribe →
              </button>
            </div>
          )}
        </motion.form>
      </div>
    </section>
  );
}
