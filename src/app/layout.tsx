import './globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '제이디라보 | 관악기수리공방',
  description: '관악기의 모든 것, 관악기 수리 전문가',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
