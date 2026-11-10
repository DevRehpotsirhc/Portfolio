import { useMemo, useRef } from "react"
import { useInView } from "../../hooks/useInView"
import { Card } from "../ui/Card"
import { portfolioLanguages as languagesData, ui } from "../../data"

export const Languages = () => {
    const languages = useMemo(() => languagesData, [])
    const listRef = useRef(null)
    const inView = useInView(listRef)

    return (
        <article className="rounded-2xl border border-slate-300/80 bg-white/80 p-5 shadow-md shadow-slate-300/40 backdrop-blur-sm dark:border-dark/60 dark:bg-dark/30 dark:shadow-secundary-900/30">
            <h3 className="mb-4 text-lg font-semibold text-dark dark:text-white">{ui.skills.languages.title}</h3>

            <div ref={listRef} className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {languages.map((language) => {
                    const percentage = Math.round(language.proficiency * 100)

                    return (
                        <Card
                            key={language.language}
                            className="group min-h-34 items-start rounded-xl border-slate-300/80 bg-slate-50/75 p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-slate-300/40 dark:border-dark/70 dark:bg-dark/35 dark:hover:shadow-secundary-900/30"
                        >
                            <div className="mb-3 flex w-full items-start justify-between gap-3">
                                <div>
                                    <p className="text-base font-semibold text-slate-800 dark:text-slate-100">{language.language}</p>
                                    <p className="text-sm text-slate-600 dark:text-slate-300">{ui.skills.languages.levelPrefix} {language.level}</p>
                                </div>

                                <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-dark/60 dark:text-slate-200">
                                    {percentage}%
                                </span>
                            </div>

                            <div className="w-full">
                                <div className="mb-2 flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
                                    <span>{ui.skills.languages.proficiency}</span>
                                    <span translate="no">{language.level}</span>
                                </div>
                                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                                    <div
                                        className="proficiency-fill h-full w-full rounded-full bg-medium-500 dark:bg-secundary-500"
                                        style={{ "--fill-gap": `${inView ? 100 - percentage : 100}%` }}
                                    />
                                </div>
                            </div>
                        </Card>
                    )
                })}
            </div>
        </article>
    )
}