import { useMemo, useRef } from "react"
import { useInView } from "../../hooks/useInView"
import { Card } from "../ui/Card"
import { portfolioLanguages as languagesData, ui } from "../../data"

export const Languages = () => {
    const languages = useMemo(() => languagesData, [])
    const listRef = useRef(null)
    const inView = useInView(listRef)

    return (
        <article className="game-panel rounded-2xl bg-white/80 p-5 backdrop-blur-sm dark:bg-dark/30">
            <h3 className="mb-4 text-lg font-semibold text-dark dark:text-white">{ui.skills.languages.title}</h3>

            <div ref={listRef} className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {languages.map((language) => {
                    const percentage = Math.round(language.proficiency * 100)

                    return (
                        <Card
                            key={language.language}
                            className="group min-h-34 items-start rounded-xl bg-slate-50/75 p-4 text-left dark:bg-dark/35"
                        >
                            <div className="mb-3 flex w-full items-start justify-between gap-3">
                                <div>
                                    <p className="text-base font-semibold text-slate-800 dark:text-slate-100">{language.language}</p>
                                    <p className="text-sm text-slate-600 dark:text-slate-300">{ui.skills.languages.levelPrefix} {language.level}</p>
                                </div>

                                <span className="game-chip rounded-full border-slate-300 border-b-slate-400 bg-slate-200 px-3 py-1 text-xs font-semibold tabular-nums text-slate-700 dark:border-dark dark:border-b-[#16334d] dark:bg-dark/60 dark:text-slate-200">
                                    {percentage}%
                                </span>
                            </div>

                            <div className="w-full">
                                <div className="mb-2 flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
                                    <span>{ui.skills.languages.proficiency}</span>
                                    <span translate="no">{language.level}</span>
                                </div>
                                <div className="game-bar h-3.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                                    <div
                                        className="proficiency-fill game-bar-fill h-full w-full rounded-full bg-medium-500 dark:bg-secundary-500"
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