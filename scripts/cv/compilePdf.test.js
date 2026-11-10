import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import os from "node:os"
import path from "node:path"
import process from "node:process"

// Fake LaTeX engine: writes main.pdf (or a failing log) into the output directory
const spawnSync = vi.fn()
vi.mock("node:child_process", () => ({ spawnSync: (...args) => spawnSync(...args) }))

const { compileTexToPdf, findEngine } = await import("./compilePdf")

let dir
let originalPath

beforeEach(() => {
    dir = mkdtempSync(path.join(os.tmpdir(), "cv-test-"))
    originalPath = process.env.PATH
    // Fake "pdflatex" executable on PATH
    const exeName = process.platform === "win32" ? "pdflatex.exe" : "pdflatex"
    writeFileSync(path.join(dir, exeName), "")
    process.env.PATH = dir
    writeFileSync(path.join(dir, "main.tex"), "\\documentclass{article}")
})

afterEach(() => {
    process.env.PATH = originalPath
    rmSync(dir, { recursive: true, force: true })
    spawnSync.mockReset()
})

describe("compileTexToPdf", () => {
    it("finds an engine on PATH", () => {
        expect(findEngine()?.name).toBe("pdflatex")
    })

    it("copies the compiled PDF to the destination and leaves no LaTeX artefacts", async () => {
        let workDir
        spawnSync.mockImplementation((command, args, { cwd }) => {
            workDir = cwd
            writeFileSync(path.join(cwd, "main.pdf"), "%PDF-1.5 fake")
            writeFileSync(path.join(cwd, "main.aux"), "")
            return { status: 0 }
        })

        const pdf = path.join(dir, "out.pdf")
        await expect(compileTexToPdf(path.join(dir, "main.tex"), pdf)).resolves.toBe("pdflatex")
        expect(readFileSync(pdf, "utf8")).toBe("%PDF-1.5 fake")
        expect(existsSync(workDir)).toBe(false)
        expect(existsSync(path.join(dir, "main.aux"))).toBe(false)
    })

    it("reports LaTeX errors from the log", async () => {
        spawnSync.mockImplementation((command, args, { cwd }) => {
            writeFileSync(path.join(cwd, "main.log"), "This is pdfTeX\n! LaTeX Error: File `titlesec.sty' not found.\n")
            return { status: 1 }
        })

        await expect(compileTexToPdf(path.join(dir, "main.tex"), path.join(dir, "out.pdf"))).rejects.toThrow(/titlesec\.sty' not found/)
    })
})
