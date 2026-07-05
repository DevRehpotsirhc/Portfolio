import { useEffect, useState, useRef } from "react";
import { Welcome } from "../components/layouts/Welcome";
import { Header } from "../components/layouts/Header"
import { Footer } from "../components/layouts/Footer"
import { ExperienceTimeline } from "../components/layouts/ExperienceTimeline"


export const Page = () => {
    const contactRef = useRef(null)
    const [showHeader, setShowHeader] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setShowHeader(!entry.isIntersecting)
            },
            { threshold: 0.1 }
        )

        if (contactRef.current) observer.observe(contactRef.current)

        return () => observer.disconnect()
    }, [])

    return (
        <>
            <Header
                about="#about"
                experience="#experience"
                showHeader={showHeader}
                className={`${showHeader ? "animation-open" : "-translate-y-25 transform transition-all duration-300"}`}
            />

            <Welcome redirectUrl={"#experience"} contactRef={contactRef} />
            <ExperienceTimeline />
            <Footer />
        </>
    )
}