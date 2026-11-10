# Welcome to my Portfolio

<p align="left">
    <a href="mailto:christopher4ponte@gmail.com"><img src="https://img.shields.io/badge/Email-Contact-2563EB?style=for-the-badge&logo=gmail&logoColor=white" alt="Email"></a>&nbsp;&nbsp;
    <a href="https://wa.me/573194749249?text=Hi%20I%20come%20from%20your%20portfolio,%20I%20would%20be%20interested%20in%20talking%20to%20you"><img src="https://img.shields.io/badge/WhatsApp-Contact-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" alt="WhatsApp"></a>&nbsp;&nbsp;
    <a href="https://www.linkedin.com/in/christopher-aponte/"><img src="https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"></a>&nbsp;&nbsp;
    <a href="https://devrehpotsirhc.github.io/Portfolio"><img src="https://img.shields.io/badge/Portfolio-Visit-0F766E?style=for-the-badge&logo=githubpages&logoColor=white" alt="Portfolio"></a>
</p>

Hi, I'm *Christopher Aponte*, national winner in the artificial intelligence category with `IBM` as judge. Software developer and data scientist with over 2 years of experience in backend, data analytics, and AI training.

I previously had another repository for this purpose, but wanted to renovate it from scratch. This project is built entirely in `frontend` using `React` as the main technology.

```py
# Python
if __name__ == '__main__':
        print("Now you'll see a summary of my portfolio :D")
```

**Live site:** https://devrehpotsirhc.github.io/Portfolio

# About this project

| Area        | Tools                                                                 |
|-------------|-----------------------------------------------------------------------|
| UI          | React 19, Tailwind CSS 4, lucide-react                                |
| Build       | Vite (rolldown-vite)                                                  |
| Testing     | Vitest (unit + browser), Storybook 10 with interaction and a11y tests |
| CV          | LaTeX generated from `src/data.js`                                    |
| SEO         | Meta tags, Open Graph / Twitter Card, JSON-LD, sitemap and robots     |
| Deploy      | GitHub Pages (`gh-pages`)                                             |

## Features

- **Single source of content:** every text of the site and the CV comes from `src/data.js`.
- **Projects carousel:** autoplay, image pager with dots, keyboard arrows and swipe, plus **Previous / Next** buttons to jump between projects.
- **Project modal:** description, stack, highlights, links and an image collage. Clicking an image opens an expanded view where you can move between images with the on-screen arrows, the `←` / `→` keys or a swipe on mobile; a counter shows the current position and `Escape` closes only the expanded view.
- **Motion:** reveal-on-scroll, scroll progress, active section in the header, animated language bars, modal enter/exit transitions and a circular reveal when switching dark mode. All of it respects `prefers-reduced-motion`.
- **Dark mode** with the system preference as default.
- **Download CV** button that serves the PDF generated from `src/data.js`.

## Getting started

```bash
npm install
npm run dev        # development server
npm run build      # production build in dist/
npm run preview    # preview the production build
```

## Available scripts

| Command                   | What it does                                                                            |
|---------------------------|-----------------------------------------------------------------------------------------|
| `npm run dev`             | Starts the Vite development server.                                                     |
| `npm run build`           | Builds the site into `dist/`.                                                           |
| `npm run preview`         | Serves the production build locally.                                                    |
| `npm run lint`            | Runs ESLint.                                                                            |
| `npm test`                | Runs every test (unit + Storybook) and writes an HTML report in `tests/reports/`.       |
| `npm run test:unit`       | Runs only the unit tests (data and CV scripts).                                         |
| `npm run storybook`       | Opens Storybook on port 6006.                                                           |
| `npm run build-storybook` | Builds a static Storybook.                                                              |
| **`npm run cv`**          | Regenerates `public/main.tex` from `src/data.js` and compiles it to `public/main.pdf`.  |
| **`npm run cv-pdf`**      | Same as `cv`, then replaces the PDF downloaded with the site's **Download CV** button.  |
| `npm run deploy`          | Builds and publishes `dist/` to GitHub Pages.                                           |

## Editing the content

All the text of the site lives in **`src/data.js`** (profile, contact, experience, skills, languages, UI labels). Each project's content lives next to its images in `src/assets/projects/<Name>/<Name>.js`, and `data.js` decides which projects are shown and in what order.

## CV generation

The CV is no longer edited by hand: it is generated from the same data as the website, so both always say the same thing.

1. Edit `src/data.js`:
   - `cv` block: full name, headline, location, summary, education, certifications, projects and achievements.
   - `experience`: only entries with a `cv` block (position, company, period, bullets) appear in the CV.
   - `technicalSkills`: the CV uses the categories listed in `cv.skills.categories`, with the renames in `cv.skills.rename` and without the skills in `cv.skills.omit`.
   - `softSkills` and `languages` (`cvLevel` is the text printed in the CV; `showInPortfolio: false` keeps a language only in the CV).
   - Email and phone come from `contact`.
   - Write plain text: LaTeX special characters (`&`, `#`, `%`, `_`...) are escaped automatically.
2. Run one of the commands:

```bash
npm run cv       # public/main.tex + public/main.pdf (local preview)
npm run cv-pdf   # also updates src/assets/CV - Christopher Aponte.pdf (Download CV button)
```

3. After `cv-pdf`, rebuild/deploy the site (`npm run deploy`) so visitors get the new PDF.

### Requirements

Compiling the PDF needs a LaTeX engine installed locally. The script looks for `pdflatex`, `tectonic`, `xelatex` or `lualatex` (in that order) on the `PATH` and in the default MiKTeX / TeX Live folders. On Windows the simplest option is MiKTeX:

```powershell
winget install MiKTeX.MiKTeX
# Let MiKTeX download missing LaTeX packages (titlesec, enumitem...) without prompting
initexmf --set-config-value [MPM]AutoInstall=1
```

To force an engine, set `CV_LATEX_ENGINE` (for example `CV_LATEX_ENGINE=tectonic`). Compilation runs in a temporary folder, so no `.aux`/`.log` files are left in the project. `public/main.pdf` is a local build artefact and is ignored by git.

## SEO

The site is a single-page React app, so everything search engines and social networks read up front lives in `index.html`:

- Descriptive `<title>`, meta description, canonical URL and robots directives.
- Open Graph and Twitter Card tags with a 1200×630 preview image (`public/og-image.png`) for link previews on LinkedIn, WhatsApp, X, Slack...
- JSON-LD structured data (`WebSite`, `ProfilePage` and `Person` with job title, location, skills and profile links).
- A `<noscript>` summary for crawlers and visitors without JavaScript.
- `public/sitemap.xml` and `public/robots.txt`.

When the content changes:

1. Keep the description, `jobTitle` and `knowsAbout` in `index.html` in line with `src/data.js`.
2. Update `<lastmod>` in `public/sitemap.xml`.
3. If the name or headline changes, regenerate `public/og-image.png` (1200×630).

> GitHub Pages serves this site under `/Portfolio`, and crawlers only read `robots.txt` at the domain root. Submit `https://devrehpotsirhc.github.io/Portfolio/sitemap.xml` in [Google Search Console](https://search.google.com/search-console) to get the site indexed. You can check link previews with the [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/).

## Project structure

```text
index.html               Meta tags, Open Graph, JSON-LD (SEO)
public/og-image.png      Social preview image
public/sitemap.xml       Sitemap for search engines
public/robots.txt        Crawler rules
public/main.tex          CV source (generated by npm run cv)
scripts/build-cv.js      npm run cv / cv-pdf
scripts/cv/              LaTeX template (renderCv.js) and PDF compiler (compilePdf.js)
src/data.js              All site and CV content
src/assets/projects/     Project content and screenshots
src/components/layouts/  Page sections
src/components/ui/       Reusable UI components
src/hooks/               Dark mode, scroll spy, reveal-on-scroll, image preview, CV download...
src/stories/             Storybook stories and interaction tests
tests/reporter.js        HTML test report generator
```

# Summary (CV Type)

> This summary mirrors the CV generated from `src/data.js`.

**Christopher José Aponte Ovalles** · Full Stack Developer · Bogotá D.C., Colombia

> Phone: +57 319 4749249
>
> Email: christopher4ponte@gmail.com
>
> LinkedIn: https://www.linkedin.com/in/christopher-aponte/

`Full Stack` software developer and data scientist with more than two years of experience in process automation, financial data analysis, `AI model training`, and backend/frontend solution development. Experienced in REST API development, ETL processes, data visualization, and software testing. Proactive, adaptable, and results-oriented professional with strong analytical and problem-solving skills.

## Work Experience

- **Full Stack Developer at Expertos Consulting [08/2024] - Currently**
    - Developed `Expertos Inventario`, an internal inventory and purchasing platform (Django REST Framework, React, PostgreSQL) with JWT authentication, roles and permissions, a real-time KPI dashboard, low-stock alerts, and supplier and purchase order management.
    - Led audit support for Incocrédito (99% compliance), Banco Popular (90%) and Banco de Occidente (100%), presenting results through an interactive graphical interface.
    - Optimized the legacy CRM database queries (60K+ records) with pagination and stored procedures, cutting response time by `98.75%` (from 40 s to 0.5 s).
    - Built `OCR Extractor`, a tool that extracts text from PDFs and images and loads it into the database.
    - Developed a service and printer status reporting bot with network scanning (Python, Playwright, Tkinter, Nmap, Wireshark).
    - Created `CheckCRC`, an application for validating phone numbers against the CRC.
    - Managed the company's WordPress landing page and implemented security measures after an impersonation attempt.
    - Built `OnScrapping`, a Python and Playwright bot that simulates a webhook for client filing status with Banco Popular on a legacy Flash 11.5 platform.

- **Monitor at National Learning Service (SENA) [03/2024] - [08/2024]**
    - Database management and query `optimization` for Excel-based data consolidation and analysis.
    - Automation of administrative `forms` and internal processes.
    - Reports and visual materials for institutional presentations.

## Education and Certifications

| Year      | Title / Certification                                                                                  | Institution     |
|-----------|--------------------------------------------------------------------------------------------------------|-----------------|
| 2024–2026 | Technologist in Software Analysis and Development                                                      | SENA            |
| 2025      | Massive Data Systematization Using Analytical Methods and Technological Tools (Intermediate Level)      | IBM & SENA      |
| 2025      | Application of the Scrum Framework for Software Development Projects                                   | SENA            |
| 2024      | Relational Database Administrator                                                                      | Fundación C.S.  |
| 2024      | Exploratory Data Analysis with Python                                                                  | SENA            |
| 2024      | Database Construction with MySQL                                                                       | SENA            |

## Skills

| Category              | Technologies                                                                         |
|-----------------------|--------------------------------------------------------------------------------------|
| Backend               | Python, Django REST Framework, MongoEngine, JWT                                      |
| Data Analysis         | Pandas, NumPy, Matplotlib, Seaborn, Plotly, Jupyter Notebook, Google Colab            |
| Machine Learning      | Scikit-Learn, PyTorch, Transformers, MLFlow                                          |
| Databases             | PostgreSQL, MongoDB, MySQL                                                           |
| Frontend              | JavaScript, React, HTML5, CSS3, Tailwind CSS, Maizzle, Chart.js                      |
| Testing               | PyTest, Selenium, Playwright, Storybook, Postman                                     |
| DevOps / Tools        | Docker, Git, GitHub                                                                  |
| Business Intelligence | Excel, Power BI                                                                      |
| Others                | Bash, Swagger/OpenAPI, C#, .NET Framework, PHP, Visual Basic, Draw.io, n8n           |

### Soft Skills

> - Leadership
> - Adaptability
> - Proactivity
> - Strategic thinking
> - Teamwork
> - Decision making

## Projects

- [CHDV Sentiment Analysis (AI)](https://huggingface.co/SenaSoft/chdv-sentiment-analysis)
- [CHDV Summarization (AI)](https://huggingface.co/SenaSoft/chdv-summarization)
- Wissen – Student Behavior Tracking System: *Private Repository*
- Expertos Inventario: *Private Repository*
- TaskMan Bot: *Private Repository*

## Achievements and Recognition

- Winner of a national Artificial Intelligence competition judged by IBM.
- Trained AI models for multivariate classification, emotion analysis, and automated text summarization.
- Recognized as the only participant to perform real-world system testing during the competition.

## Languages

- Spanish — Native
- English — Upper Intermediate (B2)
- German — Basic (A1)
