/**
 * data.js
 * ------------------------------------------------------------------
 * Central file holding all the text content of the portfolio.
 * Edit the values here and they will be reflected across every component.
 * ------------------------------------------------------------------
 */
import { Brain, Crown, RefreshCw, Rocket, Scale, Users } from "lucide-react"

import expertosLogo from "./assets/expertos.svg"
import ibmLogo from "./assets/ibm.svg"
import senaLogo from "./assets/sena.svg"

import expertosInventarioData from "./assets/projects/Expertos Inventario/Expertos Inventario"
import gestionData from "./assets/projects/Gestion/Gestion"
import sentimentAnalysisData from "./assets/projects/Sentiment Analysis/Sentiment Analysis"
import taskManData from "./assets/projects/TaskMan/TaskMan"
import validadorCrcData from "./assets/projects/Validador CRC/Validador CRC"

/* ------------------------------------------------------------------ */
/* Personal info                                                      */
/* ------------------------------------------------------------------ */
export const profile = {
    name: "Christopher Aponte",
    summary: "Fullstack software developer and data scientist with over 2 years of experience in automations, financial data analysis, machine learning AI model training, and backend and frontend development.",
    tags: ["Proactive", "Adaptable", "Results-oriented"],
    cvFileName: "Christopher_Aponte_CV.pdf"
}

/* ------------------------------------------------------------------ */
/* Contact (Welcome, Header and Footer buttons)                       */
/* ------------------------------------------------------------------ */
export const contact = {
    downloadCV: { label: "Download CV", shortLabel: "CV" },
    email: { title: "Email", href: "mailto:christopher4ponte@gmail.com" },
    linkedin: { title: "LinkedIn", href: "https://www.linkedin.com/in/christopher-aponte/" },
    github: { title: "GitHub", href: "https://github.com/DevRehpotsirhc" },
    whatsapp: {
        title: "WhatsApp",
        phone: "573194749249",
        message: "Hi I come from your portfolio, I would be interested in talking to you"
    }
}

export const whatsappHref = `https://wa.me/${contact.whatsapp.phone}?text=${encodeURIComponent(contact.whatsapp.message)}`

/* ------------------------------------------------------------------ */
/* General UI text                                                    */
/* ------------------------------------------------------------------ */
export const ui = {
    darkModeTitle: "Darkmode",
    welcome: {
        scrollMore: "More"
    },
    header: {
        mobileMenuTitle: "Access menu",
        navAriaLabel: "Main navigation",
        links: {
            about: "About",
            experience: "Experience",
            skills: "Skills",
            projects: "Projects"
        }
    },
    experience: {
        eyebrow: "Career path",
        title: "Experience Timeline",
        kpisLabel: "Key results"
    },
    companies: {
        ariaLabel: "Companies"
    },
    skills: {
        eyebrow: "What I work with",
        title: "Skills",
        technical: {
            title: "Technical skills",
            showAll: "Show All...",
            showAllTitle: "Open all technical skills",
            modalSubtitle: "All Technologies",
            modalTitle: "Technical skills by category"
        },
        soft: {
            title: "Soft skills"
        },
        languages: {
            title: "Languages",
            levelPrefix: "Level",
            proficiency: "Proficiency"
        }
    },
    projects: {
        eyebrow: "Featured work",
        title: "Projects",
        moreProjects: "More projects",
        clickHint: "Click anywhere on the active image to open details.",
        openDetails: "Open project details",
        prevImage: "Previous image",
        nextImage: "Next image",
        prevProject: "Previous project",
        nextProject: "Next project",
        prevShort: "Previous",
        nextShort: "Next",
        projectNavLabel: "Project navigation",
        slidesNavLabel: "Project images",
        // {n} and {total} are replaced at runtime
        slideDotLabel: "Show image {n} of {total}",
        modalFallbackTitle: "Project",
        modalAriaLabel: "Project details",
        sections: {
            stack: "Stack",
            highlights: "Highlights",
            collection: "Collection",
            links: "Links"
        },
        privateLinkAlert: {
            title: "Private link",
            message: "This link is private and cannot be accessed right now."
        }
    },
    footer: {
        disclaimers: [
            {
                title: "Trademarks, logos & icons",
                text: "All trademarks, brand names, logos, and technology icons shown in this portfolio belong to their respective owners. They are used solely to identify the tools, technologies, and services referenced, for informative purposes only."
            },
            {
                title: "Projects, screenshots & images",
                text: "Screenshots, images, and any project-related material belong to their respective owners and clients. They are published only to illustrate the work I have done or participated in, without claiming ownership of the brands or products featured."
            },
            {
                title: "Purpose & removal requests",
                text: "This portfolio is non-commercial and informational; no affiliation, sponsorship, or endorsement is implied. If you are the owner of any asset and have a request or concern, contact me and I will promptly remove or update it."
            }
        ],
        thanks: "Thanks for visiting",
        createdBy: "Created by Christopher Aponte",
        credits: "If you use code from this portfolio, please credit and reference this website or repository. Thx"
    }
}

/* ------------------------------------------------------------------ */
/* Experience (the key is the order: higher = shown first)            */
/* ------------------------------------------------------------------ */
export const experience = {
    3: {
        company: "Expertos Consulting",
        years: "2024 - Currently",
        position: "Fullstack developer",
        desc: "Web applications, financial dashboards, workflow automations, mass reporting tools, and software testing were developed in a collaborative team environment.",
        technologies: ["Python", "Django Rest Framework", "JavaScript", "React", "Linux", "Docker", "GitHub"],
        // Optional summary tiles shown on the timeline card
        kpis: [
            { value: "98.75%", label: "Faster CRM queries", detail: "40 s → 0.5 s on 60K+ records" },
            { value: "4", label: "Bank audits supported", detail: "90% – 100% compliance" },
            { value: "6+", label: "Internal tools & bots", detail: "Inventory, OCR, network & status bots, scraping" }
        ],
        // Only entries with a `cv` block appear in the CV (npm run cv)
        cv: {
            position: "Full Stack Developer",
            company: "Expertos Consulting",
            period: ["August 2024", "Currently"],
            bullets: [
                "Developed Expertos Inventario, an internal inventory and purchasing platform (Django REST Framework, React, PostgreSQL) with JWT authentication, roles and permissions, a real-time KPI dashboard, low-stock alerts, and supplier and purchase order management.",
                "Led audit support for Incocrédito (99% compliance), Banco Popular (90%) and Banco de Occidente (100%), presenting results through an interactive graphical interface for ease of use during the audit.",
                "Optimized the company's legacy CRM database queries (60K+ records) with LIMIT/OFFSET pagination and stored procedures, cutting response time by 98.75% (from 40 s to 0.5 s).",
                "Built OCR Extractor, a tool that extracts text from PDFs and images and loads it into the database.",
                "Developed a service and printer status reporting bot with network scanning, using Python, Playwright, Tkinter (GUI), Nmap, and Wireshark.",
                "Created CheckCRC, an application for validating phone numbers against the CRC.",
                "Managed the company's WordPress landing page and implemented security measures after an impersonation attempt.",
                "Built OnScrapping, a Python and Playwright bot that simulates a webhook for client filing status with Banco Popular on a legacy Flash 11.5 platform."
            ]
        }
    },
    2: {
        company: "IBM",
        years: "2025",
        position: "National AI Competition",
        desc: "Winner of IBM's national AI model training competition, achieving the highest score in the category. Recognized as the only participant to validate the solution through real-world software testing.",
        technologies: ["PyTorch", "Jupyter Notebook", "Docker", "sklearn", "Google Colab"]
    },
    1: {
        company: "SENA",
        years: "2024",
        position: "Monitor",
        desc: "Office automations were developed, database processes were optimized, and dashboard components for administrative tasks were created.",
        technologies: ["Visual Basic", "Excel", "C#"],
        cv: {
            position: "Monitor",
            company: "National Learning Service (SENA)",
            period: ["March 2024", "August 2024"],
            bullets: [
                "Managed databases and optimized queries for Excel-based data consolidation and analysis.",
                "Automated administrative forms and internal processes.",
                "Designed reports and visual materials for institutional presentations."
            ]
        }
    }
}

/* ------------------------------------------------------------------ */
/* Marquee companies (the key is the order)                           */
/* ------------------------------------------------------------------ */
export const companies = {
    3: { name: "Expertos Consulting", image: expertosLogo },
    2: { name: "IBM", image: ibmLogo },
    1: { name: "SENA", image: senaLogo }
}

/* ------------------------------------------------------------------ */
/* Technical skills                                                   */
/* [name, svg file in src/assets (no extension), light color, dark color, keepOriginalColors?] */
/* "Main" holds the skills shown outside the modal.                   */
/* ------------------------------------------------------------------ */
export const technicalSkills = {
    Main: [
        ["Python", "python", "#FDE68A", "#306998"],
        ["Pandas", "pandas", "#DDD6FE", "#5B21B6"],
        ["Scikit-Learn", "scikitlearn", "#FED7AA", "#EA580C"],
        ["Jupyter Notebook", "jupyter", "#FDBA74", "#C2410C"],
        ["Plotly", "plotly", "#C7D2FE", "#4338CA"]
    ],
    Backend: [
        ["Python", "python", "#FDE68A", "#306998"],
        ["Django REST framework", "django", "#BBF7D0", "#166534"],
        ["MongoEngine", "mongodb", "#86EFAC", "#166534"],
        ["JWT", "jwt", "#CBD5E1", "#334155"]
    ],
    Databases: [
        ["PostgreSQL", "postgresql", "#BFDBFE", "#1D4ED8"],
        ["MongoDB", "mongodb", "#86EFAC", "#166534"],
        ["MySQL", "mysql", "#A5F3FC", "#0F766E"]
    ],
    "Data Analysis": [
        ["Pandas", "pandas", "#DDD6FE", "#5B21B6"],
        ["NumPy", "numpy", "#BAE6FD", "#0369A1"],
        ["Matplotlib", "matplotlib", "#D9F99D", "#4D7C0F"],
        ["Seaborn", "seaborn", "#BFDBFE", "#1E40AF"],
        ["Plotly", "plotly", "#C7D2FE", "#4338CA"],
        ["Jupyter Notebook", "jupyter", "#FDBA74", "#C2410C"],
        ["Google Colab", "googlecolab", "#FDE68A", "#A16207"]
    ],
    "Machine Learning": [
        ["Scikit-Learn", "scikitlearn", "#FED7AA", "#EA580C"],
        ["PyTorch", "pytorch", "#FECACA", "#DC2626"],
        ["Transformers", "huggingface", "#FEF08A", "#CA8A04"],
        ["MLFlow", "mlflow", "#E8F5E9", "#0097A7"]
    ],
    Frontend: [
        ["JavaScript", "javascript", "#FDE047", "#A16207"],
        ["React", "react", "#A5F3FC", "#0891B2"],
        ["HTML5", "html5", "#FDBA74", "#EA580C"],
        ["CSS3", "css3", "#93C5FD", "#2563EB"],
        ["Tailwind", "tailwindcss", "#99F6E4", "#0F766E"],
        ["Maizzle", "maizzle", "#C4B5FD", "#6D28D9"],
        ["Chart.js", "chartjs", "#F9A8D4", "#BE185D"]
    ],
    Testing: [
        ["PyTest", "pytest", "#99F6E4", "#0F766E"],
        ["Selenium", "selenium", "#86EFAC", "#15803D"],
        ["Playwright", "playwright", "#A7F3D0", "#047857"],
        ["Storybook", "storybook", "#FDA4AF", "#E11D48"],
        ["Postman", "postman", "#FDBA74", "#EA580C"]
    ],
    "DevOps / Tools": [
        ["Docker", "docker", "#93C5FD", "#2563EB"],
        ["Git", "git", "#FDBA74", "#C2410C"],
        ["GitHub", "github", "#CBD5E1", "#1E293B"]
    ],
    "Spreadsheets and BI": [
        ["Excel", "microsoftexcel", "#86EFAC", "#15803D"],
        ["Power BI", "powerbi", "#FDE68A", "#CA8A04"]
    ],
    Others: [
        ["Bash", "gnubash", "#86EFAC", "#15803D"],
        ["Swagger", "swagger", "#D9F99D", "#65A30D"],
        ["C#", "csharp", "#D8B4FE", "#7E22CE"],
        [".NET Framework", "dotnet", "#C4B5FD", "#6D28D9"],
        ["PHP", "php", "#C7D2FE", "#4338CA"],
        ["Visual Basic", "visualbasic", "#DDD6FE", "#7C3AED"],
        ["Draw.io", "diagramsdotnet", "#FDBA74", "#EA580C"],
        ["Photoshop", "adobephotoshop", "#93C5FD", "#2563EB"],
        ["Davinci Resolve", "davinciresolve", "#A5B4FC", "#4F46E5"],
        ["n8n", "n8n", "#FDA4AF", "#E11D48"]
    ]
}

/* ------------------------------------------------------------------ */
/* Soft skills (icon = lucide-react component)                        */
/* ------------------------------------------------------------------ */
export const softSkills = {
    "Leadership": {
        icon: Crown,
        iconClassName: "bg-teal-100 text-teal-700 ring-teal-300/70 dark:bg-teal-900/40 dark:text-teal-200 dark:ring-teal-500/50",
        desc: "Ability to guide, motivate, and support teams to achieve shared goals while fostering collaboration and accountability."
    },
    "Adaptability": {
        icon: RefreshCw,
        iconClassName: "bg-sky-100 text-sky-700 ring-sky-300/70 dark:bg-sky-900/40 dark:text-sky-200 dark:ring-sky-500/50",
        desc: "Capacity to adjust quickly to changing environments, priorities, and challenges while maintaining productivity."
    },
    "Proactivity": {
        icon: Rocket,
        iconClassName: "bg-rose-100 text-rose-700 ring-rose-300/70 dark:bg-rose-900/40 dark:text-rose-200 dark:ring-rose-500/50",
        desc: "Initiative to identify opportunities, solve problems, and take action before issues arise without waiting for direction."
    },
    "Strategic Thinking": {
        icon: Brain,
        iconClassName: "bg-violet-100 text-violet-700 ring-violet-300/70 dark:bg-violet-900/40 dark:text-violet-200 dark:ring-violet-500/50",
        desc: "Ability to analyze situations, anticipate future outcomes, and develop effective long-term plans aligned with objectives."
    },
    "Teamwork": {
        icon: Users,
        iconClassName: "bg-blue-100 text-blue-700 ring-blue-300/70 dark:bg-blue-900/40 dark:text-blue-200 dark:ring-blue-500/50",
        desc: "Ability to collaborate effectively with others, share knowledge, and contribute to a positive and productive team environment."
    },
    "Decision Making": {
        icon: Scale,
        iconClassName: "bg-amber-100 text-amber-700 ring-amber-300/70 dark:bg-amber-900/40 dark:text-amber-200 dark:ring-amber-500/50",
        desc: "Ability to evaluate information, assess risks, and make timely, informed decisions that support organizational goals."
    }
}

/* ------------------------------------------------------------------ */
/* Languages (proficiency from 0 to 1)                                */
/* cvLevel: text printed in the CV. showInPortfolio: false = CV only  */
/* ------------------------------------------------------------------ */
export const languages = [
    { language: "English", proficiency: 0.71, level: "B2", cvLevel: "Upper Intermediate (B2)" },
    { language: "Spanish", proficiency: 1, level: "Native", cvLevel: "Native" },
    { language: "German", proficiency: 0.15, level: "A1", cvLevel: "Basic (A1)", showInPortfolio: false }
]

export const portfolioLanguages = languages.filter((l) => l.showInPortfolio !== false)

/* ------------------------------------------------------------------ */
/* Projects                                                           */
/* Each project's content lives in src/assets/projects/<Name>/ next   */
/* to its images. This only defines which projects are shown and in   */
/* what order.                                                        */
/* ------------------------------------------------------------------ */
export const projects = {
    ...expertosInventarioData,
    ...sentimentAnalysisData,
    ...taskManData,
    ...validadorCrcData,
    ...gestionData
}

/* ------------------------------------------------------------------ */
/* CV (public/main.tex)                                               */
/* Run `npm run cv` to regenerate public/main.tex from this file.     */
/* The CV also reuses data defined above:                             */
/*   - contact.email / contact.whatsapp.phone -> header               */
/*   - experience entries that have a `cv` block                      */
/*   - technicalSkills (via cv.skills)                                */
/*   - softSkills (names, in order)                                   */
/*   - languages (sorted by proficiency, using cvLevel)               */
/* Plain text only: LaTeX special characters (&, #, %, _...) are      */
/* escaped automatically.                                             */
/* ------------------------------------------------------------------ */
export const cv = {
    fullName: "Christopher José Aponte Ovalles",
    headline: "Full Stack Developer",
    location: "Bogotá D.C., Colombia",
    summary: "Full Stack Software Developer and Data Scientist with more than two years of experience in process automation, financial data analysis, AI model training, and backend/frontend solution development. Experienced in REST API development, ETL processes, data visualization, and software testing. Proactive, adaptable, and results-oriented professional with strong analytical and problem-solving skills.",
    education: [
        {
            title: "Technologist in Software Analysis and Development",
            institution: "National Learning Service (SENA)",
            period: ["2024", "2026"]
        }
    ],
    certifications: [
        { name: "Massive Data Systematization Using Analytical Methods and Technological Tools (Intermediate Level)", issuer: "IBM & SENA", year: "2025" },
        { name: "Application of the Scrum Framework for Software Development Projects", issuer: "SENA", year: "2025" },
        { name: "Relational Database Administrator", issuer: "Fundación C.S.", year: "2024" },
        { name: "Exploratory Data Analysis with Python", issuer: "SENA", year: "2024" },
        { name: "Database Construction with MySQL", issuer: "SENA", year: "2024" }
    ],
    skills: {
        // [title in the CV, technicalSkills category], in the order they are printed
        categories: [
            ["Backend", "Backend"],
            ["Data Analysis", "Data Analysis"],
            ["Machine Learning", "Machine Learning"],
            ["Databases", "Databases"],
            ["Frontend", "Frontend"],
            ["Testing", "Testing"],
            ["DevOps / Tools", "DevOps / Tools"],
            ["Business Intelligence", "Spreadsheets and BI"],
            ["Others", "Others"]
        ],
        // Name used in the CV when it differs from the portfolio card
        rename: {
            "Django REST framework": "Django REST Framework",
            "Tailwind": "Tailwind CSS",
            "Swagger": "Swagger/OpenAPI"
        },
        // Portfolio skills left out of the CV
        omit: ["Photoshop", "Davinci Resolve"]
    },
    // Without url the project is printed as "(Private Repository)"
    projects: [
        { name: "CHDV Sentiment Analysis", url: "https://huggingface.co/SenaSoft/chdv-sentiment-analysis" },
        { name: "CHDV Summarization", url: "https://huggingface.co/SenaSoft/chdv-summarization" },
        { name: "Wissen – Student Behavior Tracking System" },
        { name: "Expertos Inventario" },
        { name: "TaskMan Bot" }
    ],
    achievements: [
        "Winner of a national Artificial Intelligence competition judged by IBM.",
        "Trained AI models for multivariate classification, emotion analysis, and automated text summarization.",
        "Recognized as the only participant to perform real-world system testing during the competition."
    ]
}
