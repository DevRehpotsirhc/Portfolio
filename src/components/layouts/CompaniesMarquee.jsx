import { useEffect, useMemo, useState } from "react"
import expertosLogo from "../../assets/expertos.svg"
import ibmLogo from "../../assets/ibm.svg"
import senaLogo from "../../assets/sena.svg"

const companiesMarqueeData = {
    3: {
        name: "Expertos Consulting",
        image: expertosLogo
    },
    2: {
        name: "IBM",
        image: ibmLogo
    },
    1: {
        name: "SENA",
        image: senaLogo
    }
}

const normalizeCompanies = (data) => {
    if (!data || typeof data !== "object") {
        return []
    }

    return Object.entries(data)
        .map(([order, item]) => ({
            order: Number(order),
            name: item?.name || "",
            image: item?.image || ""
        }))
        .filter((item) => Number.isFinite(item.order) && item.name)
        .sort((a, b) => b.order - a.order)
}

const buildMarqueeItems = (companies, minItems = 8) => {
    if (!companies.length) {
        return []
    }

    const repeated = []

    while (repeated.length < minItems) {
        repeated.push(...companies)
    }

    return repeated.slice(0, Math.max(minItems, companies.length))
}

const CompanyLogo = ({ company }) => {
    if (!company.image) {
        return (
            <span className="rounded-md border border-secundary-500/50 p-1 text-xs font-semibold uppercase tracking-[0.2em] text-secundary-500 dark:border-secundary-300/50 dark:text-secundary-300">
                {company.name}
            </span>
        )
    }

    return <img src={company.image} alt={company.name} className="block h-10 w-24 object-contain sm:h-11 sm:w-28" />
}

export const CompaniesMarquee = ({ data = companiesMarqueeData }) => {
    const [viewportWidth, setViewportWidth] = useState(1920)
    const companies = normalizeCompanies(data)

    useEffect(() => {
        const updateViewportWidth = () => {
            setViewportWidth(window.innerWidth)
        }

        updateViewportWidth()
        window.addEventListener("resize", updateViewportWidth)

        return () => window.removeEventListener("resize", updateViewportWidth)
    }, [])

    const itemsPerSet = useMemo(() => {
        const minSlotWidth = 120
        const minVisibleTrack = Math.ceil((viewportWidth * 1.25) / minSlotWidth)

        return Math.max(companies.length * 4, minVisibleTrack)
    }, [companies.length, viewportWidth])

    const setItems = buildMarqueeItems(companies, itemsPerSet)

    if (!setItems.length) {
        return null
    }

    return (
        <section aria-label="Companies" className="relative my-2 w-full overflow-hidden py-2">
            <span className="pointer-events-none absolute inset-x-0 top-0.75 h-1 bg-medium-500/70 dark:bg-secundary-300/70" />
            <span className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-medium-500/70 dark:bg-secundary-300/70" />

            <div className="overflow-hidden">
                <div className="company-marquee-track flex w-max items-center">
                    {[0, 1].map((setIndex) => (
                        <div key={`set-${setIndex}`} className="company-marquee-set flex items-center gap-0">
                            {setItems.map((company, index) => (
                                <div key={`${setIndex}-${company.name}-${index}`} className="flex h-12 w-30 shrink-0 items-center justify-center sm:h-12 sm:w-36">
                                    <CompanyLogo company={company} />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <span className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 bg-medium-500/70 dark:bg-secundary-300/70" />
            <span className="pointer-events-none absolute inset-x-0 bottom-0.78 h-1 bg-medium-500/70 dark:bg-secundary-300/70" />
        </section>
    )
}
