// === components/About.tsx ===
export default function About() {
  return (
    <section id="about" className="py-5">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-6 order-lg-2 text-center">
            <img
              src="/images/profile.jpg"
              className="img-fluid rounded-4 shadow"
              alt="Studio"
            />
          </div>
          <div className="col-lg-6 order-lg-1">
            <h2 className="fw-bold mb-3">인사말</h2>
            <p className="mb-3">
              관악기 수리 전문가 전동헌은
              일본에서 관악기 리페어와 색소폰 연주를 전공하며 유학하였고,
              도쿄에서 연주 활동과 함께 리페어 공방을 운영했습니다.
              2021년 귀국 후 충남 서산에 *관악기수리공방 제이디라보*를 오픈하였습니다.

              TJB 대전방송에 관악기 수리 전문가로 소개된 바 있으며,
              현재는 경복대학교(남양주캠퍼스) 색소폰리페어과에서
              일본 학교에서 배운 커리큘럼과 다년간의 현장 경험을 바탕으로
              색소폰 리페어뿐만 아니라 다양한 관악기 리페어 교육에 힘쓰고 있습니다.
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