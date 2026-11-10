import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { prefersReducedMotion } from "./useReducedMotion";

const applyThemeClass = (isDark) => {
    document.documentElement.classList.toggle("dark", isDark);
};

/** Center of the control that triggered the change (falls back to the viewport center). */
const getRevealOrigin = () => {
    const active = document.activeElement;
    if (active && active !== document.body && active.getBoundingClientRect) {
        const rect = active.getBoundingClientRect();
        if (rect.width || rect.height) {
            return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
        }
    }
    return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
};

export const useDarkmode = () => {

    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const getInitialTheme = () => {
        const saved = sessionStorage.getItem("theme");
        if (saved) return saved === "dark";
        return media.matches;
    };

    const [isDark, setIsDark] = useState(getInitialTheme);

    useEffect(() => {
        applyThemeClass(isDark);
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

        const commit = () => {
            flushSync(() => setIsDark(value));
            applyThemeClass(value);
        };

        // Circular reveal from the toggle where View Transitions are supported.
        if (!document.startViewTransition || prefersReducedMotion()) {
            commit();
            return;
        }

        const { x, y } = getRevealOrigin();
        const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
        const transition = document.startViewTransition(commit);

        transition.ready
            .then(() => {
                document.documentElement.animate(
                    { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
                    { duration: 650, easing: "cubic-bezier(0.16, 1, 0.3, 1)", pseudoElement: "::view-transition-new(root)" }
                );
            })
            .catch(() => {});
    };

    return [isDark, setTheme];
};