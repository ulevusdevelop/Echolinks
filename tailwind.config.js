/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        syne: ['var(--font-syne)', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'ui-monospace', 'monospace'],
      },
      colors: {
        // Authoritative brand palette from the site's Elementor Global
        // Colors panel: #FF6000, #180F39, #434343, #665A7D, #abb8c3.
        // Elevation scale below is derived from #180F39 (page background)
        // by proportional lightening, keeping the whole system rooted in
        // one real, confirmed value instead of independently sampled or
        // estimated tones.
        ink: {
          DEFAULT: '#180F39',   // page background
          900: '#251D44',       // section background
          800: '#383054',       // card background
          700: '#463F60',       // card background (alt)
          600: '#4F4868',       // node/box fill
          border: 'rgba(102, 90, 125, 0.45)', // derived from #665A7D
        },
        accent: {
          DEFAULT: '#FF6000',
          light: '#FF7A26',
          soft: 'rgba(255,96,0,0.14)',
        },
        ink_text: {
          primary: '#EAF1FA',
          secondary: '#abb8c3',  // verified 8.90:1 on #180F39
          muted: '#8b93a0',      // dimmed derivative of #abb8c3
        },
        // Light-section text — #434343 verified 8.94:1+ on cream/white,
        // #665A7D verified 6.32:1 on white (works as secondary on light
        // backgrounds only — it fails contrast on dark, see globals.css).
        light_text: {
          primary: '#180F39',
          body: '#434343',
          secondary: '#665A7D',
        },
        flame: {
          from: '#3D1F0A',
          to: '#2A1608',
        },
      },
      borderRadius: {
        card: '16px',
        pill: '999px',
      },
      maxWidth: {
        wrap: '1240px',
      },
      letterSpacing: {
        tag: '0.08em',
      },
    },
  },
  plugins: [],
}
