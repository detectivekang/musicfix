// === app/page.tsx ===
import Hero from './Hero';
import About from './About';
import History from './History';
import Contact from './Contact';
import Footer from './Footer';

import { Suspense } from 'react';
import Reveal from '@/components/Reveal';
import Fixing from './Fixing';
import Edu from './Edu';
import OnSiteRepair from './OnSiteRepair';

// 로딩 중 표시할 fallback UI
const LoadingFallback = () => <div>Loading content...</div>;

// ⭐ Open Graph + Twitter 썸네일 설정
export const metadata = {
  title: "제이디라보 | 목관·금관악기 수리 및 색소폰 리페어 교육",
  description: "목관 금관악기 수리 전문 제이디라보입니다. 색소폰 리페어 교육 및 전국 출장 수리 가능. 일본 쿠니타치 음악원 출신 전문가의 정밀한 서비스를 만나보세요.",
  openGraph: {
    title: "제이디라보 - 관악기 수리 전문",
    description: "목관 금관악기 수리 전문, 색소폰 리페어 교육, 전국 출장 수리. 악기의 가치를 되살리는 정밀 리페어 서비스.",
    url: "https://detectivekang.github.io/",
    type: "website",
    images: [
      {
        url: "https://detectivekang.github.io/logo.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "제이디라보 - 관악기 수리 전문",
    description: "목관 금관악기 수리 전문, 색소폰 리페어 교육, 전국 출장 수리. 악기의 가치를 되살리는 정밀 리페어 서비스.",
    images: ["https://detectivekang.github.io/logo.jpg"],
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

        <Fixing />

        <Reveal>
          <Edu />
        </Reveal> 
        
        <Reveal>
          <OnSiteRepair />
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
