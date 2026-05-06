import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // 暖色调配色方案
        cream: {
          50: '#FFFDF7',
          100: '#FFF8F0',
          200: '#FAF5F0',
          300: '#F0E6D8',
          400: '#E8D5C0',
          500: '#D4C4A8',
        },
        warm: {
          50: '#FFF5EE',
          100: '#FFE8D6',
          200: '#FFD5BC',
          300: '#E8A87C',
          400: '#D4956A',
          500: '#C08258',
          600: '#A06946',
          700: '#805034',
          800: '#603822',
          900: '#3D2C2C',
        },
        sage: {
          50: '#F0F7F4',
          100: '#E0EFE9',
          200: '#C1DFD3',
          300: '#A2CFBD',
          400: '#7CB5A0',
          500: '#5A9B83',
          600: '#4A8169',
          700: '#3A674F',
          800: '#2A4D35',
          900: '#1A331B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans SC', 'system-ui', 'sans-serif'],
        serif: ['Noto Serif SC', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#3D2C2C',
            a: {
              color: '#7CB5A0',
              '&:hover': {
                color: '#5A9B83',
              },
            },
            h1: {
              color: '#3D2C2C',
            },
            h2: {
              color: '#3D2C2C',
            },
            h3: {
              color: '#3D2C2C',
            },
            h4: {
              color: '#3D2C2C',
            },
            code: {
              color: '#E8A87C',
              backgroundColor: '#FFF5EE',
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
              fontWeight: '400',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: '#2D2D2D',
              color: '#E8E8E8',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
export default config
