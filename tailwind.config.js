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
                    "0%, 100%": { transform: "rotate(-5deg)" },
                    "50%": { transform: "rotate(5deg)" },
                },
                disappear: {
                    "50%": { opacity: 1 },
                    "80%": { opacity: 0 },
                    "100%": { "z-index": -1 },
                },
                appear: {
                    "0%": { opacity: 0 },
                    "90%": { opacity: 0 },
                    "100%": { opacity: 1 },
                },
            },
        },
        colors: {
            white: "#ffffff",
            black: "#000000",
            green: "#17B890",
            blue: "#0056F5",
            orange: "#EE6055",
        },
        fontFamily: {
            title: ["Montserrat"],
            subtitle: ["Oxygen"],
        },
    },
    plugins: [],
};
