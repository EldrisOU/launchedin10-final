/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#1a2b4a', // Navy
                    light: '#2a4065',
                },
                accent: {
                    DEFAULT: '#0ea5a5', // Teal
                    hover: '#0d9488',
                },
                success: '#10b981',
                text: {
                    DEFAULT: '#111827',
                    muted: '#6b7280',
                },
                surface: {
                    DEFAULT: '#ffffff',
                    subtle: '#f4f5f7',
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Cabinet Grotesk', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
            },
            boxShadow: {
                'luxury': '0 4px 24px rgba(26, 43, 74, 0.06)',
                'luxury-elevated': '0 8px 32px rgba(26, 43, 74, 0.10)',
                'luxury-glow': '0 0 40px rgba(14, 165, 165, 0.15)',
                'inner-light': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.02)',
            },
            animation: {
                'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
                'fade-in-left': 'fadeInLeft 1s ease-out forwards',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'spin-slow': 'spin 3s linear infinite',
            },
            keyframes: {
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeInLeft: {
                    '0%': { opacity: '0', transform: 'translateX(20px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
            }
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
