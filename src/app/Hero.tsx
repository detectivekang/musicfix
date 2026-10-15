import Image from "next/image";

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="wrap hero-grid">
        <div>
          <p className="hero-sub">관악기수리공방</p>
          <h1>제이디라보</h1>
          <p className="hero-lead">관악기의 모든 것, 관악기 수리 전문가</p>
          <p className="hero-by">관악기전문수리사 전동헌</p>
          <div className="hero-cta">
            <a className="btn primary" href="tel:010-2650-4483">010-2650-4483</a>
            <a className="btn" href="#fixing-service">수리 사례 보기</a>
          </div>
        </div>
        <div className="hero-logo">
          <Image src="/images/logo.jpg" alt="제이디라보 JD's LABO 로고" width={800} height={500} priority style={{ width: "100%", height: "auto" }} />
        </div>
      </div>
    </section>
  );
}
