// === app/page.tsx ===
import Hero from './Hero';
import About from './About';
import History from './History';
import Pricing from './Pricing';
import Contact from './Contact';
import Footer from './Footer';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <History />
      <Pricing />
      <Contact />
      <Footer />
    </>
  );
}