/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F0F7FF',
          100: '#E0EFFF',
          200: '#BAE0FF',
          500: '#1677FF',
          600: '#0B5ED7',
          700: '#0047B3',
        },
        primary: {
          DEFAULT: '#1677FF',
          dark: '#0B5ED7',
          soft: '#EAF3FF',
        },
        success: {
          DEFAULT: '#16A66A',
          dark: '#0F7B4E',
          soft: '#EAF8F1',
        },
        danger: {
          DEFAULT: '#EF4444',
          dark: '#DC2626',
          soft: '#FFF0F0',
        },
        warning: {
          DEFAULT: '#F5A623',
          dark: '#D97706',
          soft: '#FFF7E6',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          muted: '#F7F9FC',
          card: '#FFFFFF',
        },
        text: {
          primary: '#111827',
          secondary: '#667085',
          muted: '#98A2B3',
        },
        border: {
          DEFAULT: '#E4E7EC',
          light: '#F2F4F7',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        '2xl': '24px',
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(16, 24, 40, 0.06), 0 1px 2px 0 rgba(16, 24, 40, 0.04)',
        'card': '0 2px 6px -1px rgba(16, 24, 40, 0.06), 0 2px 4px -2px rgba(16, 24, 40, 0.04)',
        'card-hover': '0 10px 15px -3px rgba(16, 24, 40, 0.08), 0 4px 6px -4px rgba(16, 24, 40, 0.03)',
        'float': '0 20px 25px -5px rgba(16, 24, 40, 0.1), 0 8px 10px -6px rgba(16, 24, 40, 0.05)',
      }
    },
  },
  plugins: [],
}
