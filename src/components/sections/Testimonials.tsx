import { motion } from 'framer-motion';
import { testimonials } from '@/data/testimonials';
import { ease } from '@/lib/motion';

export default function Testimonials() {
  // Duplicate for seamless infinite marquee
  const loop = [...testimonials, ...testimonials];

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="relative bg-cream-deep py-30 lg:py-38 overflow-hidden"
    >
      {/* Faint sage atmosphere */}
      <div
        aria-hidden="true"
        className="absolute -top-40 right-1/4 w-[34rem] h-[34rem] rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(closest-side, rgba(122,137,112,0.5), transparent 70%)',
        }}
      />

      <div className="container-page mb-16 relative">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: ease.out }}
          className="eyebrow inline-flex items-center gap-3 mb-6"
        >
          <span aria-hidden="true" className="block h-px w-8 bg-shea" />
          Word of mouth
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, ease: ease.out, delay: 0.1 }}
          id="testimonials-heading"
          className="font-serif text-4xl text-espresso max-w-2xl leading-[1.1]"
        >
          From the kitchens and bathroom shelves of customers across
          <em className="italic font-light text-shea-dark"> three continents</em>.
        </motion.h2>
      </div>

      <div
        className="group relative w-full select-none"
        style={{
          maskImage:
            'linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)',
          WebkitMaskImage:
            'linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)',
        }}
      >
        <div className="flex gap-16 lg:gap-24 w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:overflow-x-auto motion-reduce:snap-x">
          {loop.map((t, i) => (
            <figure
              key={i}
              className="w-[80vw] sm:w-[60vw] md:w-[44vw] lg:w-[34vw] xl:w-[28rem] shrink-0 px-2 motion-reduce:snap-start"
            >
              <span aria-hidden="true" className="block h-px w-12 bg-shea mb-6" />
              <blockquote className="font-serif text-2xl lg:text-3xl text-espresso italic font-light leading-[1.25]">
                <span aria-hidden="true" className="text-shea mr-1">&ldquo;</span>
                {t.quote}
                <span aria-hidden="true" className="text-shea ml-1">&rdquo;</span>
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4 text-bark">
                <span
                  aria-hidden="true"
                  className="block w-1.5 h-1.5 rounded-full bg-shea-dark"
                />
                <span className="font-sans text-sm">
                  {t.attribution}
                  <span className="text-bark/60"> — {t.location}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
