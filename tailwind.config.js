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
        // CORRECTED (per Echolink Solutions official Brand Guidelines,
        // section 3.1): Purple #16003B, Orange #FF6100, White #FFFFFF,
        // Black #000000. These are the authoritative values — the
        // previous palette below was sampled from the live site's
        // Elementor Global Colors panel (#16003B, #FF6100), which is
        // close but off-brand; the brand guide takes precedence.
        // Elevation scale re-derived from #16003B using the same
        // proportional lightening deltas as the previous scale, just
        // rooted in the corrected base color instead of the old one.
        ink: {
          DEFAULT: '#16003B',   // page background — brand guide purple
          900: '#230E46',       // section background
          800: '#362156',       // card background
          700: '#443062',       // card background (alt)
          600: '#4D396A',       // node/box fill
          border: 'rgba(102, 90, 125, 0.45)', // derived from #665A7D
        },
        accent: {
          DEFAULT: '#FF6100',   // brand guide orange
          light: '#FF7B26',
          soft: 'rgba(255,97,0,0.14)',
        },
        ink_text: {
          primary: '#EAF1FA',
          secondary: '#abb8c3',  // verified 8.90:1 on #16003B
          muted: '#8b93a0',      // dimmed derivative of #abb8c3
        },
        // Light-section text — #434343 verified 8.94:1+ on cream/white,
        // #665A7D verified 6.32:1 on white (works as secondary on light
        // backgrounds only — it fails contrast on dark, see globals.css).
        light_text: {
          primary: '#16003B',
          body: '#434343',
          secondary: '#665A7D',
        },
        flame: {
          from: '#3D1F0A',
          to: '#2A1608',
        },
      },
      borderRadius: {
        card: '0px',
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
  plugins: [require('@tailwindcss/typography')],
}
