import { useEffect, useState } from "react"

/**
 * Tracks whether an element has entered the viewport.
 * With `once` (default) it stays true after the first intersection.
 * Falls back to "visible" when IntersectionObserver is unavailable.
 */
export const useInView = (ref, { once = true, rootMargin = "0px 0px -12% 0px", threshold = 0.1 } = {}) => {
    const [inView, setInView] = useState(() => typeof IntersectionObserver === "undefined")

    useEffect(() => {
        const element = ref.current
        if (!element || typeof IntersectionObserver === "undefined") return undefined

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true)
                    if (once) observer.disconnect()
                } else if (!once) {
                    setInView(false)
                }
            },
            { rootMargin, threshold }
        )

        observer.observe(element)
        return () => observer.disconnect()
    }, [ref, once, rootMargin, threshold])

    return inView
}
