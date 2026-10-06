import { Contact } from "./Contact"

export const Footer = () => {
    return (
        <footer className="relative bg-white/80 dark:bg-dark/60 py-10 w-full flex flex-col items-center justify-center gap-5 mt-5 border-t-slate-200 dark:border-t-dark">
            <h1 className="uppercase tracking-[2px] text-center text-sm min-[300px]:tracking-[6px] min-[380px]:text-xl min-[500px]:tracking-[8px] min-[550px]:tracking-[13px] font-semibold text-dark dark:text-white">Thanks for visiting</h1>
            <main className="flex flex-col w-full max-w-150 max-[380px]:max-w-120 items-center justify-between gap-5">
                <article className="flex max-[380px]:flex-col gap-2">
                    <Contact />
                </article>
                <article className="flex flex-col">
                    <p className="flex items-center max-[300px]:text-sm text-slate-800 dark:text-slate-400">Created by Christopher Aponte</p>
                </article>
            </main>
            <section className="relative w-[90svw] max-w-5xl text-xs leading-relaxed text-slate-600 dark:text-slate-400 text-left">
                <p className="mb-3 font-semibold uppercase tracking-wide text-slate-700 dark:text-slate-300">Disclaimer</p>
                <div className="grid grid-cols-1 gap-5 min-[640px]:grid-cols-3">
                    <article className="flex flex-col gap-1.5">
                        <h4 className="font-semibold uppercase tracking-wide text-slate-700 dark:text-slate-300">Trademarks, logos & icons</h4>
                        <p>
                            All trademarks, brand names, logos, and technology icons shown in this portfolio belong to their respective owners. They are used solely to identify the tools, technologies, and services referenced, for informative purposes only.
                        </p>
                    </article>
                    <article className="flex flex-col gap-1.5">
                        <h4 className="font-semibold uppercase tracking-wide text-slate-700 dark:text-slate-300">Projects, screenshots & images</h4>
                        <p>
                            Screenshots, images, and any project-related material belong to their respective owners and clients. They are published only to illustrate the work I have done or participated in, without claiming ownership of the brands or products featured.
                        </p>
                    </article>
                    <article className="flex flex-col gap-1.5">
                        <h4 className="font-semibold uppercase tracking-wide text-slate-700 dark:text-slate-300">Purpose & removal requests</h4>
                        <p>
                            This portfolio is non-commercial and informational; no affiliation, sponsorship, or endorsement is implied. If you are the owner of any asset and have a request or concern, contact me
                            and I will promptly remove or update it.
                        </p>
                    </article>
                </div>
            </section>
            <small className="relative w-[70svw] max-w-100 flex items-center text-xs text-center text-slate-600 dark:text-slate-500">
                <p>If you use code from this portfolio, please credit and reference this website or repository. Thx <span className="text-[13.8px] -mr-px">{"<"}</span>3</p>
            </small>
        </footer>
    )
}