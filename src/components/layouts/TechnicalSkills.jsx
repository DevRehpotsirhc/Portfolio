import { useState } from "react"
import { Card } from "../ui/Card"
import { Modal } from "../ui/Modal"
import { Reveal } from "../ui/Reveal"
import { technicalSkills, ui } from "../../data"

const getAssetUrl = (fileName) => new URL(`../../assets/${fileName}.svg`, import.meta.url).href

const tech = (name, asset, light, dark, keepOriginalColors = false) => ({
    name,
    iconPath: getAssetUrl(asset),
    colors: { light, dark },
    keepOriginalColors
})

const technicalCatalog = Object.fromEntries(
    Object.entries(technicalSkills).map(([group, items]) => [group, items.map((item) => tech(...item))])
)

const technicalMain = technicalCatalog.Main
const technicalCategories = Object.entries(technicalCatalog).filter(([groupName]) => groupName !== "Main")

const t = ui.skills.technical

export const TechnicalSkills = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const closeModal = () => setIsModalOpen(false)

    return (
        <>
            <article className="rounded-2xl border border-slate-300/80 bg-white/80 p-5 shadow-md shadow-slate-300/40 backdrop-blur-sm dark:border-dark/60 dark:bg-dark/30 dark:shadow-secundary-900/30">
                <header className="mb-4">
                    <h3 className="text-lg font-semibold text-dark dark:text-white">{t.title}</h3>
                </header>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
                    {technicalMain.map(({ name, iconPath, colors, keepOriginalColors }, index) => (
                        <Reveal key={name} className="flex" delay={Math.min(index * 60, 300)}>
                        <Card
                            className="group min-h-28 justify-center gap-2 rounded-xl px-3 py-4 transition-[translate,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-md"
                            lightModeBgColor={colors.light}
                            darkModeBgColor={colors.dark}
                        >
                            <img
                                src={iconPath}
                                alt={`${name} logo`}
                                className={`mb-1 size-14 object-contain transition-[scale] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 ${keepOriginalColors ? "" : "brightness-0 dark:invert"}`}
                                loading="lazy"
                            />
                            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200"><span translate="no">{name}</span></p>
                        </Card>
                        </Reveal>
                    ))}

                    <Reveal className="flex" delay={Math.min(technicalMain.length * 60, 300)}>
                    <Card
                        as="button"
                        type="button"
                        title={t.showAllTitle}
                        onClick={() => setIsModalOpen(true)}
                        className="group relative flex w-full min-h-25 items-center justify-center text-center transition-all duration-200 hover:-translate-y-0.5 cursor-pointer show-all-hint"
                    >
                        <span className="show-all-hand" aria-hidden="true">
                            <svg viewBox="0 0 64 78" xmlns="http://www.w3.org/2000/svg" focusable="false">
                                <g fill="currentColor">
                                    <rect x="6" y="34" width="54" height="42" rx="17" />
                                    <rect x="2" y="46" width="13" height="24" rx="6.5" transform="rotate(-22 8.5 58)" />
                                    <rect x="8" y="4" width="12" height="46" rx="6" />
                                    <rect x="22" y="12" width="12" height="38" rx="6" />
                                    <rect x="36" y="17" width="12" height="33" rx="6" />
                                    <rect x="50" y="24" width="11" height="27" rx="5.5" />
                                </g>
                            </svg>
                            <span className="show-hand-tip" />
                        </span>
                        <p className="text-xl show-all-tap">{t.showAll}</p>
                    </Card>
                    </Reveal>
                </div>
            </article>

            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                subtitle={t.modalSubtitle}
                title={t.modalTitle}
                ariaLabel={t.modalTitle}
            >
                {technicalCategories.map(([groupName, stack]) => (
                    <section key={groupName}>
                        <h5 className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-slate-700 dark:text-slate-200">{groupName}</h5>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                            {stack.map(({ name, iconPath, colors, keepOriginalColors }) => (
                                <Card
                                    key={`${groupName}-${name}`}
                                    className="min-h-24 justify-center gap-2 rounded-xl px-3 py-3"
                                    lightModeBgColor={colors.light}
                                    darkModeBgColor={colors.dark}
                                >
                                    <img
                                        src={iconPath}
                                        alt={`${name} logo`}
                                        className={`size-12 object-contain ${keepOriginalColors ? "" : "brightness-0 dark:invert"}`}
                                        loading="lazy"
                                    />
                                    <p className="text-xs font-medium text-slate-700 dark:text-slate-200"><span translate="no">{name}</span></p>
                                </Card>
                            ))}
                        </div>
                    </section>
                ))}
            </Modal>
        </>
    )
}
