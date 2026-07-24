import valiCRC from "./valiCRC.webp"
import valiCRC2 from "./valiCRC2.webp"
import valiCRC3 from "./valiCRC3.webp"

const projectsData = {
    "Validador CRC": {
        id: "validador-crc",
        slideDurationSeconds: 5,
        category: "Contactability Validation (CRC Colombia)",
        longDescription:
            "Validador CRC is a lightweight system for checking phone numbers in Colombia and validating their contactability status against CRC rules. It clearly indicates whether communication is allowed by message, call, or app, accelerating pre-contact validation in sales and customer service workflows. Its focused design delivers practical answers in seconds.",
        stack: [
            "Python", "HTML5", "CSS3", "JavaScript"
        ],
        highlights: [
            "Fast checks of regulatory status for phone numbers",
            "Channel-level enablement results: message, call, or app",
            "Simple interface for operational use with minimal onboarding",
            "Supports higher-efficiency outbound contact workflows"
        ],
        links: [],
        collections: [
            valiCRC,
            valiCRC2,
            valiCRC3
        ],
        slides: {
            [valiCRC]: "Main screen to input numbers and launch validation in a few steps.",
            [valiCRC2]: "System response with status by allowed communication channel.",
            [valiCRC3]: "Compact workflow for both batch checks and one-off validations."
        }
    }
}

export default projectsData
