import { useEffect } from "react"

/**
 * Writes how far the viewport's reading line has travelled through an element
 * into the CSS variable `--scroll-progress` (0 → 1) on that element.
 * Updates through requestAnimationFrame and never re-renders React.
 *
 * It only listens to scroll while the element is near the viewport: reading the
 * layout of an off-screen section (which may be skipped by `content-visibility`)
 * on every scroll would force the browser to lay it out again and again.
 */
export const useScrollProgress = (ref, { readingLine = 0.6 } = {}) => {
    useEffect(() => {
        const element = ref.current
        if (!element) return undefined

        let frame = 0
        let listening = false

        const update = () => {
            frame = 0
            const rect = element.getBoundingClientRect()
            const line = window.innerHeight * readingLine
            const progress = Math.min(Math.max((line - rect.top) / Math.max(rect.height, 1), 0), 1)
            element.style.setProperty("--scroll-progress", progress.toFixed(4))
        }
        const schedule = () => {
            if (!frame) frame = window.requestAnimationFrame(update)
        }
        const listen = (on) => {
            if (on === listening) return
            listening = on
            if (on) {
                window.addEventListener("scroll", schedule, { passive: true })
                window.addEventListener("resize", schedule)
                schedule()
            } else {
                update() // settle the final value as the element leaves
                window.removeEventListener("scroll", schedule)
                window.removeEventListener("resize", schedule)
            }
        }

        let observer = null
        if (typeof IntersectionObserver === "undefined") {
            listen(true)
        } else {
            observer = new IntersectionObserver(([entry]) => listen(entry.isIntersecting), { rootMargin: "200px 0px" })
            observer.observe(element)
        }

        return () => {
            observer?.disconnect()
            listen(false)
            if (frame) window.cancelAnimationFrame(frame)
        }
    }, [ref, readingLine])
}
