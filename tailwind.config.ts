import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        gradient: {
          from: '#1ea483',
          to: '#7465d4',
        },
        white: '#fff',
        gray: {
          100: '#e1e1e6',
          300: '#c4c4cc',
          800: '#202024',
          900: '#121214',
        },
        green: {
          300: '#00b37e',
          500: '#00875f',
        },
      },
      maxWidth: {
        calc: 'calc(100vh - ((100vh - 1180px) / 2))',
      },
      height: {
        imgHeight: 'calc(656px - 0.5rem)',
      },
    },
  },
  plugins: [],
}
export default config
