import TaskMan from "./TaskMan.webp"
import TaskMan2 from "./TaskMan2.webp"
import TaskMan3 from "./TaskMan3.webp"
import TaskMan4 from "./TaskMan4.webp"

const projectsData = {
    "TaskMan - Bot": {
        id: "taskman",
        slideDurationSeconds: 7,
        category: "WAN Network Automation & Monitoring",
        longDescription:
            "TaskMan is an operations bot built to reduce response times across enterprise WAN infrastructure. It automates service health reporting, generates connected-device inventories, and consolidates critical diagnostics such as active ports, MAC address, IP, and latency. It also scrapes corporate printers to report real-time status and enable preventive action before incidents impact operations.",
        stack: [
            "Python", "Playwright", "Bash", "crontab", "Git", "GitHub", "TKinter", "Docker"
        ],
        highlights: [
            "Automated WAN service status reports on scheduled windows",
            "Technical endpoint inventory with active ports, MAC, IP, and latency",
            "Enterprise printer scraping for early incident detection",
            "Centralized operational evidence for support and decision-making"
        ],
        links: [
            { label: "Private Repository", href: "", isPrivate: true }
        ],
        collections: [
            TaskMan,
            TaskMan2,
            TaskMan3,
            TaskMan4
        ],
        slides: {
            [TaskMan]: "Main bot workspace showing run history and overall network check health.",
            [TaskMan2]: "Connected-device detail view with key diagnostics for faster troubleshooting.",
            [TaskMan3]: "Port and latency consolidation to spot bottlenecks and unstable links.",
            [TaskMan4]: "Monitoring panel for event tracking and incident prioritization."
        }
    }
}

export default projectsData
