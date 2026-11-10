import { ChevronLeft, ChevronRight } from "lucide-react"

const variantStyles = {
    project: "border border-medium-500 bg-medium-400 text-white hover:bg-medium-500 dark:border-secundary-700 dark:bg-secundary-600 dark:hover:bg-secundary-700",
    image: "border border-secundary-300/70 bg-background-light text-dark hover:bg-secundary-100 dark:border-secundary-700 dark:bg-background-dark dark:text-slate-100 dark:hover:bg-secundary-700/60",
    // Compact control that sits on top of an image (used by the slide pager)
    overlay: "text-white hover:bg-white/20"
}

const sizeStyles = {
    md: "size-10",
    sm: "size-8"
}

export const ArrowControlButton = ({
    direction = "left",
    onClick,
    ariaLabel,
    variant = "project",
    size = "md",
    iconClassName = "size-5",
    disabled = false,
    type = "button"
}) => {
    const Icon = direction === "right" ? ChevronRight : ChevronLeft
    const selectedVariant = variantStyles[variant] || variantStyles.project

    return (
        <button
            type={type}
            aria-label={ariaLabel}
            onClick={onClick}
            disabled={disabled}
            className={`inline-flex ${sizeStyles[size] || sizeStyles.md} shrink-0 items-center justify-center rounded-full cursor-pointer transition-[color,background-color,border-color,scale,opacity] duration-200 active:scale-90 active:duration-75 disabled:cursor-default disabled:opacity-35 disabled:hover:bg-transparent disabled:active:scale-100 ${selectedVariant}`}
        >
            <Icon className={iconClassName} />
        </button>
    )
}
