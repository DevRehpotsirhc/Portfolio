import { Toggle } from "../components/ui/Toggle";
import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

export default {
    title: "UI/Toggle",
    component: Toggle,
    parameters: {
        layout: "fullscreen",
        viewport: {
            defaultViewport: "responsive",
        },
    },
};

export const Default = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const root = document.documentElement;

        if (darkMode) {
            root.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            root.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    useEffect(() => {
        const saved = localStorage.getItem("theme");
        if (saved === "dark") {
            setDarkMode(true);
        }
    }, []);
    return (
        <div className="absolute flex flex-col size-full bg-background-light dark:bg-background-dark">
            <div className="flex items-center gap-2 p-5">
                <Toggle value={true} />
                <Toggle
                    inactiveStyle="bg-dark!"
                    activeIcon={<Sun className="text-yellow-400" />}
                    inactiveIcon={<Moon className="text-slate-200" />}
                    value={darkMode}
                    onChange={setDarkMode}
                />
                
            </div>
        </div>
    )

}
