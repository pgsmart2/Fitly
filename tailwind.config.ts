import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				inter: ['Inter', 'sans-serif'],
				lobster: ['Lobster', 'cursive'],
			},
			colors: {
				border: 'hsl(var(--border))',
				'border-light': 'hsl(var(--border-light))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				surface: 'hsl(var(--surface))',
				'surface-elevated': 'hsl(var(--surface-elevated))',
				foreground: 'hsl(var(--foreground))',
				'muted-foreground': 'hsl(var(--muted-foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					glow: 'hsl(var(--primary-glow))',
					dark: 'hsl(var(--primary-dark))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				success: 'hsl(var(--success))',
				warning: 'hsl(var(--warning))',
				destructive: 'hsl(var(--destructive))',
				info: 'hsl(var(--info))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					elevated: 'hsl(var(--card-elevated))'
				},
				accent: 'hsl(var(--accent))',
			},
			backgroundImage: {
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-surface': 'var(--gradient-surface)',
				'gradient-glow': 'var(--gradient-glow)',
			},
			boxShadow: {
				'elevation': 'var(--shadow-elevation)',
				'glow': 'var(--shadow-glow)',
				'intense': 'var(--shadow-intense)',
			},
			transitionTimingFunction: {
				'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
				'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-up': {
					'0%': { opacity: '0', transform: 'translateY(30px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'glow-pulse': {
					'0%, 100%': { boxShadow: '0 0 20px hsl(14 100% 57% / 0.3)' },
					'50%': { boxShadow: '0 0 40px hsl(14 100% 57% / 0.6)' }
				},
				'progress-fill': {
					'0%': { width: '0%' },
					'100%': { width: 'var(--progress-width)' }
				},
				'shimmer': {
					'0%': { left: '-100%' },
					'100%': { left: '100%' }
				},
				'gentle-bounce': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-4px)' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out',
				'slide-up': 'slide-up 0.4s ease-out',
				'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
				'progress-fill': 'progress-fill 1s cubic-bezier(0.4, 0, 0.2, 1)',
				'shimmer': 'shimmer 2s infinite',
				'gentle-bounce': 'gentle-bounce 2s ease-in-out infinite',
				'scale-in': 'scale-in 0.3s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
