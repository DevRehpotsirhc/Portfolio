import { describe, it, expect } from "vitest"
import { buildSkillGroups, escapeLatex, formatPhone, renderCv } from "./renderCv"

const baseData = {
    cv: {
        fullName: "Jane Doe",
        headline: "Dev | R&D",
        location: "Bogotá",
        summary: "100% focused on C# & data_science.",
        education: [{ title: "Degree", institution: "Uni", period: ["2020", "2024"] }],
        certifications: [{ name: "Cert", issuer: "IBM & SENA", year: "2025" }],
        skills: {
            categories: [["BI", "Spreadsheets"]],
            rename: { Tailwind: "Tailwind CSS" },
            omit: ["Photoshop"]
        },
        projects: [{ name: "Public", url: "https://example.com/a#b" }, { name: "Secret" }],
        achievements: ["Won"]
    },
    contact: { email: { href: "mailto:jane@example.com" }, whatsapp: { phone: "573001112233" } },
    experience: {
        1: { cv: { position: "Old", company: "A", period: ["2020", "2021"], bullets: ["Did a"] } },
        2: { position: "Not in CV" },
        3: { cv: { position: "New", company: "B", period: ["2022", "2024"], bullets: ["Did b"] } }
    },
    technicalSkills: { Spreadsheets: [["Excel"], ["Tailwind"], ["Photoshop"]] },
    softSkills: { Leadership: {}, Teamwork: {} },
    languages: [
        { language: "English", proficiency: 0.7, level: "B2", cvLevel: "Upper Intermediate (B2)" },
        { language: "Spanish", proficiency: 1, level: "Native" }
    ]
}

describe("escapeLatex", () => {
    it("escapes LaTeX special characters", () => {
        expect(escapeLatex("C# & 100% $x_1 {a} ~^\\")).toBe(
            "C\\# \\& 100\\% \\$x\\_1 \\{a\\} \\textasciitilde{}\\textasciicircum{}\\textbackslash{}"
        )
    })
})

describe("formatPhone", () => {
    it("formats a Colombian WhatsApp number", () => {
        expect(formatPhone("573194749249")).toBe("+57 319 4749249")
    })
})

describe("buildSkillGroups", () => {
    it("applies omit and rename", () => {
        expect(buildSkillGroups(baseData.technicalSkills, baseData.cv.skills)).toEqual([["BI", ["Excel", "Tailwind CSS"]]])
    })

    it("fails loudly on an unknown category", () => {
        expect(() => buildSkillGroups({}, { categories: [["X", "Missing"]] })).toThrow(/Missing/)
    })
})

describe("renderCv", () => {
    const tex = renderCv(baseData)

    it("is a complete LaTeX document", () => {
        expect(tex.startsWith("\\documentclass")).toBe(true)
        expect(tex.trimEnd().endsWith("\\end{document}")).toBe(true)
    })

    it("escapes user text", () => {
        expect(tex).toContain("100\\% focused on C\\# \\& data\\_science.")
        expect(tex).toContain("Cert — IBM \\& SENA (2025)")
    })

    it("only includes experience with a cv block, newest first", () => {
        expect(tex).not.toContain("Not in CV")
        expect(tex.indexOf("\\textbf{New}")).toBeLessThan(tex.indexOf("\\textbf{Old}"))
        expect(tex).toContain("\\textit{2022 -- 2024}")
    })

    it("prints projects with url or as private", () => {
        expect(tex).toContain("\\url{https://example.com/a\\#b}")
        expect(tex).toContain("\\textbf{Secret} (Private Repository)")
    })

    it("sorts languages by proficiency and prefers cvLevel", () => {
        expect(tex.indexOf("Spanish — Native")).toBeLessThan(tex.indexOf("English — Upper Intermediate (B2)"))
    })

    it("uses contact data for the header", () => {
        expect(tex).toContain("+57 300 1112233")
        expect(tex).toContain("\\href{mailto:jane@example.com}{jane@example.com}")
        expect(tex).toContain("Leadership \\textbullet\\ Teamwork")
    })
})
