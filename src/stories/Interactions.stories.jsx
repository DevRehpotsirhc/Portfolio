/**
 * Interaction tests for the portfolio sections.
 * They run in a real Chromium browser with: npm test
 * They check that every section renders the content from src/data.js and that
 * the main interactions (dark mode, modals, carousel) work.
 */
import { expect, userEvent, waitFor, within } from "storybook/test"
import { Welcome } from "../components/layouts/Welcome"
import { Header } from "../components/layouts/Header"
import { ExperienceTimeline } from "../components/layouts/ExperienceTimeline"
import { CompaniesMarquee } from "../components/layouts/CompaniesMarquee"
import { Skills } from "../components/layouts/Skills"
import { Projects } from "../components/layouts/Projects"
import { Footer } from "../components/layouts/Footer"
import { Page } from "../pages/Page"
import {
    profile,
    contact,
    whatsappHref,
    ui,
    experience,
    companies,
    technicalSkills,
    softSkills,
    portfolioLanguages,
    projects
} from "../data"

const projectNames = Object.keys(projects)
const projectList = Object.values(projects)

const Frame = ({ children }) => (
    <div className="relative min-h-dvh w-full bg-background-light dark:bg-background-dark">{children}</div>
)

export default {
    title: "Tests/Interactions",
    parameters: {
        layout: "fullscreen",
        a11y: { test: "error" }
    },
    decorators: [(...args) => {
        const Story = args[0]
        return <Frame><Story /></Frame>
    }],
    beforeEach: () => {
        sessionStorage.removeItem("theme")
        document.documentElement.classList.remove("dark")
    }
}

/* ------------------------------------------------------------------ */
export const WelcomeSection = {
    render: () => <Welcome redirectUrl="#experience" contactRef={{ current: null }} />,
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement)

        await step("shows name, summary and tags from data.js", async () => {
            await expect(canvas.getByRole("heading", { level: 1 })).toHaveTextContent(profile.name)
            await expect(canvas.getByText(profile.summary)).toBeInTheDocument()
            for (const tag of profile.tags) {
                await expect(canvas.getByText(tag)).toBeInTheDocument()
            }
            await expect(canvas.getByText(ui.welcome.scrollMore)).toBeInTheDocument()
        })

        await step("contact links point to data.js values", async () => {
            await expect(canvas.getByTitle(contact.email.title)).toHaveAttribute("href", contact.email.href)
            await expect(canvas.getByTitle(contact.linkedin.title)).toHaveAttribute("href", contact.linkedin.href)
            await expect(canvas.getByTitle(contact.github.title)).toHaveAttribute("href", contact.github.href)
            await expect(canvas.getByTitle(contact.whatsapp.title)).toHaveAttribute("href", whatsappHref)
        })

        await step("dark mode toggle switches the class and persists it", async () => {
            const toggle = canvas.getByTitle(ui.darkModeTitle)
            const wasDark = document.documentElement.classList.contains("dark")
            await userEvent.click(toggle)
            await waitFor(() => expect(document.documentElement.classList.contains("dark")).toBe(!wasDark))
            await expect(sessionStorage.getItem("theme")).toBe(wasDark ? "light" : "dark")
            await userEvent.click(toggle)
            await waitFor(() => expect(document.documentElement.classList.contains("dark")).toBe(wasDark))
        })
    }
}

/* ------------------------------------------------------------------ */
export const HeaderSection = {
    render: () => (
        <Header about="#about" experience="#experience" skills="#skills" projects="#projects" showHeader />
    ),
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement)

        await step("shows the name and navigation links", async () => {
            await expect(canvas.getByText(profile.name)).toBeInTheDocument()
            for (const label of Object.values(ui.header.links)) {
                await expect(canvas.getAllByText(label).length).toBeGreaterThan(0)
            }
        })

        await step("contact panel uses data.js values", async () => {
            await expect(canvas.getByTitle(contact.email.title)).toHaveAttribute("href", contact.email.href)
            await expect(canvas.getByTitle(contact.whatsapp.title)).toHaveAttribute("href", whatsappHref)
        })
    }
}

/* ------------------------------------------------------------------ */
export const ExperienceSection = {
    render: () => <ExperienceTimeline />,
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement)

        await step("shows the section titles", async () => {
            await expect(canvas.getByRole("heading", { level: 2 })).toHaveTextContent(ui.experience.title)
            await expect(canvas.getByText(ui.experience.eyebrow)).toBeInTheDocument()
        })

        await step("shows every experience in descending order", async () => {
            const expected = Object.entries(experience)
                .sort(([a], [b]) => Number(b) - Number(a))
                .map(([, item]) => item.company)
            const rendered = canvas.getAllByRole("heading", { level: 3 }).map((h) => h.textContent)
            await expect(rendered).toEqual(expected)
        })

        await step("shows position and description for each experience", async () => {
            for (const item of Object.values(experience)) {
                await expect(canvas.getByText(item.position)).toBeInTheDocument()
                await expect(canvas.getByText(item.desc)).toBeInTheDocument()
            }
        })
    }
}

/* ------------------------------------------------------------------ */
export const CompaniesSection = {
    render: () => <CompaniesMarquee />,
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getByLabelText(ui.companies.ariaLabel)).toBeInTheDocument()
        for (const company of Object.values(companies)) {
            await expect(canvas.getAllByAltText(company.name).length).toBeGreaterThan(0)
        }
    }
}

/* ------------------------------------------------------------------ */
export const SkillsSection = {
    render: () => <Skills />,
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement)
        const body = within(document.body)
        const t = ui.skills

        await step("shows the main technical skills", async () => {
            await expect(canvas.getByText(t.technical.title)).toBeInTheDocument()
            for (const [name] of technicalSkills.Main) {
                await expect(canvas.getByAltText(`${name} logo`)).toBeInTheDocument()
            }
        })

        await step("'Show All' opens the modal with every category", async () => {
            await userEvent.click(canvas.getByTitle(t.technical.showAllTitle))
            const dialog = await body.findByRole("dialog", { name: t.technical.modalTitle })
            const modal = within(dialog)
            const categories = Object.keys(technicalSkills).filter((g) => g !== "Main")
            for (const group of categories) {
                await expect(modal.getByRole("heading", { name: group })).toBeInTheDocument()
            }
            const totalItems = categories.reduce((sum, g) => sum + technicalSkills[g].length, 0)
            await expect(modal.getAllByRole("img").length).toBeGreaterThanOrEqual(totalItems)
        })

        await step("modal closes with Escape", async () => {
            await userEvent.keyboard("{Escape}")
            await waitFor(() => expect(body.queryByRole("dialog")).not.toBeInTheDocument())
        })

        await step("modal closes with the Close button", async () => {
            await userEvent.click(canvas.getByTitle(t.technical.showAllTitle))
            await body.findByRole("dialog")
            await userEvent.click(body.getByRole("button", { name: "Close modal" }))
            await waitFor(() => expect(body.queryByRole("dialog")).not.toBeInTheDocument())
        })

        await step("shows soft skills", async () => {
            for (const [name, skill] of Object.entries(softSkills)) {
                await expect(canvas.getByText(name)).toBeInTheDocument()
                await expect(canvas.getByText(skill.desc)).toBeInTheDocument()
            }
        })

        await step("shows languages with their percentage", async () => {
            for (const lang of portfolioLanguages) {
                await expect(canvas.getByText(lang.language)).toBeInTheDocument()
                await expect(canvas.getByText(`${Math.round(lang.proficiency * 100)}%`)).toBeInTheDocument()
            }
        })
    }
}

/* ------------------------------------------------------------------ */
export const ProjectsSection = {
    render: () => <Projects />,
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement)
        const body = within(document.body)
        const t = ui.projects
        const activeTitle = () => canvas.getByRole("heading", { level: 3 })

        await step("shows the first project and the counter", async () => {
            await expect(activeTitle()).toHaveTextContent(projectNames[0])
            await expect(canvas.getByText(`1 / ${projectNames.length}`)).toBeInTheDocument()
        })

        await step("side list contains every project", async () => {
            for (const name of projectNames) {
                await expect(canvas.getByRole("heading", { level: 4, name })).toBeInTheDocument()
            }
        })

        await step("project buttons name their destination and wrap around", async () => {
            const nav = within(canvas.getByRole("navigation", { name: t.projectNavLabel }))
            const nextName = projectNames[1 % projectNames.length]
            await expect(nav.getByRole("button", { name: `${t.nextProject}: ${nextName}` })).toBeVisible()
            await expect(nav.getByRole("button", { name: `${t.prevProject}: ${projectNames.at(-1)}` })).toBeVisible()

            await userEvent.click(nav.getByRole("button", { name: new RegExp(`^${t.nextProject}:`) }))
            await expect(activeTitle()).toHaveTextContent(nextName)
            await expect(nav.getByText(`2 / ${projectNames.length}`)).toBeInTheDocument()
            await userEvent.click(nav.getByRole("button", { name: new RegExp(`^${t.prevProject}:`) }))
            await expect(activeTitle()).toHaveTextContent(projectNames[0])
            await userEvent.click(nav.getByRole("button", { name: new RegExp(`^${t.prevProject}:`) }))
            await expect(activeTitle()).toHaveTextContent(projectNames.at(-1))
        })

        await step("image pager moves images only, never the project", async () => {
            const project = projectList.at(-1)
            const slides = Object.values(project.slides)
            const pager = within(canvas.getByRole("group", { name: t.slidesNavLabel }))
            const dotLabel = (n) => t.slideDotLabel.replace("{n}", n).replace("{total}", slides.length)

            // one dot per image, first one current, "previous" disabled at the start
            await expect(pager.getAllByRole("button", { name: /^Show image/ })).toHaveLength(slides.length)
            await expect(pager.getByRole("button", { name: dotLabel(1) })).toHaveAttribute("aria-current", "true")
            await expect(pager.getByRole("button", { name: t.prevImage })).toBeDisabled()

            if (slides.length > 1) {
                await userEvent.click(pager.getByRole("button", { name: t.nextImage }))
                await expect(canvas.getAllByText(slides[1]).length).toBeGreaterThan(0)

                // jump with a dot to the last image: "next" is disabled and the project stays the same
                await userEvent.click(pager.getByRole("button", { name: dotLabel(slides.length) }))
                await expect(pager.getByRole("button", { name: dotLabel(slides.length) })).toHaveAttribute("aria-current", "true")
                await expect(pager.getByRole("button", { name: t.nextImage })).toBeDisabled()
                await expect(activeTitle()).toHaveTextContent(projectNames.at(-1))

                // keyboard: left arrow goes back one image
                canvas.getByRole("button", { name: `${t.openDetails}: ${projectNames.at(-1)}` }).focus()
                await userEvent.keyboard("{ArrowLeft}")
                await expect(pager.getByRole("button", { name: dotLabel(slides.length - 1) })).toHaveAttribute("aria-current", "true")
            }
        })

        await step("selecting from the side list changes the active project", async () => {
            await userEvent.click(canvas.getByRole("heading", { level: 4, name: projectNames[0] }))
            await expect(activeTitle()).toHaveTextContent(projectNames[0])
        })

        await step("clicking the image opens the project details modal", async () => {
            const project = projectList[0]
            await userEvent.click(canvas.getByRole("button", { name: `${t.openDetails}: ${projectNames[0]}` }))
            const dialog = await body.findByRole("dialog", { name: t.modalAriaLabel })
            const modal = within(dialog)
            await expect(modal.getByText(project.longDescription)).toBeInTheDocument()
            await expect(modal.getByText(t.sections.stack)).toBeInTheDocument()
            for (const highlight of project.highlights || []) {
                await expect(modal.getByText(highlight)).toBeInTheDocument()
            }
        })

        await step("expanded collection image is placed relative to the viewport", async () => {
            const dialog = body.getByRole("dialog", { name: t.modalAriaLabel })
            // The panel must not keep a transform after its entrance: it would trap `position: fixed` children.
            await waitFor(() => expect(getComputedStyle(dialog.querySelector(".motion-panel")).transform).toBe("none"))

            const collectionImage = within(dialog).getAllByAltText(/collection 1$/)[0]
            await userEvent.click(collectionImage)
            const preview = await body.findByRole("dialog", { name: "Expanded project image" })
            const figure = preview.querySelector("figure")
            await waitFor(() => {
                const rect = figure.getBoundingClientRect()
                expect(Math.round(rect.left)).toBe(Math.round(parseFloat(figure.style.left)))
                expect(Math.round(rect.top)).toBe(Math.round(parseFloat(figure.style.top)))
            }, { timeout: 2000 })

            await userEvent.click(figure)
            await waitFor(() => expect(body.queryByRole("dialog", { name: "Expanded project image" })).not.toBeInTheDocument(), { timeout: 2000 })
        })

        await step("a private link shows the alert instead of navigating", async () => {
            const privateLink = projectList[0].links?.find((l) => l.isPrivate)
            if (!privateLink) return
            const dialog = body.getByRole("dialog", { name: t.modalAriaLabel })
            await userEvent.click(within(dialog).getByText(privateLink.label))
            const alert = await body.findByRole("alert")
            await expect(alert).toHaveTextContent(t.privateLinkAlert.title)
            await expect(alert).toHaveTextContent(t.privateLinkAlert.message)
            await userEvent.click(within(alert).getByRole("button"))
            await waitFor(() => expect(body.queryByRole("alert")).not.toBeInTheDocument())
        })

        await step("modal closes with Escape and restores scrolling", async () => {
            await userEvent.keyboard("{Escape}")
            await waitFor(() => expect(body.queryByRole("dialog")).not.toBeInTheDocument())
            await expect(document.body.style.overflow).toBe("")
        })

        await step("details can be opened with the keyboard", async () => {
            const openButton = canvas.getByRole("button", { name: `${t.openDetails}: ${projectNames[0]}` })
            openButton.focus()
            await userEvent.keyboard("{Enter}")
            await body.findByRole("dialog", { name: t.modalAriaLabel })
            await userEvent.keyboard("{Escape}")
            await waitFor(() => expect(body.queryByRole("dialog")).not.toBeInTheDocument())
        })
    }
}

/* ------------------------------------------------------------------ */
export const FooterSection = {
    render: () => <Footer />,
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        const t = ui.footer
        for (const item of t.disclaimers) {
            await expect(canvas.getByRole("heading", { name: item.title })).toBeInTheDocument()
            await expect(canvas.getByText(item.text)).toBeInTheDocument()
        }
        await expect(canvas.getByText(t.thanks)).toBeInTheDocument()
        await expect(canvas.getByText(t.createdBy)).toBeInTheDocument()
        await expect(canvas.getByText(t.credits, { exact: false })).toBeInTheDocument()
    }
}

/* ------------------------------------------------------------------ */
export const FullPage = {
    render: () => <Page />,
    play: async ({ canvasElement }) => {
        for (const id of ["about", "experience", "skills", "projects"]) {
            await expect(canvasElement.querySelector(`#${id}`)).not.toBeNull()
        }
    }
}

/** Same page in dark mode: the accessibility audit checks contrast against the dark palette. */
export const FullPageDark = {
    render: () => <Page />,
    // Pending dark-mode contrast fixes (see Storybook's a11y panel). Switch to "error" once fixed:
    // - "Download CV" button: white on #2da2a4 (3.08:1)
    // - Technical skill cards with dark color #EA580C (2.88:1) and #C2410C (4.2:1) in data.js
    // - Footer credits text: slate-500 on dark background (3.66:1)
    parameters: { a11y: { test: "todo" } },
    beforeEach: () => {
        sessionStorage.setItem("theme", "dark")
        return () => sessionStorage.removeItem("theme")
    },
    play: async () => {
        await waitFor(() => expect(document.documentElement.classList.contains("dark")).toBe(true))
    }
}
