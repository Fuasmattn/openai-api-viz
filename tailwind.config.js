/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        'frame': 'inset -1px 1px 6px 1px rgba(0,0,0,.24)',
        'frame-outer': '-1px 1px var(--blur) 1px rgba(0, 0, 0, 0.1), -2px 2px var(--blur) 1px rgba(0, 0, 0, 0.09), -3px 3px var(--blur) 1px rgba(0, 0, 0, 0.08), -4px 4px var(--blur) 1px rgba(0, 0, 0, 0.07), -5px 5px var(--blur) 1px rgba(0, 0, 0, 0.06), -6px 6px var(--blur) 1px rgba(0, 0, 0, 0.05), -7px 7px var(--blur) 1px rgba(0, 0, 0, 0.04), -8px 8px var(--blur) 1px rgba(0, 0, 0, 0.03), -9px 9px var(--blur) 1px rgba(0, 0, 0, 0.03), -10px 10px var(--blur) 1px rgba(0, 0, 0, 0.03), -11px 11px var(--blur) 1px rgba(0, 0, 0, 0.03), -12px 12px var(--blur) 1px rgba(0, 0, 0, 0.02), -13px 13px var(--blur) 1px rgba(0, 0, 0, 0.02), -14px 14px var(--blur) 1px rgba(0, 0, 0, 0.01), -15px 15px var(--blur) 1px rgba(0, 0, 0, 0.01), -16px 16px var(--blur) 1px rgba(0, 0, 0, 0.01)'
      }
    },
  },
  plugins: [],
}
