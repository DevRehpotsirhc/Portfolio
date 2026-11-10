import { useEffect, useState } from "react"

/**
 * Keeps an element mounted long enough to play its exit animation.
 *
 * - `mounted`: render the element while this is true.
 * - `state`: "enter" while opening/open, "exit" while closing.
 *   Use it as a data attribute and let CSS run the matching animation.
 */
export const usePresence = (isOpen, exitMs = 200) => {
    const [mounted, setMounted] = useState(isOpen)
    const [prevOpen, setPrevOpen] = useState(isOpen)

    // Mount synchronously when opening (adjusting state during render, per React docs).
    if (isOpen !== prevOpen) {
        setPrevOpen(isOpen)
        if (isOpen) setMounted(true)
    }

    useEffect(() => {
        if (isOpen || !mounted) return undefined
        const timeout = window.setTimeout(() => setMounted(false), exitMs)
        return () => window.clearTimeout(timeout)
    }, [isOpen, mounted, exitMs])

    return { mounted: isOpen || mounted, state: isOpen ? "enter" : "exit" }
}
