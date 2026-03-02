import { useState, useEffect, useRef } from "react"
import { Cog, Menu, X } from "lucide-react"
import { Button } from "./Button"

export const Header = () => {
    const [open, setOpen] = useState(false)

    const menu = useRef(null)
    const buttonRef = useRef(null)

    const links = [
        { name: "About", href: "#", showClass: "min-[420px]:block", hideClass: "min-[420px]:hidden" },
        { name: "Experience", href: "#", showClass: "min-[520px]:block", hideClass: "min-[520px]:hidden" },
        { name: "Skills", href: "#", showClass: "min-[620px]:block", hideClass: "min-[620px]:hidden" },
        { name: "Projects", href: "#", showClass: "min-[720px]:block", hideClass: "min-[720px]:hidden" },
    ]

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                menu.current &&
                !menu.current.contains(event.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target)
            ) {
                setOpen(false)
            }
        }

        if (open) {
            document.addEventListener("mousedown", handleClickOutside)
        }

        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [open])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                menu.current &&
                !menu.current.contains(event.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target)
            ) {
                setOpen(false)
            }
        }

        if (open) {
            document.addEventListener("mousedown", handleClickOutside)
        }

        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [open])

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 720) {
                setOpen(false)
            }
        }

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (
        <div className="fixed left-1/2 -translate-x-1/2 top-2 w-[85%] max-w-300 z-20 dark:text-slate-400 text-slate-600 font-semibold max-[980px]:text-xs min-[1000px]:text-base">
            <header
                className="flex items-center justify-between sm:justify-between align-middle
                p-2 sm:px-5 h-[15%] max-h-12 top-2 rounded-xl
                bg-background-light/70 backdrop-blur-md shadow-lg shadow-medium-500/30 border border-b-8 border-slate-300
                dark:bg-background-dark/70 dark:border-slate-600 dark:shadow-secundary-500/30"
            >
                <section
                    className="group relative flex items-center justify-center align-middle gap-2"
                >
                    <Cog className="size-6 group-hover:rotate-180 transition-all transform duration-500" />
                    <span>Christopher Aponte</span>

                    <article className="absolute top-full left-0 w-full max-w-[50dvh] -z-10 opacity-0 -translate-y-3 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 ease-out"
                    >
                        <div className="flex flex-col mt-3 max-h-[25dvh] overflow-y-auto p-2">
                            <Button insideStyle="text-slate-600 dark:text-slate-400" inside="Download CV" />
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
                <div ref={menu} className="absolute top-full right-0 mt-2 w-[35%] bg-background-light/70 dark:bg-background-dark/70 dark:border-slate-700 backdrop-blur-md shadow-lg p-3 flex flex-col space-y-4 overflow-x-auto border border-slate-300 rounded-xl">
                    <span className="text-xs font-light">
                        Access menu
                        <div className="flex mt-1 bg-slate-300 dark:bg-slate-700 w-full h-px"></div>
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
    )
}
