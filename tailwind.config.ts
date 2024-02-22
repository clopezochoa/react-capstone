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
      colors: {
        clear: '#DEDEDE',
        main: '#57CBEF',
        focus: '#DA22EF',
        lightMain: '#ABE5F7',
        lightFocus: '#ED91F7',
        valid: '#66CCAA',
        invalid: '#FDA086',
        dark: '#384549',
        golden: '#B89130'
      },
    },
  },
  plugins: [require('daisyui')],
}
export default config
