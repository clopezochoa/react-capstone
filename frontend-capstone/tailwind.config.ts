import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1090px',
      xl: '1280px',
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-krub)'],
      },
      colors: {
        clear: '#DEDEDE',
        main: '#57CBEF',
        focus: '#DA22EF',
        dark: '#384549'
      },
    },
  },
  plugins: [require('daisyui')],
}
export default config
