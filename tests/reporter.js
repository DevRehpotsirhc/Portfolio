/**
 * Vitest reporter that writes an HTML report after every test run.
 *
 * Output:
 *   tests/reports/report-YYYY-MM-DD_HH-MM-SS.html  (one per run)
 *   tests/reports/latest-report.html              (copy of the most recent)
 *   tests/reports/latest-report.json              (raw data of the most recent)
 *
 * At most MAX_REPORTS dated reports are kept; older ones are deleted.
 */
import { mkdirSync, writeFileSync, readdirSync, unlinkSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import os from "node:os"
import process from "node:process"

const REPORTS_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), "reports")
const MAX_REPORTS = 30

const STATE_LABEL = {
    passed: "Passed",
    failed: "Failed",
    skipped: "Skipped",
    pending: "Pending"
}

// eslint-disable-next-line no-control-regex -- strips ANSI color codes from error messages
const stripAnsi = (text = "") => text.replace(/\u001b\[[0-9;]*m/g, "")

const escapeHtml = (text = "") =>
    String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")

const pad = (n) => String(n).padStart(2, "0")

const timestamp = (date) =>
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}_${pad(date.getHours())}-${pad(date.getMinutes())}-${pad(date.getSeconds())}`

const formatMs = (ms = 0) => (ms >= 1000 ? `${(ms / 1000).toFixed(2)} s` : `${Math.round(ms)} ms`)

const collect = (testModules, unhandledErrors, reason, startedAt) => {
    const files = testModules.map((mod) => {
        const tests = [...mod.children.allTests()].map((test) => {
            const result = test.result()
            const diagnostic = test.diagnostic()
            return {
                name: test.fullName,
                state: result?.state ?? "pending",
                duration: diagnostic?.duration ?? 0,
                errors: (result?.errors ?? []).map((err) => stripAnsi(err.message || String(err)))
            }
        })
        const moduleErrors = (mod.errors?.() ?? []).map((err) => stripAnsi(err.message || String(err)))
        return {
            file: mod.relativeModuleId ?? mod.moduleId,
            project: mod.project?.name || "default",
            duration: mod.diagnostic?.()?.duration ?? 0,
            moduleErrors,
            tests
        }
    })

    const allTests = files.flatMap((f) => f.tests)
    const count = (state) => allTests.filter((t) => t.state === state).length
    const failedFiles = files.filter((f) => f.moduleErrors.length || f.tests.some((t) => t.state === "failed")).length

    const summary = {
        total: allTests.length,
        passed: count("passed"),
        failed: count("failed"),
        skipped: count("skipped") + count("pending"),
        files: files.length,
        failedFiles,
        unhandledErrors: unhandledErrors.length,
        reason,
        startedAt: startedAt.toISOString(),
        durationMs: Date.now() - startedAt.getTime(),
        environment: `Node ${process.version} · ${os.type()} ${os.release()}`
    }

    const ok = summary.failed === 0 && failedFiles === 0 && summary.unhandledErrors === 0 && reason !== "interrupted"

    return {
        ok,
        summary,
        files,
        unhandledErrors: unhandledErrors.map((err) => stripAnsi(err?.message || String(err)))
    }
}

const renderHtml = (data) => {
    const { ok, summary, files, unhandledErrors } = data
    const date = new Date(summary.startedAt)
    const dateLabel = date.toLocaleString("en-US", { dateStyle: "full", timeStyle: "medium" })
    const projects = [...new Set(files.map((f) => f.project))]

    const renderTest = (t) => `
        <li class="test ${t.state}">
            <div class="test-row">
                <span class="badge ${t.state}">${STATE_LABEL[t.state] ?? t.state}</span>
                <span class="test-name">${escapeHtml(t.name)}</span>
                <span class="duration">${formatMs(t.duration)}</span>
            </div>
            ${t.errors.length ? `<details open><summary>Show error</summary><pre>${escapeHtml(t.errors.join("\n\n"))}</pre></details>` : ""}
        </li>`

    const renderFile = (f) => {
        const failed = f.moduleErrors.length || f.tests.some((t) => t.state === "failed")
        const passed = f.tests.filter((t) => t.state === "passed").length
        return `
        <details class="file ${failed ? "has-failed" : ""}" ${failed ? "open" : ""}>
            <summary>
                <span class="dot ${failed ? "failed" : "passed"}"></span>
                <span class="file-name">${escapeHtml(f.file)}</span>
                <span class="tag">${escapeHtml(f.project)}</span>
                <span class="file-count">${passed}/${f.tests.length}</span>
                <span class="duration">${formatMs(f.duration)}</span>
            </summary>
            ${f.moduleErrors.length ? `<pre class="module-error">${escapeHtml(f.moduleErrors.join("\n\n"))}</pre>` : ""}
            <ul class="tests">${f.tests.map(renderTest).join("")}</ul>
        </details>`
    }

    const sections = projects.map((project) => {
        const projectFiles = files.filter((f) => f.project === project)
        const tests = projectFiles.flatMap((f) => f.tests)
        const passed = tests.filter((t) => t.state === "passed").length
        return `
        <section>
            <h2>${escapeHtml(project)} <small>${passed}/${tests.length} passed</small></h2>
            ${projectFiles.map(renderFile).join("")}
        </section>`
    }).join("")

    return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Test report · ${escapeHtml(timestamp(date))}</title>
<style>
:root {
    --bg: #f6f7f9; --surface: #ffffff; --text: #1b2430; --muted: #5b6676; --border: #dde2e8;
    --pass: #13795b; --pass-bg: #e3f5ee; --fail: #b42318; --fail-bg: #fdecea; --skip: #8a5a00; --skip-bg: #fff4dc;
}
@media (prefers-color-scheme: dark) {
    :root {
        --bg: #0f1520; --surface: #172030; --text: #e6ebf2; --muted: #9aa6b6; --border: #2a3648;
        --pass: #4ad6a4; --pass-bg: #123227; --fail: #ff8a80; --fail-bg: #3a1716; --skip: #f2c46b; --skip-bg: #3a2c0f;
    }
}
* { box-sizing: border-box; }
body { margin: 0; background: var(--bg); color: var(--text); font: 15px/1.5 system-ui, -apple-system, "Segoe UI", sans-serif; }
main { max-width: 1000px; margin: 0 auto; padding: 32px 16px 64px; }
header h1 { margin: 0 0 4px; font-size: 26px; }
header p { margin: 0; color: var(--muted); }
.status { display: inline-block; margin-top: 16px; padding: 6px 14px; border-radius: 999px; font-weight: 600; }
.status.ok { background: var(--pass-bg); color: var(--pass); }
.status.ko { background: var(--fail-bg); color: var(--fail); }
.stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; margin: 24px 0 32px; }
.stat { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 14px 16px; }
.stat b { display: block; font-size: 26px; font-variant-numeric: tabular-nums; }
.stat span { color: var(--muted); font-size: 13px; }
.stat.passed b { color: var(--pass); } .stat.failed b { color: var(--fail); } .stat.skipped b { color: var(--skip); }
h2 { font-size: 18px; margin: 32px 0 12px; } h2 small { color: var(--muted); font-weight: 400; font-size: 14px; }
.file { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; margin-bottom: 10px; overflow: hidden; }
.file.has-failed { border-color: var(--fail); }
.file > summary { display: flex; align-items: center; gap: 10px; padding: 12px 16px; cursor: pointer; list-style: none; flex-wrap: wrap; }
.file > summary::-webkit-details-marker { display: none; }
.file-name { font-family: ui-monospace, Consolas, monospace; font-size: 14px; flex: 1; min-width: 200px; word-break: break-all; }
.tag { font-size: 12px; padding: 2px 8px; border-radius: 6px; border: 1px solid var(--border); color: var(--muted); }
.file-count, .duration { color: var(--muted); font-size: 13px; font-variant-numeric: tabular-nums; }
.dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
.dot.passed { background: var(--pass); } .dot.failed { background: var(--fail); }
.tests { list-style: none; margin: 0; padding: 0 16px 12px; }
.test { border-top: 1px solid var(--border); padding: 8px 0; }
.test-row { display: flex; align-items: baseline; gap: 10px; }
.test-name { flex: 1; }
.badge { font-size: 12px; font-weight: 600; padding: 1px 8px; border-radius: 6px; flex-shrink: 0; }
.badge.passed { background: var(--pass-bg); color: var(--pass); }
.badge.failed { background: var(--fail-bg); color: var(--fail); }
.badge.skipped, .badge.pending { background: var(--skip-bg); color: var(--skip); }
details details { margin-top: 8px; } details details summary { cursor: pointer; color: var(--fail); font-size: 13px; }
pre { margin: 8px 0 0; padding: 12px; border-radius: 8px; background: var(--bg); border: 1px solid var(--border); overflow-x: auto; font-size: 12.5px; white-space: pre-wrap; word-break: break-word; }
.module-error { margin: 0 16px 12px; color: var(--fail); }
.filter { display: flex; gap: 8px; margin-bottom: 8px; }
.filter button { font: inherit; padding: 6px 12px; border-radius: 8px; border: 1px solid var(--border); background: var(--surface); color: var(--text); cursor: pointer; }
.filter button[aria-pressed="true"] { border-color: var(--text); font-weight: 600; }
body.only-failed .file:not(.has-failed) { display: none; }
body.only-failed .test:not(.failed) { display: none; }
footer { margin-top: 40px; color: var(--muted); font-size: 13px; }
@media (max-width: 600px) { .test-row { flex-wrap: wrap; } }
</style>
</head>
<body>
<main>
    <header>
        <h1>Test report</h1>
        <p>${escapeHtml(dateLabel)}</p>
        <span class="status ${ok ? "ok" : "ko"}">${ok ? "✔ All tests passed" : "✖ Some tests failed"}</span>
    </header>

    <div class="stats">
        <div class="stat"><b>${summary.total}</b><span>Total tests</span></div>
        <div class="stat passed"><b>${summary.passed}</b><span>Passed</span></div>
        <div class="stat failed"><b>${summary.failed}</b><span>Failed</span></div>
        <div class="stat skipped"><b>${summary.skipped}</b><span>Skipped</span></div>
        <div class="stat"><b>${summary.files}</b><span>Files</span></div>
        <div class="stat"><b>${formatMs(summary.durationMs)}</b><span>Duration</span></div>
    </div>

    ${unhandledErrors.length ? `<section><h2>Unhandled errors</h2><pre class="module-error">${escapeHtml(unhandledErrors.join("\n\n"))}</pre></section>` : ""}

    <div class="filter" role="group" aria-label="Filter">
        <button type="button" aria-pressed="true" data-filter="all">All</button>
        <button type="button" aria-pressed="false" data-filter="failed">Failed only</button>
    </div>

    ${sections}

    <footer>
        Generated automatically by tests/reporter.js · ${escapeHtml(summary.environment)}${summary.reason !== "passed" && summary.reason !== "failed" ? ` · End reason: ${escapeHtml(summary.reason)}` : ""}
    </footer>
</main>
<script>
document.querySelectorAll("[data-filter]").forEach((btn) => {
    btn.addEventListener("click", () => {
        document.querySelectorAll("[data-filter]").forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
        document.body.classList.toggle("only-failed", btn.dataset.filter === "failed");
    });
});
</script>
</body>
</html>`
}

const pruneOldReports = () => {
    const reports = readdirSync(REPORTS_DIR)
        .filter((name) => /^report-.*\.html$/.test(name))
        .sort()
    reports.slice(0, Math.max(0, reports.length - MAX_REPORTS)).forEach((name) => {
        unlinkSync(path.join(REPORTS_DIR, name))
    })
}

export default class HtmlReportReporter {
    onInit() {
        this.startedAt = new Date()
    }

    onTestRunEnd(testModules, unhandledErrors, reason) {
        const startedAt = this.startedAt ?? new Date()
        const data = collect(testModules, unhandledErrors, reason, startedAt)
        const html = renderHtml(data)

        mkdirSync(REPORTS_DIR, { recursive: true })
        const fileName = `report-${timestamp(startedAt)}.html`
        writeFileSync(path.join(REPORTS_DIR, fileName), html, "utf-8")
        writeFileSync(path.join(REPORTS_DIR, "latest-report.html"), html, "utf-8")
        writeFileSync(path.join(REPORTS_DIR, "latest-report.json"), JSON.stringify(data, null, 2), "utf-8")
        pruneOldReports()

        console.log(`\n📄 Test report: ${path.relative(process.cwd(), path.join(REPORTS_DIR, fileName))}`)
    }
}
