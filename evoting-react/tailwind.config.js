/** @type {import('tailwindcss').Config} */

export default {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            screens: {
                sm: "480px",
                md: "768px",
                lg: "976px",
                xl: "1440px",
            },
            container: {
                center: true,
                padding: {
                    DEFAULT: "1rem",
                    sm: "2rem",
                    lg: "3rem",
                    xl: "4rem",
                    "2xl": "5rem",
                },
            },
            colors: {
                primary: "#1F509A",
                secondary: "#0A3981",
                gold: "#E38E49",
                light: "#D4EBF8",
                white: "#fff",
                dark: "#2C3E50",
                danger: "#991b1b",
                success: "#2ecc71",
                warning: "#f1c40f",
                info: "#0369a1",
                transparent: "transparent",
                current: "currentColor",
                gray: "#333",
                "gray-100": "#f3f4f6",
                "gray-200": "#e5e7eb",
                "gray-500": "#6b7280",
                "gray-700": "#334155",
                "gray-800": "#1f2937",
            },
        },
    },
    plugins: [],
};
