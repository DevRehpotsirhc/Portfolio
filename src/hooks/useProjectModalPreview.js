import { useCallback, useEffect, useRef, useState } from "react"

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

const getElementRect = (element) => {
    const rect = element.getBoundingClientRect()
    return {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height
    }
}

export const useProjectModalPreview = (projectId) => {
    const [previewData, setPreviewData] = useState(null)
    const closePreviewTimeoutRef = useRef(null)
    const openPreviewRafRef = useRef(null)
    const previewDataRef = useRef(null)

    useEffect(() => {
        previewDataRef.current = previewData
    }, [previewData])

    const clearPreviewTimers = useCallback(() => {
        if (closePreviewTimeoutRef.current) {
            window.clearTimeout(closePreviewTimeoutRef.current)
            closePreviewTimeoutRef.current = null
        }

        if (openPreviewRafRef.current) {
            window.cancelAnimationFrame(openPreviewRafRef.current)
            openPreviewRafRef.current = null
        }
    }, [])

    const handlePreview = useCallback((action, payload = {}) => {
        if (action === "cleanup") {
            clearPreviewTimers()
            return
        }

        if (action === "sync") {
            setPreviewData((prev) => {
                if (!prev) {
                    return prev
                }

                const aspectRatio = prev.targetRect.width / prev.targetRect.height
                return {
                    ...prev,
                    targetRect: getCenteredPreviewRect(aspectRatio)
                }
            })
            return
        }

        if (action === "close") {
            if (!previewDataRef.current) {
                return
            }

            clearPreviewTimers()

            if (payload.nextOriginRect) {
                setPreviewData((prev) => {
                    if (!prev) {
                        return prev
                    }

                    return {
                        ...prev,
                        originRect: payload.nextOriginRect
                    }
                })
            }

            setPreviewData((prev) => {
                if (!prev) {
                    return prev
                }

                return {
                    ...prev,
                    visible: false
                }
            })

            closePreviewTimeoutRef.current = window.setTimeout(() => {
                setPreviewData(null)
                closePreviewTimeoutRef.current = null
            }, PREVIEW_CLOSE_ANIMATION_MS)

            return
        }

        if (action === "open") {
            const { image, event, sourceKey } = payload

            if (!projectId || (event.type === "click" && event.detail === 0)) {
                return
            }

            const sourceElement = event.currentTarget
            const sourceRect = getElementRect(sourceElement)
            const aspectRatio = sourceElement.naturalWidth && sourceElement.naturalHeight
                ? sourceElement.naturalWidth / sourceElement.naturalHeight
                : sourceRect.width / sourceRect.height

            clearPreviewTimers()

            setPreviewData({
                image,
                sourceKey,
                originRect: sourceRect,
                targetRect: getCenteredPreviewRect(aspectRatio),
                visible: false
            })

            openPreviewRafRef.current = window.requestAnimationFrame(() => {
                setPreviewData((prev) => {
                    if (!prev) {
                        return prev
                    }

                    return {
                        ...prev,
                        visible: true
                    }
                })
                openPreviewRafRef.current = null
            })

            return
        }

        if (action === "toggle") {
            const { image, index, event } = payload
            const sourceKey = `${projectId}-collection-${index}`

            if (previewDataRef.current?.sourceKey === sourceKey) {
                handlePreview("close", { nextOriginRect: getElementRect(event.currentTarget) })
                return
            }

            handlePreview("open", { image, event, sourceKey })
        }
    }, [clearPreviewTimers, projectId])

    useEffect(() => {
        if (!previewData) {
            return undefined
        }

        const syncPreviewTargetRect = () => handlePreview("sync")
        window.addEventListener("resize", syncPreviewTargetRect)

        return () => {
            window.removeEventListener("resize", syncPreviewTargetRect)
        }
    }, [handlePreview, previewData])

    useEffect(() => {
        return () => {
            handlePreview("cleanup")
        }
    }, [handlePreview])

    const getPreviewFigureStyle = useCallback((currentPreview) => {
        if (!currentPreview) {
            return undefined
        }

        const sourceWidth = currentPreview.originRect.width
        const sourceHeight = currentPreview.originRect.height
        const targetWidth = currentPreview.targetRect.width
        const targetHeight = currentPreview.targetRect.height
        const scaleX = sourceWidth / targetWidth
        const scaleY = sourceHeight / targetHeight
        const translateX = currentPreview.originRect.left - currentPreview.targetRect.left
        const translateY = currentPreview.originRect.top - currentPreview.targetRect.top

        return {
            top: `${currentPreview.targetRect.top}px`,
            left: `${currentPreview.targetRect.left}px`,
            width: `${targetWidth}px`,
            height: `${targetHeight}px`,
            opacity: currentPreview.visible ? 1 : 0.96,
            transform: currentPreview.visible
                ? "translate3d(0, 0, 0) scale(1)"
                : `translate3d(${translateX}px, ${translateY}px, 0) scale(${scaleX}, ${scaleY})`,
            transformOrigin: "top left",
            transitionDuration: `${currentPreview.visible ? PREVIEW_OPEN_ANIMATION_MS : PREVIEW_CLOSE_ANIMATION_MS}ms`
        }
    }, [])

    return {
        previewData,
        handlePreview,
        getPreviewFigureStyle
    }
}