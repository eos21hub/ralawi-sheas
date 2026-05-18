import { motion } from 'framer-motion';
import { fadeUp, staggerParent, ease } from '@/lib/motion';
import storyImg from '@/assets/products/story-macro.webp';

export default function Story() {
  return (
    <section id="story" className="relative bg-cream py-30 lg:py-38">
      <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        {/* Image — full bleed feel on desktop via negative margin */}
        <motion.figure
          initial={{ opacity: 0, scale: 1.02 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.4, ease: ease.out }}
          className="lg:col-span-6 lg:-ml-16 relative overflow-hidden rounded-sm"
        >
          <div className="aspect-[4/5] overflow-hidden">
            <motion.img
              src={storyImg}
              alt="Raw shea nuts in a wooden bowl beside the finished butter"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
              initial={{ scale: 1.12 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 2.4, ease: ease.out }}
            />
          </div>
          <figcaption className="absolute bottom-4 left-4 right-4 font-sans text-[10px] uppercase tracking-widest text-cream mix-blend-difference">
            Nuts → kernels → butter
          </figcaption>
        </motion.figure>

        <motion.div
          variants={staggerParent(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          className="lg:col-span-6"
        >
          <motion.span variants={fadeUp} className="eyebrow block mb-8">
            Our origin
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="font-serif text-4xl text-espresso mb-10 max-w-prose"
          >
            We don't add anything <em className="text-shea-dark">because nothing is missing.</em>
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
            <div>
              <dt className="eyebrow mb-2">Region</dt>
              <dd className="font-serif text-xl text-espresso">Upper West</dd>
            </div>
            <div>
              <dt className="eyebrow mb-2">Process</dt>
              <dd className="font-serif text-xl text-espresso">Hand-pressed</dd>
            </div>
            <div>
              <dt className="eyebrow mb-2">Refining</dt>
              <dd className="font-serif text-xl text-espresso">None</dd>
            </div>
          </motion.dl>
        </motion.div>
      </div>
    </section>
  );
}
