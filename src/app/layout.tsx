// app/layout.tsx
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import { Metadata } from 'next';
import Head from 'next/head';
export const metadata: Metadata = {
  title: 'MusicFix | 고장 난 음악, 우리가 고칩니다',
  description: '악기 수리 서비스',
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
