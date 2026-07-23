import { useState } from "react"
import { Alert } from "../ui/Alert"

export const ProjectModalContent = ({ project }) => {
    const [showPrivateAlert, setShowPrivateAlert] = useState(false)

    if (!project) {
        return null
    }

    return (
        <section className="space-y-5">
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                {project.longDescription}
            </p>

            {project.stack?.length ? (
                <article>
                    <h5 className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-medium-500 dark:text-secundary-300">
                        Stack
                    </h5>
                    <ul className="flex flex-wrap gap-2">
                        {project.stack.map((item) => (
                            <li
                                key={`${project.id}-${item}`}
                                className="rounded-lg border border-slate-300 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                </article>
            ) : null}

            {project.highlights?.length ? (
                <article>
                    <h5 className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-medium-500 dark:text-secundary-300">
                        Highlights
                    </h5>
                    <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                        {project.highlights.map((item) => (
                            <li key={`${project.id}-${item}`} className="rounded-lg border border-slate-300/70 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900/40">
                                {item}
                            </li>
                        ))}
                    </ul>
                </article>
            ) : null}

            {project.collections?.length ? (
                <article>
                    <h5 className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-medium-500 dark:text-secundary-300">
                        Collection
                    </h5>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                        {project.collections.map((image, index) => {
                            const collageClass = index % 5 === 0
                                ? "sm:col-span-2 sm:row-span-2"
                                : index % 5 === 3
                                    ? "sm:col-span-2"
                                    : ""

                            return (
                                <figure
                                    key={`${project.id}-collection-${index}`}
                                    className={`group relative min-h-24 overflow-hidden rounded-xl border border-slate-300/70 bg-slate-100 dark:border-slate-700 dark:bg-slate-900/40 ${collageClass}`}
                                >
                                    <img
                                        src={image}
                                        alt={`${project.name} collection ${index + 1}`}
                                        loading="lazy"
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </figure>
                            )
                        })}
                    </div>
                </article>
            ) : null}

            {project.links?.length ? (
                <article>
                    <h5 className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-medium-500 dark:text-secundary-300">
                        Links
                    </h5>
                    <div className="flex flex-wrap gap-2">
                        {project.links.map((link, index) => {
                            const isPrivate = Boolean(link.isPrivate)

                            return (
                                <a
                                    key={`${project.id}-${link.href || link.label}-${index}`}
                                    href={isPrivate ? "#" : link.href}
                                    target={isPrivate ? undefined : "_blank"}
                                    rel={isPrivate ? undefined : "noreferrer"}
                                    onClick={(event) => {
                                        if (!isPrivate) {
                                            return
                                        }

                                        event.preventDefault()
                                        setShowPrivateAlert(true)
                                    }}
                                    className="rounded-lg border border-medium-500/80 bg-medium-500 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-medium-600 dark:border-secundary-600 dark:bg-secundary-600 dark:hover:bg-secundary-700"
                                >
                                    {link.label}
                                </a>
                            )
                        })}
                    </div>
                </article>
            ) : null}

            <Alert
                isOpen={showPrivateAlert}
                onClose={() => setShowPrivateAlert(false)}
                title="Private link"
                message="This link is private and cannot be accessed right now."
            />
        </section>
    )
}
