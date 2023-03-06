module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        roboto: ['var(--font-roboto)'],
      },
      animation: {
        'slide-in-elliptic-top-fwd': 'slide-in-elliptic-top-fwd 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both',
        heartbeat: 'heartbeat 1.5s ease  infinite both',
      },
      keyframes: {
        'slide-in-elliptic-top-fwd': {
          '0%': {
            transform: 'translateY(-600px) rotateX(-30deg) scale(0)',
            'transform-origin': '50% 100%',
            opacity: '0',
          },
          to: {
            transform: 'translateY(0) rotateX(0) scale(1)',
            'transform-origin': '50% 1400px',
            opacity: '1',
          },
        },
        heartbeat: {
          '0%': {
            transform: 'scale(1)',
            'transform-origin': 'center center',
            'animation-timing-function': 'ease-out',
          },
          '10%': {
            transform: 'scale(.91)',
            'animation-timing-function': 'ease-in',
          },
          '17%': {
            transform: 'scale(.98)',
            'animation-timing-function': 'ease-out',
          },
          '33%': {
            transform: 'scale(.87)',
            'animation-timing-function': 'ease-in',
          },
          '45%': {
            transform: 'scale(1)',
            'animation-timing-function': 'ease-out',
          },
        },
      },
    },
  },
  plugins: [],
};
