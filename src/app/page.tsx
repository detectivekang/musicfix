// === app/page.tsx ===
import Hero from './Hero';
import About from './About';
import History from './History';
// import Pricing from './Pricing';
import Contact from './Contact';
import Footer from './Footer';

import { Suspense } from 'react';
import Reveal from '@/components/Reveal';
import Fixing from './Fixing';
import Edu from './Edu';

// 로딩 중 표시할 fallback UI
const LoadingFallback = () => <div>Loading content...</div>;

// ⭐ Open Graph + Twitter 썸네일 설정
export const metadata = {
  title: "제이디라보",
  description: "제이디라보 — 관악수리공방",
  openGraph: {
    title: "제이디라보",
    description: "제이디라보 — 관악수리공방",
    url: "https://detectivekang.github.io/musicfix/",
    type: "website",
    images: [
      {
        url: "https://detectivekang.github.io/musicfix/logo.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "제이디라보",
    description: "제이디라보 — 관악수리공방",
    images: ["https://detectivekang.github.io/musicfix/logo.jpg"],
  },
};

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
          <Edu />
        </Reveal>
        
          <Fixing />

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
