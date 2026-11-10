import { describe, it, expect } from "vitest"
import { existsSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import {
    profile,
    contact,
    whatsappHref,
    ui,
    experience,
    companies,
    technicalSkills,
    softSkills,
    languages,
    projects,
    cv
} from "./data"

const assetsDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "assets")
const HEX = /^#[0-9A-Fa-f]{6}$/

const isNonEmptyString = (value) => typeof value === "string" && value.trim().length > 0

/** Walks an object and returns the paths of every empty string. */
const findEmptyStrings = (value, currentPath = "") => {
    if (typeof value === "string") {
        return value.trim() ? [] : [currentPath]
    }
    if (Array.isArray(value)) {
        return value.flatMap((item, i) => findEmptyStrings(item, `${currentPath}[${i}]`))
    }
    if (value && typeof value === "object") {
        return Object.entries(value).flatMap(([k, v]) => findEmptyStrings(v, `${currentPath}.${k}`))
    }
    return []
}

describe("profile", () => {
    it("has a name, summary and CV file name", () => {
        expect(isNonEmptyString(profile.name)).toBe(true)
        expect(isNonEmptyString(profile.summary)).toBe(true)
        expect(profile.cvFileName).toMatch(/\.pdf$/i)
    })

    it("has non-empty, unique tags", () => {
        expect(profile.tags.length).toBeGreaterThan(0)
        profile.tags.forEach((tag) => expect(isNonEmptyString(tag)).toBe(true))
        expect(new Set(profile.tags).size).toBe(profile.tags.length)
    })
})

describe("contact", () => {
    it("email is a valid mailto link", () => {
        expect(contact.email.href).toMatch(/^mailto:[^@\s]+@[^@\s]+\.[^@\s]+$/)
    })

    it("LinkedIn and GitHub are valid https URLs", () => {
        for (const key of ["linkedin", "github"]) {
            const url = new URL(contact[key].href)
            expect(url.protocol).toBe("https:")
        }
    })

    it("WhatsApp number contains only digits", () => {
        expect(contact.whatsapp.phone).toMatch(/^\d{8,15}$/)
    })

    it("WhatsApp link contains the number and a correctly encoded message", () => {
        const url = new URL(whatsappHref)
        expect(url.host).toBe("wa.me")
        expect(url.pathname).toBe(`/${contact.whatsapp.phone}`)
        expect(url.searchParams.get("text")).toBe(contact.whatsapp.message)
    })

    it("every contact title has text", () => {
        expect(findEmptyStrings(contact)).toEqual([])
    })
})

describe("ui", () => {
    it("has no empty strings", () => {
        expect(findEmptyStrings(ui)).toEqual([])
    })

    it("footer has at least one disclaimer with unique titles", () => {
        expect(ui.footer.disclaimers.length).toBeGreaterThan(0)
        const titles = ui.footer.disclaimers.map((d) => d.title)
        expect(new Set(titles).size).toBe(titles.length)
    })
})

describe("experience", () => {
    const entries = Object.entries(experience)

    it("order keys are numbers", () => {
        entries.forEach(([order]) => expect(Number.isFinite(Number(order))).toBe(true))
    })

    it.each(entries)("experience #%s has every field", (_, item) => {
        expect(isNonEmptyString(item.company)).toBe(true)
        expect(isNonEmptyString(item.years)).toBe(true)
        expect(isNonEmptyString(item.position)).toBe(true)
        expect(isNonEmptyString(item.desc)).toBe(true)
        expect(item.technologies.length).toBeGreaterThan(0)
        expect(new Set(item.technologies).size).toBe(item.technologies.length)
    })

    it.each(entries.filter(([, item]) => item.kpis))("experience #%s KPIs have a value and label", (_, item) => {
        expect(item.kpis.length).toBeGreaterThan(0)
        item.kpis.forEach((kpi) => {
            expect(isNonEmptyString(kpi.value)).toBe(true)
            expect(isNonEmptyString(kpi.label)).toBe(true)
        })
    })
})

describe("companies", () => {
    it.each(Object.entries(companies))("company #%s has a name and logo", (_, item) => {
        expect(isNonEmptyString(item.name)).toBe(true)
        expect(isNonEmptyString(item.image)).toBe(true)
    })

    it("every experience company appears in the marquee", () => {
        const companyNames = Object.values(companies).map((c) => c.name)
        Object.values(experience).forEach((item) => {
            expect(companyNames).toContain(item.company)
        })
    })
})

describe("technicalSkills", () => {
    it("has a non-empty Main category", () => {
        expect(technicalSkills.Main?.length).toBeGreaterThan(0)
    })

    const allItems = Object.entries(technicalSkills).flatMap(([group, items]) =>
        items.map((item) => [group, ...item])
    )

    it.each(allItems)("[%s] %s has a valid format and an existing icon", (group, name, asset, light, dark, keep) => {
        expect(isNonEmptyString(name)).toBe(true)
        expect(light).toMatch(HEX)
        expect(dark).toMatch(HEX)
        expect(keep === undefined || typeof keep === "boolean").toBe(true)
        expect(existsSync(path.join(assetsDir, `${asset}.svg`)), `missing src/assets/${asset}.svg`).toBe(true)
    })

    it.each(Object.entries(technicalSkills))("category %s has no duplicate skills", (_, items) => {
        const names = items.map(([name]) => name)
        expect(new Set(names).size).toBe(names.length)
    })
})

describe("softSkills", () => {
    it.each(Object.entries(softSkills))("%s has an icon, styles and description", (_, skill) => {
        expect(skill.icon).toBeTruthy()
        expect(isNonEmptyString(skill.iconClassName)).toBe(true)
        expect(isNonEmptyString(skill.desc)).toBe(true)
    })
})

describe("languages", () => {
    it.each(languages.map((l) => [l.language, l]))("%s has a level and proficiency between 0 and 1", (_, lang) => {
        expect(isNonEmptyString(lang.level)).toBe(true)
        expect(lang.proficiency).toBeGreaterThanOrEqual(0)
        expect(lang.proficiency).toBeLessThanOrEqual(1)
    })

    it("has no duplicate languages", () => {
        const names = languages.map((l) => l.language)
        expect(new Set(names).size).toBe(names.length)
    })
})

describe("projects", () => {
    const entries = Object.entries(projects)

    it("has at least one project", () => {
        expect(entries.length).toBeGreaterThan(0)
    })

    it("project IDs are unique", () => {
        const ids = entries.map(([, p]) => p.id)
        expect(new Set(ids).size).toBe(ids.length)
    })

    it.each(entries)("%s has the required fields", (_, project) => {
        expect(project.id).toMatch(/^[a-z0-9-]+$/)
        expect(isNonEmptyString(project.category)).toBe(true)
        expect(isNonEmptyString(project.longDescription)).toBe(true)
        expect(Object.keys(project.slides).length).toBeGreaterThan(0)
        Object.values(project.slides).forEach((desc) => expect(isNonEmptyString(desc)).toBe(true))
        if (project.slideDurationSeconds !== undefined) {
            expect(project.slideDurationSeconds).toBeGreaterThanOrEqual(1)
        }
    })

    it.each(entries)("%s has valid links", (_, project) => {
        ;(project.links || []).forEach((link) => {
            expect(isNonEmptyString(link.label)).toBe(true)
            if (!link.isPrivate) {
                expect(new URL(link.href).protocol).toBe("https:")
            }
        })
    })

    it.each(entries)("%s has no duplicate stack items or highlights", (_, project) => {
        const stack = project.stack || []
        const highlights = project.highlights || []
        expect(new Set(stack).size).toBe(stack.length)
        expect(new Set(highlights).size).toBe(highlights.length)
    })
})

describe("cv", () => {
    it("has the header fields", () => {
        for (const key of ["fullName", "headline", "location", "summary"]) {
            expect(isNonEmptyString(cv[key]), key).toBe(true)
        }
    })

    it("every CV skill category exists in technicalSkills", () => {
        for (const [, source] of cv.skills.categories) {
            expect(technicalSkills[source], source).toBeDefined()
        }
    })

    it("renamed and omitted skills exist in technicalSkills", () => {
        const names = new Set(Object.values(technicalSkills).flat().map(([name]) => name))
        for (const name of [...Object.keys(cv.skills.rename), ...cv.skills.omit]) {
            expect(names.has(name), name).toBe(true)
        }
    })

    it.each(Object.values(experience).filter((e) => e.cv).map((e) => [e.company, e.cv]))(
        "%s CV entry has position, company, period and bullets",
        (_, job) => {
            expect(isNonEmptyString(job.position)).toBe(true)
            expect(isNonEmptyString(job.company)).toBe(true)
            expect(job.period.length).toBeGreaterThan(0)
            expect(job.bullets.length).toBeGreaterThan(0)
        }
    )

    it("languages have a CV level", () => {
        for (const lang of languages) {
            expect(isNonEmptyString(lang.cvLevel || lang.level)).toBe(true)
        }
    })
})
