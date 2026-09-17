/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFBF7',
          100: '#F7F3EB',
          200: '#EFE9DF',
          300: '#E4DACB',
          400: '#D5C5B0',
        },
        espresso: {
          900: '#1A1412',
          800: '#2C1810',
          700: '#3D2318',
          600: '#4F2E20',
        },
        coffee: {
          700: '#5A3D28',
          600: '#6F4E37',
          500: '#8B5E3C',
          400: '#A97C50',
          300: '#C7A279',
          100: '#F2E8DC',
        },
        terracotta: {
          700: '#8E3821',
          600: '#A8482D',
          500: '#C86446',
          400: '#DE8366',
          100: '#FBECE7',
        },
        sage: {
          700: '#4A5529',
          600: '#606C38',
          500: '#7E8F4B',
          100: '#EDF1E7',
        },
        warmgray: {
          900: '#1E1B18',
          800: '#2E2A26',
          700: '#48433E',
          600: '#68615A',
          400: '#A69E96',
          200: '#DDD8D0',
          100: '#ECE8E1',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(44, 24, 16, 0.06)',
        'soft-lg': '0 10px 30px -4px rgba(44, 24, 16, 0.08)',
        'soft-xl': '0 20px 40px -6px rgba(44, 24, 16, 0.12)',
        'elevated': '0 8px 30px rgba(111, 78, 55, 0.12)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
}
