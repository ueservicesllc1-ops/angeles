/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-sans)', 'sans-serif'],
            },
            colors: {
                border: 'hsl(var(--border))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(221.2 83.2% 53.3%)',
                    foreground: 'hsl(210 40% 98%)'
                },
                secondary: {
                    DEFAULT: 'hsl(210 40% 96.1%)',
                    foreground: 'hsl(222.2 47.4% 11.2%)'
                },
                slate: {
                    850: '#151e2e',
                    900: '#0f172a',
                    950: '#020617',
                }
            },
            animation: {
                "meteor-effect": "meteor 5s linear infinite",
                "aurora": "aurora 60s linear infinite",
            },
            keyframes: {
                meteor: {
                    "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
                    "70%": { opacity: "1" },
                    "100%": {
                        transform: "rotate(215deg) translateX(-500px)",
                        opacity: "0",
                    },
                },
                aurora: {
                    from: {
                        backgroundPosition: "50% 50%, 50% 50%",
                    },
                    to: {
                        backgroundPosition: "350% 50%, 350% 50%",
                    },
                },
            },
        },
    },
    plugins: [],
}
