/**
 * @file tailwind.config.js
 * Why this exists: Configures Tailwind CSS styling rules, custom color tokens, font families,
 * and 3D utilities for the dark/light mode developer portfolio.
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // Tricky logic: Theme toggle relies on [data-theme="dark"] attribute on <html> element for dark mode styling.
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        brgray: 'var(--color-btn-light-bg)',
        brblue: 'var(--color-accent)',
        bg: 'var(--color-bg)',
        'bg-alt': 'var(--color-bg-alt)',
        fg: 'var(--color-text)',
        'fg-muted': 'var(--color-text-muted)',
        'fg-subtle': 'var(--color-text-subtle)',
        accent: 'var(--color-accent)',
        'accent-soft': 'var(--color-accent-soft)',
        'theme-border': 'var(--color-border)',
      },
    },
    fontFamily: {
      sans: ["var(--font-inter)", "Inter", "sans-serif"],
      Inter: ["var(--font-inter)", "Inter", "sans-serif"],
      Aeonik: ["var(--font-inter)", "Inter", "sans-serif"],
      AeonikBold: ["var(--font-inter)", "Inter", "sans-serif"],
      AeonikMedium: ["var(--font-inter)", "Inter", "sans-serif"],
    },
  },
  plugins: [
    require('tailwindcss-3d')
  ],
};
