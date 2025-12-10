// === app/page.tsx ===
import Hero from './Hero';
import About from './About';
import History from './History';
import Pricing from './Pricing';
import Contact from './Contact';
import Footer from './Footer';

import { Suspense } from 'react';

// ⭐ Reveal 컴포넌트 import
import Reveal from '@/components/Reveal';

// 로딩 중 표시할 fallback UI
const LoadingFallback = () => <div>Loading content...</div>;

export default function Home() {
  return (
    <>
      <Suspense fallback={<LoadingFallback />}>
        
        <Reveal>
          <Hero />
        </Reveal>

        <Reveal>
          <About />
        </Reveal>

        <Reveal>
          <History />
        </Reveal>

        <Reveal>
          <Pricing />
        </Reveal>

        <Reveal>
          <Contact />
        </Reveal>

        <Reveal>
          <Footer />
        </Reveal>
        
      </Suspense>
    </>
  );
}
