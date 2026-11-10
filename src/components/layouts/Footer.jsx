import { Contact } from "./Contact"
import { ui } from "../../data"

const t = ui.footer

export const Footer = () => {
    return (
        <footer style={{ "--render-estimate": "700px" }} className="defer-render relative bg-white/80 dark:bg-dark/60 py-10 w-full flex flex-col items-center justify-center gap-5 mt-5 border-t-slate-200 dark:border-t-dark">
            <section className="sm:mt-8 relative w-[90svw] max-w-5xl text-xs leading-relaxed text-slate-600 dark:text-slate-400 text-left">
                <div className="grid grid-cols-1 gap-5 min-[640px]:grid-cols-3">
                    {t.disclaimers.map((item) => (
                        <article key={item.title} className="flex flex-col gap-1.5">
                            <h4 className="font-semibold uppercase tracking-wide text-slate-700 dark:text-slate-300">{item.title}</h4>
                            <p>{item.text}</p>
                        </article>
                    ))}
                </div>
            </section>
            <h1 className="mt-8 sm:mt-15 uppercase tracking-[2px] text-center text-sm min-[300px]:tracking-[6px] min-[380px]:text-xl min-[500px]:tracking-[8px] min-[587px]:tracking-[13px] font-semibold text-dark dark:text-white">{t.thanks}</h1>
            <div className="flex flex-col w-full max-w-150 max-[380px]:max-w-120 items-center justify-between gap-5">
                <article className="flex max-[380px]:flex-col gap-2">
                    <Contact />
                </article>
                <article className="flex flex-col">
                    <p className="flex items-center max-[300px]:text-sm text-slate-800 dark:text-slate-400">{t.createdBy}</p>
                </article>
            </div>
            <small className="relative w-[70svw] max-w-100 flex items-center text-xs text-center text-slate-600 dark:text-slate-500">
                <p>{t.credits} <span className="text-[13.8px] -mr-px">{"<"}</span>3</p>
            </small>
        </footer>
    )
}