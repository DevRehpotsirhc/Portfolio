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
| Deploy      | GitHub Pages (`gh-pages`)                                             |

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

## Project structure

```text
public/main.tex          CV source (generated by npm run cv)
scripts/build-cv.js      npm run cv / cv-pdf
scripts/cv/              LaTeX template (renderCv.js) and PDF compiler (compilePdf.js)
src/data.js              All site and CV content
src/assets/projects/     Project content and screenshots
src/components/layouts/  Page sections
src/components/ui/       Reusable UI components
src/hooks/               Dark mode, scroll spy, reveal-on-scroll, CV download...
src/stories/             Storybook stories and interaction tests
tests/reporter.js        HTML test report generator
```

# Summary (CV Type)

> This summary mirrors the CV generated from `src/data.js`.

**Christopher José Aponte Ovalles** · Full Stack Developer | Data Scientist · Bogotá D.C., Colombia

> Phone: +57 319 4749249
>
> Email: christopher4ponte@gmail.com
>
> LinkedIn: https://www.linkedin.com/in/christopher-aponte/

`Full Stack` software developer and data scientist with more than two years of experience in process automation, financial data analysis, `AI model training`, and backend/frontend solution development. Experienced in REST API development, ETL processes, data visualization, and software testing. Proactive, adaptable, and results-oriented.

## Work Experience

- **Full Stack Developer at Expertos Consulting [08/2024] - [07/2026]**
    - Internal web application for `purchasing management`, inventory control, and organizational structure.
    - Secure `REST APIs` with Django REST Framework, JWT authentication, user management, roles, permissions, and email notifications.
    - Automated daily reports through Python `scripts` and scheduled tasks, including a desktop administration tool.
    - Unit, integration, end-to-end, and UI/UX `testing`.
    - Deployments, requirements gathering, and technical presentations for stakeholders.

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
