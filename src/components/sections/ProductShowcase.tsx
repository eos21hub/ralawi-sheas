import { motion, useScroll, useTransform, useSpring, type MotionValue } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { products, type Product } from '@/data/products';

/**
 * On lg+ screens, pinned cross-fade scroll-scrubbed sequence.
 * On smaller screens (or reduced-motion), graceful stacked grid.
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

  // SSR / initial-render safe default — render stacked first paint
  if (shouldPin === false || shouldPin === null) {
    return <StackedShowcase />;
  }

  return <PinnedShowcase />;
}

function StackedShowcase() {
  return (
    <section id="products" className="relative bg-cream-deep py-24 lg:py-30">
      <div className="container-page mb-16">
        <span className="eyebrow block mb-3">The range</span>
        <h2 className="font-serif text-3xl text-espresso">Four sizes. One ingredient.</h2>
      </div>
      <div className="container-page space-y-20 lg:space-y-28">
        {products.map((p, i) => (
          <motion.article
            key={p.id}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center"
          >
            <div
              className={`lg:col-span-7 aspect-[5/4] lg:aspect-[6/5] overflow-hidden bg-sand ${
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
            </div>
            <div className="lg:col-span-5">
              <span className="eyebrow block mb-4">
                {String(i + 1).padStart(2, '0')} — {p.usCase}
              </span>
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

function PinnedShowcase() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.5,
  });

  const total = products.length;

  return (
    <section
      id="products"
      ref={sectionRef}
      className="relative bg-cream-deep"
      style={{ height: `${total * 100}vh` }}
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        <div className="container-page absolute top-10 lg:top-16 left-0 right-0 z-10 flex items-baseline justify-between text-bark">
          <div>
            <span className="eyebrow block mb-3">The range</span>
            <h2 className="font-serif text-2xl text-espresso">Four sizes. One ingredient.</h2>
          </div>
          <ProgressIndicator progress={progress} total={total} />
        </div>

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
      </div>
    </section>
  );
}

function ProgressIndicator({
  progress,
  total,
}: {
  progress: MotionValue<number>;
  total: number;
}) {
  return (
    <div className="hidden md:flex flex-col items-end gap-2">
      <span className="eyebrow">Progress</span>
      <div className="flex items-center gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <ProgressTick key={i} index={i} total={total} progress={progress} />
        ))}
      </div>
    </div>
  );
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
    [0.25, 1, 1, 0.25],
  );
  const width = useTransform(
    progress,
    [start - 0.05, start, end, end + 0.05],
    [12, 36, 36, 12],
  );
  return <motion.span style={{ opacity, width }} className="h-px bg-espresso" />;
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

  const overlap = span * 0.18;
  const opacity = useTransform(
    progress,
    [start - overlap, start, end - overlap, end + overlap],
    [0, 1, 1, 0],
  );

  const y = useTransform(progress, [start - overlap, start, end], ['12%', '0%', '-8%']);
  const imgScale = useTransform(progress, [start, end], [1.02, 0.97]);
  const imgY = useTransform(progress, [start, end], ['-3%', '3%']);

  return (
    <motion.article
      style={{ opacity }}
      className="absolute inset-0 flex items-center"
      aria-hidden={index !== 0 ? 'true' : 'false'}
    >
      <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <motion.div
          style={{ y: imgY }}
          className="lg:col-span-7 relative aspect-[5/4] lg:aspect-[6/5] overflow-hidden bg-sand"
        >
          <motion.img
            src={product.image}
            alt={product.imageAlt}
            loading="lazy"
            decoding="async"
            style={{ scale: imgScale }}
            className="absolute inset-0 h-full w-full object-cover"
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
          <p className="text-bark max-w-prose mb-10">{product.blurb}</p>
          <a href="#contact" className="btn-ghost">
            Enquire <span aria-hidden="true">→</span>
          </a>
        </motion.div>
      </div>
    </motion.article>
  );
}
