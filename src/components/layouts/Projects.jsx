import { useEffect, useMemo, useRef, useState } from "react"
import { Modal } from "../ui/Modal"
import { ArrowControlButton } from "../ui/ArrowControlButton"
import { ProjectModalContent } from "./ProjectModalContent"
import expertosInventarioData from "../../assets/projects/Expertos Inventario/Expertos Inventario"
import gestionData from "../../assets/projects/Gestion/Gestion"
import sentimentAnalysisData from "../../assets/projects/Sentiment Analysis/Sentiment Analysis"
import taskManData from "../../assets/projects/TaskMan/TaskMan"
import validadorCrcData from "../../assets/projects/Validador CRC/Validador CRC"

const AUTO_SLIDE_SECONDS = 6

const projectsData = {
    ...expertosInventarioData,
    ...sentimentAnalysisData,
    ...taskManData,
    ...validadorCrcData,
    ...gestionData
}

const projectEntries = Object.entries(projectsData).map(([name, config]) => ({
    ...config,
    name,
    slides: Object.entries(config.slides).map(([image, description], index) => ({
        image,
        description,
        id: `${config.id}-slide-${index}`
    }))
}))

export const Projects = () => {
    const sectionRef = useRef(null)
    const [projectIndex, setProjectIndex] = useState(0)
    const [slideByProject, setSlideByProject] = useState({})
    const [selectedProject, setSelectedProject] = useState(null)
    const [manualDelayBoost, setManualDelayBoost] = useState(false)
    const [isAutoSlidePaused, setIsAutoSlidePaused] = useState(false)
    const [isSectionVisible, setIsSectionVisible] = useState(false)
    const [isWindowFocused, setIsWindowFocused] = useState(
        typeof document !== "undefined" ? document.visibilityState === "visible" : true
    )

    const selected = projectEntries[projectIndex]
    const currentSlideIndex = slideByProject[selected.id] ?? 0
    const currentSlide = selected.slides[currentSlideIndex]
    const isModalOpen = Boolean(selectedProject)

    const progressText = useMemo(() => {
        return `${projectIndex + 1} / ${projectEntries.length}`
    }, [projectIndex])

    useEffect(() => {
        const element = sectionRef.current
        if (!element || typeof IntersectionObserver === "undefined") {
            setIsSectionVisible(true)
            return undefined
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsSectionVisible(entry.isIntersecting)
            },
            { threshold: 0.35 }
        )

        observer.observe(element)

        return () => {
            observer.disconnect()
        }
    }, [])

    useEffect(() => {
        const onFocus = () => {
            setIsWindowFocused(true)
        }

        const onBlur = () => {
            setIsWindowFocused(false)
        }

        const onVisibilityChange = () => {
            setIsWindowFocused(document.visibilityState === "visible")
        }

        window.addEventListener("focus", onFocus)
        window.addEventListener("blur", onBlur)
        document.addEventListener("visibilitychange", onVisibilityChange)

        return () => {
            window.removeEventListener("focus", onFocus)
            window.removeEventListener("blur", onBlur)
            document.removeEventListener("visibilitychange", onVisibilityChange)
        }
    }, [])

    useEffect(() => {
        if (isAutoSlidePaused || !isSectionVisible || !isWindowFocused || isModalOpen) {
            return undefined
        }

        const durationSeconds = selected.slideDurationSeconds ?? AUTO_SLIDE_SECONDS
        const extraSeconds = manualDelayBoost ? 1 : 0

        const timeout = window.setTimeout(() => {
            goToSlide(selected.id, selected.slides.length, "next")
            setManualDelayBoost(false)
        }, (Math.max(durationSeconds, 1) + extraSeconds) * 1000)

        return () => {
            window.clearTimeout(timeout)
        }
    }, [currentSlideIndex, isAutoSlidePaused, isSectionVisible, isWindowFocused, isModalOpen, manualDelayBoost, selected.id, selected.slideDurationSeconds, selected.slides.length])

    const focusProjectsSection = () => {
        const projectsSection = document.getElementById("headerContent")
        projectsSection?.scrollIntoView({ behavior: "smooth", block: "start" })
    }

    const goToProject = (direction) => {
        setManualDelayBoost(false)
        setProjectIndex((prev) => {
            if (direction === "next") {
                return (prev + 1) % projectEntries.length
            }
            return (prev - 1 + projectEntries.length) % projectEntries.length
        })
        focusProjectsSection()
    }

    const goToSlide = (projectId, slidesLength, direction) => {
        const shouldAdvanceProject = (
            direction === "next" &&
            projectId === selected.id &&
            currentSlideIndex === slidesLength - 1
        )
        const shouldGoToPreviousProject = (
            direction === "prev" &&
            projectId === selected.id &&
            currentSlideIndex === 0
        )

        if (shouldGoToPreviousProject) {
            const previousProjectIndex = (projectIndex - 1 + projectEntries.length) % projectEntries.length
            const previousProjectId = projectEntries[previousProjectIndex].id

            setSlideByProject((prev) => ({
                ...prev,
                [projectId]: 0,
                [previousProjectId]: 0
            }))

            setManualDelayBoost(false)
            setProjectIndex(previousProjectIndex)
            return
        }

        setSlideByProject((prev) => {
            const active = prev[projectId] ?? 0
            const nextIndex = direction === "next"
                ? (active + 1) % slidesLength
                : (active - 1 + slidesLength) % slidesLength

            return {
                ...prev,
                [projectId]: nextIndex
            }
        })

        if (shouldAdvanceProject) {
            setManualDelayBoost(false)
            setProjectIndex((prev) => (prev + 1) % projectEntries.length)
        }
    }

    const quickSelectProject = (index) => {
        setManualDelayBoost(false)
        setProjectIndex(index)
        focusProjectsSection()
    }

    const handleManualSlideChange = (direction, event) => {
        event.stopPropagation()
        setManualDelayBoost(true)
        goToSlide(selected.id, selected.slides.length, direction)
    }

    const openProjectDetails = () => {
        setIsAutoSlidePaused(true)
        setSelectedProject(selected)
    }

    const closeProjectDetails = () => {
        setSelectedProject(null)
        setIsAutoSlidePaused(false)
    }

    return (
        <section ref={sectionRef} id="projects" className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-8">
            <div id="headerContent" className="mb-8 mt-14 flex flex-col gap-2">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-medium-500 dark:text-secundary-300">Featured work</p>
                <h2 className="text-2xl font-semibold text-dark dark:text-white sm:text-3xl">Projects</h2>
            </div>

            <div className="relative pb-16">
                <article className="rounded-3xl border border-slate-300/80 bg-white/80 p-5 shadow-md shadow-slate-300/40 backdrop-blur-sm dark:border-dark/60 dark:bg-dark/30 dark:shadow-secundary-900/30">
                    <header className="mb-3 flex items-center justify-end gap-3 px-1">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-medium-700 dark:text-secundary-300">{progressText}</p>
                    </header>

                <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_16rem]">
                    <article
                        role="button"
                        tabIndex={0}
                        onClick={openProjectDetails}
                        onMouseEnter={() => setIsAutoSlidePaused(true)}
                        onMouseLeave={() => setIsAutoSlidePaused(false)}
                        onTouchStart={() => setIsAutoSlidePaused(true)}
                        onTouchEnd={() => setIsAutoSlidePaused(false)}
                        onTouchCancel={() => setIsAutoSlidePaused(false)}
                        onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                                event.preventDefault()
                                openProjectDetails()
                            }
                        }}
                        className="group relative h-120 w-full overflow-hidden rounded-4xl bg-dark text-left cursor-pointer"
                    >
                        <img
                            src={currentSlide.image}
                            alt={`${selected.name} slide ${currentSlideIndex + 1}`}
                            className="absolute inset-0 h-full w-full object-cover opacity-85 transition-transform duration-500 group-hover:scale-[1.03]"
                            loading="lazy"
                        />

                        <div className="absolute inset-0 bg-linear-to-b from-dark/85 via-dark/30 to-dark/90" />

                        <div className="absolute bottom-5 right-5 z-20 flex items-center gap-2">
                            <ArrowControlButton
                                direction="left"
                                variant="image"
                                ariaLabel="Previous image"
                                onClick={(event) => handleManualSlideChange("prev", event)}
                            />
                            <ArrowControlButton
                                direction="right"
                                variant="image"
                                ariaLabel="Next image"
                                onClick={(event) => handleManualSlideChange("next", event)}
                            />
                        </div>

                        <div className="relative flex h-full flex-col justify-between p-6 text-slate-100">
                            <div className="space-y-2">
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secundary-200">{selected.category}</p>
                                <h3 className="text-2xl font-semibold leading-tight sm:text-4xl">{selected.name}</h3>
                                <p className="max-w-xl text-sm text-slate-200 sm:text-base">{currentSlide.description}</p>
                            </div>

                            <div className="flex items-end justify-between gap-2">
                                <div className="flex items-center gap-2 rounded-full border border-secundary-300/25 bg-dark/50 px-3 py-1.5 text-xs font-semibold tracking-wide text-slate-100">
                                    <span>{currentSlideIndex + 1}</span>
                                    <span>/</span>
                                    <span>{selected.slides.length}</span>
                                </div>
                            </div>
                        </div>
                    </article>

                    <aside className="flex h-fit max-h-88 self-start flex-col gap-2 overflow-y-auto rounded-2xl border border-medium-300 bg-background-light/70 p-2 dark:border-dark/70 dark:bg-background-dark/65 md:max-h-120">
                        <p className="px-1 pt-1 text-xs font-semibold uppercase tracking-[0.2em] text-medium-600 dark:text-secundary-300">More projects</p>
                        {projectEntries.map((project, index) => {
                            const slideIndex = slideByProject[project.id] ?? 0
                            const slide = project.slides[slideIndex]
                            const isActive = index === projectIndex

                            return (
                                <button
                                    key={project.id}
                                    type="button"
                                    onClick={() => quickSelectProject(index)}
                                    className={`group relative min-h-24 w-full overflow-hidden rounded-xl border text-left cursor-pointer ${
                                        isActive
                                            ? "border-medium-500 ring-2 ring-medium-500/30 dark:border-secundary-500 dark:ring-secundary-500/30"
                                            : "border-medium-200 dark:border-dark/70"
                                    }`}
                                >
                                    <img src={slide.image} alt={`${project.name} preview`} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                                    <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/30 to-black/70" />
                                    <div className="relative flex h-full flex-col justify-between p-3 text-slate-100">
                                        <h4 className="text-sm font-semibold leading-tight">{project.name}</h4>
                                        <p className="line-clamp-2 text-xs text-slate-200">{slide.description}</p>
                                    </div>
                                </button>
                            )
                        })}
                    </aside>
                </div>

                    <footer className="mt-3 flex items-center justify-between gap-3 px-1">
                        <small className="text-xs font-medium text-medium-700 dark:text-secundary-300">Click anywhere on the active image to open details.</small>
                    </footer>
                </article>

                <div className="absolute -bottom-1 right-2 flex items-center gap-2 sm:right-4">
                    <ArrowControlButton
                        direction="left"
                        variant="project"
                        ariaLabel="Previous project"
                        onClick={() => goToProject("prev")}
                    />
                    <ArrowControlButton
                        direction="right"
                        variant="project"
                        ariaLabel="Next project"
                        onClick={() => goToProject("next")}
                    />
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={closeProjectDetails}
                title={selectedProject?.name || "Project"}
                subtitle={selectedProject?.category || ""}
                ariaLabel="Project details"
            >
                <ProjectModalContent project={selectedProject} />
            </Modal>
        </section>
    )
}
