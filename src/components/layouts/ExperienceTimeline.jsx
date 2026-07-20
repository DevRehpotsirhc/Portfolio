import { Tag } from "../ui/Tag"

const timelineData = {
    3: {
        company: "Expertos Consulting",
        years: "2024 - 2026",
        position: "Fullstack developer",
        desc: "Web applications, financial dashboards, workflow automations, mass reporting tools, and software testing were developed in a collaborative team environment.",
        technologies: ["Python", "Django Rest Framework", "JavaScript", "React", "Linux", "Docker", "GitHub"]
    },
    2: {
        company: "IBM",
        years: "2025",
        position: "National AI Competition",
        desc: "Winner of IBM's national AI model training competition, achieving the highest score in the category. Recognized as the only participant to validate the solution through real-world software testing.",
        technologies: ["PyTorch", "Jupyter Notebook", "Docker", "sklearn", "Google Colab"]
    },
    1: {
        company: "SENA",
        years: "2024",
        position: "Monitor",
        desc: "Office automations were developed, database processes were optimized, and dashboard components for administrative tasks were created.",
        technologies: ["Visual Basic", "Excel", "C#"]
    }
}

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

export const ExperienceTimeline = ({ data = timelineData }) => {
    const experiences = normalizeTimeline(data)

    return (
        <section id="experience" className="relative mx-auto w-full max-w-6xl px-4 py-12 sm:px-8">
            <div className="mb-8 mt-14 flex flex-col gap-2">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-medium-500 dark:text-secundary-300">Career path</p>
                <h2 className="text-2xl font-semibold text-dark dark:text-white sm:text-3xl">Experience Timeline</h2>
            </div>

            <div className="relative ml-3 pl-7 sm:ml-4 sm:pl-10 md:ml-0 md:pl-0">
                <span className="absolute left-0 top-0 h-full w-0.5 bg-linear-to-b from-transparent via-medium-300/70 to-transparent dark:via-secundary-700/70 md:left-1/2 md:-translate-x-1/2"></span>

                {experiences.map((item, index) => {
                    const isLeft = index % 2 === 0

                    return (
                        <article key={`${item.order}-${item.company}`} className="relative mb-8 last:mb-0 md:grid md:grid-cols-2 md:gap-10">
                            <span className="absolute left-0 top-6 size-3 -translate-x-[0.41rem] rounded-full border-2 border-white bg-medium-500 shadow-sm dark:border-background-dark dark:bg-secundary-400 md:left-1/2 md:-translate-x-1/2"></span>

                            <div className={`${isLeft ? "md:col-start-1 md:mr-8" : "md:col-start-2 md:ml-8"}`}>
                                <div className="rounded-xl border border-slate-300/80 bg-white/80 p-4 shadow-md shadow-slate-300/40 backdrop-blur-sm dark:border-dark/60 dark:bg-dark/30 dark:shadow-secundary-900/30">
                                    <div className="mb-2 flex flex-wrap items-center gap-2">
                                        <span className="rounded-md bg-medium-100 px-2 py-1 text-xs font-semibold text-medium-700 dark:bg-secundary-900 dark:text-secundary-200">{item.years}</span>
                                        <h3 className="text-lg font-semibold text-dark dark:text-white" translate="no">{item.company}</h3>
                                    </div>

                                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{item.position}</p>
                                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.desc}</p>

                                    <ul className="mt-4 flex flex-wrap gap-2">
                                        {(item.technologies || []).map((tech) => (
                                            <Tag key={`${item.company}-${tech}`}><span translate="no">{tech}</span></Tag>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </article>
                    )
                })}
            </div>
        </section>
    )
}
