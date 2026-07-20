import { useEffect, useRef } from "react"
import { X } from "lucide-react"
import { useClickOutside } from "../../hooks/useClickOutside"

const overlayBaseStyles = "fixed inset-0 z-100 flex items-center justify-center bg-slate-950/70 p-3 sm:p-6"
const panelBaseStyles = "max-h-[88svh] w-full max-w-5xl overflow-y-auto rounded-2xl border border-slate-300 bg-background-light px-4 pb-4 pt-0 shadow-2xl dark:border-slate-700 dark:bg-background-dark sm:px-6 sm:pb-6 sm:pt-0"
const headerBaseStyles = "sticky top-0 z-20 -mx-4 mb-5 flex items-start justify-between gap-4 border-b border-slate-300/80 bg-background-light/95 px-4 py-3 backdrop-blur-sm dark:border-slate-700 dark:bg-background-dark/95 sm:-mx-6 sm:px-6 sm:py-4"

export const Modal = ({
    isOpen,
    onClose,
    title,
    subtitle,
    ariaLabel,
    children,
    overlayClassName = "",
    panelClassName = "",
    headerClassName = "",
    contentClassName = ""
}) => {
    const panelRef = useRef(null)

    useClickOutside([panelRef], onClose, isOpen)

    useEffect(() => {
        if (!isOpen) {
            return
        }

        const onEscape = (event) => {
            if (event.key === "Escape") {
                onClose()
            }
        }

        document.addEventListener("keydown", onEscape)
        document.body.style.overflow = "hidden"

        return () => {
            document.removeEventListener("keydown", onEscape)
            document.body.style.overflow = ""
        }
    }, [isOpen, onClose])

    if (!isOpen) {
        return null
    }

    const overlayClasses = `${overlayBaseStyles} ${overlayClassName}`.trim()
    const panelClasses = `${panelBaseStyles} ${panelClassName}`.trim()
    const headerClasses = `${headerBaseStyles} ${headerClassName}`.trim()
    const contentClasses = `space-y-6 pt-2 ${contentClassName}`.trim()

    return (
        <div className={overlayClasses} role="dialog" aria-modal="true" aria-label={ariaLabel || title}>
            <article ref={panelRef} className={panelClasses}>
                <header className={headerClasses}>
                    <div>
                        {subtitle ? (
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-medium-500 dark:text-secundary-300">{subtitle}</p>
                        ) : null}
                        <h4 className="text-xl font-semibold text-dark dark:text-white">{title}</h4>
                    </div>

                    <button
                        type="button"
                        title="Close"
                        aria-label="Close modal"
                        onClick={onClose}
                        className="inline-flex size-9 min-w-9 min-h-9 shrink-0 grow-0 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-600 transition-colors hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 cursor-pointer"
                    >
                        <X className="size-4" />
                    </button>
                </header>

                <div className={contentClasses}>{children}</div>
            </article>
        </div>
    )
}
