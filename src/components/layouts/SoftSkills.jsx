import { useEffect, useMemo, useRef, useState } from "react"
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

const SoftSkillCard = ({ name, content }) => {
    const Icon = content.icon
    const descRef = useRef(null)
    const [showTop, setShowTop] = useState(false)
    const [showBottom, setShowBottom] = useState(false)

    const checkScroll = () => {
        const el = descRef.current
        if (!el) return

        setShowTop(el.scrollTop > 0)
        setShowBottom(el.scrollTop + el.clientHeight < el.scrollHeight)
    }

    useEffect(() => {
        const el = descRef.current
        if (!el) return

        checkScroll()
        const observer = new ResizeObserver(checkScroll)
        observer.observe(el)
        window.addEventListener("resize", checkScroll)

        return () => {
            observer.disconnect()
            window.removeEventListener("resize", checkScroll)
        }
    }, [content.desc])

    const isMobile = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches
    const fadeMask = `linear-gradient(to bottom, transparent 0, #000 ${showTop ? "1.25rem" : "0px"}, #000 calc(100% - ${showBottom ? "1.25rem" : "0px"}), transparent 100%)`

    return (
        <Card className="group @container min-h-40 w-full items-start overflow-hidden rounded-xl border-slate-300/80 bg-slate-50/75 p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-slate-300/40 dark:border-dark/70 dark:bg-dark/35 dark:hover:shadow-secundary-900/30">
            <div className="flex w-full min-w-0 flex-wrap items-center gap-3">
                <div className={`grid shrink-0 place-items-center rounded-md ring-1 size-[clamp(2rem,13cqi,2.5rem)] ${content.iconClassName}`}>
                    <Icon className="size-[clamp(1rem,8cqi,1.25rem)]" strokeWidth={2.2} aria-hidden="true" />
                </div>
                <p className="min-w-min flex-1 text-[clamp(0.75rem,11cqi,1rem)] font-semibold leading-snug text-slate-800 dark:text-slate-100">{name}</p>
            </div>

            <div className="relative mt-2 w-full">
                <p
                    ref={descRef}
                    onScroll={checkScroll}
                    style={{ WebkitMaskImage: fadeMask, maskImage: fadeMask }}
                    className={`max-h-24 pr-1 text-sm leading-6 text-slate-600 dark:text-slate-300 ${
                        isMobile ? "overflow-y-auto" : "overflow-hidden hover:overflow-y-auto"
                    }`}
                >
                    {content.desc}
                </p>
            </div>
        </Card>
    )
}

export const SoftSkills = () => {
    const softSkills = useMemo(() => Object.entries(softSkillsData), [])

    return (
        <article className="rounded-2xl border border-slate-300/80 bg-white/80 p-5 shadow-md shadow-slate-300/40 backdrop-blur-sm dark:border-dark/60 dark:bg-dark/30 dark:shadow-secundary-900/30">
            <header className="mb-4">
                <h3 className="text-lg font-semibold text-dark dark:text-white">Soft skills</h3>
            </header>

            <div className="grid grid-cols-2 gap-3 max-[324.98px]:grid-cols-1 xl:grid-cols-3">
                {softSkills.map(([name, content]) => (
                    <SoftSkillCard key={name} name={name} content={content} />
                ))}
            </div>
        </article>
    )
}
