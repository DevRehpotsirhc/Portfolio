/**
 * build-cv.js
 * ------------------------------------------------------------------
 *   npm run cv       -> regenerates public/main.tex from src/data.js
 *                       and compiles it to public/main.pdf
 *   npm run cv-pdf   -> same, then replaces the PDF downloaded from the
 *                       site ("Download CV" button)
 *
 * src/data.js imports images/SVGs and React icons, which plain Node
 * cannot load, so it is loaded through Vite's SSR module loader.
 * ------------------------------------------------------------------
 */
import { copyFile, readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import process from "node:process"
import { fileURLToPath } from "node:url"
import { createServer } from "vite"
import { compileTexToPdf } from "./cv/compilePdf.js"
import { renderCv } from "./cv/renderCv.js"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const texFile = path.join(root, "public", "main.tex")
const localPdf = path.join(root, "public", "main.pdf")
// Must match the import in src/hooks/useDownloadCV.js
const sitePdf = path.join(root, "src", "assets", "CV - Christopher Aponte.pdf")

const publish = process.argv.includes("--publish")
const rel = (file) => path.relative(root, file)

const loadData = async () => {
    const server = await createServer({
        root,
        configFile: false,
        logLevel: "error",
        appType: "custom",
        server: { middlewareMode: true, hmr: false, ws: false },
        optimizeDeps: { noDiscovery: true, include: [] }
    })
    try {
        return await server.ssrLoadModule("/src/data.js")
    } finally {
        await server.close()
    }
}

try {
    // 1. LaTeX source (CRLF, like the rest of the repo on Windows)
    const tex = renderCv(await loadData()).replace(/\r?\n/g, "\r\n")
    const previous = await readFile(texFile, "utf8").catch(() => null)
    if (previous === tex) {
        console.log(`✔ ${rel(texFile)} already up to date`)
    } else {
        await writeFile(texFile, tex, "utf8")
        console.log(`✔ ${rel(texFile)} updated (${tex.split("\r\n").length} lines)`)
    }

    // 2. Local PDF next to main.tex
    const engine = await compileTexToPdf(texFile, localPdf)
    console.log(`✔ ${rel(localPdf)} compiled with ${engine}`)

    // 3. PDF served by the "Download CV" button
    if (publish) {
        await copyFile(localPdf, sitePdf)
        console.log(`✔ ${rel(sitePdf)} replaced (rebuild/deploy the site to publish it)`)
    }
} catch (error) {
    console.error(`✖ ${error.message}`)
    process.exitCode = 1
}
