import { useMemo } from "react"
import { Brain, Crown, RefreshCw, Rocket, Scale, Users } from "lucide-react"
import { Card } from "../ui/Card"

const softSkillsData = {
    "Leadership": {
        icon: Crown,
        iconClassName: "bg-teal-100 text-teal-700 ring-teal-300/70 dark:bg-teal-900/40 dark:text-teal-200 dark:ring-teal-500/50",
        desc: "Ability to guide, motivate, and support teams to achieve shared goals while fostering collaboration and accountability."
    },
    "Adaptability": {
        icon: RefreshCw,
        iconClassName: "bg-sky-100 text-sky-700 ring-sky-300/70 dark:bg-sky-900/40 dark:text-sky-200 dark:ring-sky-500/50",
        desc: "Capacity to adjust quickly to changing environments, priorities, and challenges while maintaining productivity."
    },
    "Proactivity": {
        icon: Rocket,
        iconClassName: "bg-rose-100 text-rose-700 ring-rose-300/70 dark:bg-rose-900/40 dark:text-rose-200 dark:ring-rose-500/50",
        desc: "Initiative to identify opportunities, solve problems, and take action before issues arise without waiting for direction."
    },
    "Strategic Thinking": {
        icon: Brain,
        iconClassName: "bg-violet-100 text-violet-700 ring-violet-300/70 dark:bg-violet-900/40 dark:text-violet-200 dark:ring-violet-500/50",
        desc: "Ability to analyze situations, anticipate future outcomes, and develop effective long-term plans aligned with objectives."
    },
    "Teamwork": {
        icon: Users,
        iconClassName: "bg-blue-100 text-blue-700 ring-blue-300/70 dark:bg-blue-900/40 dark:text-blue-200 dark:ring-blue-500/50",
        desc: "Ability to collaborate effectively with others, share knowledge, and contribute to a positive and productive team environment."
    },
    "Decision Making": {
        icon: Scale,
        iconClassName: "bg-amber-100 text-amber-700 ring-amber-300/70 dark:bg-amber-900/40 dark:text-amber-200 dark:ring-amber-500/50",
        desc: "Ability to evaluate information, assess risks, and make timely, informed decisions that support organizational goals."
    }
}

export const SoftSkills = () => {
    const softSkills = useMemo(() => Object.entries(softSkillsData), [])

    return (
        <article className="rounded-2xl border border-slate-300/80 bg-white/80 p-5 shadow-md shadow-slate-300/40 backdrop-blur-sm dark:border-dark/60 dark:bg-dark/30 dark:shadow-secundary-900/30">
            <h3 className="mb-4 text-lg font-semibold text-dark dark:text-white">Soft skills</h3>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                {softSkills.map(([name, content]) => {
                    const Icon = content.icon

                    return (
                        <Card
                            key={name}
                            className="group min-h-40 items-start rounded-xl border-slate-300/80 bg-slate-50/75 p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-slate-300/40 dark:border-dark/70 dark:bg-dark/35 dark:hover:shadow-secundary-900/30"
                        >
                            <div className="mb-3 flex items-center gap-3">
                                <div className={`grid size-10 place-items-center rounded-md ring-1 ${content.iconClassName}`}>
                                    <Icon size={20} strokeWidth={2.2} aria-hidden="true" />
                                </div>
                                <p className="text-base font-semibold text-slate-800 dark:text-slate-100">{name}</p>
                            </div>
                            <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{content.desc}</p>
                        </Card>
                    )
                })}
            </div>
        </article>
    )
}
