// === components/History.tsx ===
export default function History() {
  return (
    <section id="history" className="bg-light py-5">
      <div className="container">
        <h2 className="fw-bold text-center mb-5">소개</h2>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="p-4 bg-white shadow rounded-4 h-100">
              <h4 className="fw-bold">연혁</h4>
              <p className="small text-muted mb-1">제이디라보 설립</p>
              <p className="mb-0">일본 쿠니타치 음악원 관악기리페어과 졸업</p>
              <p className="mb-0">일본 쇼비대학교 음악과 jazz&pops 색소폰전공 졸업</p>
              <p className="mb-0">전) 일본 와타나베프로덕션 소속 연주자</p>
              <p className="mb-0">전) 일본 다니엘관악기수리공방 대표</p>
              <p className="mb-0">TJB대전방송 네모세모 관악기수리전문가 출연</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4 bg-white shadow rounded-4 h-100">
              <h4 className="fw-bold">현재</h4>
              <p className="mb-0">현) 관악기수리공방 제이디라보 대표</p>
              <p className="mb-0">현)경복대학교(남양주)평생교육대학 색소폰리페어과 출강</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4 bg-white shadow rounded-4 h-100">
              <h4 className="fw-bold">사사</h4>
              <p className="mb-0">타카바 토모유키 (이시모리관악기 출신 기술자)</p>
              <p className="mb-0">와타나베 아츠시 (일본 포레스톤 색소폰 제조 및 개발총책임자)</p>
              <p className="mb-0">히타니 아키라 (부페 크람폰 수석기술자)</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}