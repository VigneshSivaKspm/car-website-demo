/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // LIGHT THEME — token names are kept (so every component keeps working) but the values are
      // re-mapped by elevation: "carbon" = page / recessed surfaces, "graphite" = raised cards,
      // "charcoal" = hairlines, "pearl" = primary ink, "silver" = muted ink.
      colors: {
        carbon: {
          950: '#ECE7DC', // recessed / deepest surface (inputs, hero bands)
          900: '#F5F2EB', // page background (warm ivory)
          800: '#EFEBE2',
        },
        graphite: {
          900: '#FFFFFF', // raised cards
          800: '#FBF9F4',
          700: '#F3EFE6',
          600: '#E9E4D8',
        },
        charcoal: {
          DEFAULT: '#DAD3C4', // hairline borders
          light: '#CBC3B0',
          border: '#E1DACB',
        },
        gold: {
          DEFAULT: '#8A6A22', // text / borders (AA contrast on ivory)
          highlight: '#A8832C',
          dark: '#6F5418',
          muted: '#8A7244',
          glow: 'rgba(138, 106, 34, 0.2)',
        },
        pearl: {
          DEFAULT: '#1A1D22', // primary ink
          muted: '#2C3036',
        },
        silver: {
          DEFAULT: '#4B4F57', // muted ink
          dark: '#6B6F78',
          light: '#2F3238',
        },
        ink: '#1A1710', // dark text that sits on gold buttons
      },
      // Gold SURFACES (buttons, dots, gradient stops) stay a bright champagne so dark ink text reads on them.
      backgroundColor: {
        gold: {
          DEFAULT: '#C9A24A',
          highlight: '#E2C277',
          dark: '#A88A3A',
          muted: '#B79A5C',
          glow: 'rgba(201, 162, 74, 0.25)',
        },
      },
      gradientColorStops: {
        gold: {
          DEFAULT: '#C9A24A',
          highlight: '#E2C277',
          dark: '#A88A3A',
          muted: '#B79A5C',
          glow: 'rgba(201, 162, 74, 0.25)',
        },
      },
      fontFamily: {
        display: ['"Barlow Condensed"', 'sans-serif'],
        space: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'automotive': '0.22em',
        'super-wide': '0.35em',
      },
      animation: {
        'headlight-sweep': 'headlightSweep 6s ease-in-out infinite alternate',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'grid-float': 'gridFloat 20s linear infinite',
      },
      keyframes: {
        headlightSweep: {
          '0%': { opacity: '0.3', transform: 'translateX(-20%) scale(0.95)' },
          '100%': { opacity: '0.8', transform: 'translateX(20%) scale(1.05)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', filter: 'drop-shadow(0 0 15px rgba(138, 106, 34, 0.3))' },
          '50%': { opacity: '0.8', filter: 'drop-shadow(0 0 30px rgba(201, 162, 74, 0.5))' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        gridFloat: {
          '0%': { backgroundPosition: '0px 0px' },
          '100%': { backgroundPosition: '50px 50px' },
        },
      },
      backgroundImage: {
        'carbon-pattern': "radial-gradient(#DAD3C4 1px, transparent 1px), radial-gradient(#E9E4D8 1px, #F5F2EB 1px)",
        'metallic-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 50%, rgba(201,162,74,0.10) 100%)',
        'gold-metallic': 'linear-gradient(135deg, #E2C277 0%, #C9A24A 50%, #A88A3A 100%)',
        'dark-metallic': 'linear-gradient(180deg, #FFFFFF 0%, #F3EFE6 100%)',
      },
    },
  },
  plugins: [],
}
