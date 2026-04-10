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
        const handleSystemChange = (e) => {
            if (!sessionStorage.getItem("theme")) {
                setIsDark(e.matches);
            }
        };

        media.addEventListener("change", handleSystemChange);
        return () => media.removeEventListener("change", handleSystemChange);
    }, []);

    const setTheme = (value) => {
        sessionStorage.setItem("theme", value ? "dark" : "light");
        setIsDark(value);
    };

    return [isDark, setTheme];
};