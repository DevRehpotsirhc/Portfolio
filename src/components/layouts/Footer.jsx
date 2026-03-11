import { Contact } from "./Contact"

export const Footer = () => {
    return (
        <section className="flex w-full h-70 mt-5">
            <footer className="absolute bg-primary-300 dark:bg-dark/60 py-10 w-full h-70 bottom-0 left-0 right-0 flex flex-col items-center justify-center gap-5">
                <h1 className="uppercase tracking-[2px] text-center text-sm min-[300px]:tracking-[6px] min-[380px]:text-xl min-[500px]:tracking-[8px] min-[550px]:tracking-[13px] font-semibold">Thanks for visiting</h1>
                <main className="flex flex-col w-full max-w-150 max-[380px]:max-w-120 items-center justify-between gap-5">
                    <article className="flex max-[380px]:flex-col gap-2">
                        <Contact />
                    </article>
                    <article className="flex flex-col">
                        <p className="flex items-center max-[300px]:text-sm text-slate-800 dark:text-slate-400">Created by Christopher Aponte</p>
                    </article>
                </main>
                <small className="relative w-[70dvw] max-w-100 flex items-center text-xs text-center text-slate-600 dark:text-slate-500">
                    <p>If you use code from this portfolio, please credit and reference this website or repository. Thx <span className="text-[13.8px] -mr-px">{"<"}</span>3</p>
                </small>
            </footer>
        </section>
    )
}