// app/layout.tsx
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import { Metadata } from 'next';
import Head from 'next/head';
export const metadata: Metadata = {
  title: '제이디라보 | 관악기수리공방',
  description: '관악기의 모든 것, 관악기 수리 전문가',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Pretendard:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          defer
        ></script>
      </Head>
      <body className="bg-white text-dark">{children}</body>
    </html>
  );
}
