/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        work: ['"Nunito"', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        playfair: ['"Playfair Display"', 'serif'],
        vibes: ['"Pinyon Script"', 'cursive']
      },
      boxShadow: {
        card: '0 24px 80px rgba(0, 0, 0, 0.12)'
      },
      keyframes: {
        openFade: {
          '0%': { opacity: '0', transform: 'translateY(14px) scale(0.98)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' }
        },
        sealPulse: {
          '0%': { transform: 'translateX(-50%) scale(1)', opacity: '1' },
          '50%': { transform: 'translateX(-50%) scale(1.18)', opacity: '0.85' },
          '100%': { transform: 'translateX(-50%) scale(1)', opacity: '1' }
        },
        sealPop: {
          '0%': { transform: 'translateX(-50%) scale(1)', opacity: '1' },
          '60%': { transform: 'translateX(-50%) scale(1.28) rotate(-6deg)', opacity: '1' },
          '100%': { transform: 'translateX(-50%) scale(0.8) rotate(6deg)', opacity: '0.2' }
        }
      },
      animation: {
        openFade: 'openFade 0.7s ease',
        openFadeSlow: 'openFade 0.8s ease',
        sealPulse: 'sealPulse 1.4s ease-in-out infinite',
        sealPop: 'sealPop 0.55s ease forwards'
      }
    }
  },
  plugins: []
}
