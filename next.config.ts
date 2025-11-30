/** @type {import('next').NextConfig} */
const nextConfig = {
  // GitHub Pages와 같은 서브 경로 호스팅을 위한 설정
  // 리포지토리 이름이 musicfix이므로 basePath는 '/musicfix'로 설정
  basePath: '/musicfix',
  // Next.js를 정적 HTML/CSS/JS 파일로 변환하여 GitHub Pages에 적합하게 만듦
  output: 'export', 
  reactStrictMode: true,
};

module.exports = nextConfig;