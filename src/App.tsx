import { useSmoothScroll } from '@/lib/useSmoothScroll';
import Nav from '@/components/Nav';
import Hero from '@/components/sections/Hero';
import Story from '@/components/sections/Story';
import ProductShowcase from '@/components/sections/ProductShowcase';
import Benefits from '@/components/sections/Benefits';
import Testimonials from '@/components/sections/Testimonials';
import FinalCTA from '@/components/sections/FinalCTA';
import Footer from '@/components/sections/Footer';

export default function App() {
  useSmoothScroll();

  return (
    <>
      <Nav />
      <main className="overflow-hidden">
        <Hero />
        <Story />
        <ProductShowcase />
        <Benefits />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
