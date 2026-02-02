/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,jsx}"
    ],
    theme: {
      extend: {
        colors: {
          bg: "var(--bg)",
          card: "var(--card)",
          accent: "var(--accent)",
          text: "var(--text)",
          muted: "var(--muted)",
          border: "var(--border)",
        },
      },
    },
    plugins: [],
  };
  