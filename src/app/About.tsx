// === components/About.tsx ===
export default function About() {
  return (
    <section id="about" className="py-5">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-6 order-lg-2 text-center">
            <img
              src="https://images.unsplash.com/photo-1497032205916-ac775f0649ae?auto=format&fit=crop&w=800&q=80"
              className="img-fluid rounded-4 shadow"
              alt="Studio"
            />
          </div>
          <div className="col-lg-6 order-lg-1">
            <h2 className="fw-bold mb-3">인사말</h2>
            <p className="mb-3">
              오랫동안 일본에서의 연주활동과 관악기리페어를 공부하고 충남 서산에서 관악기수리전문점을 운영하고 있습니다.
              연주자출신 리페어맨으로서 연주자와의 소통을 중요시하며 장인정신을 바탕으로 정성을 다해 수리하고 있습니다.
            </p>
            <ul className="list-unstyled lh-lg">
              <li>🎧 AI 기반 노이즈 프로파일 분석</li>
              <li>🔧 오디오 복원 전문가 10년 경력</li>
              <li>⚙️ 다양한 파일 포맷 완벽 지원</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}