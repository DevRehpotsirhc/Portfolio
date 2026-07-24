import sa from "./sa.webp"
import sa2 from "./sa2.webp"
import sa3 from "./sa3.webp"
import sa4 from "./sa4.webp"
import sa5 from "./sa5.webp"

const projectsData = {
    "Sentiment Analysis Model": {
        id: "sentiment-analysis",
        slideDurationSeconds: 5,
        category: "Competitive NLP with Transformers + LoRA",
        longDescription:
            "Sentiment Analysis Model is a language model trained with Transformers and LoRA fine-tuning to deliver robust sentiment classification. This work was part of the model set that earned me first place in IBM's national competition. The repository is public on Hugging Face, showcasing both performance and full technical traceability.",
        stack: [
            "sklearn", "PyTorch", "Google Colab", "Transformers", "MLFlow", "Pandas", "numpy"
        ],
        highlights: [
            "Model trained with Transformers + LoRA for efficient fine-tuning",
            "Sentiment classification ready for real-world text analytics",
            "Winning project in IBM's national competition",
            "Public Hugging Face repository for validation and deployment"
        ],
        links: [
            { label: "Hugging Face - Public Model", href: "https://huggingface.co/SenaSoft/chdv-sentiment-analysis", isPrivate: false }
        ],
        collections: [
            sa,
            sa2,
            sa3,
            sa4,
            sa5
        ],
        slides: {
            [sa]: "Testing interface to submit text and get sentiment inference in seconds.",
            [sa2]: "Model output with class and confidence for fast interpretation.",
            [sa3]: "Sentiment distribution visualization to detect patterns at a glance.",
            [sa4]: "Detailed result view for deeper comparative analysis.",
            [sa5]: "End-to-end summary: training, evaluation, and practical model usage."
        }
    }
}

export default projectsData
