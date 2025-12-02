// === components/Hero.tsx ===
import styles from './Hero.module.css';
export default function Hero() {
  return (
    <header
      id="hero"
      className="d-flex align-items-center text-white"
      style={{
        background:
          // 'url("https://previews.123rf.com/images/xavigm/xavigm1801/xavigm180100122/92856466-instrument-in-wood-background.jpg") center/cover no-repeat',
          'url("/musicfix/images/logo.jpg") center/cover no-repeat',
      }}
    >
      <div
        className={`d-flex align-items-center text-white ${styles.heroContainer}`}
        style={{ background: 'rgba(0, 0, 0, 0.6)'}}
      >
        {/* <div className="container text-center py-5">
          <h1 className="display-4 fw-bold">고장 난 악기, 우리가 고칩니다</h1>
          <p className="lead mb-4">노이즈 제거 · 음질 리마스터링 · 멀티 포맷 지원</p>
          <p className="lead mb-4 fw-bold">
            관악기전문수리사 전동헌[제이디라보]
          </p>
          <a href="#contact" className="btn btn-primary btn-lg">
            문의하기
          </a>
        </div> */}
      </div>
    </header>
  );
}
