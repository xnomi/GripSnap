import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--bg)",
        surface: "var(--surface)",
        surface2: "var(--surface2)",
        accent: "var(--accent)",
        accent2: "var(--accent2)",
        accent3: "var(--accent3)",
        text: "var(--text)",
        muted: "var(--muted)",
        border: "var(--border)",
      },
      fontFamily: {
        clash: ['var(--font-clash)', 'sans-serif'],
        satoshi: ['var(--font-satoshi)', 'sans-serif'],
        fira: ['var(--font-fira)', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, var(--accent), var(--accent2), var(--accent3))',
      },
      animation: {
        'gradient-x': 'gradient-x 3s ease infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
