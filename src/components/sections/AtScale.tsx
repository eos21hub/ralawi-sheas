import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { fadeUp, staggerParent, ease } from '@/lib/motion';
import rangeTrio from '@/assets/products/range-trio.webp';
import bulk700g from '@/assets/products/bulk-700g.webp';
import bulk1kg from '@/assets/products/bulk-1kg.webp';
import bulk4kg from '@/assets/products/bulk-4kg.webp';
import bulk25kg from '@/assets/products/bulk-25kg.webp';

const cases = [
  { image: bulk700g, label: '10 × 700g', usCase: 'Tubs', alt: 'A 10-pack case of 700-gram shea butter tubs' },
  { image: bulk1kg, label: '10 × 1kg', usCase: 'Bricks', alt: 'A 10-pack case of 1-kilogram vacuum-sealed shea butter bricks' },
  { image: bulk4kg, label: '10 × 4kg', usCase: 'Buckets', alt: 'A 9-pack case of 4-kilogram blue shea butter buckets' },
  { image: bulk25kg, label: '7 × 25kg', usCase: 'Pallets', alt: 'A pallet of 7 cardboard boxes each holding 25 kilograms of shea butter' },
];

export default function AtScale() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Background parallax on the range image
  const heroY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1.05, 1]);

  return (
    <section
      ref={sectionRef}
      id="scale"
      className="relative bg-espresso text-cream overflow-hidden py-30 lg:py-38"
    >
      {/* Decorative shea gold gradient blob */}
      <motion.div
        aria-hidden="true"
        className="absolute -top-32 -right-32 w-[40rem] h-[40rem] rounded-full opacity-25 blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(closest-side, rgba(200,155,90,0.6), transparent 70%)',
          y: useTransform(scrollYProgress, [0, 1], ['-10%', '20%']),
        }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute -bottom-40 -left-32 w-[36rem] h-[36rem] rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(closest-side, rgba(122,137,112,0.55), transparent 70%)',
          y: useTransform(scrollYProgress, [0, 1], ['10%', '-12%']),
        }}
      />

      <div className="container-page relative">
        {/* Header */}
        <motion.div
          variants={staggerParent(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-16 lg:mb-24"
        >
          <motion.div variants={fadeUp} className="lg:col-span-6">
            <span className="font-sans text-xs uppercase tracking-widest text-shea-light mb-6 block">
              For professionals
            </span>
            <h2 className="font-serif text-4xl lg:text-5xl text-cream leading-[1.05]">
              By the <em className="text-shea italic font-light">case</em>.
            </h2>
          </motion.div>
          <motion.div variants={fadeUp} className="lg:col-span-5 lg:col-start-8">
            <p className="text-cream/75 max-w-prose">
              Built for formulators, salons, baby-care lines, and the household
              that finishes a 25&nbsp;kilo box in a year. Every pallet leaves our
              facility in Wa with the kernels still warm from the press.
            </p>
            <div className="mt-8 flex items-center gap-6">
              <a
                href="mailto:wholesale@ralawisheas.com"
                className="inline-flex items-center gap-3 font-sans text-xs uppercase tracking-widest text-cream
                           border-b border-shea pb-1 hover:text-shea-light hover:border-shea-light
                           transition-colors duration-300"
              >
                Wholesale enquiry <span aria-hidden="true">→</span>
              </a>
              <span className="font-sans text-xs uppercase tracking-widest text-cream/40">
                wholesale@ralawisheas.com
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Range trio — visual reference of the consumer sizes */}
        <motion.figure
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1.2, ease: ease.out }}
          className="relative mb-20 lg:mb-28 overflow-hidden rounded-3xl ring-1 ring-cream/10"
        >
          <motion.img
            src={rangeTrio}
            alt="A side-by-side comparison of the 700g tub, 4kg bucket, and 25kg box of Ralawi Sheas"
            loading="lazy"
            decoding="async"
            style={{ y: heroY, scale: heroScale }}
            className="w-full h-[42vh] lg:h-[58vh] object-cover will-change-transform"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 via-transparent to-transparent pointer-events-none" />
          <figcaption className="absolute bottom-6 left-6 right-6 lg:bottom-10 lg:left-10 flex flex-wrap items-baseline gap-x-6 gap-y-1">
            <span className="font-serif text-xl lg:text-2xl text-cream">Three sizes. One ingredient.</span>
            <span className="font-sans text-xs uppercase tracking-widest text-shea-light">
              + 1kg refill bricks
            </span>
          </figcaption>
        </motion.figure>

        {/* 4-up wholesale grid */}
        <motion.ul
          variants={staggerParent(0.09)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6"
        >
          {cases.map((c, i) => (
            <motion.li
              key={c.label}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.6, ease: ease.out }}
              className="group relative overflow-hidden rounded-2xl bg-espresso ring-1 ring-cream/10 hover:ring-shea/40 transition-colors duration-500"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <motion.img
                  src={c.image}
                  alt={c.alt}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/10 to-transparent" />
                <span className="absolute top-4 left-4 font-sans text-[10px] uppercase tracking-widest text-cream/80">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
                <span className="block font-sans text-[10px] uppercase tracking-widest text-shea-light mb-1.5">
                  {c.usCase}
                </span>
                <span className="block font-serif text-2xl lg:text-3xl text-cream">
                  {c.label}
                </span>
                {/* Hover hairline */}
                <span className="block h-px w-0 bg-shea mt-3 group-hover:w-12 transition-all duration-700 ease-out" />
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
