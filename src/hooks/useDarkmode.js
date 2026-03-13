import { useEffect, useState } from "react";

export const useDarkmode = () => {
    const getInitialTheme = () => {
        const saved = sessionStorage.getItem("theme");
        if (saved) return saved === "dark";
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    };

    const [isDark, setIsDark] = useState(getInitialTheme);

    useEffect(() => {
        const root = document.documentElement;
        const media = window.matchMedia("(prefers-color-scheme: dark)");

        const handleSystemChange = (e) => {
            if (!sessionStorage.getItem("theme")) {
                setIsDark(e.matches);
            }
        };

        if (isDark) {
            root.classList.add("dark");
            sessionStorage.setItem("theme", "dark");
        } else {
            root.classList.remove("dark");
            sessionStorage.setItem("theme", "light");
        }

        media.addEventListener("change", handleSystemChange);
        return () => media.removeEventListener("change", handleSystemChange);
    }, [isDark]);

    return [isDark, setIsDark];
};