// === app/page.tsx ===
import Hero from './Hero';
import About from './About';
import History from './History';
import Pricing from './Pricing';
import Contact from './Contact';
import Footer from './Footer';
// 🚨 Suspense를 import 합니다.
import { Suspense } from 'react';

// 로딩 중 표시할 fallback UI
const LoadingFallback = () => <div>Loading content...</div>;

export default function Home() {
  return (
    <>
      {/* 🚨 전체 콘텐츠를 <Suspense>로 감쌉니다. */}
      <Suspense fallback={<LoadingFallback />}>
        <Hero />
        <About />
        <History />
        <Pricing />
        <Contact />
        <Footer />
      </Suspense>
    </>
  );
}