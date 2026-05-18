import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';

const items = [
  { href: '#story', label: 'Story' },
  { href: '#products', label: 'Products' },
  { href: '#benefits', label: 'Benefits' },
  { href: '#contact', label: 'Contact' },
];

export default function Nav() {
  const { scrollY } = useScroll();
  const bg = useTransform(
    scrollY,
    [0, 80],
    ['rgba(251, 248, 243, 0)', 'rgba(251, 248, 243, 0.86)'],
  );
  const border = useTransform(scrollY, [0, 80], ['rgba(232, 223, 208, 0)', 'rgba(232, 223, 208, 1)']);
  const textColor = useTransform(scrollY, [0, 80], ['#FBF8F3', '#2A1F17']);

  const [open, setOpen] = useState(false);

  // Close menu on resize beyond breakpoint
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <motion.header
      style={{ backgroundColor: bg, borderColor: border, color: textColor }}
      className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md backdrop-saturate-150 transition-colors"
    >
      <div className="container-page flex items-center justify-between py-5">
        <a
          href="#top"
          className="font-serif text-xl tracking-wider"
          aria-label="Ralawi Sheas home"
        >
          Ralawi <span className="italic font-light">Sheas</span>
        </a>

        <nav className="hidden md:flex items-center gap-10" aria-label="Primary">
          {items.map((it) => (
            <a
              key={it.href}
              href={it.href}
              className="font-sans text-xs uppercase tracking-widest opacity-80 hover:opacity-100 transition-opacity"
            >
              {it.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden md:inline-flex font-sans text-xs uppercase tracking-widest border-b border-current pb-0.5 hover:text-shea transition-colors"
        >
          Order →
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center w-10 h-10 -mr-2"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <span className="relative block w-6 h-3">
            <span
              className={`absolute left-0 right-0 h-px bg-current transition-transform duration-500 ease-out ${
                open ? 'top-1.5 rotate-45' : 'top-0'
              }`}
            />
            <span
              className={`absolute left-0 right-0 h-px bg-current transition-transform duration-500 ease-out ${
                open ? 'top-1.5 -rotate-45' : 'top-3'
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="md:hidden overflow-hidden bg-cream"
      >
        <nav className="container-page flex flex-col gap-6 py-8" aria-label="Mobile">
          {items.map((it) => (
            <a
              key={it.href}
              href={it.href}
              onClick={() => setOpen(false)}
              className="font-serif text-2xl text-espresso"
            >
              {it.label}
            </a>
          ))}
        </nav>
      </motion.div>
    </motion.header>
  );
}
