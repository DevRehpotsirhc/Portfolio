import { useEffect, useState } from "react"

/**
 * Returns the id of the section currently crossing the middle band of the viewport.
 * `ids` are element ids without the leading "#".
 */
export const useScrollSpy = (ids) => {
    const [activeId, setActiveId] = useState("")
    const key = ids.join("|")

    useEffect(() => {
        if (typeof IntersectionObserver === "undefined") return undefined
        const elements = key.split("|").map((id) => document.getElementById(id)).filter(Boolean)
        if (!elements.length) return undefined

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries.filter((entry) => entry.isIntersecting)
                if (visible.length) setActiveId(visible[0].target.id)
            },
            { rootMargin: "-45% 0px -50% 0px" }
        )

        elements.forEach((element) => observer.observe(element))
        return () => observer.disconnect()
    }, [key])

    return activeId
}
