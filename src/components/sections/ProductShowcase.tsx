import { motion, useScroll, useTransform, useSpring, type MotionValue } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { products, type Product } from '@/data/products';
import { ease } from '@/lib/motion';

/**
 * lg+ → pinned cross-fade scroll-scrubbed sequence with prominent progress dock.
 * Smaller / reduced-motion → graceful alternating stacked grid (all products visible).
 */
export default function ProductShowcase() {
  const [shouldPin, setShouldPin] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setShouldPin(mq.matches && !reduced.matches);
    update();
    mq.addEventListener('change', update);
    reduced.addEventListener('change', update);
    return () => {
      mq.removeEventListener('change', update);
      reduced.removeEventListener('change', update);
    };
  }, []);

  if (shouldPin === false || shouldPin === null) {
    return <StackedShowcase />;
  }
  return <PinnedShowcase />;
}

/* ----------------------------- Stacked variant ---------------------------- */

function StackedShowcase() {
  return (
    <section id="products" className="relative bg-cream-deep py-24 lg:py-30 overflow-hidden">
      <div className="container-page mb-16">
        <span className="eyebrow inline-flex items-center gap-3 mb-4">
          <span aria-hidden="true" className="block h-px w-8 bg-shea" />
          The range
        </span>
        <h2 className="font-serif text-3xl text-espresso">
          Four sizes. <em className="italic font-light text-shea-dark">One ingredient.</em>
        </h2>
      </div>
      <div className="container-page space-y-20 lg:space-y-28">
        {products.map((p, i) => (
          <motion.article
            key={p.id}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 1, ease: ease.out }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center"
          >
            <div
              className={`lg:col-span-7 relative aspect-[5/4] lg:aspect-[6/5] overflow-hidden rounded-3xl bg-sand ring-1 ring-sand shadow-[0_30px_80px_-30px_rgba(42,31,23,0.35)] ${
                i % 2 === 1 ? 'lg:order-2' : ''
              }`}
            >
              <img
                src={p.image}
                alt={p.imageAlt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
              <span className="absolute top-4 left-4 font-sans text-[10px] uppercase tracking-widest text-cream mix-blend-difference">
                {String(i + 1).padStart(2, '0')} / {String(products.length).padStart(2, '0')}
              </span>
            </div>
            <div className="lg:col-span-5">
              <span className="eyebrow block mb-4">{p.usCase}</span>
              <h3 className="font-serif text-3xl text-espresso mb-2">{p.size}</h3>
              <p className="font-sans text-xs tracking-widest uppercase text-shea-dark mb-6">
                {p.weight}
              </p>
              <p className="text-bark max-w-prose mb-8">{p.blurb}</p>
              <a href="#contact" className="btn-ghost">
                Enquire <span aria-hidden="true">→</span>
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

/* ----------------------------- Pinned variant ----------------------------- */

function PinnedShowcase() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    mass: 0.4,
  });

  const total = products.length;
  // 90vh per product → ~3.6 viewports of scroll for the whole showcase
  const sectionVh = total * 90;

  return (
    <section
      id="products"
      ref={sectionRef}
      className="relative bg-cream-deep"
      style={{ height: `${sectionVh}vh` }}
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        {/* Section header */}
        <div className="container-page absolute top-10 lg:top-14 left-0 right-0 z-20 flex items-baseline justify-between">
          <div>
            <span className="eyebrow inline-flex items-center gap-3 mb-3">
              <span aria-hidden="true" className="block h-px w-8 bg-shea" />
              The range
            </span>
            <h2 className="font-serif text-2xl text-espresso">
              Four sizes. <em className="italic font-light text-shea-dark">One ingredient.</em>
            </h2>
          </div>
          <ProgressDock progress={progress} total={total} />
        </div>

        {/* Stacked product slides */}
        <div className="relative h-full w-full">
          {products.map((p, i) => (
            <ProductSlide
              key={p.id}
              product={p}
              index={i}
              total={total}
              progress={progress}
            />
          ))}
        </div>

        {/* Soft scroll-progress bar at the bottom */}
        <ProgressBar progress={progress} />
      </div>
    </section>
  );
}

function ProgressBar({ progress }: { progress: MotionValue<number> }) {
  const scaleX = useTransform(progress, [0, 1], [0, 1]);
  return (
    <div className="absolute bottom-0 left-0 right-0 h-px bg-sand" aria-hidden="true">
      <motion.div
        style={{ scaleX, transformOrigin: '0% 50%' }}
        className="h-full bg-shea"
      />
    </div>
  );
}

function ProgressDock({
  progress,
  total,
}: {
  progress: MotionValue<number>;
  total: number;
}) {
  return (
    <div className="hidden md:flex flex-col items-end gap-3">
      <span className="eyebrow">Slide</span>
      <div className="flex items-baseline gap-3 font-serif text-3xl text-espresso">
        <CurrentIndex progress={progress} total={total} />
        <span className="text-bark/40 text-xl">/</span>
        <span className="text-bark/50 text-xl">{String(total).padStart(2, '0')}</span>
      </div>
      <div className="flex items-center gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <ProgressTick key={i} index={i} total={total} progress={progress} />
        ))}
      </div>
    </div>
  );
}

function CurrentIndex({
  progress,
  total,
}: {
  progress: MotionValue<number>;
  total: number;
}) {
  // Map continuous progress into a discrete current index using transform
  const indexValue = useTransform(progress, (p) => {
    const i = Math.min(total - 1, Math.max(0, Math.floor(p * total)));
    return String(i + 1).padStart(2, '0');
  });
  return <motion.span>{indexValue}</motion.span>;
}

function ProgressTick({
  index,
  total,
  progress,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(
    progress,
    [start - 0.05, start, end, end + 0.05],
    [0.3, 1, 1, 0.3],
  );
  const width = useTransform(
    progress,
    [start - 0.05, start, end, end + 0.05],
    [14, 40, 40, 14],
  );
  const bg = useTransform(
    progress,
    [start - 0.05, start, end, end + 0.05],
    ['#6B5A4C', '#C89B5A', '#C89B5A', '#6B5A4C'],
  );
  return (
    <motion.span
      style={{ opacity, width, backgroundColor: bg }}
      className="h-[3px] rounded-full"
    />
  );
}

function ProductSlide({
  product,
  index,
  total,
  progress,
}: {
  product: Product;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const span = 1 / total;
  const start = index * span;
  const end = (index + 1) * span;

  // Faster, more decisive cross-fade — each slide is unmistakably its own moment
  const overlap = span * 0.22;
  const opacity = useTransform(
    progress,
    [start - overlap, start + overlap * 0.4, end - overlap * 0.4, end + overlap],
    [0, 1, 1, 0],
  );

  const y = useTransform(progress, [start - overlap, start, end], ['8%', '0%', '-6%']);
  const imgScale = useTransform(progress, [start - overlap, end + overlap], [1.05, 0.95]);
  const imgY = useTransform(progress, [start, end], ['-2%', '2%']);

  return (
    <motion.article
      style={{ opacity }}
      className="absolute inset-0 flex items-center"
      aria-hidden={index !== 0 ? 'true' : 'false'}
    >
      <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <motion.div
          style={{ y: imgY }}
          className="lg:col-span-7 relative aspect-[5/4] lg:aspect-[6/5] overflow-hidden rounded-3xl bg-sand ring-1 ring-sand shadow-[0_30px_80px_-30px_rgba(42,31,23,0.4)]"
        >
          <motion.img
            src={product.image}
            alt={product.imageAlt}
            loading="lazy"
            decoding="async"
            style={{ scale: imgScale }}
            className="absolute inset-0 h-full w-full object-cover will-change-transform"
          />
          {/* Soft golden corner glow on each */}
          <div
            className="absolute inset-0 opacity-70 pointer-events-none"
            style={{
              background: 'radial-gradient(120% 60% at 10% 0%, rgba(229,198,143,0.18), transparent 60%)',
            }}
            aria-hidden="true"
          />
          <span className="absolute top-4 left-4 font-sans text-[10px] uppercase tracking-widest text-cream mix-blend-difference">
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </motion.div>

        <motion.div style={{ y }} className="lg:col-span-5 lg:pl-4">
          <span className="eyebrow block mb-5">{product.usCase}</span>
          <h3 className="font-serif text-4xl text-espresso mb-3">{product.size}</h3>
          <p className="font-sans text-sm tracking-widest uppercase text-shea-dark mb-8">
            {product.weight}
          </p>
          <p className="text-bark max-w-prose mb-10 text-lg">{product.blurb}</p>
          <a href="#contact" className="btn-ghost">
            Enquire <span aria-hidden="true">→</span>
          </a>
        </motion.div>
      </div>
    </motion.article>
  );
}
