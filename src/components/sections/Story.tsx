import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { fadeUp, staggerParent, ease } from '@/lib/motion';
import storyImg from '@/assets/products/story-macro.webp';

export default function Story() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], reduceMotion ? ['0%', '0%'] : ['-12%', '12%']);
  const imgScale = useTransform(scrollYProgress, [0, 1], reduceMotion ? [1, 1] : [1.12, 1]);

  return (
    <section id="story" ref={ref} className="relative bg-cream py-30 lg:py-38 overflow-hidden">
      {/* Subtle sage atmosphere blob */}
      <motion.div
        aria-hidden="true"
        style={{ y: useTransform(scrollYProgress, [0, 1], reduceMotion ? ['0%', '0%'] : ['10%', '-15%']) }}
        className="absolute top-1/4 -right-32 w-[36rem] h-[36rem] rounded-full opacity-30 blur-3xl pointer-events-none"
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: 'radial-gradient(closest-side, rgba(122,137,112,0.35), transparent 70%)',
          }}
        />
      </motion.div>

      <div className="container-page relative grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        <motion.figure
          initial={{ opacity: 0, scale: 1.02 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.4, ease: ease.out }}
          className="lg:col-span-6 lg:-ml-8 relative overflow-hidden rounded-3xl ring-1 ring-sand shadow-[0_30px_80px_-30px_rgba(42,31,23,0.35)]"
        >
          <div className="aspect-[4/5] overflow-hidden">
            <motion.img
              src={storyImg}
              alt="Raw shea nuts in a wooden bowl beside the finished butter"
              loading="lazy"
              decoding="async"
              style={{ y: imgY, scale: imgScale }}
              className="h-full w-full object-cover will-change-transform"
            />
          </div>
          {/* Caption ribbon */}
          <figcaption className="absolute bottom-5 left-5 right-5 flex items-center gap-3 px-4 py-2.5 rounded-full bg-cream/85 backdrop-blur-md ring-1 ring-sand">
            <span aria-hidden="true" className="block w-1.5 h-1.5 rounded-full bg-shea" />
            <span className="font-sans text-[10px] uppercase tracking-widest text-bark">
              Nuts → kernels → butter
            </span>
          </figcaption>
        </motion.figure>

        <motion.div
          variants={staggerParent(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          className="lg:col-span-6"
        >
          <motion.span variants={fadeUp} className="eyebrow inline-flex items-center gap-3 mb-8">
            <span aria-hidden="true" className="block h-px w-8 bg-shea" />
            Our origin
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="font-serif text-4xl text-espresso mb-10 max-w-prose leading-[1.08]"
          >
            We don't add anything <em className="text-shea-dark italic">because nothing is missing.</em>
          </motion.h2>

          <motion.div variants={fadeUp} className="space-y-6 max-w-prose text-bark">
            <p>
              Ralawi Sheas began with one bucket and three aunties in Wa, in the upper west of
              Ghana. The kernels are gathered after the rains, sun-dried on woven mats, roasted
              over low wood fires, and kneaded by hand into a butter that has fed and healed
              households for a thousand years.
            </p>
            <p>
              We do not bleach it. We do not deodorise it. We do not stretch it with anything.
              The shea you scoop from a 4kg bucket is the shea that left the press — slightly
              soft in heat, slightly firm in cold, faintly smoky, deeply nourishing.
            </p>
          </motion.div>

          <motion.dl
            variants={fadeUp}
            className="mt-14 grid grid-cols-3 gap-8 max-w-md border-t border-sand pt-8"
          >
            {[
              { k: 'Region', v: 'Upper West' },
              { k: 'Process', v: 'Hand-pressed' },
              { k: 'Refining', v: 'None' },
            ].map((d) => (
              <div key={d.k} className="group">
                <dt className="eyebrow mb-2">{d.k}</dt>
                <dd className="font-serif text-xl text-espresso transition-colors duration-500 group-hover:text-shea-dark">
                  {d.v}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </div>
    </section>
  );
}
