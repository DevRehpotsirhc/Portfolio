import { useMemo } from "react"
import { Card } from "../ui/Card"

const languagesData = [
    {
        language: "English",
        proficiency: 0.71,
        level: "B2"
    },
    {
        language: "Spanish",
        proficiency: 1,
        level: "Native"
    }
]

export const Languages = () => {
    const languages = useMemo(() => languagesData, [])

    return (
        <article className="rounded-2xl border border-slate-300/80 bg-white/80 p-5 shadow-md shadow-slate-300/40 backdrop-blur-sm dark:border-dark/60 dark:bg-dark/30 dark:shadow-secundary-900/30">
            <h3 className="mb-4 text-lg font-semibold text-dark dark:text-white">Languages</h3>

            <div className="grid grid-cols-2 gap-3 max-[324.98px]:grid-cols-1">
                {languages.map((language) => {
                    const percentage = Math.round(language.proficiency * 100)

                    return (
                        <Card
                            key={language.language}
                            className="group @container min-h-34 items-start rounded-xl border-slate-300/80 bg-slate-50/75 p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-slate-300/40 dark:border-dark/70 dark:bg-dark/35 dark:hover:shadow-secundary-900/30"
                        >
                            <div className="mb-3 flex w-full items-start justify-between gap-3">
                                <p className="min-w-0 whitespace-nowrap text-[clamp(0.72rem,11cqi,1rem)] font-semibold text-slate-800 dark:text-slate-100">{language.language}</p>

                                <span className="shrink-0 rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-dark/60 dark:text-slate-200">
                                    {percentage}%
                                </span>
                            </div>

                            <p className="mb-3 w-full whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">Level {language.level}</p>

                            <div className="w-full">
                                <div className="mb-2 flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
                                    <span>Proficiency</span>
                                    <span translate="no">{language.level}</span>
                                </div>
                                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                                    <div
                                        className="h-full rounded-full bg-medium-500 dark:bg-secundary-500 transition-all duration-300"
                                        style={{ width: `${percentage}%` }}
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