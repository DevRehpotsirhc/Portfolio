import { useState } from "react"
import { Card } from "../ui/Card"
import { Modal } from "../ui/Modal"

const getAssetUrl = (fileName) => new URL(`../../assets/${fileName}.svg`, import.meta.url).href

const tech = (name, asset, light, dark, keepOriginalColors = false) => ({
    name,
    iconPath: getAssetUrl(asset),
    colors: { light, dark },
    keepOriginalColors
})

const technicalCatalog = {
    Main: [
        tech("Python", "python", "#FDE68A", "#306998"),
        tech("Pandas", "pandas", "#DDD6FE", "#5B21B6"),
        tech("Scikit-Learn", "scikitlearn", "#FED7AA", "#EA580C"),
        tech("Jupyter Notebook", "jupyter", "#FDBA74", "#C2410C"),
        tech("Plotly", "plotly", "#C7D2FE", "#4338CA")
    ],
    Backend: [
        tech("Python", "python", "#FDE68A", "#306998"),
        tech("Django REST framework", "django", "#BBF7D0", "#166534"),
        tech("MongoEngine", "mongodb", "#86EFAC", "#166534"),
        tech("JWT", "jwt", "#CBD5E1", "#334155")
    ],
    Databases: [
        tech("PostgreSQL", "postgresql", "#BFDBFE", "#1D4ED8"),
        tech("MongoDB", "mongodb", "#86EFAC", "#166534"),
        tech("MySQL", "mysql", "#A5F3FC", "#0F766E")
    ],
    "Data Analysis": [
        tech("Pandas", "pandas", "#DDD6FE", "#5B21B6"),
        tech("NumPy", "numpy", "#BAE6FD", "#0369A1"),
        tech("Matplotlib", "matplotlib", "#D9F99D", "#4D7C0F"),
        tech("Seaborn", "seaborn", "#BFDBFE", "#1E40AF"),
        tech("Plotly", "plotly", "#C7D2FE", "#4338CA"),
        tech("Jupyter Notebook", "jupyter", "#FDBA74", "#C2410C"),
        tech("Google Colab", "googlecolab", "#FDE68A", "#A16207")
    ],
    "Machine Learning": [
        tech("Scikit-Learn", "scikitlearn", "#FED7AA", "#EA580C"),
        tech("PyTorch", "pytorch", "#FECACA", "#DC2626"),
        tech("Transformers", "huggingface", "#FEF08A", "#CA8A04"),
        tech("MLFlow", "mlflow", "#E8F5E9", "#0097A7")
    ],
    Frontend: [
        tech("JavaScript", "javascript", "#FDE047", "#A16207"),
        tech("React", "react", "#A5F3FC", "#0891B2"),
        tech("HTML5", "html5", "#FDBA74", "#EA580C"),
        tech("CSS3", "css3", "#93C5FD", "#2563EB"),
        tech("Tailwind", "tailwindcss", "#99F6E4", "#0F766E"),
        tech("Maizzel", "maizzle", "#C4B5FD", "#6D28D9"),
        tech("Chart.js", "chartjs", "#F9A8D4", "#BE185D")
    ],
    Testing: [
        tech("PyTest", "pytest", "#99F6E4", "#0F766E"),
        tech("Selenium", "selenium", "#86EFAC", "#15803D"),
        tech("Playwright", "playwright", "#A7F3D0", "#047857"),
        tech("Storybooks", "storybook", "#FDA4AF", "#E11D48"),
        tech("Postman", "postman", "#FDBA74", "#EA580C")
    ],
    "DevOps / Tools": [
        tech("Docker", "docker", "#93C5FD", "#2563EB"),
        tech("Git", "git", "#FDBA74", "#C2410C"),
        tech("GitHub", "github", "#CBD5E1", "#1E293B")
    ],
    "Spreadsheets and BI": [
        tech("Excel", "microsoftexcel", "#86EFAC", "#15803D"),
        tech("Power BI", "powerbi", "#FDE68A", "#CA8A04")
    ],
    Others: [
        tech("Bash", "gnubash", "#86EFAC", "#15803D"),
        tech("Swagger", "swagger", "#D9F99D", "#65A30D"),
        tech("C#", "csharp", "#D8B4FE", "#7E22CE"),
        tech(".NET Framework", "dotnet", "#C4B5FD", "#6D28D9"),
        tech("PHP", "php", "#C7D2FE", "#4338CA"),
        tech("VisualBasic", "visualbasic", "#DDD6FE", "#7C3AED"),
        tech("Draw.io", "diagramsdotnet", "#FDBA74", "#EA580C"),
        tech("Photoshop", "adobephotoshop", "#93C5FD", "#2563EB"),
        tech("Davinci Resolve", "davinciresolve", "#A5B4FC", "#4F46E5"),
        tech("n8n", "n8n", "#FDA4AF", "#E11D48")
    ]
}

const technicalMain = technicalCatalog.Main
const technicalCategories = Object.entries(technicalCatalog).filter(([groupName]) => groupName !== "Main")

export const TechnicalSkills = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const closeModal = () => setIsModalOpen(false)

    return (
        <>
            <article className="rounded-2xl border border-slate-300/80 bg-white/80 p-5 shadow-md shadow-slate-300/40 backdrop-blur-sm dark:border-dark/60 dark:bg-dark/30 dark:shadow-secundary-900/30">
                <header className="mb-4">
                    <h3 className="text-lg font-semibold text-dark dark:text-white">Technical skills</h3>
                </header>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
                    {technicalMain.map(({ name, iconPath, colors, keepOriginalColors }) => (
                        <Card
                            key={name}
                            className="group min-h-28 justify-center gap-2 rounded-xl px-3 py-4 transition-all duration-200"
                            lightModeBgColor={colors.light}
                            darkModeBgColor={colors.dark}
                        >
                            <img
                                src={iconPath}
                                alt={`${name} logo`}
                                className={`mb-1 size-14 object-contain ${keepOriginalColors ? "" : "brightness-0 dark:invert"}`}
                                loading="lazy"
                            />
                            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200"><span translate="no">{name}</span></p>
                        </Card>
                    ))}

                    <Card
                        as="button"
                        type="button"
                        title="Open all technical skills"
                        onClick={() => setIsModalOpen(true)}
                        className="group flex min-h-25 items-center justify-center text-center transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
                    >
                        <p className="text-xl">Show All...</p>
                    </Card>
                </div>
            </article>

            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                subtitle="All Technologies"
                title="Technical skills by category"
                ariaLabel="Technical skills by category"
            >
                {technicalCategories.map(([groupName, stack]) => (
                    <section key={groupName}>
                        <h5 className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-slate-700 dark:text-slate-200">{groupName}</h5>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                            {stack.map(({ name, iconPath, colors, keepOriginalColors }) => (
                                <Card
                                    key={`${groupName}-${name}`}
                                    className="min-h-24 justify-center gap-2 rounded-xl px-3 py-3"
                                    lightModeBgColor={colors.light}
                                    darkModeBgColor={colors.dark}
                                >
                                    <img
                                        src={iconPath}
                                        alt={`${name} logo`}
                                        className={`size-12 object-contain ${keepOriginalColors ? "" : "brightness-0 dark:invert"}`}
                                        loading="lazy"
                                    />
                                    <p className="text-xs font-medium text-slate-700 dark:text-slate-200"><span translate="no">{name}</span></p>
                                </Card>
                            ))}
                        </div>
                    </section>
                ))}
            </Modal>
        </>
    )
}
