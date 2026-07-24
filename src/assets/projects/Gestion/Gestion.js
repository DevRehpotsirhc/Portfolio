import gestion from "./gestion.webp"
import gestion2 from "./gestion2.webp"
import gestion3 from "./gestion3.webp"
import gestion4 from "./gestion4.webp"
import gestion5 from "./gestion5.webp"
import gestion6 from "./gestion6.webp"

const projectsData = {
    "Gestion": {
        id: "gestion",
        slideDurationSeconds: 5,
        category: "IT Infrastructure & Operations",
        longDescription:
            "Gestion is not a single product, but a portfolio block that represents hands-on enterprise IT operations. It includes Active Directory administration, WordPress website management, and provisioning of services and virtual machines with VMware. This project highlights end-to-end capability across identity, web content, and virtual infrastructure.",
        stack: [
            "Active Directory", "WordPress", "VMware", "Windows Server"
        ],
        highlights: [
            "User, group, and policy administration in Active Directory",
            "Functional management and maintenance of corporate WordPress sites",
            "Creation and deployment of services and virtual machines with VMware",
            "Practical IT operations experience in production environments"
        ],
        links: [],
        collections: [
            gestion,
            gestion2,
            gestion3,
            gestion4,
            gestion5,
            gestion6
        ],
        slides: {
            [gestion]: "Operations workspace focused on administrative tasks and daily control.",
            [gestion2]: "Structured record management to keep internal processes consistent.",
            [gestion3]: "Detailed views to validate data and execute precise adjustments.",
            [gestion4]: "Administration flows for onboarding, changes, and operational support.",
            [gestion5]: "Complementary modules focused on services and virtual infrastructure.",
            [gestion6]: "Feature walkthrough that connects identity, corporate web, and virtualization."
        }
    }
}

export default projectsData
