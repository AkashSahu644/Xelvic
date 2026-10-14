/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        /* ── Xelvic palette: PINK + WHITE only ────────────────────────
         * The site is a LIGHT theme: white pages, pink accents, deep-plum
         * text. `ink-*` are the light surfaces (900 = pure white page,
         * 600 = the deepest blush). `blue`/`blue-glow` are kept as token
         * NAMES for backwards-compatibility but now hold pinks.
         * `white` is intentionally inverted to deep plum so that the
         * hundreds of `text-white` / `border-white/10` / `bg-white/5`
         * usages across the app read correctly on a light page.
         * Use `pure` when you truly need literal #ffffff (screens,
         * labels sitting on photos, etc).
         * ---------------------------------------------------------- */
        ink: {
          DEFAULT: '#ffffff',
          900: '#ffffff',
          800: '#ffe9f3',
          700: '#ffd9e9',
          600: '#ffc6dc',
        },
        pink: {
          50: '#fff5f9',
          100: '#ffe9f3',
          200: '#ffd3e5',
          300: '#ffa9cd',
          400: '#ff77b0',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
          950: '#4c0a2c',
        },
        /* plum = the dark end of the pink family; this is the text colour */
        plum: {
          DEFAULT: '#3a0a24',
          soft: '#6b1f45',
          muted: '#8a5372',
        },
        /* accent tokens (names kept for compatibility, values are pink) */
        blue: {
          DEFAULT: '#ec4899',
          glow: '#db2777',
        },
        /* literal white for phone screens / text over photos */
        pure: '#ffffff',
        /* inverted: "white" text/border tokens are deep plum on a light page */
        white: '#3a0a24',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', '"Plus Jakarta Sans"', 'sans-serif'],
      },
      maxWidth: {
        wrap: '1200px',
      },
      backgroundImage: {
        'brand-grad': 'linear-gradient(100deg,#ec4899,#ff8fc4)',
        'brand-grad-vivid': 'linear-gradient(120deg,#9d174d,#ec4899 45%,#ff9ecb)',
        'brand-grad-soft': 'linear-gradient(120deg,#ffd3e5,#ffe9f3 50%,#ffc2dc)',
        'ink-grad': 'linear-gradient(135deg,#fff0f7,#ffe0ee)',
        'blush-grad': 'linear-gradient(180deg,#ffffff,#fff4f9)',
        aurora:
          'radial-gradient(60% 80% at 20% 10%,rgba(236,72,153,.18),transparent 60%),radial-gradient(50% 70% at 85% 20%,rgba(255,143,196,.22),transparent 60%),radial-gradient(60% 70% at 50% 100%,rgba(219,39,119,.16),transparent 60%)',
      },
      boxShadow: {
        glow: '0 0 60px rgba(236,72,153,.38)',
        'glow-sm': '0 0 24px rgba(236,72,153,.30)',
        'glow-lg': '0 0 110px rgba(236,72,153,.42)',
        card: '0 24px 60px rgba(157,23,77,.10)',
        'card-dark': '0 24px 60px rgba(58,10,36,.18)',
        phone:
          '0 40px 120px -20px rgba(157,23,77,.35), 0 0 0 1px rgba(58,10,36,.08)',
        'pink-soft': '0 18px 40px -12px rgba(236,72,153,.28)',
      },
      keyframes: {
        /* Idle motions for the hero character and the phone mockups. None of
           them bob straight up and down — a page where every element drifts on
           the same axis reads as one flat pulse. The character sways from the
           feet, the small cards drift off-axis, the phones rock in 3D. */
        sway: {
          '0%,100%': { transform: 'rotate(-2.4deg) translateY(5px)' },
          '50%': { transform: 'rotate(2.4deg) translateY(-5px)' },
        },
        'drift-card': {
          '0%,100%': { transform: 'translate3d(0,0,0) rotate(-1.2deg)' },
          '50%': { transform: 'translate3d(7px,-9px,0) rotate(1.2deg)' },
        },
        'tilt-drift': {
          '0%,100%': {
            transform: 'perspective(1600px) rotateY(-7deg) rotateX(3deg) translateY(6px)',
          },
          '50%': {
            transform: 'perspective(1600px) rotateY(7deg) rotateX(-3deg) translateY(-6px)',
          },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(.9)', opacity: '.7' },
          '70%': { transform: 'scale(1.3)', opacity: '0' },
          '100%': { opacity: '0' },
        },
        'aurora-drift': {
          '0%,100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '33%': { transform: 'translate3d(3%,-4%,0) scale(1.08)' },
          '66%': { transform: 'translate3d(-3%,3%,0) scale(.96)' },
        },
        'gradient-pan': {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'eq-bar': {
          '0%,100%': { transform: 'scaleY(.35)' },
          '50%': { transform: 'scaleY(1)' },
        },
      },
      animation: {
        sway: 'sway 8s ease-in-out infinite',
        'drift-card': 'drift-card 7s ease-in-out infinite',
        'tilt-drift': 'tilt-drift 12s ease-in-out infinite',
        marquee: 'marquee 28s linear infinite',
        shimmer: 'shimmer 3s linear infinite',
        'spin-slow': 'spin-slow 22s linear infinite',
        'pulse-ring': 'pulse-ring 2.4s cubic-bezier(.2,.7,.2,1) infinite',
        'aurora-drift': 'aurora-drift 18s ease-in-out infinite',
        'gradient-pan': 'gradient-pan 6s ease infinite',
        'fade-up': 'fade-up .6s cubic-bezier(.2,.7,.2,1) both',
        'eq-bar': 'eq-bar .8s ease-in-out infinite',
      },
    },
  },
  plugins: [
    /* `hoverable:` — everything inside it applies only where the primary
       pointer can actually hover, and is precise about it.

       Tailwind's own `hover:` variant means "this browser understands the
       :hover selector", which every touch browser does. iOS resolves a `:hover`
       on tap and then leaves it stuck there until something else is tapped, so
       `hover:` is not a safe way to say "on a mouse". That is merely untidy for
       a lift-and-glow. It is a bug for anything that is *only visible* on
       hover: on a phone the content is unreachable, full stop.

       So hover-revealed content takes this variant, with the visible state as
       the default. A mouse still gets the reveal; a thumb gets the content. */
    function ({ addVariant }) {
      addVariant('hoverable', '@media (hover: hover) and (pointer: fine)')
    },
  ],
}
