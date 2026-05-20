export interface Chunk {
  content: string;
  source: string;
}

export const KNOWLEDGE_BASE: Chunk[] = [
  {
    source: "about.md",
    content: "Manish Kumar is a Data Scientist and AI Engineer with 1+ years of experience building with machine learning, deep learning, and generative AI. He specializes in RAG pipelines, agentic systems, and multimodal transformers. Currently pursuing B.Tech in Computer Science at Bhagalpur College of Engineering."
  },
  {
    source: "about.md",
    content: "Manish Kumar has led the ESROS Robotics Club as Head Coordinator (Sep 2024 – Jun 2025) and served as Assistant Coordinator (Oct 2023 – Aug 2024). He won 2nd position in the Smart India (Internal) Hackathon and 2nd position in the Inter-College Robotics Competition."
  },
  {
    source: "experience.md",
    content: "Generative AI Intern at Arishna IOT Solutions (Jun 2025 – Dec 2025). Built RAG system grounded on official hardware documentation to fix LLM code generation inaccuracies for specialized microcontrollers. Developed drag-and-drop conversational interface with LangGraph + FastAPI + Gemini API resulting in ~50% programming time reduction."
  },
  {
    source: "experience.md",
    content: "Freelance Junior AI Developer (Jun 2024 – Present). Developed privacy-centric legal document analysis platform featuring PII anonymization (fine-tuned BERT) + RAG causing 60%+ reduction in manual review time. Automated invoice processing with fine-tuned LayoutLMv3 achieving ~90% extraction accuracy."
  },
  {
    source: "skills.md",
    content: "Manish's core technical skills include: Python, Machine Learning, Deep Learning, RAG, LangChain, LangGraph, LLM Fine-tuning, Prompt Engineering, Agentic AI, MCP, BERT, GPT, LayoutLMv3, Transformers, LoRA/PEFT, FastAPI, Docker, Streamlit, Vector Databases (Vector DBs), Git, NLP, Computer Vision, OCR, PyTorch, Hugging Face."
  },
  {
    source: "projects.md",
    content: "YouTube RAG Chatbot: Query any YouTube video through conversation. Built using Python, RAG, OpenAI, Gemini, Streamlit, and LangChain. Achieved 70% reduction in information search time."
  },
  {
    source: "projects.md",
    content: "News Classifier & Summarizer: Fine-tuned BERT for news classification + deepseek-r1:8b powered summarizer with OCR. Achieved ~99% classification accuracy."
  },
  {
    source: "projects.md",
    content: "Multimodal Mood Watcher: AI agent that reads emotion from both face and voice simultaneously using OpenCV, PyTorch, and Multimodal AI encoders with a fusion layer."
  },
  {
    source: "projects.md",
    content: "Privacy-First Legal Document Analyzer: Anonymizes PII with fine-tuned BERT, then Q&A on sensitive documents safely via RAG."
  },
  {
    source: "projects.md",
    content: "Agentic Multi-Source Chatbot: Multi-agent system that routes questions to PDF, SQL, or the web using LangGraph, Groq, and FastAPI."
  },
  {
    source: "faq.md",
    content: "Manish Kumar is open to full-time roles, freelance projects, and research collaborations in AI/ML. You can contact Manish directly at krmanish2302@gmail.com or +91-9031969516."
  },
  {
    source: "faq.md",
    content: "For RAG and Chatbot implementations, Manish prefers using Python, LangChain/LangGraph, FastAPI, Supabase pgvector, and OpenAI/Gemini/Claude models."
  }
];
