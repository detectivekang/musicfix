// next.config.js (또는 next.config.mjs)
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 🚨 정적 HTML 파일 생성을 위해 이 설정을 추가합니다.
  output: 'export', 

  // (선택 사항) GitHub Pages는 서브 경로로 배포될 수 있으므로 base path 설정
  // 레포지토리 이름이 'my-repo'라면 '/my-repo'로 설정합니다.
  // 이 설정을 추가하면 Image 컴포넌트의 경로 문제도 해결될 수 있습니다.
  basePath: process.env.NODE_ENV === 'production' ? '/[당신의 레포지토리 이름]' : '',

  // (선택 사항) next/image 최적화 비활성화
  // GitHub Pages는 이미지 최적화 서버를 제공하지 않으므로 비활성화해야 빌드 에러를 피할 수 있습니다.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;