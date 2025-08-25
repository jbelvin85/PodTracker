/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'card-background': 'var(--color-card-background)',
        border: 'var(--color-border)',
        accent: 'var(--color-accent)',
        'button-primary-bg': 'var(--color-button-primary-bg)',
        'button-primary-text': 'var(--color-button-primary-text)',
        'button-secondary-bg': 'var(--color-button-secondary-bg)',
        'button-secondary-text': 'var(--color-button-secondary-text)',
        'input-bg': 'var(--color-input-bg)',
        'input-border': 'var(--color-input-border)',
      },
    },
  },
  plugins: [],
}
