import { useEffect, useMemo, useRef, useState } from "react"
import { Card } from "../ui/Card"
import { Reveal } from "../ui/Reveal"
import { softSkills as softSkillsData, ui } from "../../data"

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
        <Card className="group @container min-h-40 w-full items-start overflow-hidden rounded-xl bg-slate-50/75 p-4 text-left dark:bg-dark/35">
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
        <article className="game-panel rounded-2xl bg-white/80 p-5 backdrop-blur-sm dark:bg-dark/30">
            <header className="mb-4">
                <h3 className="text-lg font-semibold text-dark dark:text-white">{ui.skills.soft.title}</h3>
            </header>

            <div className="grid grid-cols-2 gap-3 max-[324.98px]:grid-cols-1 xl:grid-cols-3">
                {softSkills.map(([name, content], index) => (
                    <Reveal key={name} className="flex" delay={Math.min(index * 60, 300)}>
                        <SoftSkillCard name={name} content={content} />
                    </Reveal>
                ))}
            </div>
        </article>
    )
}
