import { ChevronLeft, ChevronRight } from "lucide-react"

const variantStyles = {
    project: "border border-medium-500 bg-medium-400 text-white transition-colors hover:bg-medium-500 dark:border-secundary-700 dark:bg-secundary-600 dark:hover:bg-secundary-700",
    image: "border border-secundary-300/70 bg-background-light text-dark transition-colors hover:bg-secundary-100 dark:border-secundary-700 dark:bg-background-dark dark:text-slate-100 dark:hover:bg-secundary-700/60"
}

export const ArrowControlButton = ({
    direction = "left",
    onClick,
    ariaLabel,
    variant = "project",
    iconClassName = "size-5",
    type = "button"
}) => {
    const Icon = direction === "right" ? ChevronRight : ChevronLeft
    const selectedVariant = variantStyles[variant] || variantStyles.project

    return (
        <button
            type={type}
            aria-label={ariaLabel}
            onClick={onClick}
            className={`inline-flex size-10 items-center justify-center rounded-full cursor-pointer ${selectedVariant}`}
        >
            <Icon className={iconClassName} />
        </button>
    )
}
