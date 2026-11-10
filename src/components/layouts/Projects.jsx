import { useEffect, useMemo, useRef, useState } from "react"
import { Modal } from "../ui/Modal"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ArrowControlButton } from "../ui/ArrowControlButton"
import { ProjectModalContent } from "./ProjectModalContent"
import { projects as projectsData, ui } from "../../data"

const AUTO_SLIDE_SECONDS = 6
const SWIPE_THRESHOLD_PX = 48

const t = ui.projects

const projectEntries = Object.entries(projectsData).map(([name, config]) => ({
    ...config,
    name,
    slides: Object.entries(config.slides).map(([image, description], index) => ({
        image,
        description,
        id: `${config.id}-slide-${index}`
    }))
}))

/** Labelled "previous / next project" button: says where it goes, unlike a bare arrow. */
const ProjectNavButton = ({ direction, label, projectName, ariaLabel, onClick }) => {
    const isNext = direction === "next"
    const Icon = isNext ? ChevronRight : ChevronLeft

    return (
        <button
            type="button"
            aria-label={ariaLabel}
            title={projectName}
            onClick={onClick}
            className={`group/nav flex min-h-11 min-w-0 cursor-pointer items-center gap-2 rounded-xl border border-b-4 border-medium-700 bg-medium-500 px-3 py-1.5 text-white shadow-sm transition-[translate,border-width,background-color,box-shadow] duration-200 hover:bg-medium-600 hover:shadow-md active:translate-y-0.5 active:border-b-2 active:duration-75 dark:border-secundary-800 dark:bg-secundary-700 dark:hover:bg-secundary-800 ${
                isNext ? "flex-row-reverse text-right" : "text-left"
            }`}
        >
            <Icon className={`size-5 shrink-0 transition-transform duration-300 ${isNext ? "group-hover/nav:translate-x-0.5" : "group-hover/nav:-translate-x-0.5"}`} />
            <span className="flex min-w-0 flex-col leading-tight">
                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/95">{label}</span>
                <span className="hidden max-w-40 truncate text-sm font-semibold sm:block">{projectName}</span>
            </span>
        </button>
    )
}

export const Projects = () => {
    const sectionRef = useRef(null)
    const touchStartRef = useRef({ x: 0, y: 0 })
    const preventOpenOnClickRef = useRef(false)
    const preventOpenTimeoutRef = useRef(null)
    const [projectIndex, setProjectIndex] = useState(0)
    const [slideByProject, setSlideByProject] = useState({})
    const [selectedProject, setSelectedProject] = useState(null)
    // Keeps the last opened project on screen while the modal plays its exit animation.
    const [shownProject, setShownProject] = useState(null)
    if (selectedProject && selectedProject !== shownProject) {
        setShownProject(selectedProject)
    }
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

    // Previous slide stays underneath while the new one fades in, so there is never a blank frame.
    const [imageLayers, setImageLayers] = useState({ current: currentSlide.image, previous: null })
    if (imageLayers.current !== currentSlide.image) {
        setImageLayers({ current: currentSlide.image, previous: imageLayers.current })
    }

    const isAutoplayRunning = !isAutoSlidePaused && isSectionVisible && isWindowFocused && !isModalOpen
    const autoplaySeconds = Math.max(selected.slideDurationSeconds ?? AUTO_SLIDE_SECONDS, 1) + (manualDelayBoost ? 1 : 0)

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
        return () => {
            if (preventOpenTimeoutRef.current) {
                window.clearTimeout(preventOpenTimeoutRef.current)
            }
        }
    }, [])

    useEffect(() => {
        // Preload slide images only once the section is close, so the hero loads without
        // competing for bandwidth. The visible project goes first; the rest wait for idle time.
        const element = sectionRef.current
        if (!element) return undefined

        let idleHandle = 0
        const preload = (src) => {
            const img = new Image()
            img.decoding = "async"
            img.src = src
        }
        const whenIdle = window.requestIdleCallback || ((cb) => window.setTimeout(cb, 200))
        const cancelIdle = window.cancelIdleCallback || window.clearTimeout

        const start = () => {
            projectEntries[0].slides.forEach((slide) => preload(slide.image))
            const rest = projectEntries.slice(1).flatMap((project) => project.slides.map((slide) => slide.image))
            const next = () => {
                const src = rest.shift()
                if (!src) return
                preload(src)
                idleHandle = whenIdle(next)
            }
            idleHandle = whenIdle(next)
        }

        if (typeof IntersectionObserver === "undefined") {
            start()
            return () => cancelIdle(idleHandle)
        }

        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return
            observer.disconnect()
            start()
        }, { rootMargin: "800px 0px" })
        observer.observe(element)

        return () => {
            observer.disconnect()
            cancelIdle(idleHandle)
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
            const nextProjectIndex = direction === "next"
                ? (prev + 1) % projectEntries.length
                : (prev - 1 + projectEntries.length) % projectEntries.length

            const nextProjectId = projectEntries[nextProjectIndex].id
            setSlideByProject((currentSlides) => ({
                ...currentSlides,
                [nextProjectId]: 0
            }))

            return nextProjectIndex
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
            const nextProjectIndex = (projectIndex + 1) % projectEntries.length
            const nextProjectId = projectEntries[nextProjectIndex].id

            setSlideByProject((prev) => ({
                ...prev,
                [nextProjectId]: 0
            }))

            setManualDelayBoost(false)
            setProjectIndex(nextProjectIndex)
        }
    }

    const quickSelectProject = (index) => {
        setManualDelayBoost(false)
        const targetProjectId = projectEntries[index].id
        setSlideByProject((prev) => ({
            ...prev,
            [targetProjectId]: 0
        }))
        setProjectIndex(index)
        focusProjectsSection()
    }

    // Manual image navigation stays inside the current project; switching projects
    // is a separate, labelled control. Only autoplay rolls over to the next project.
    const showSlide = (index) => {
        const target = Math.min(Math.max(index, 0), selected.slides.length - 1)
        if (target === currentSlideIndex) return
        setManualDelayBoost(true)
        setSlideByProject((prev) => ({ ...prev, [selected.id]: target }))
    }

    const handleManualSlideChange = (direction, event) => {
        event?.stopPropagation()
        showSlide(currentSlideIndex + (direction === "next" ? 1 : -1))
    }

    const handleCarouselKeyDown = (event) => {
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault()
            handleManualSlideChange(event.key === "ArrowRight" ? "next" : "prev")
        }
    }

    const isFirstSlide = currentSlideIndex === 0
    const isLastSlide = currentSlideIndex === selected.slides.length - 1
    const prevProject = projectEntries[(projectIndex - 1 + projectEntries.length) % projectEntries.length]
    const nextProject = projectEntries[(projectIndex + 1) % projectEntries.length]

    const handleImageTouchStart = (event) => {
        setIsAutoSlidePaused(true)

        const touch = event.touches?.[0]
        if (!touch) {
            return
        }

        touchStartRef.current = {
            x: touch.clientX,
            y: touch.clientY
        }
    }

    const handleImageTouchEnd = (event) => {
        setIsAutoSlidePaused(false)

        const touch = event.changedTouches?.[0]
        if (!touch) {
            return
        }

        const deltaX = touch.clientX - touchStartRef.current.x
        const deltaY = touch.clientY - touchStartRef.current.y
        const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY)
        const passedThreshold = Math.abs(deltaX) >= SWIPE_THRESHOLD_PX

        if (!isHorizontalSwipe || !passedThreshold) {
            return
        }

        preventOpenOnClickRef.current = true
        if (preventOpenTimeoutRef.current) {
            window.clearTimeout(preventOpenTimeoutRef.current)
        }

        preventOpenTimeoutRef.current = window.setTimeout(() => {
            preventOpenOnClickRef.current = false
            preventOpenTimeoutRef.current = null
        }, 300)

        handleManualSlideChange(deltaX < 0 ? "next" : "prev")
    }

    const handleImageTouchCancel = () => {
        setIsAutoSlidePaused(false)
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
        <section ref={sectionRef} id="projects" style={{ "--render-estimate": "1150px" }} className="defer-render mx-auto w-full max-w-7xl px-4 py-12 sm:px-8">
            <div id="headerContent" className="mb-8 mt-14 flex flex-col gap-2">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-medium-500 dark:text-secundary-300">{t.eyebrow}</p>
                <h2 className="text-2xl font-semibold text-dark dark:text-white sm:text-3xl">{t.title}</h2>
            </div>

            <div className="relative">
                <article className="rounded-3xl border border-slate-300/80 bg-white/80 p-5 shadow-md shadow-slate-300/40 backdrop-blur-sm dark:border-dark/60 dark:bg-dark/30 dark:shadow-secundary-900/30">

                <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_16rem]">
                    <article
                        onMouseEnter={() => setIsAutoSlidePaused(true)}
                        onMouseLeave={() => setIsAutoSlidePaused(false)}
                        onTouchStart={handleImageTouchStart}
                        onTouchEnd={handleImageTouchEnd}
                        onTouchCancel={handleImageTouchCancel}
                        onKeyDown={handleCarouselKeyDown}
                        className="group relative h-120 w-full overflow-hidden rounded-4xl bg-medium-500 dark:bg-dark text-left cursor-pointer"
                    >
                        {/* Transparent full-area button: opens details without nesting the arrow buttons inside it */}
                        <button
                            type="button"
                            aria-label={`${t.openDetails}: ${selected.name}`}
                            onClick={() => {
                                if (preventOpenOnClickRef.current) {
                                    return
                                }
                                openProjectDetails()
                            }}
                            className="absolute inset-0 z-10 cursor-pointer rounded-4xl focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-medium-300 dark:focus-visible:outline-secundary-300"
                        />
                        <div className="absolute inset-0 transition-[scale] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]">
                            {imageLayers.previous ? (
                                <img
                                    src={imageLayers.previous}
                                    alt=""
                                    aria-hidden="true"
                                    className="absolute inset-0 h-full w-full object-cover opacity-85"
                                />
                            ) : null}
                            <img
                                key={currentSlide.image}
                                src={currentSlide.image}
                                alt={`${selected.name} slide ${currentSlideIndex + 1}`}
                                className="slide-image-in absolute inset-0 h-full w-full object-cover opacity-85"
                                loading="lazy"
                                decoding="async"
                            />
                        </div>

                        <div className="absolute inset-0 bg-linear-to-b from-medium-950/85 via-medium-950/30 to-medium-950/20 dark:from-dark/85 dark:via-dark/30 dark:to-dark/20" />

                        {/* Image pager: arrows sit next to one dot per image, so they clearly move images.
                            The active dot doubles as the autoplay timer. */}
                        <div
                            role="group"
                            aria-label={t.slidesNavLabel}
                            className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-0.5 rounded-full border border-white/15 bg-dark/55 p-1 backdrop-blur-md sm:left-auto sm:right-5 sm:translate-x-0"
                        >
                            <ArrowControlButton
                                direction="left"
                                variant="overlay"
                                size="sm"
                                ariaLabel={t.prevImage}
                                disabled={isFirstSlide}
                                onClick={(event) => handleManualSlideChange("prev", event)}
                            />
                            <div className="flex items-center">
                                {selected.slides.map((slide, index) => {
                                    const isCurrent = index === currentSlideIndex
                                    return (
                                        <button
                                            key={slide.id}
                                            type="button"
                                            aria-label={t.slideDotLabel.replace("{n}", index + 1).replace("{total}", selected.slides.length)}
                                            aria-current={isCurrent ? "true" : undefined}
                                            onClick={(event) => {
                                                event.stopPropagation()
                                                showSlide(index)
                                            }}
                                            className="group/dot flex h-8 cursor-pointer items-center px-1"
                                        >
                                            <span
                                                className={`relative block h-2 overflow-hidden rounded-full transition-[width,background-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                                                    isCurrent ? "w-7 bg-white/30" : "w-2 bg-white/55 group-hover/dot:bg-white/90"
                                                }`}
                                            >
                                                {isCurrent ? (
                                                    <span
                                                        key={`${selected.id}-${currentSlideIndex}-${autoplaySeconds}-${isAutoplayRunning}`}
                                                        className={`absolute inset-0 rounded-full bg-white ${isAutoplayRunning ? "autoplay-bar" : ""}`}
                                                        style={{ "--autoplay-duration": `${autoplaySeconds}s` }}
                                                    />
                                                ) : null}
                                            </span>
                                        </button>
                                    )
                                })}
                            </div>
                            <ArrowControlButton
                                direction="right"
                                variant="overlay"
                                size="sm"
                                ariaLabel={t.nextImage}
                                disabled={isLastSlide}
                                onClick={(event) => handleManualSlideChange("next", event)}
                            />
                        </div>

                        <div className="relative flex h-full flex-col justify-between p-6 text-slate-100">
                            <div className="space-y-2">
                                <div key={selected.id} className="slide-text-in space-y-2">
                                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-medium-300 dark:text-secundary-200">{selected.category}</p>
                                    <h3 className="text-2xl font-semibold leading-tight sm:text-4xl">{selected.name}</h3>
                                </div>
                                <p
                                    key={`${selected.id}-${currentSlideIndex}`}
                                    className="slide-text-in max-w-xl text-sm text-slate-200 sm:text-base"
                                    style={{ "--text-delay": "80ms" }}
                                >
                                    {currentSlide.description}
                                </p>
                            </div>
                        </div>
                    </article>

                    <aside className="flex max-h-88 self-start flex-col overflow-hidden rounded-2xl border border-medium-300 bg-background-light/70 dark:border-dark/70 dark:bg-background-dark/65 md:max-h-120">
                        <p className="z-20 border-b border-medium-300/70 bg-background-light/95 px-3 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-medium-600 backdrop-blur-sm dark:border-dark/70 dark:bg-background-dark/95 dark:text-secundary-300">{t.moreProjects}</p>
                        <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto p-2">
                            {projectEntries.map((project, index) => {
                            const slideIndex = slideByProject[project.id] ?? 0
                            const slide = project.slides[slideIndex]
                            const isActive = index === projectIndex

                            return (
                                <button
                                    key={project.id}
                                    type="button"
                                    onClick={() => quickSelectProject(index)}
                                    className={`group relative min-h-24 w-full overflow-hidden rounded-xl border text-left cursor-pointer transition-[border-color,box-shadow,translate] duration-300 hover:-translate-y-0.5 active:translate-y-0 ${
                                        isActive
                                            ? "border-medium-500 ring-2 ring-medium-500/30 dark:border-secundary-500 dark:ring-secundary-500/30"
                                            : "border-medium-200 dark:border-dark/70"
                                    }`}
                                >
                                    <img src={slide.image} alt={`${project.name} preview`} className="absolute inset-0 h-full w-full object-cover transition-[scale] duration-500 group-hover:scale-105" loading="lazy" />
                                    <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/30 to-black/70" />
                                    <div className="relative flex h-full flex-col justify-between p-3 text-slate-100">
                                        <h4 className="text-sm font-semibold leading-tight">{project.name}</h4>
                                        <p className="line-clamp-2 text-xs text-slate-200">{slide.description}</p>
                                    </div>
                                </button>
                            )
                        })}
                        </div>
                    </aside>
                </div>

                    <footer className="mt-4 flex flex-col gap-3 px-1 sm:flex-row sm:items-center sm:justify-between">
                        <small className="text-xs font-medium text-medium-700 dark:text-secundary-300">{t.clickHint}</small>

                        <nav aria-label={t.projectNavLabel} className="flex items-center justify-between gap-2 sm:justify-end">
                            <ProjectNavButton
                                direction="prev"
                                label={t.prevShort}
                                projectName={prevProject.name}
                                ariaLabel={`${t.prevProject}: ${prevProject.name}`}
                                onClick={() => goToProject("prev")}
                            />
                            <p className="min-w-12 text-center text-xs font-semibold tabular-nums text-medium-700 dark:text-secundary-300" aria-live="polite">
                                {progressText}
                            </p>
                            <ProjectNavButton
                                direction="next"
                                label={t.nextShort}
                                projectName={nextProject.name}
                                ariaLabel={`${t.nextProject}: ${nextProject.name}`}
                                onClick={() => goToProject("next")}
                            />
                        </nav>
                    </footer>
                </article>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={closeProjectDetails}
                title={shownProject?.name || t.modalFallbackTitle}
                subtitle={shownProject?.category || ""}
                ariaLabel={t.modalAriaLabel}
            >
                <ProjectModalContent project={shownProject} />
            </Modal>
        </section>
    )
}
