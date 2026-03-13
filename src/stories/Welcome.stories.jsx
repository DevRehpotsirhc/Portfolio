import { useEffect, useState, useRef } from "react";
import { Welcome } from "../components/layouts/Welcome";
import { Header } from "../components/layouts/Header"
import { Footer } from "../components/layouts/Footer"

export default {
    title: "Layouts/Welcome",
    component: Welcome,
    parameters: {
        layout: "fullscreen",
        viewport: {
            defaultViewport: "responsive",
        },
    },
};

export const Default = () => {
    return (
        <div className="sticky min-h-dvh size-full bg-background-light dark:bg-background-dark">
            <Welcome />
        </div>
    )
}

export const Content = () => {
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
        <div className="sticky min-h-dvh size-full bg-background-light dark:bg-background-dark overflow-hidden">
            <Header showHeader={showHeader} className={`${showHeader ? "animation-open" : "-translate-y-25 transform transition-all duration-300"}`} />

            <Welcome contactRef={contactRef} />

            <h1 id="redirect">Redirect</h1>
            <p className="text-black dark:text-white">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur asperiores ad a, sed suscipit, alias iure dolorem rerum odio eum incidunt doloremque non aliquid omnis nobis in harum, magnam facere.
                Explicabo odit quas hic! Dolorem vitae rem facilis quam doloremque. Nemo perferendis fugit harum ad earum quia qui pariatur similique. Eum perspiciatis culpa veniam voluptates asperiores eos accusamus illum incidunt.
            </p>
            <div className="block h-dvh w-full"></div>
            <Footer />
        </div>
    )
}
