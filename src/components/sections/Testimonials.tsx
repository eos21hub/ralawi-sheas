import { testimonials } from '@/data/testimonials';

export default function Testimonials() {
  // Duplicate for seamless infinite marquee
  const loop = [...testimonials, ...testimonials];

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="relative bg-cream-deep py-30 lg:py-38 overflow-hidden"
    >
      <div className="container-page mb-16">
        <span className="eyebrow block mb-6">Word of mouth</span>
        <h2 id="testimonials-heading" className="font-serif text-4xl text-espresso max-w-2xl">
          From the kitchens and bathroom shelves of customers across three continents.
        </h2>
      </div>

      <div
        className="group relative w-full select-none"
        style={{ maskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)' }}
      >
        <div className="flex gap-16 lg:gap-24 w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:overflow-x-auto motion-reduce:snap-x">
          {loop.map((t, i) => (
            <figure
              key={i}
              className="w-[80vw] sm:w-[60vw] md:w-[44vw] lg:w-[34vw] xl:w-[28rem] shrink-0 px-2 motion-reduce:snap-start"
            >
              <blockquote className="font-serif text-2xl lg:text-3xl text-espresso italic font-light leading-[1.25]">
                <span aria-hidden="true" className="text-shea mr-1">&ldquo;</span>
                {t.quote}
                <span aria-hidden="true" className="text-shea ml-1">&rdquo;</span>
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4 text-bark">
                <span className="block h-px w-10 bg-shea" aria-hidden="true" />
                <span className="font-sans text-sm">
                  {t.attribution} <span className="text-bark/70">— {t.location}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
