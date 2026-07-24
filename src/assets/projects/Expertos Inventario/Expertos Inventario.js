import expinv from "./expinv.webp"
import expinv2 from "./expinv2.webp"
import expinv3 from "./expinv3.webp"
import expinv4 from "./expinv4.webp"
import expinv5 from "./expinv5.webp"
import expinv6 from "./expinv6.webp"
import expinv7 from "./expinv7.webp"

const projectsData = {
    "Expertos Inventario": {
        id: "expertos-inventario",
        slideDurationSeconds: 5,
        category: "Inventory & Purchasing Management",
        longDescription:
            "Expertos Inventario is a complete platform for controlling stock, purchasing, and suppliers from a single dashboard. It centralizes product catalogs, categories, supplier relationships, and purchase orders while surfacing key metrics such as inventory levels, low-stock alerts, and total inventory value. Its visual approach enables faster and more precise restocking and purchasing decisions.",
        stack: [
            // Backend
            "Python", "Django REST framework", "MongoEngine", "PostgreSQL", "JWT",
            // Frontend
            "JavaScript", "React", "Tailwind", "Vite",
            // UI & Visualization
            "Chart.js", "Maizzel", "Storybook",
            // Data & Analysis
            "Pandas", "Jupyter Notebook",
            // Testing & Tools
            "PyTest", "Postman", "Docker",
            // Version Control
            "Git", "GitHub"
        ],
        highlights: [
            "Real-time dashboard with KPIs and critical low-stock alerts",
            "Product catalog with detailed editing and category organization",
            "Unified management of suppliers and purchase orders",
            "Visual reports to track inventory value and trend evolution"
        ],
        links: [
            { label: "Private Repository", href: "", isPrivate: true }
        ],
        collections: [
            expinv,
            expinv2,
            expinv3,
            expinv4,
            expinv5,
            expinv6,
            expinv7
        ],
        slides: {
            // [expinv]: "The main dashboard delivers an instant snapshot of the business's inventory health, combining key indicators like total products, low-stock warnings, active categories, and total inventory value in one clear overview.",
            // [expinv2]: "A searchable, filterable product catalog lets users browse the full inventory at a glance, making it easy to locate items, review quantities, and manage stock without friction.",
            // [expinv3]: "Detailed product forms allow precise creation and editing of item information, ensuring every entry in the catalog stays accurate and up to date.",
            [expinv4]: "Category management tools help keep the inventory logically organized, making navigation and reporting more intuitive as the catalog grows.",
            [expinv5]: "A dedicated supplier module centralizes vendor information, simplifying communication and tracking for every purchasing relationship.",
            [expinv6]: "Purchase order tracking connects suppliers directly to restocking workflows, streamlining the path from a low-stock alert to a completed order.",
            // [expinv7]: "Visual analytics and reports translate raw inventory data into clear trends, supporting smarter forecasting and purchasing decisions."
        }
    }
}

export default projectsData
