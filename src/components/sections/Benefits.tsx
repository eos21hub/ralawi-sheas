import { motion } from 'framer-motion';
import { staggerParent, fadeUp } from '@/lib/motion';

const benefits = [
  {
    label: 'Skin',
    title: 'Deeply moisturising',
    body: 'Rich in fatty acids and vitamins A & E — comforts dryness, eczema, and stretch marks.',
  },
  {
    label: 'Hair',
    title: 'Strengthens & seals',
    body: 'Melts at body temperature into a sealant that locks moisture into curls and coils.',
  },
  {
    label: 'Baby care',
    title: 'Soothes the softest skin',
    body: 'Single ingredient. No preservatives, no perfumes, no surprises.',
  },
  {
    label: 'Kitchen',
    title: 'Traditional cooking fat',
    body: 'A West African staple — high smoke point, slightly nutty, ideal for slow stews.',
  },
];

export default function Benefits() {
  return (
    <section id="benefits" className="relative bg-cream py-30 lg:py-38">
      <div className="container-page">
        <div className="max-w-prose mb-20">
          <span className="eyebrow block mb-6">What it does</span>
          <h2 className="font-serif text-4xl text-espresso">
            One jar, <em className="text-shea-dark">four lives</em>.
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-sand border-y border-sand"
        >
          {benefits.map((b, i) => (
            <motion.li
              key={b.label}
              variants={fadeUp}
              className="group relative bg-cream p-8 lg:p-10 lg:py-14 min-h-[280px] flex flex-col"
            >
              <span className="font-sans text-[10px] uppercase tracking-widest text-bark mb-12">
                {String(i + 1).padStart(2, '0')} — {b.label}
              </span>
              <h3 className="font-serif text-2xl text-espresso mb-4 leading-tight">
                {b.title}
              </h3>
              <p className="text-bark text-sm mt-auto pr-4">{b.body}</p>
              {/* Hover hairline */}
              <span className="absolute left-0 right-0 bottom-0 h-px bg-shea origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out" />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
