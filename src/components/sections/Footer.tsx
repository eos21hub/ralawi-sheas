const cols = [
  {
    title: 'Range',
    links: [
      { label: '700g tub', href: '#products' },
      { label: '1kg pack', href: '#products' },
      { label: '4kg bucket', href: '#products' },
      { label: '25kg bulk', href: '#products' },
    ],
  },
  {
    title: 'House',
    links: [
      { label: 'Our story', href: '#story' },
      { label: 'Benefits', href: '#benefits' },
      { label: 'Wholesale', href: 'mailto:hello@ralawisheas.com' },
    ],
  },
  {
    title: 'Reach us',
    links: [
      { label: 'hello@ralawisheas.com', href: 'mailto:hello@ralawisheas.com' },
      { label: 'Wa, Upper West · Ghana', href: '#' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-cream text-espresso border-t border-sand">
      <div className="container-page py-20 lg:py-24">
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="col-span-2 lg:col-span-5">
            <a href="#top" className="font-serif text-2xl tracking-wider inline-block mb-8">
              Ralawi <span className="italic font-light">Sheas</span>
            </a>
            <p className="text-bark max-w-prose">
              One ingredient, hand-pressed in northern Ghana since 1998. Sold in 700g, 1kg,
              4kg, and 25kg — never blended, never refined, never altered.
            </p>
          </div>

          {cols.map((c) => (
            <nav key={c.title} className="lg:col-span-2 lg:col-start-auto" aria-label={c.title}>
              <h4 className="eyebrow mb-6">{c.title}</h4>
              <ul className="space-y-3">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="font-sans text-sm text-bark hover:text-espresso transition-colors duration-300"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="lg:col-span-1" />
        </div>

        <div className="mt-20 lg:mt-24 pt-8 border-t border-sand flex flex-col sm:flex-row gap-4 justify-between text-xs text-bark/70 font-sans">
          <p>© {new Date().getFullYear()} Ralawi Sheas Limited. Proudly Made in Ghana.</p>
          <p className="tracking-widest uppercase">Smooth · Natural · Pure</p>
        </div>
      </div>
    </footer>
  );
}
