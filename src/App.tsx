import { useSmoothScroll } from '@/lib/useSmoothScroll';
import Nav from '@/components/Nav';
import Hero from '@/components/sections/Hero';
import Story from '@/components/sections/Story';
import ProductShowcase from '@/components/sections/ProductShowcase';
import Benefits from '@/components/sections/Benefits';
import AtScale from '@/components/sections/AtScale';
import Testimonials from '@/components/sections/Testimonials';
import FinalCTA from '@/components/sections/FinalCTA';
import Footer from '@/components/sections/Footer';

export default function App() {
  useSmoothScroll();

  return (
    <>
      <Nav />
      {/* No overflow-hidden on main — would break the pinned ProductShowcase sticky.
          Each section handles its own horizontal containment internally. */}
      <main>
        <Hero />
        <Story />
        <ProductShowcase />
        <Benefits />
        <AtScale />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
