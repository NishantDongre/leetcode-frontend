/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                runCodeBtnColor: "#455b66",
                submitBtnColor: "#2f8e47",
                runCodeSubmitStrip: "#232323",
                customInputTextColor: "#a5a5a5",
                consoleStripColor: "#171b1e",
            },
        },
    },
    plugins: [daisyui],
    daisyui: {
        themes: ["forest"],
    },
};
