// next.config.js

const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Base Path 설정:
  // GitHub Pages 저장소 이름(musicfix)을 기본 경로로 설정합니다.
  // 이 설정을 통해 코드의 모든 상대 경로(/images/...)가
  // /musicfix/images/... 로 자동 변환됩니다.
  basePath: isProd ? '/musicfix' : '',
  
  // 2. Asset Prefix 설정 (선택 사항이지만 권장):
  // 정적 자산(CSS, JS, 이미지 등)의 URL 앞에 붙는 접두사를 지정합니다.
  assetPrefix: isProd ? '/musicfix/' : '', 
  
  // 3. 정적 내보내기 설정 (GitHub Pages 필수):
  // Next.js를 정적 HTML/CSS/JS 파일로 빌드하도록 지정하여
  // GitHub Pages에서 호스팅할 수 있게 합니다.
  output: 'export',
  
  // 4. 이미지를 next/image로 사용하는 경우 도메인 설정 (필요에 따라 추가)
  // images: {
  //   unoptimized: true, // next/image 최적화 비활성화 (정적 export 시 필요)
  // },

  // 기타 기존 설정은 그대로 유지하시면 됩니다.
};

module.exports = nextConfig;