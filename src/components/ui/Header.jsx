import { useState, useEffect, useRef } from "react"
import { Cog, Menu, X } from "lucide-react"

export const Header = () => {
    const [open, setOpen] = useState(false)
    const menu = useRef(null)

    useEffect(() => {

    })

    return (
        <>
            <header
                className="fixed left-1/2 -translate-x-1/2 flex items-center justify-between sm:justify-between align-middle
                p-2 sm:px-5 font-semibold text-slate-600 max-[980px]:text-xs min-[1000px]:text-base h-[15%] max-h-12 top-2 w-[85%] max-w-300 rounded-xl z-20
                bg-background-light/50 backdrop-blur-md shadow-lg shadow-medium/30 border border-b-8 border-slate-300
                dark:bg-background-dark/70 dark:text-slate-400 dark:border-slate-800 dark:shadow-medium/15"
            >
                <section
                    className="group relative flex items-center justify-center align-middle gap-2"
                >
                    <Cog className="size-6 group-hover:rotate-180 transition-all transform duration-500" />
                    <span>Christopher Aponte</span>

                    <article className="absolute top-full left-0 w-full max-w-[50dvh] -z-10 opacity-0 -translate-y-3 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 ease-out"
                    >
                        <div className="flex flex-col mt-5 max-h-[25dvh] overflow-y-auto p-3">
                            <div>
                                <button className="border rounded-lg p-2">Prueba</button>
                                <button className="border rounded-lg p-2">Prueba</button>
                            </div>
                            <button className="border rounded-lg p-2">Prueba</button>
                            <button className="border rounded-lg p-2">Prueba</button>
                            <button className="border rounded-lg p-2">Prueba</button>
                            <button className="border rounded-lg p-2">Prueba</button>
                            <button className="border rounded-lg p-2">Prueba</button>
                            <button className="border rounded-lg p-2">Prueba</button>
                        </div>
                    </article>
                </section>
                <section
                    className="hidden sm:flex space-x-4"
                >
                    <a href="#" className="group relative">
                        About
                        <span className="block h-0.5 w-full bg-current scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                    </a>
                    <a href="#" className="group relative">
                        Experience
                        <span className="block h-0.5 w-full bg-current scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                    </a>
                    <a href="#" className="group relative">
                        Skills
                        <span className="block h-0.5 w-full bg-current scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                    </a>
                    <a href="#" className="group relative">
                        Projects
                        <span className="block h-0.5 w-full bg-current scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                    </a>
                </section>
            </header>
        </>
    )
}