import { useRef } from "react"
import { useInView } from "../../hooks/useInView"

/**
 * Reveals its content the first time it scrolls into view.
 * `from`: "up" (default) | "left" | "right"
 * `delay`: milliseconds, used for short sibling staggers.
 */
export const Reveal = ({ as = "div", from = "up", delay = 0, className = "", style, children, ...props }) => {
    const Component = as
    const ref = useRef(null)
    const inView = useInView(ref)

    return (
        <Component
            ref={ref}
            data-reveal={from}
            data-visible={inView ? "true" : "false"}
            className={`reveal ${className}`.trim()}
            style={{ ...style, "--reveal-delay": `${delay}ms` }}
            {...props}
        >
            {children}
        </Component>
    )
}
