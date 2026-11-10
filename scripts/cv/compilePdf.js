/**
 * compilePdf.js
 * ------------------------------------------------------------------
 * Compiles a .tex file to PDF with the first LaTeX engine found on
 * this machine (MiKTeX, TeX Live or Tectonic). Compilation happens in
 * a temporary folder, so no .aux/.log files are left next to main.tex.
 * ------------------------------------------------------------------
 */
import { spawnSync } from "node:child_process"
import { existsSync, readdirSync } from "node:fs"
import { copyFile, mkdtemp, readFile, rm, writeFile } from "node:fs/promises"
import os from "node:os"
import path from "node:path"
import process from "node:process"

const isWindows = process.platform === "win32"
const exe = (name) => (isWindows ? `${name}.exe` : name)

// Engines in order of preference, with the arguments to compile `file` into `outDir`
const ENGINES = [
    { name: "pdflatex", args: (file, outDir) => ["-interaction=nonstopmode", "-halt-on-error", `-output-directory=${outDir}`, file] },
    { name: "tectonic", args: (file, outDir) => ["--outdir", outDir, file] },
    { name: "xelatex", args: (file, outDir) => ["-interaction=nonstopmode", "-halt-on-error", `-output-directory=${outDir}`, file] },
    { name: "lualatex", args: (file, outDir) => ["-interaction=nonstopmode", "-halt-on-error", `-output-directory=${outDir}`, file] }
]

/** Default install folders, so a freshly installed engine works before PATH is refreshed. */
const extraBinDirs = () => {
    if (!isWindows) return ["/Library/TeX/texbin", "/usr/local/texlive/bin"]
    const dirs = [
        path.join(process.env.LOCALAPPDATA || "", "Programs", "MiKTeX", "miktex", "bin", "x64"),
        path.join(process.env.ProgramFiles || "C:\\Program Files", "MiKTeX", "miktex", "bin", "x64")
    ]
    // TeX Live: C:\texlive\<year>\bin\windows
    if (existsSync("C:\\texlive")) {
        for (const year of readdirSync("C:\\texlive").sort().reverse()) {
            dirs.push(path.join("C:\\texlive", year, "bin", "windows"), path.join("C:\\texlive", year, "bin", "win64"))
        }
    }
    return dirs
}

const findOnPath = (name) => {
    const dirs = [...(process.env.PATH || "").split(path.delimiter), ...extraBinDirs()]
    return dirs.filter(Boolean).map((dir) => path.join(dir, exe(name))).find((candidate) => existsSync(candidate))
}

/** Returns { name, command, args } for the first available engine, or null. */
export const findEngine = () => {
    const preferred = process.env.CV_LATEX_ENGINE
    const engines = preferred ? ENGINES.filter((e) => e.name === preferred) : ENGINES
    for (const engine of engines) {
        const command = findOnPath(engine.name)
        if (command) return { ...engine, command }
    }
    return null
}

export const INSTALL_HELP = `No LaTeX engine was found. Install one of these and run the command again:
  - MiKTeX (Windows):  winget install MiKTeX.MiKTeX
      then enable automatic package installs once:
      initexmf --set-config-value [MPM]AutoInstall=1
  - Tectonic:          https://tectonic-typesetting.github.io/
  - TeX Live:          https://tug.org/texlive/
You can force a specific engine with the CV_LATEX_ENGINE variable (pdflatex, tectonic, xelatex, lualatex).`

/**
 * Compiles `texFile` and writes the result to `pdfFile`.
 * Throws with the relevant part of the LaTeX log when compilation fails.
 */
export const compileTexToPdf = async (texFile, pdfFile) => {
    const engine = findEngine()
    if (!engine) throw new Error(INSTALL_HELP)

    const workDir = await mkdtemp(path.join(os.tmpdir(), "cv-latex-"))
    try {
        const source = path.join(workDir, "main.tex")
        await writeFile(source, await readFile(texFile))

        const result = spawnSync(engine.command, engine.args("main.tex", workDir), {
            cwd: workDir,
            encoding: "utf8",
            timeout: 5 * 60 * 1000
        })

        const output = path.join(workDir, "main.pdf")
        if (result.error || result.status !== 0 || !existsSync(output)) {
            const log = await readFile(path.join(workDir, "main.log"), "utf8").catch(() => `${result.stdout || ""}${result.stderr || ""}`)
            const errorLines = log.split(/\r?\n/).filter((line) => line.startsWith("!") || /error/i.test(line)).slice(0, 10)
            throw new Error(
                `${engine.name} could not compile ${path.basename(texFile)}` +
                    (result.error ? `: ${result.error.message}` : "") +
                    (errorLines.length ? `\n${errorLines.join("\n")}` : "")
            )
        }

        await copyFile(output, pdfFile)
        return engine.name
    } finally {
        await rm(workDir, { recursive: true, force: true })
    }
}
