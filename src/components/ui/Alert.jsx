import { useCallback, useEffect, useRef, useState } from "react"
import { AlertTriangle, X } from "lucide-react"

const infoStyles = "border-medium-500/80 bg-medium-500/80 text-white shadow-medium-500/25 dark:border-secundary-500/80 dark:bg-secundary-500/75 dark:text-secundary-50 dark:shadow-secundary-500/25"

export const Alert = ({
    isOpen,
    onClose,
    title,
    message,
    autoCloseMs = 2800
}) => {
    const timerRef = useRef(null)
    const startedAtRef = useRef(null)
    const [remainingMs, setRemainingMs] = useState(autoCloseMs)
    const [isPaused, setIsPaused] = useState(false)

    const clearTimer = useCallback(() => {
        if (timerRef.current) {
            window.clearTimeout(timerRef.current)
            timerRef.current = null
        }
    }, [])

    const scheduleClose = useCallback((delayMs) => {
        clearTimer()

        if (!isOpen || delayMs <= 0) {
            onClose?.()
            return
        }

        startedAtRef.current = Date.now()
        timerRef.current = window.setTimeout(() => {
            onClose?.()
        }, delayMs)
    }, [clearTimer, isOpen, onClose])

    const pauseAutoClose = useCallback(() => {
        if (!isOpen || isPaused) {
            return
        }

        setIsPaused(true)
        clearTimer()

        if (startedAtRef.current) {
            const elapsed = Date.now() - startedAtRef.current
            setRemainingMs((prev) => Math.max(prev - elapsed, 0))
        }
    }, [clearTimer, isOpen, isPaused])

    const resumeAutoClose = useCallback(() => {
        if (!isOpen) {
            return
        }

        setIsPaused(false)
    }, [isOpen])

    useEffect(() => {
        if (!isOpen) {
            clearTimer()
            startedAtRef.current = null
            setRemainingMs(autoCloseMs)
            setIsPaused(false)
            return
        }

        setRemainingMs(autoCloseMs)
    }, [autoCloseMs, clearTimer, isOpen])

    useEffect(() => {
        if (!isOpen || isPaused) {
            return
        }

        scheduleClose(remainingMs)

        return () => {
            clearTimer()
        }
    }, [clearTimer, isOpen, isPaused, remainingMs, scheduleClose])

    if (!isOpen) {
        return null
    }

    return (
        <div className="pointer-events-none fixed bottom-5 right-4 z-130 w-[min(92vw,24rem)] sm:bottom-6 sm:right-6" role="status" aria-live="polite">
            <article
                className={`pointer-events-auto rounded-2xl border px-4 py-3 shadow-xl backdrop-blur-md ${infoStyles}`}
                role="alert"
                onMouseEnter={pauseAutoClose}
                onMouseLeave={resumeAutoClose}
                onTouchStart={pauseAutoClose}
                onTouchEnd={resumeAutoClose}
                onTouchCancel={resumeAutoClose}
            >
                <div className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex size-7 items-center justify-center rounded-lg border border-current/20 bg-white/40 dark:bg-black/20">
                        <AlertTriangle className="size-4" />
                    </span>

                    <div className="min-w-0 flex-1">
                        <h6 className="text-sm font-semibold leading-tight">{title}</h6>
                        <p className="mt-1 text-xs leading-relaxed opacity-90">{message}</p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Cerrar alerta"
                        className="inline-flex size-7 items-center justify-center rounded-lg border border-current/20 bg-white/40 transition-colors hover:bg-white/60 dark:bg-black/20 dark:hover:bg-black/35 cursor-pointer"
                    >
                        <X className="size-4" />
                    </button>
                </div>
            </article>
        </div>
    )
}