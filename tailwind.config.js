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
        // DANGLING REFERENCE FIXED: this pointed to
        // var(--font-jetbrains), a CSS variable that no longer exists
        // since JetBrains Mono was removed from the codebase entirely
        // (direct instruction: "the font has to be Syne"). Nothing
        // currently uses the "font-mono" utility class anymore, but
        // redirected this to Syne as well rather than leaving a broken
        // reference — if anything ever does use font-mono again, it
        // gracefully renders in Syne instead of falling through to a
        // browser-default monospace font.
        mono: ['var(--font-syne)', 'sans-serif'],
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
          // CHANGED TO WHITE (direct instruction): "for all grayish
          // text on the purple background, change to white." These two
          // tokens are specifically the dark-background gray text
          // colors used sitewide (confirmed by the original comment:
          // "verified 8.90:1 on #16003B") — updating them here cascades
          // the fix to every usage across the whole site at once,
          // rather than hunting down each instance individually. The
          // separate light-section tokens (`light_text`, below) are
          // untouched — this instruction was specifically about text on
          // the purple background, not light sections.
          secondary: '#FFFFFF',
          muted: '#FFFFFF',
        },
        // Light-section text — #434343 verified 8.94:1+ on cream/white,
        // #665A7D verified 6.32:1 on white (works as secondary on light
        // backgrounds only — it fails contrast on dark, see globals.css).
        light_text: {
          primary: '#16003B',
          body: '#434343',
          secondary: '#665A7D',
        },
        // NOTE: the actual flame gradient (Training's "2,000 careers"
        // card) reads from CSS custom properties in globals.css
        // (--flame-from/--flame-to), not from this Tailwind color —
        // this entry was never referenced as a Tailwind utility class
        // anywhere and had drifted out of sync with the real values
        // (still the pre-Round-84 muddy browns). Kept for reference/
        // documentation purposes only, synced to the current real
        // values.
        flame: {
          from: '#16003B',
          to: '#8B3A0F',
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
