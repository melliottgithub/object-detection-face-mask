import { DefaultTheme } from "styled-components";

const Theme: DefaultTheme = {
    colors: {
        primary: "#4f46e5",
        primaryDark: "#1e40af",
        primaryLight: "#818cf8",
        base: "#111317",
        baseLight: "#23262f",
        foreground: "#f4f5f6",
        foregroundDark: "#6b7280",
        error: "#ef4444",
        errorDark: "#dc2626"
    },
    shadows: {
        base: "0 4px 6px -1px rgba(0,0,0,0.1),0 2px 4px -1px rgba(0,0,0,0.06)",
        hover: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
    },
    textSizes: {
        regular: "1.5rem",
        title: "3rem",
        small: "1.125rem",
        xsmall: "1rem"
    },
    font: "DM Sans, sans-serif",
    transition: "all ease-in-out 0.15s"
}

export default Theme;