import { useEffect, useState } from "react";

export const useDarkmode = () => {

    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const getInitialTheme = () => {
        const saved = sessionStorage.getItem("theme");
        if (saved) return saved === "dark";
        return media.matches;
    };

    const [isDark, setIsDark] = useState(getInitialTheme);

    useEffect(() => {
        const root = document.documentElement;

        if (isDark) {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
    }, [isDark]);

    useEffect(() => {
        const media = window.matchMedia("(prefers-color-scheme: dark)");

        const handleSystemChange = (e) => {
            setIsDark(e.matches);
        };

        if (media.addEventListener) {
            media.addEventListener("change", handleSystemChange);
        } else {
            media.addListener(handleSystemChange);
        }

        return () => {
            if (media.removeEventListener) {
                media.removeEventListener("change", handleSystemChange);
            } else {
                media.removeListener(handleSystemChange);
            }
        };
    }, []);

    const setTheme = (value) => {
        sessionStorage.setItem("theme", value ? "dark" : "light");
        setIsDark(value);
    };

    return [isDark, setTheme];
};