import { useSyncExternalStore } from "react"

const QUERY = "(prefers-reduced-motion: reduce)"

const subscribe = (callback) => {
    if (typeof window === "undefined" || !window.matchMedia) return () => {}
    const media = window.matchMedia(QUERY)
    media.addEventListener?.("change", callback)
    return () => media.removeEventListener?.("change", callback)
}

const getSnapshot = () =>
    typeof window !== "undefined" && window.matchMedia ? window.matchMedia(QUERY).matches : false

/** Returns true when the visitor asked the OS for reduced motion. */
export const useReducedMotion = () => useSyncExternalStore(subscribe, getSnapshot, () => false)

/** Non-hook check for event handlers. */
export const prefersReducedMotion = getSnapshot
