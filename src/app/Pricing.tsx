// components/Pricing.tsx
"use client"; // 클라이언트 컴포넌트로 변경

import { useRouter } from 'next/navigation';

export default function Pricing() {
  const router = useRouter();
  
  const handleSelectPackage = (packageType: string) => {
    // URL 업데이트 (스크롤 없음)
    router.push(`?package=${packageType}#contact`, { scroll: false });
    
    // Contact 섹션으로 스크롤 (렌더링 완료 후 실행)
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <section id="pricing" className="py-5">
      <div className="container">
        <h2 className="fw-bold text-center mb-5">수리 비용</h2>
        <div className="row justify-content-center g-4">
          {/* 베이직 */}
          <div className="col-md-4">
            <div className="card shadow h-100 border-0">
              <div className="card-body text-center">
                <img src="https://www.cosmosmusic.com/company/img/as_junja.jpg" width={300}></img>
                <h5 className="card-title fw-bold">베이직</h5>
                <p className="display-6 fw-bold">₩29,000</p>
                <ul className="list-unstyled mb-4 lh-lg">
                  <li>노이즈 제거</li>
                  <li>EQ 밸런스 조정</li>
                  <li className="text-muted">고급 리마스터링</li>
                </ul>
                <button 
                  onClick={() => handleSelectPackage('베이직')}
                  className="btn btn-outline-primary w-100"
                >
                  신청하기
                </button>
              </div>
            </div>
          </div>
          {/* 프리미엄 */}
          <div className="col-md-4">
            <div className="card shadow h-100 border-0">
              <div className="card-body text-center">
                <img src="https://www.cosmosmusic.com/company/img/as_wind.jpg" width={300}></img>
                <h5 className="card-title fw-bold">프리미엄</h5>
                <p className="display-6 fw-bold">₩59,000</p>
                <ul className="list-unstyled mb-4 lh-lg">
                  <li>AI 노이즈 제거 + 리마스터링</li>
                  <li>스테레오 이미지 향상</li>
                  <li>48kHz/24bit 업샘플링</li>
                </ul>
                <button 
                  onClick={() => handleSelectPackage('프리미엄')}
                  className="btn btn-primary w-100"
                >
                  가장 인기!
                </button>
              </div>
            </div>
          </div>
          {/* 커스텀 */}
          <div className="col-md-4">
            <div className="card shadow h-100 border-0">
              <div className="card-body text-center">
                <img src="https://www.cosmosmusic.com/company/img/as_acco.jpg" width={300}></img>
                <h5 className="card-title fw-bold">커스텀</h5>
                <p className="display-6 fw-bold">견적 문의</p>
                <ul className="list-unstyled mb-4 lh-lg">
                  <li>오래된 레코드 복원</li>
                  <li>멀티트랙 믹싱</li>
                  <li>마스터링 + DDP</li>
                </ul>
                <button 
                  onClick={() => handleSelectPackage('커스텀')}
                  className="btn btn-outline-primary w-100"
                >
                  문의하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}