import { Cog, Menu, X, ArrowDownToLine, Moon, Sun, Linkedin, Github } from "lucide-react"
import { useDarkmodeContext } from "../../context/DarkmodeContext"
import { useClickOutside } from "../../hooks/useClickOutside"
import { useState, useEffect, useRef } from "react"
import { Button } from "../ui/Button"
import { Toggle } from "../ui/Toggle"
import { useDownloadCV } from "../../hooks/useDownloadCV"



export const Header = ({ about = "", experience = "", skills = "", projects = "" }) => {
    const [open, setOpen] = useState(false)
    const [toggle, setToggle] = useState(false);
    const [darkMode, setDarkMode] = useDarkmodeContext();

    const menu = useRef(null)
    const buttonRef = useRef(null)
    const sectionRef = useRef(null)

    useClickOutside(
        [menu, buttonRef],
        () => setOpen(false),
        open
    );

    useClickOutside(
        [sectionRef],
        () => setToggle(false),
        toggle
    );

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 720) {
                setOpen(false)
            }
        }

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    useEffect(() => {
        const openTimer = setTimeout(() => {
            setToggle(true)
        }, 800);

        const closeTimer = setTimeout(() => {
            setToggle(false)
        }, 1800);

        return () => {
            clearTimeout(openTimer);
            clearTimeout(closeTimer);
        };
    }, []);

    const links = [
        { name: "About", href: about !== "" ? about : "#", showClass: "min-[420px]:block", hideClass: "min-[420px]:hidden" },
        { name: "Experience", href: experience !== "" ? experience : "#", showClass: "min-[520px]:block", hideClass: "min-[520px]:hidden" },
        { name: "Skills", href: skills !== "" ? skills : "#", showClass: "min-[620px]:block", hideClass: "min-[620px]:hidden" },
        { name: "Projects", href: projects !== "" ? projects : "#", showClass: "min-[720px]:block", hideClass: "min-[720px]:hidden" },
    ]

    const handleDownloadCV = useDownloadCV()

    return (
        <main className="flex h-23">
            <div className="fixed left-1/2 -translate-x-1/2 top-2 w-[85%] max-w-300 z-20 dark:text-slate-400 text-slate-600 font-semibold max-[720px]:text-sm min-[1000px]:text-base transform-gpu transform-3d">
                <header
                    className="flex items-center justify-between sm:justify-between align-middle
                p-2 px-4 sm:px-5 h-[25dvh] max-h-17 top-2 rounded-xl bg-background-light backdrop-blur-md isolate shadow-lg shadow-medium-500/50 border border-b-9 rounded-b-2xl border-slate-300
                dark:bg-background-dark dark:border-dark/60 dark:shadow-secundary-500/30"
                >
                    <section
                        ref={sectionRef}
                        className="group relative flex items-center justify-center align-middle gap-2 cursor-default"
                        onClick={() => setToggle(!toggle)}
                        onMouseEnter={() => setToggle(true)}
                        onMouseLeave={() => setToggle(false)}
                    >
                        <Cog className={`size-6 group-hover:rotate-180 ${toggle ? "rotate-180" : ""} transition-all transform duration-500`} />
                        <span>Christopher Aponte</span>

                        <article className={`absolute top-full -left-7 max-[640px]:-left-6 w-fit opacity-0 -translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 ease-out ${toggle ? "opacity-100 translate-y-0 pointer-events-auto" : "pointer-events-none"}`}
                        >
                            <div className="flex flex-col w-60 max-[300px]:pr-0 max-[300px]:w-[85dvw] mt-9 max-h-[70dvh] overflow-y-auto p-2 pt-0 gap-2">
                                <Button
                                    style={darkMode ? "secundary" : "medium"}
                                    title="Download CV"
                                    others="w-full! m-0! p-0!"
                                    inside={
                                        <span className="flex gap-1 items-center">
                                            <ArrowDownToLine className="size-5 min-[980px]:size-6" />
                                            <p>Download CV</p>
                                        </span>
                                    }
                                    onClick={handleDownloadCV}
                                />
                                <div className="flex flex-wrap items-center gap-2 m-auto">
                                    <Toggle
                                        inactiveStyle="bg-dark!"
                                        activeIcon={<Sun className="text-amber-300 stroke-[2.8px]" />}
                                        inactiveIcon={<Moon className="text-slate-200 stroke-[2.8px]" />}
                                        value={darkMode}
                                        onChange={setDarkMode}
                                        title="Darkmode"
                                    />
                                    <a
                                        href="https://www.linkedin.com/in/christopher-aponte/"
                                        target="_blank"
                                        title="LinkedIn"
                                        className="flex items-center justify-center size-9.5 rounded-lg p-1 bg-primary-400 cursor-pointer border border-b-4 border-primary-600 shadow-md hover:shadow-primary-600 dark:hover:shadow-primary-300 transition-all duration-300"
                                    >
                                        <Linkedin className="text-slate-100" />
                                    </a>
                                    <a
                                        href="https://github.com/DevRehpotsirhc"
                                        target="_blank"
                                        title="GitHub"
                                        className="flex items-center justify-center size-9.5 rounded-lg p-1 bg-black cursor-pointer border border-b-4 border-primary-900 shadow-md hover:shadow-slate-800 dark:hover:shadow-slate-400 transition-all duration-300"
                                    >
                                        <Github className="text-slate-100" />
                                    </a>
                                    <a
                                        href="https://wa.me/573194749249?text=Hi%20I%20come%20from%20your%20portfolio,%20I%20would%20be%20interested%20in%20talking%20to%20you"
                                        target="_blank"
                                        title="WhatsApp"
                                        className="flex items-center justify-center size-9.5 rounded-lg p-1 bg-lime-600 cursor-pointer border border-b-4 border-lime-900 shadow-md hover:shadow-lime-800 dark:hover:shadow-lime-500 transition-all duration-300"
                                    >
                                        <svg className="size-6 text-slate-100" fill="currentColor" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M26.576 5.363c-2.69-2.69-6.406-4.354-10.511-4.354-8.209 0-14.865 6.655-14.865 14.865 0 2.732 0.737 5.291 2.022 7.491l-0.038-0.070-2.109 7.702 7.879-2.067c2.051 1.139 4.498 1.809 7.102 1.809h0.006c8.209-0.003 14.862-6.659 14.862-14.868 0-4.103-1.662-7.817-4.349-10.507l0 0zM16.062 28.228h-0.005c-0 0-0.001 0-0.001 0-2.319 0-4.489-0.64-6.342-1.753l0.056 0.031-0.451-0.267-4.675 1.227 1.247-4.559-0.294-0.467c-1.185-1.862-1.889-4.131-1.889-6.565 0-6.822 5.531-12.353 12.353-12.353s12.353 5.531 12.353 12.353c0 6.822-5.53 12.353-12.353 12.353h-0zM22.838 18.977c-0.371-0.186-2.197-1.083-2.537-1.208-0.341-0.124-0.589-0.185-0.837 0.187-0.246 0.371-0.958 1.207-1.175 1.455-0.216 0.249-0.434 0.279-0.805 0.094-1.15-0.466-2.138-1.087-2.997-1.852l0.010 0.009c-0.799-0.74-1.484-1.587-2.037-2.521l-0.028-0.052c-0.216-0.371-0.023-0.572 0.162-0.757 0.167-0.166 0.372-0.434 0.557-0.65 0.146-0.179 0.271-0.384 0.366-0.604l0.006-0.017c0.043-0.087 0.068-0.188 0.068-0.296 0-0.131-0.037-0.253-0.101-0.357l0.002 0.003c-0.094-0.186-0.836-2.014-1.145-2.758-0.302-0.724-0.609-0.625-0.836-0.637-0.216-0.010-0.464-0.012-0.712-0.012-0.395 0.010-0.746 0.188-0.988 0.463l-0.001 0.002c-0.802 0.761-1.3 1.834-1.3 3.023 0 0.026 0 0.053 0.001 0.079l-0-0.004c0.131 1.467 0.681 2.784 1.527 3.857l-0.012-0.015c1.604 2.379 3.742 4.282 6.251 5.564l0.094 0.043c0.548 0.248 1.25 0.513 1.968 0.74l0.149 0.041c0.442 0.14 0.951 0.221 1.479 0.221 0.303 0 0.601-0.027 0.889-0.078l-0.031 0.004c1.069-0.223 1.956-0.868 2.497-1.749l0.009-0.017c0.165-0.366 0.261-0.793 0.261-1.242 0-0.185-0.016-0.366-0.047-0.542l0.003 0.019c-0.092-0.155-0.34-0.247-0.712-0.434z"></path>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </article>
                    </section>
                    <aside className="flex items-center space-x-4">
                        {links.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className={`hidden ${link.showClass} group relative`}
                            >
                                {link.name}
                                <span className="block h-0.5 w-full bg-current scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                            </a>
                        ))}

                        <button
                            ref={buttonRef}
                            onClick={() => setOpen(prev => !prev)}
                            className="min-[720px]:hidden min-[620px]:block relative size-6 cursor-pointer"
                        >
                            <Menu
                                className={`size-6 absolute inset-0 transition-all duration-200 transform 
                                    ${open
                                        ? "opacity-0 rotate-90 scale-0"
                                        : "opacity-100 rotate-0 scale-100"
                                    }`}
                            />

                            <X
                                className={`size-6 absolute inset-0 transition-all duration-200 transform 
                                    ${open
                                        ? "opacity-100 rotate-0 z-10 scale-100"
                                        : "opacity-0 -rotate-90 z-0 scale-0"
                                    }`}
                            />
                        </button>
                    </aside>

                </header>
                {open && (
                    <div ref={menu} className="absolute top-full right-0 mt-2 w-full min-[300px]:w-[34dvw] bg-background-light dark:bg-background-dark dark:border-dark/60 backdrop-blur-md shadow-lg p-3 flex flex-col space-y-4 overflow-x-auto border border-slate-300 border-b-10 rounded-b-2xl rounded-xl shadow-medium-500/30 dark:shadow-secundary-500/15">
                        <span className="text-xs font-light">
                            Access menu
                            <div className="flex mt-1 bg-slate-300 dark:bg-dark w-full h-px"></div>
                        </span>
                        {links.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className={`${link.hideClass} group relative w-full text-center`}
                            >
                                {link.name}
                                <span className="block h-0.5 w-full bg-current scale-x-0 transition-transform duration-300 group-hover:scale-x-50"></span>
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </main>
    )
}
