module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            keyframes: {
                wiggle: {
                    "0%, 100%": { transform: "rotate(-3deg)" },
                    "50%": { transform: "rotate(3deg)" },
                },
                disappear: {
                    "66%": { opacity: 1 },
                    "100%": { opacity: 0 },
                },
                appear: {
                    "0%": { opacity: 0 },
                    "90%": { opacity: 0 },
                    "100%": { opacity: 1 },
                },
            },
        },
        colors: {},
        fontFamily: {
            title: ["Montserrat"],
            subtitle: ["Oxygen"],
        },
    },
    plugins: [],
};
