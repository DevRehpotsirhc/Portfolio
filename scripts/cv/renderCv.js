/**
 * renderCv.js
 * ------------------------------------------------------------------
 * Pure function that turns the data exported by src/data.js into the
 * LaTeX source of the CV (public/main.tex). No file system access here,
 * so it can be unit tested.
 * ------------------------------------------------------------------
 */

const LATEX_SPECIALS = {
    "\\": "\\textbackslash{}",
    "&": "\\&",
    "%": "\\%",
    "$": "\\$",
    "#": "\\#",
    "_": "\\_",
    "{": "\\{",
    "}": "\\}",
    "~": "\\textasciitilde{}",
    "^": "\\textasciicircum{}"
}

/** Escapes LaTeX special characters in plain text. */
export const escapeLatex = (value) => String(value).replace(/[\\&%$#_{}~^]/g, (char) => LATEX_SPECIALS[char])

/** Escapes the characters that break \url / \href arguments. */
const escapeUrl = (value) => String(value).replace(/[%#]/g, (char) => `\\${char}`)

/** ["August 2024", "July 2026"] -> "August 2024 -- July 2026" */
const formatPeriod = (period) => (Array.isArray(period) ? period : [period]).map(escapeLatex).join(" -- ")

/** "573194749249" -> "+57 319 4749249" (country code + 3-digit prefix + number) */
export const formatPhone = (digits) => {
    const clean = String(digits).replace(/\D/g, "")
    return `+${clean.slice(0, 2)} ${clean.slice(2, 5)} ${clean.slice(5)}`
}

/** itemize environment; `separator` goes between items (blank line for multi-line items). */
const itemize = (items, separator = "\n") =>
    `\\begin{itemize}\n${items.map((item) => `    \\item ${item}`).join(separator)}\n\\end{itemize}`

const sortedExperience = (experience) =>
    Object.entries(experience)
        .sort(([a], [b]) => Number(b) - Number(a))
        .map(([, entry]) => entry)
        .filter((entry) => entry.cv)

/** Builds the CV skill groups from technicalSkills + cv.skills. Throws on unknown categories. */
export const buildSkillGroups = (technicalSkills, cvSkills) => {
    const omit = new Set(cvSkills.omit || [])
    const rename = cvSkills.rename || {}

    return cvSkills.categories.map(([title, source]) => {
        const items = technicalSkills[source]
        if (!items) {
            throw new Error(`cv.skills.categories: "${source}" does not exist in technicalSkills`)
        }
        const names = items.map(([name]) => name).filter((name) => !omit.has(name)).map((name) => rename[name] || name)
        return [title, names]
    })
}

export const renderCv = ({ cv, contact, experience, technicalSkills, softSkills, languages }) => {
    const email = contact.email.href.replace(/^mailto:/, "")

    const experienceBlocks = sortedExperience(experience).map(({ cv: job }) =>
        [
            `\\textbf{${escapeLatex(job.position)}} \\hfill \\textbf{${escapeLatex(job.company)}}\\\\`,
            `\\textit{${formatPeriod(job.period)}}`,
            "",
            itemize(job.bullets.map(escapeLatex))
        ].join("\n")
    )

    const educationBlocks = cv.education.map((edu) =>
        [`\\textbf{${escapeLatex(edu.title)}} \\\\`, `${escapeLatex(edu.institution)} \\hfill ${formatPeriod(edu.period)}`].join("\n")
    )

    const certifications = cv.certifications.map(
        (c) => `${escapeLatex(c.name)} — ${escapeLatex(c.issuer)} (${escapeLatex(c.year)})`
    )

    const skillBlocks = buildSkillGroups(technicalSkills, cv.skills).map(
        ([title, names]) => `\\textbf{${escapeLatex(title)}:}\n${names.map(escapeLatex).join(", ")}`
    )

    const projects = cv.projects.map((p) =>
        p.url
            ? `\\textbf{${escapeLatex(p.name)}}\\\\\n    \\url{${escapeUrl(p.url)}}`
            : `\\textbf{${escapeLatex(p.name)}} (Private Repository)`
    )

    const languageItems = [...languages]
        .sort((a, b) => b.proficiency - a.proficiency)
        .map((l) => `${escapeLatex(l.language)} — ${escapeLatex(l.cvLevel || l.level)}`)

    const softSkillLine = Object.keys(softSkills).map(escapeLatex).join(" \\textbullet\\ ")

    return `\\documentclass[11pt,a4paper]{article}

\\usepackage[margin=0.7in]{geometry}
\\usepackage{lmodern}
\\usepackage[T1]{fontenc}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{titlesec}
\\usepackage{parskip}
\\usepackage{xcolor}

\\pagestyle{empty}

\\titleformat{\\section}
{\\large\\bfseries}
{}
{0em}
{}[\\titlerule]

\\setlist[itemize]{leftmargin=1.3em, itemsep=3pt}

\\begin{document}

\\begin{center}
    {\\LARGE \\textbf{${escapeLatex(cv.fullName)}}}\\\\[5pt]
    {\\large ${escapeLatex(cv.headline)}}\\\\[6pt]
    ${escapeLatex(cv.location)} \\\\
    ${formatPhone(contact.whatsapp.phone)} \\quad | \\quad
    \\href{mailto:${escapeUrl(email)}}{${escapeLatex(email)}}
\\end{center}

\\vspace{0.3cm}

\\section*{Professional Summary}

${escapeLatex(cv.summary)}

\\section*{Professional Experience}

${experienceBlocks.join("\n\n\\vspace{0.2cm}\n\n")}

\\section*{Education}

${educationBlocks.join("\n\n")}

\\section*{Certifications}

${itemize(certifications)}

\\section*{Technical Skills}

${skillBlocks.join("\n\n")}

\\section*{Projects}

${itemize(projects, "\n\n")}

\\section*{Achievements}

${itemize(cv.achievements.map(escapeLatex))}

\\section*{Soft Skills}

${softSkillLine}

\\section*{Languages}

${itemize(languageItems)}

\\end{document}`
}
