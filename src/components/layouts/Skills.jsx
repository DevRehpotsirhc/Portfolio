import { TechnicalSkills } from "./TechnicalSkills"
import { SoftSkills } from "./SoftSkills"
import { Languages } from "./Languages"
import { ui } from "../../data"

export const Skills = () => {
    return (
        <section id="skills" style={{ "--render-estimate": "1500px" }} className="defer-render mx-auto w-full max-w-7xl px-4 pt-12 sm:px-8">
            <div className="mb-8 mt-14 flex flex-col gap-2">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-medium-500 dark:text-secundary-300">{ui.skills.eyebrow}</p>
                <h2 className="text-2xl font-semibold text-dark dark:text-white sm:text-3xl">{ui.skills.title}</h2>
            </div>

            <div className="flex flex-col gap-10">
                <TechnicalSkills />
                <SoftSkills />
                <Languages />
            </div>
        </section>
    )
}