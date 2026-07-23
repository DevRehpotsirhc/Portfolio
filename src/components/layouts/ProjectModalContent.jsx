import { useEffect, useRef, useState } from "react"
import { Alert } from "../ui/Alert"

const PREVIEW_CLOSE_ANIMATION_MS = 300
const PREVIEW_OPEN_ANIMATION_MS = 320

const getCenteredPreviewRect = (aspectRatio) => {
    const safeAspect = Number.isFinite(aspectRatio) && aspectRatio > 0 ? aspectRatio : 1
    const horizontalPadding = 16
    const verticalPadding = 16
    const maxWidth = Math.min(window.innerWidth - horizontalPadding * 2, 1152)
    const maxHeight = Math.floor(window.innerHeight * 0.92) - verticalPadding

    let width = maxWidth
    let height = width / safeAspect

    if (height > maxHeight) {
        height = maxHeight
        width = height * safeAspect
    }

    return {
        top: (window.innerHeight - height) / 2,
        left: (window.innerWidth - width) / 2,
        width,
        height
    }
}

export const ProjectModalContent = ({ project }) => {
    const [showPrivateAlert, setShowPrivateAlert] = useState(false)
    const [previewData, setPreviewData] = useState(null)
    const [isPreviewVisible, setIsPreviewVisible] = useState(false)
    const activePointerIdRef = useRef(null)
    const activePointerTypeRef = useRef(null)
    const closePreviewTimeoutRef = useRef(null)
    const openPreviewRafRef = useRef(null)

    const clearClosePreviewTimeout = () => {
        if (!closePreviewTimeoutRef.current) {
            return
        }

        window.clearTimeout(closePreviewTimeoutRef.current)
        closePreviewTimeoutRef.current = null
    }

    const clearOpenPreviewRaf = () => {
        if (!openPreviewRafRef.current) {
            return
        }

        window.cancelAnimationFrame(openPreviewRafRef.current)
        openPreviewRafRef.current = null
    }

    const closeMaximizedImage = () => {
        if (activePointerIdRef.current === null && !previewData) {
            return
        }

        activePointerIdRef.current = null
        activePointerTypeRef.current = null
        setIsPreviewVisible(false)
        clearOpenPreviewRaf()
        clearClosePreviewTimeout()

        closePreviewTimeoutRef.current = window.setTimeout(() => {
            setPreviewData(null)
            closePreviewTimeoutRef.current = null
        }, PREVIEW_CLOSE_ANIMATION_MS)
    }

    const openWhilePressing = (image, event) => {
        if (event.pointerType === "mouse" && event.button !== 0) {
            return
        }

        activePointerIdRef.current = event.pointerId
        activePointerTypeRef.current = event.pointerType || null
        const sourceElement = event.currentTarget
        const sourceRect = sourceElement.getBoundingClientRect()
        const aspectRatio = sourceElement.naturalWidth && sourceElement.naturalHeight
            ? sourceElement.naturalWidth / sourceElement.naturalHeight
            : sourceRect.width / sourceRect.height

        const originRect = {
            top: sourceRect.top,
            left: sourceRect.left,
            width: sourceRect.width,
            height: sourceRect.height
        }

        clearClosePreviewTimeout()
        clearOpenPreviewRaf()

        setPreviewData({
            image,
            originRect,
            targetRect: getCenteredPreviewRect(aspectRatio)
        })
        setIsPreviewVisible(false)

        openPreviewRafRef.current = window.requestAnimationFrame(() => {
            setIsPreviewVisible(true)
            openPreviewRafRef.current = null
        })

        if (event.currentTarget.setPointerCapture) {
            event.currentTarget.setPointerCapture(event.pointerId)
        }
    }

    useEffect(() => {
        const closeIfActive = (event) => {
            if (activePointerIdRef.current === null) {
                return
            }

            if (event.pointerId !== undefined && event.pointerId !== activePointerIdRef.current) {
                return
            }

            closeMaximizedImage()
        }

        const closeOnBlurWhenMouse = () => {
            if (activePointerTypeRef.current !== "mouse") {
                return
            }

            closeMaximizedImage()
        }

        window.addEventListener("pointerup", closeIfActive)
        window.addEventListener("pointercancel", closeIfActive)
        window.addEventListener("blur", closeOnBlurWhenMouse)

        return () => {
            window.removeEventListener("pointerup", closeIfActive)
            window.removeEventListener("pointercancel", closeIfActive)
            window.removeEventListener("blur", closeOnBlurWhenMouse)
        }
    }, [previewData])

    const closeOnPointerLeave = (event) => {
        if (event.pointerType !== "mouse") {
            return
        }

        closeMaximizedImage()
    }

    useEffect(() => {
        if (!previewData) {
            return undefined
        }

        const syncPreviewTargetRect = () => {
            setPreviewData((prev) => {
                if (!prev) {
                    return prev
                }

                const ratio = prev.targetRect.width / prev.targetRect.height
                return {
                    ...prev,
                    targetRect: getCenteredPreviewRect(ratio)
                }
            })
        }

        window.addEventListener("resize", syncPreviewTargetRect)

        return () => {
            window.removeEventListener("resize", syncPreviewTargetRect)
        }
    }, [previewData])

    useEffect(() => {
        return () => {
            clearClosePreviewTimeout()
            clearOpenPreviewRaf()
            closeMaximizedImage()
        }
    }, [])

    if (!project) {
        return null
    }

    return (
        <section className="space-y-5">
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                {project.longDescription}
            </p>

            {project.stack?.length ? (
                <article>
                    <h5 className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-medium-500 dark:text-secundary-300">
                        Stack
                    </h5>
                    <ul className="flex flex-wrap gap-2">
                        {project.stack.map((item) => (
                            <li
                                key={`${project.id}-${item}`}
                                className="rounded-lg border border-slate-300 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                </article>
            ) : null}

            {project.highlights?.length ? (
                <article>
                    <h5 className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-medium-500 dark:text-secundary-300">
                        Highlights
                    </h5>
                    <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                        {project.highlights.map((item) => (
                            <li key={`${project.id}-${item}`} className="rounded-lg border border-slate-300/70 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900/40">
                                {item}
                            </li>
                        ))}
                    </ul>
                </article>
            ) : null}

            {project.collections?.length ? (
                <article>
                    <h5 className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-medium-500 dark:text-secundary-300">
                        Collection
                    </h5>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                        {project.collections.map((image, index) => {
                            const collageClass = index % 5 === 0
                                ? "sm:col-span-2 sm:row-span-2"
                                : index % 5 === 3
                                    ? "sm:col-span-2"
                                    : ""

                            return (
                                <figure
                                    key={`${project.id}-collection-${index}`}
                                    className={`group relative min-h-24 overflow-hidden rounded-xl border border-slate-300/70 bg-slate-100 dark:border-slate-700 dark:bg-slate-900/40 ${collageClass}`}
                                >
                                    <img
                                        src={image}
                                        alt={`${project.name} collection ${index + 1}`}
                                        loading="lazy"
                                        onPointerDown={(event) => openWhilePressing(image, event)}
                                        onPointerUp={closeMaximizedImage}
                                        onPointerLeave={closeOnPointerLeave}
                                        onPointerCancel={closeMaximizedImage}
                                        onContextMenu={(event) => event.preventDefault()}
                                        className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                                    />
                                </figure>
                            )
                        })}
                    </div>
                </article>
            ) : null}

            {project.links?.length ? (
                <article>
                    <h5 className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-medium-500 dark:text-secundary-300">
                        Links
                    </h5>
                    <div className="flex flex-wrap gap-2">
                        {project.links.map((link, index) => {
                            const isPrivate = Boolean(link.isPrivate)

                            return (
                                <a
                                    key={`${project.id}-${link.href || link.label}-${index}`}
                                    href={isPrivate ? "#" : link.href}
                                    target={isPrivate ? undefined : "_blank"}
                                    rel={isPrivate ? undefined : "noreferrer"}
                                    onClick={(event) => {
                                        if (!isPrivate) {
                                            return
                                        }

                                        event.preventDefault()
                                        setShowPrivateAlert(true)
                                    }}
                                    className="rounded-lg border border-medium-500/80 bg-medium-500 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-medium-600 dark:border-secundary-600 dark:bg-secundary-600 dark:hover:bg-secundary-700"
                                >
                                    {link.label}
                                </a>
                            )
                        })}
                    </div>
                </article>
            ) : null}

            <Alert
                isOpen={showPrivateAlert}
                onClose={() => setShowPrivateAlert(false)}
                title="Private link"
                message="This link is private and cannot be accessed right now."
            />

            {previewData ? (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label="Expanded project image"
                    className={`pointer-events-none fixed inset-0 z-110 backdrop-blur-sm transition-all duration-200 ease-in-out ${
                        isPreviewVisible ? "bg-black/85 opacity-100" : "bg-black/0 opacity-0"
                    }`}
                >
                    <figure
                        className="fixed overflow-hidden rounded-2xl border border-white/20 bg-slate-900 shadow-2xl shadow-black/40 transition-all ease-in-out"
                        style={{
                            top: `${isPreviewVisible ? previewData.targetRect.top : previewData.originRect.top}px`,
                            left: `${isPreviewVisible ? previewData.targetRect.left : previewData.originRect.left}px`,
                            width: `${isPreviewVisible ? previewData.targetRect.width : previewData.originRect.width}px`,
                            height: `${isPreviewVisible ? previewData.targetRect.height : previewData.originRect.height}px`,
                            opacity: isPreviewVisible ? 1 : 0.92,
                            filter: isPreviewVisible ? "blur(0px)" : "blur(1px)",
                            transitionDuration: `${isPreviewVisible ? PREVIEW_OPEN_ANIMATION_MS : PREVIEW_CLOSE_ANIMATION_MS}ms`
                        }}
                    >
                        <img
                            src={previewData.image}
                            alt={`${project.name} expanded view`}
                            className="h-full max-h-[92svh] w-full object-contain"
                        />
                    </figure>
                </div>
            ) : null}
        </section>
    )
}
