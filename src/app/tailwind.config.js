// tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",   // Next.js App Router 폴더
    "./pages/**/*.{js,ts,jsx,tsx}", // (만약 pages 폴더도 쓰는 경우)
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
