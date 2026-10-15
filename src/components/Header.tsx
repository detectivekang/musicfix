export default function Header() {
  return (
    <header className="site-header">
      <div className="wrap bar">
        <a href="#hero" className="brand">제이디라보</a>
        <nav aria-label="주요 메뉴">
          <a href="#about">인사말</a>
          <a href="#fixing-service">악기 수리</a>
          <a href="#edu">리페어 교육</a>
          <a href="#onSiteRepair">출장 수리</a>
          <a href="#contact">오시는 길</a>
        </nav>
        <a className="call" href="tel:010-2650-4483">전화 문의</a>
      </div>
    </header>
  );
}
