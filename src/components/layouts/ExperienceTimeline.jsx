import { useRef } from "react"
import { Tag } from "../ui/Tag"
import { Reveal } from "../ui/Reveal"
import { useScrollProgress } from "../../hooks/useScrollProgress"
import { experience, ui } from "../../data"

const normalizeTimeline = (data) => {
    if (!data || typeof data !== "object") {
        return []
    }

    return Object.entries(data)
        .map(([order, item]) => ({
            order: Number(order),
            ...item
        }))
        .filter((item) => Number.isFinite(item.order))
        .sort((a, b) => b.order - a.order)
}

export const ExperienceTimeline = ({ data = experience }) => {
    const experiences = normalizeTimeline(data)
    const trackRef = useRef(null)
    useScrollProgress(trackRef)

    return (
        <section id="experience" style={{ "--render-estimate": "1050px" }} className="defer-render relative mx-auto w-full max-w-7xl px-4 py-12 sm:px-8">
            <div className="mb-8 mt-14 flex flex-col gap-2">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-medium-500 dark:text-secundary-300">{ui.experience.eyebrow}</p>
                <h2 className="text-2xl font-semibold text-dark dark:text-white sm:text-3xl">{ui.experience.title}</h2>
            </div>

            <div ref={trackRef} className="relative ml-3 pl-7 sm:ml-4 sm:pl-10 md:ml-0 md:pl-0">
                <span className="absolute left-0 top-0 h-full w-0.5 bg-linear-to-b from-transparent via-medium-300/70 to-transparent dark:via-secundary-700/70 md:left-1/2 md:-translate-x-1/2"></span>
                {/* Progress line: draws down the track as you read */}
                <span aria-hidden="true" className="timeline-progress absolute left-0 top-0 h-full w-0.5 rounded-full bg-linear-to-b from-medium-500 via-medium-500 to-medium-500/0 dark:from-secundary-400 dark:via-secundary-400 dark:to-secundary-400/0 md:left-1/2 md:-translate-x-1/2"></span>

                {experiences.map((item, index) => {
                    const isLeft = index % 2 === 0

                    return (
                        <Reveal as="article" from={isLeft ? "left" : "right"} key={`${item.order}-${item.company}`} className="relative mb-8 last:mb-0 md:grid md:grid-cols-2 md:gap-10">
                            <span className="timeline-dot absolute left-0 top-6 size-3 -translate-x-[0.41rem] rounded-full border-2 border-white bg-medium-500 shadow-sm dark:border-background-dark dark:bg-secundary-400 md:left-1/2 md:-translate-x-1/2"></span>

                            <div className={`${isLeft ? "md:col-start-1 md:mr-8" : "md:col-start-2 md:ml-8"}`}>
                                <div className="rounded-xl border border-slate-300/80 bg-white/80 p-4 shadow-md shadow-slate-300/40 backdrop-blur-sm dark:border-dark/60 dark:bg-dark/30 dark:shadow-secundary-900/30">
                                    <div className="mb-2 flex flex-wrap items-center gap-2">
                                        <span className="rounded-md bg-medium-100 px-2 py-1 text-xs font-semibold text-medium-700 dark:bg-secundary-900 dark:text-secundary-200">{item.years}</span>
                                        <h3 className="text-lg font-semibold text-dark dark:text-white" translate="no">{item.company}</h3>
                                    </div>

                                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{item.position}</p>
                                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.desc}</p>

                                    {item.kpis?.length ? (
                                        <dl aria-label={ui.experience.kpisLabel} className="mt-4 grid grid-cols-1 gap-2 min-[420px]:grid-cols-3">
                                            {item.kpis.map((kpi) => (
                                                <div key={`${item.company}-${kpi.label}`} title={kpi.detail} className="flex flex-col-reverse rounded-lg border border-medium-200/70 bg-medium-50/60 px-3 py-2 dark:border-secundary-800/70 dark:bg-secundary-950/40">
                                                    <dt className="text-xs leading-4 text-slate-600 dark:text-slate-300">
                                                        {kpi.label}
                                                        {kpi.detail ? <span className="mt-0.5 block text-[11px] text-slate-500 dark:text-slate-400">{kpi.detail}</span> : null}
                                                    </dt>
                                                    <dd className="text-lg font-semibold tabular-nums text-medium-700 dark:text-secundary-200">{kpi.value}</dd>
                                                </div>
                                            ))}
                                        </dl>
                                    ) : null}

                                    <ul className="mt-4 flex flex-wrap gap-2">
                                        {(item.technologies || []).map((tech) => (
                                            <Tag key={`${item.company}-${tech}`}><span translate="no">{tech}</span></Tag>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </Reveal>
                    )
                })}
            </div>
        </section>
    )
}
