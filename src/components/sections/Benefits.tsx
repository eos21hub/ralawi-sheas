import { motion } from 'framer-motion';
import { staggerParent, fadeUp, ease } from '@/lib/motion';

const benefits = [
  {
    label: 'Skin',
    title: 'Deeply moisturising',
    body: 'Rich in fatty acids and vitamins A & E — comforts dryness, eczema, and stretch marks.',
    glyph: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.5 3.5 5.5 6.2 5.5 10a5.5 5.5 0 1 1-11 0c0-3.8 3-6.5 5.5-10Z" />
      </svg>
    ),
  },
  {
    label: 'Hair',
    title: 'Strengthens & seals',
    body: 'Melts at body temperature into a sealant that locks moisture into curls and coils.',
    glyph: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" d="M5 19c1.5-4 3-6 7-6s5.5 2 7 6" />
        <path strokeLinecap="round" d="M7 16c1-3 2.5-4.5 5-4.5S15.5 13 17 16" />
        <path strokeLinecap="round" d="M9 13c.5-2 1.5-3 3-3s2.5 1 3 3" />
      </svg>
    ),
  },
  {
    label: 'Baby care',
    title: 'Soothes the softest skin',
    body: 'Single ingredient. No preservatives, no perfumes, no surprises.',
    glyph: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="9" r="3.5" />
        <path strokeLinecap="round" d="M5 20c1-3.5 4-5.5 7-5.5s6 2 7 5.5" />
      </svg>
    ),
  },
  {
    label: 'Kitchen',
    title: 'Traditional cooking fat',
    body: 'A West African staple — high smoke point, slightly nutty, ideal for slow stews.',
    glyph: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" d="M6 11h12l-1 9H7L6 11Z" />
        <path strokeLinecap="round" d="M9 11V8a3 3 0 0 1 6 0v3" />
        <path strokeLinecap="round" d="M10 4.5c.5-.8 1.5-.8 2 0M14 4.5c.5-.8 1.5-.8 2 0" />
      </svg>
    ),
  },
];

export default function Benefits() {
  return (
    <section id="benefits" className="relative bg-cream py-30 lg:py-38 overflow-hidden">
      <div className="container-page relative">
        <div className="max-w-prose mb-20">
          <span className="eyebrow inline-flex items-center gap-3 mb-6">
            <span aria-hidden="true" className="block h-px w-8 bg-shea" />
            What it does
          </span>
          <h2 className="font-serif text-4xl text-espresso leading-[1.08]">
            One jar, <em className="text-shea-dark italic">four lives</em>.
          </h2>
          <p className="text-bark mt-8">
            Generations have used a tin of shea for everything from cradle cap to harmattan
            cracking. We don't believe in dressing it up.
          </p>
        </div>

        <motion.ul
          variants={staggerParent(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6"
        >
          {benefits.map((b, i) => (
            <motion.li
              key={b.label}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.6, ease: ease.out }}
              className="group relative overflow-hidden rounded-2xl bg-cream-deep ring-1 ring-sand p-8 lg:p-10 lg:py-14 min-h-[300px] flex flex-col
                         hover:bg-cream hover:ring-shea/40 hover:shadow-[0_20px_50px_-20px_rgba(42,31,23,0.25)]
                         transition-all duration-700 ease-out"
            >
              {/* Golden corner glow that intensifies on hover */}
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(160% 70% at 0% 0%, rgba(229,198,143,0.22), transparent 60%)',
                }}
              />

              <div className="relative flex items-center justify-between mb-10">
                <span className="font-sans text-[10px] uppercase tracking-widest text-bark">
                  {String(i + 1).padStart(2, '0')} — {b.label}
                </span>
                <span className="text-shea-dark group-hover:text-shea transition-colors duration-500">
                  {b.glyph}
                </span>
              </div>

              <h3 className="relative font-serif text-2xl text-espresso mb-4 leading-tight">
                {b.title}
              </h3>
              <p className="relative text-bark text-sm mt-auto pr-2">{b.body}</p>

              {/* Hover hairline at bottom */}
              <span
                aria-hidden="true"
                className="absolute left-0 right-0 bottom-0 h-px bg-shea origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out"
              />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
