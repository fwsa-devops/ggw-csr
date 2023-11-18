import type { Config } from 'tailwindcss';
import { withUt } from 'uploadthing/tw';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      width: {
        '1/11': '9.0909%', // 100 / 11
        '2/11': '18.1818%', // 200 / 11
        '3/11': '27.2727%', // 300 / 11
        '4/11': '36.3636%', // 400 / 11
        '5/11': '45.4545%', // 500 / 11
        '6/11': '54.5454%', // 600 / 11
        '7/11': '63.6363%', // 700 / 11
        '8/11': '72.7272%', // 800 / 11
        '9/11': '81.8181%', // 900 / 11
        '10/11': '90.9090%', // 1000 / 11
        '1/7': '14.2857%', // 100 / 7
        '2/7': '28.5714%', // 200 / 7
        '3/7': '42.8571%', // 300 / 7
        '4/7': '57.1428%', // 400 / 7
        '5/7': '71.4285%', // 500 / 7
        '6/7': '85.7142%', // 600 / 7
        '1/9': '11.1111%', // 100 / 9
        '2/9': '22.2222%', // 200 / 9
        '3/9': '33.3333%', // 300 / 9
        '4/9': '44.4444%', // 400 / 9
        '5/9': '55.5555%', // 500 / 9
        '6/9': '66.6666%', // 600 / 9
        '7/9': '77.7777%', // 700 / 9
        '8/9': '88.8888%', // 800 / 9
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@headlessui/tailwindcss'),
  ],
};
export default withUt(config);
