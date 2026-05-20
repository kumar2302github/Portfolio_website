// GENERATED FILE - DO NOT EDIT DIRECTLY.
// Edit the markdown files in the root knowledge_base/ directory instead,
// and run "npm run parse-kb" to update this bundle.

export interface Chunk {
  content: string;
  source: string;
}

export const KNOWLEDGE_BASE: Chunk[] = [
  {
    "source": "about.md",
    "content": "Topic: About Manish Kumar - Identity\n\nManish Kumar is a Data Scientist and Generative AI Engineer based in Bihar, India. He completed his B.Tech in Computer Science and Engineering from Bhagalpur College of Engineering, Bihar in 2025, graduating with a CGPA of 7.74/10.\n\nHis email is krmanish2302@gmail.com. His GitHub is github.com/kumar2302github. His LinkedIn is linkedin.com/in/manish-kumar-7915a7267."
  },
  {
    "source": "about.md",
    "content": "Topic: About Manish Kumar - Professional Summary\n\nManish is a Data Scientist with 1+ years of experience in Machine Learning, Deep Learning, Natural Language Processing, and Generative AI. He specializes in building production-ready applications using Retrieval-Augmented Generation (RAG), agentic AI systems, and multimodal transformers.\n\nHe has worked as a Generative AI Intern at Arishna IOT Solutions and independently as a Junior AI Developer on multiple freelance projects involving real clients and measurable outcomes."
  },
  {
    "source": "about.md",
    "content": "Topic: About Manish Kumar - Personal Philosophy & Approach\n\nManish's personal motto is: *\"Learning by building. Building by solving.\"*\n\nHe is passionate about solving real-world problems using AI and ML, with a particular focus on privacy-conscious systems, document understanding, and information retrieval. His journey has taken him from building basic neural networks to designing advanced agentic AI pipelines and multimodal automation systems.\n\nHe approaches problems with an engineering mindset — measuring outcomes, iterating on prompts and architectures, and caring about production reliability, not just proof-of-concept accuracy."
  },
  {
    "source": "about.md",
    "content": "Topic: About Manish Kumar - What Manish Is Looking For\n\nManish is open to:\n- Full-time roles in AI/ML engineering, Data Science, or Generative AI.\n- Freelance projects involving RAG pipelines, LLM integration, document automation, or agentic AI systems.\n- Collaborative research or open-source contributions in the Gen AI space.\n\nHe is particularly interested in teams building products at the intersection of AI, privacy, and real-world document understanding."
  },
  {
    "source": "about.md",
    "content": "Topic: About Manish Kumar - Education\n\n- **B.Tech, Computer Science & Engineering** — Bhagalpur College of Engineering, Bihar | 2021–2025 | CGPA: 7.74/10\n- **Class 12th** — Bihar School Examination Board | 2020 | 83.2% | Ranked in top 1% in the state."
  },
  {
    "source": "about.md",
    "content": "Topic: About Manish Kumar - Personality & Interests\n\n- Former Head Coordinator of ESROS Robotics Club at his college — showing leadership, community building, and a love for hardware + robotics alongside software.\n- Selected as a Top 25 Startup Idea at the Startup Bihar Innovation Challenge — demonstrating entrepreneurial thinking.\n- Believes AI should solve real problems, not just benchmark problems.\n- Constantly learning — currently completing advanced coursework in Agentic AI workflows and LangGraph on Coursera."
  },
  {
    "source": "agentic_rag_chatbot.md",
    "content": "Topic: Project: Agentic RAG Chatbot (Multi-Source, Multi-Agent) - Overview\n\nA proof-of-concept multi-agent agentic RAG system that enables contextual chat and intelligent querying across heterogeneous data sources — PDFs, SQL databases, and live web content — within a single conversational interface. Built using LangGraph for stateful agent orchestration and Groq LPU for high-speed inference.\n\n---"
  },
  {
    "source": "agentic_rag_chatbot.md",
    "content": "Topic: Project: Agentic RAG Chatbot (Multi-Source, Multi-Agent) - Problem Being Solved\n\nReal-world knowledge is scattered across different formats and systems: some in PDFs (reports, documents), some in structured databases (SQL), some on the web. Standard RAG systems are built for one source type. A user asking complex questions often needs answers that span all of these — and a routing system smart enough to know which source to query.\n\n---"
  },
  {
    "source": "agentic_rag_chatbot.md",
    "content": "Topic: Project: Agentic RAG Chatbot (Multi-Source, Multi-Agent) - Technical Architecture\n\n### Multi-Agent Routing Framework\n\nThe core innovation is the routing layer. When a user asks a question, an orchestrator agent classifies the query and routes it to the most appropriate specialized agent:\n\n- **PDF Agent**: Handles queries about uploaded documents. Performs vector search over embedded PDF chunks.\n- **SQL Agent**: Translates natural language questions into SQL queries and retrieves structured data from a relational database.\n- **Web Agent**: Performs live web search and retrieves current information for queries that require up-to-date knowledge.\n\nThe router uses the query intent, entity types, and context to decide the routing path. For complex queries spanning multiple sources, agents can be chained.\n\n### LangGraph for Orchestration\n\nLangGraph is used to define the agent workflow as a stateful graph:\n- Nodes represent agent actions (route, retrieve, generate, validate).\n- Edges represent conditional transitions based on query classification and retrieval results.\n- State is persisted across turns, enabling multi-turn contextual conversations.\n\n### Groq LPU for Inference\n\nGroq's LPU (Language Processing Unit) hardware is used for inference, enabling significantly faster response times compared to standard GPU-based inference — critical for the low-latency experience needed in agentic multi-step workflows.\n\n---"
  },
  {
    "source": "agentic_rag_chatbot.md",
    "content": "Topic: Project: Agentic RAG Chatbot (Multi-Source, Multi-Agent) - Tech Stack\n\nPython, LangGraph, LangChain, Groq LPU, Streamlit, vector database, SQL (MySQL), web search integration\n\n---"
  },
  {
    "source": "agentic_rag_chatbot.md",
    "content": "Topic: Project: Agentic RAG Chatbot (Multi-Source, Multi-Agent) - What This Demonstrates\n\n- Advanced agentic AI architecture — not just a single RAG chain, but a multi-agent system with intelligent routing.\n- LangGraph proficiency — stateful workflow design, conditional routing, multi-turn memory.\n- Multi-source retrieval — understanding that production RAG needs to handle heterogeneous data.\n- Performance awareness — deliberate use of Groq LPU for latency optimization in agentic workflows.\n- System thinking: how individual agents compose into a coherent, reliable conversational system."
  },
  {
    "source": "faq.md",
    "content": "Topic: FAQ — Common Questions About Manish Kumar\n\nThis file contains anticipated questions from portfolio visitors (hiring managers, recruiters, potential clients, collaborators) and Manish's preferred answers. Used as a RAG knowledge base source.\n\n---"
  },
  {
    "source": "faq.md",
    "content": "Topic: FAQ — Common Questions About Manish Kumar - Career & Background\n\n**Q: How much experience does Manish have?**\nManish has 1+ years of professional experience in AI/ML and Generative AI, including an internship at Arishna IOT Solutions (June–December 2025) and ongoing freelance AI development work since May 2024. He graduated with a B.Tech in Computer Science & Engineering in 2025.\n\n**Q: Is Manish a fresher or does he have work experience?**\nManish has real work experience — not just academic projects. He completed a 6-month Generative AI internship at Arishna IOT Solutions and has delivered multiple freelance client projects with measurable outcomes (60%+ time reductions, 90% accuracy on extraction tasks). He is a 2025 graduate but has been building professionally since 2024.\n\n**Q: What is Manish's educational background?**\nManish holds a B.Tech in Computer Science & Engineering from Bhagalpur College of Engineering, Bihar (2021–2025), with a CGPA of 7.74/10. He also ranked in the top 1% of Bihar state in his Class 12 board exam.\n\n**Q: Is Manish open to full-time roles?**\nYes. Manish is actively seeking full-time opportunities in AI/ML engineering, Data Science, or Generative AI. He is particularly interested in teams building products that involve LLMs, RAG systems, document automation, or agentic AI.\n\n**Q: Is Manish available for freelance work?**\nYes. Manish has a track record of freelance AI development — including a legal document platform, invoice automation system, and other client projects. He is open to project-based engagements, especially involving RAG, LLM integration, or document intelligence.\n\n**Q: Where is Manish based?**\nManish is based in Bihar, India and has worked remotely for both his internship and freelance clients.\n\n---"
  },
  {
    "source": "faq.md",
    "content": "Topic: FAQ — Common Questions About Manish Kumar - Technical Skills\n\n**Q: What is Manish's strongest technical skill?**\nRAG (Retrieval-Augmented Generation) systems and LLM application development are Manish's strongest areas. He has built multiple production and near-production RAG systems across different domains — IoT documentation, legal documents, YouTube transcripts, and multi-source agentic systems. He also has strong LLM fine-tuning experience (BERT, LayoutLMv3).\n\n**Q: What LLMs has Manish worked with?**\nManish has hands-on experience with OpenAI GPT models, Google Gemini API, Anthropic Claude API, Meta Llama, Mistral, DeepSeek (via Ollama for local inference), Groq LPU-accelerated inference, BERT (fine-tuned), and LayoutLMv3 (fine-tuned multimodal). He regularly works across multiple LLM providers rather than being locked into one.\n\n**Q: Has Manish fine-tuned any models?**\nYes. Manish has fine-tuned BERT for PII detection (used in the legal document platform) and for news classification (~99% accuracy). He also fine-tuned LayoutLMv3 — a multimodal transformer — for invoice field extraction, achieving ~90% accuracy. He is familiar with PEFT, LoRA, and Prompt Tuning techniques.\n\n**Q: Does Manish know LangChain and LangGraph?**\nYes, both. LangChain is used across his RAG pipelines for document loaders, retrievers, and chains. LangGraph is used for more complex stateful multi-agent workflows — including the conversational IoT programming interface and the multi-source agentic chatbot.\n\n**Q: Does Manish have experience with agentic AI?**\nYes. Manish has built a multi-agent routing framework using LangGraph that routes queries intelligently across PDFs, SQL databases, and web sources. He also built a conversational agentic system at Arishna IOT Solutions. He understands tool calling, agent state management, and evaluation of agentic outputs.\n\n**Q: What programming languages does Manish know?**\nPython is his primary language (used for all AI/ML work). He also knows SQL (used in agentic systems), C++, and C (academic background).\n\n**Q: Does Manish have experience with deployment?**\nYes. Manish deploys AI applications using FastAPI (backend APIs), Streamlit (ML demos and tools), and Docker (containerization). His IoT work was deployed in a company product context via FastAPI.\n\n**Q: What is Manish's experience with computer vision?**\nManish has worked on computer vision tasks including real-time emotion detection from facial expressions (Multimodal Mood Watcher), document layout analysis (LayoutLMv3 for invoices), and OCR integration (Tesseract for news images). He uses OpenCV for image processing.\n\n---"
  },
  {
    "source": "faq.md",
    "content": "Topic: FAQ — Common Questions About Manish Kumar - Projects\n\n**Q: What are Manish's most impressive projects?**\nThe standout projects are:\n1. **Privacy-Centric Legal Document Platform** — shows real-world constraint awareness (privacy/compliance) + fine-tuning + RAG in a client deployment.\n2. **Multi-Source Agentic RAG Chatbot** — shows advanced LangGraph architecture across heterogeneous data sources.\n3. **Invoice Automation with LayoutLMv3** — shows multimodal fine-tuning with production client outcomes (~90% accuracy, 40% time saved).\n4. **IoT RAG System at Arishna** — shows RAG applied to a non-standard domain (hardware documentation / code generation) in an internship context.\n\n**Q: Does Manish have any open-source or public projects?**\nYes. His GitHub (github.com/kumar2302github) has 10 repositories. Pinned/notable ones include the RAG-powered YouTube chatbot (3 stars, 1 fork), the Multimodal Mood Watcher, and the News Classifier. Most projects are in Python.\n\n**Q: Has Manish built anything with real clients?**\nYes. The legal document analysis platform and the invoice automation system were both delivered for real freelance clients. The IoT systems were built within a company (Arishna IOT Solutions). These are not just personal projects — they have measurable outcomes.\n\n---"
  },
  {
    "source": "faq.md",
    "content": "Topic: FAQ — Common Questions About Manish Kumar - Working Style & Fit\n\n**Q: What kind of problems does Manish like to work on?**\nManish is drawn to problems at the intersection of AI, privacy, and document intelligence — where the challenge isn't just \"call an LLM\" but requires thoughtful system design. He enjoys building end-to-end pipelines from raw data to deployed outcomes. He is particularly interested in RAG, agentic systems, and multimodal document understanding.\n\n**Q: How does Manish approach a new AI engineering problem?**\nHe starts by understanding the failure mode of naive approaches (e.g., LLMs hallucinating hardware API calls, or privacy risks in legal document Q&A). He then designs the system architecture to address that failure mode specifically — whether that means adding a RAG layer, a fine-tuning step, a preprocessing layer, or an agentic routing framework. He then measures outcomes quantitatively.\n\n**Q: Is Manish a researcher or an engineer?**\nBoth — but currently more on the engineering side. He builds and ships working systems, not just experiments. His certifications and ongoing coursework show he stays current with research, but his projects demonstrate he translates that into working products.\n\n**Q: What makes Manish different from other early-career AI engineers?**\nThree things: (1) He has real client projects with quantified outcomes, not just personal tutorials. (2) He works with privacy and compliance constraints — a rarer skill than pure accuracy optimization. (3) His portfolio site itself is a RAG system — demonstrating his core skill live, not just claiming it.\n\n---"
  },
  {
    "source": "faq.md",
    "content": "Topic: FAQ — Common Questions About Manish Kumar - Contact\n\n**Q: How can I contact Manish?**\nEmail: krmanish2302@gmail.com\nLinkedIn: linkedin.com/in/manish-kumar-7915a7267\nGitHub: github.com/kumar2302github\n\n**Q: Is Manish available to talk?**\nYes. Manish welcomes conversations about job opportunities, freelance projects, collaborations, or just talking about AI. The best way to reach him is via email (krmanish2302@gmail.com) or LinkedIn."
  },
  {
    "source": "invoice_automation.md",
    "content": "Topic: Project: Invoice Processing Automation (Freelance) - Overview\n\nA production data pipeline that fully automates invoice processing for a client, replacing manual data entry with a fine-tuned multimodal transformer (LayoutLMv3) that understands both the text content and visual/spatial layout of invoice documents.\n\n---"
  },
  {
    "source": "invoice_automation.md",
    "content": "Topic: Project: Invoice Processing Automation (Freelance) - Problem Being Solved\n\nManual invoice processing is slow, error-prone, and expensive. Invoices come in different formats, layouts, and templates from different vendors — making rule-based extraction brittle. The client needed a system that could accurately extract key fields from diverse invoice formats at scale.\n\n---"
  },
  {
    "source": "invoice_automation.md",
    "content": "Topic: Project: Invoice Processing Automation (Freelance) - Technical Approach\n\n### Why LayoutLMv3?\n\nStandard text-only models fail on invoices because invoice meaning is encoded in spatial layout as well as text. A \"Total\" value on the bottom right has a different semantic role than the same word appearing in a header. LayoutLMv3 is a multimodal transformer that processes:\n- Text tokens\n- Bounding box positions (spatial layout)\n- Visual features (the rendered image of the document)\n\nThis joint understanding allows the model to correctly identify fields like vendor name, invoice number, dates, line items, subtotals, taxes, and grand totals regardless of template variation.\n\n### Fine-Tuning Process\n\n- Collected and annotated a dataset of diverse invoice documents with key fields labeled.\n- Fine-tuned LayoutLMv3 on this labeled dataset for token classification / key-value extraction.\n- Evaluated on a held-out test set to validate generalization.\n\n### Pipeline\n\n1. Invoice arrives (PDF or image).\n2. Document is preprocessed: OCR extracts text + bounding box coordinates.\n3. Fine-tuned LayoutLMv3 performs key-value extraction on the structured input.\n4. Extracted fields are validated against schema and written to the client's system.\n\n---"
  },
  {
    "source": "invoice_automation.md",
    "content": "Topic: Project: Invoice Processing Automation (Freelance) - Tech Stack\n\nPython, LayoutLMv3 (fine-tuned), Hugging Face Transformers, FastAPI, PyTorch\n\n---"
  },
  {
    "source": "invoice_automation.md",
    "content": "Topic: Project: Invoice Processing Automation (Freelance) - Outcome\n\n- ~90% extraction accuracy on key fields across diverse invoice formats.\n- Reduced client's manual data entry time by 40%.\n\n---"
  },
  {
    "source": "invoice_automation.md",
    "content": "Topic: Project: Invoice Processing Automation (Freelance) - What This Demonstrates\n\n- Multimodal AI (beyond text-only LLMs) — understanding of document layout intelligence.\n- Fine-tuning expertise with a specialized, less-common model (LayoutLMv3).\n- Real client delivery with quantified production outcomes.\n- End-to-end ML pipeline: data annotation → fine-tuning → evaluation → deployment."
  },
  {
    "source": "iot_rag_system.md",
    "content": "Topic: Project: IoT Hardware RAG System & Conversational Programming Interface (Arishna IOT Solutions) - Overview\n\nTwo interconnected systems built during Manish's Generative AI internship at Arishna IOT Solutions. First: a RAG system that grounds LLM code generation on official hardware documentation to fix critical reliability issues. Second: a conversational drag-and-drop programming interface that lets users build IoT programs through natural language, reducing programming time by ~50%.\n\n---"
  },
  {
    "source": "iot_rag_system.md",
    "content": "Topic: Project: IoT Hardware RAG System & Conversational Programming Interface (Arishna IOT Solutions) - Context\n\nArishna IOT Solutions works with specialized microcontrollers. A key challenge: general-purpose LLMs (GPT, Gemini, etc.) have limited or outdated knowledge of proprietary hardware APIs, pin configurations, and vendor-specific programming patterns. This caused the LLM to generate plausible-looking but incorrect code that didn't work on the actual hardware — a critical reliability failure in an IoT context.\n\n---"
  },
  {
    "source": "iot_rag_system.md",
    "content": "Topic: Project: IoT Hardware RAG System & Conversational Programming Interface (Arishna IOT Solutions) - System 1: RAG-Grounded Code Generation\n\n### Problem\nLLMs were generating code with inaccurate function calls, wrong pin mappings, and hallucinated API methods for specialized microcontrollers because this hardware-specific knowledge wasn't well-represented in their training data.\n\n### Solution\n- Collected official hardware documentation: datasheets, SDK references, vendor programming guides.\n- Performed exploratory data analysis (EDA) on the documentation to understand structure, identify key sections, and optimize chunking strategy for maximum retrieval relevance.\n- Built a RAG system that retrieves relevant hardware documentation chunks for each code generation request.\n- The LLM now generates code grounded in the actual, correct hardware documentation rather than relying solely on training data.\n\n### Outcome\nSignificantly improved code generation reliability and accuracy for the target microcontrollers.\n\n---"
  },
  {
    "source": "iot_rag_system.md",
    "content": "Topic: Project: IoT Hardware RAG System & Conversational Programming Interface (Arishna IOT Solutions) - System 2: Conversational Drag-and-Drop Programming Interface\n\n### Problem\nProgramming IoT devices requires specialized knowledge that many hardware users and non-programmer engineers don't have. The goal was to make IoT programming accessible through natural conversation.\n\n### Solution\n- Built a conversational interface where users describe what they want their IoT device to do in plain language.\n- The system uses LangGraph to manage the conversation state and logic flow across multiple turns.\n- Users can also drag-and-drop functional blocks visually, with the system translating the visual layout into working code.\n- Iterative prompt testing and LLM output evaluation were built into the development process to ensure reliable code generation.\n- Backend powered by FastAPI; LLM inference via Gemini API.\n\n### Outcome\nReduced programming time for end-users by approximately 50%.\n\n---"
  },
  {
    "source": "iot_rag_system.md",
    "content": "Topic: Project: IoT Hardware RAG System & Conversational Programming Interface (Arishna IOT Solutions) - Tech Stack\n\nPython, LangGraph, FastAPI, Gemini API, RAG pipeline, vector database, Streamlit\n\n---"
  },
  {
    "source": "iot_rag_system.md",
    "content": "Topic: Project: IoT Hardware RAG System & Conversational Programming Interface (Arishna IOT Solutions) - What This Demonstrates\n\n- Applying RAG to a domain-specific, non-text-generation problem (code generation reliability).\n- Practical EDA applied to document corpora — not just to tabular data.\n- LangGraph for conversational workflow management with multi-turn state.\n- Full-stack AI feature delivery within a company product context.\n- Understanding of where LLMs fail (hallucinated API calls) and systematic approaches to fix them."
  },
  {
    "source": "legal_document_platform.md",
    "content": "Topic: Project: Privacy-Centric Legal Document Analysis Platform - Overview\n\nA two-stage AI system built for legal teams that first anonymizes sensitive information in documents, then enables secure Q&A on the sanitized content. This was a freelance client project with real-world deployment.\n\n---"
  },
  {
    "source": "legal_document_platform.md",
    "content": "Topic: Project: Privacy-Centric Legal Document Analysis Platform - Problem Being Solved\n\nLegal teams deal with highly sensitive documents containing client PII, case details, and confidential information. Standard LLM-based document Q&A pipelines send raw document content to external APIs — creating serious privacy and compliance risks. Legal teams cannot use these tools safely without a PII protection layer.\n\n---"
  },
  {
    "source": "legal_document_platform.md",
    "content": "Topic: Project: Privacy-Centric Legal Document Analysis Platform - Solution Architecture\n\n### Stage 1: PII Anonymization\n- A BERT model was fine-tuned specifically to detect and classify Personally Identifiable Information (PII) in legal text: names, addresses, case numbers, phone numbers, financial details, and other sensitive entities.\n- Detected PII is replaced with anonymized placeholders (e.g., [PERSON_1], [CASE_NUMBER_2]) before any document content leaves the local system.\n- This ensures that when documents are sent to external LLM APIs for Q&A, no real client data is exposed.\n\n### Stage 2: RAG-Powered Q&A\n- The anonymized documents are indexed in a vector store.\n- Legal professionals can ask natural language questions: \"What are the key liability clauses?\", \"Summarize the contract obligations of Party A.\"\n- A RAG pipeline retrieves relevant passages and generates accurate, grounded answers.\n\n---"
  },
  {
    "source": "legal_document_platform.md",
    "content": "Topic: Project: Privacy-Centric Legal Document Analysis Platform - Tech Stack\n\nPython, BERT (fine-tuned for NER/PII detection), RAG pipeline, LangChain, FastAPI, vector database\n\n---"
  },
  {
    "source": "legal_document_platform.md",
    "content": "Topic: Project: Privacy-Centric Legal Document Analysis Platform - Outcome\n\nReduced manual document review time for legal teams by over 60%.\n\n---"
  },
  {
    "source": "legal_document_platform.md",
    "content": "Topic: Project: Privacy-Centric Legal Document Analysis Platform - What This Demonstrates\n\n- Understanding of real-world constraints (privacy, compliance, regulatory risk) — not just raw technical capability.\n- Ability to fine-tune transformer models for domain-specific tasks (legal PII detection).\n- End-to-end system design: problem → privacy layer → RAG layer → deployment.\n- Freelance client delivery with measurable, production-grade outcomes."
  },
  {
    "source": "multimodal_mood_watcher.md",
    "content": "Topic: Project: Multimodal Mood Watcher - Overview\n\nAn AI agent for real-time emotion detection that fuses two modalities simultaneously: facial expression recognition (computer vision) and speech emotion recognition (audio signal processing). By combining both signals, the system achieves more robust and nuanced emotion detection than single-modality approaches.\n\n**GitHub:** github.com/kumar2302github/multimodal-mood-watcher\n\n---"
  },
  {
    "source": "multimodal_mood_watcher.md",
    "content": "Topic: Project: Multimodal Mood Watcher - Problem Being Solved\n\nSingle-modality emotion detection is fragile. Facial analysis alone fails with occlusion, lighting changes, or neutral facial expressions. Speech analysis alone fails in noisy environments or with monotone speakers. Humans read emotion by integrating multiple cues simultaneously — this system does the same.\n\n---"
  },
  {
    "source": "multimodal_mood_watcher.md",
    "content": "Topic: Project: Multimodal Mood Watcher - Technical Architecture\n\n### Vision Branch (Facial Emotion Recognition)\n- Real-time face detection from webcam or video input using OpenCV.\n- Facial feature extraction and classification into emotion categories (happy, sad, angry, surprised, fearful, disgusted, neutral).\n- Built on pretrained vision models with transfer learning for emotion classification.\n\n### Speech Branch (Speech Emotion Recognition)\n- Audio feature extraction: MFCCs (Mel-Frequency Cepstral Coefficients), spectral features.\n- Emotion classification from speech signals.\n\n### Multimodal Fusion\n- Both branches produce emotion probability distributions.\n- Fusion layer combines predictions — either late fusion (weighted combination of output probabilities) or feature-level fusion.\n- Final emotion classification based on fused representation.\n\n---"
  },
  {
    "source": "multimodal_mood_watcher.md",
    "content": "Topic: Project: Multimodal Mood Watcher - Tech Stack\n\nPython, PyTorch, OpenCV, multimodal transformers, audio processing libraries\n\n---"
  },
  {
    "source": "multimodal_mood_watcher.md",
    "content": "Topic: Project: Multimodal Mood Watcher - What This Demonstrates\n\n- Computer vision proficiency beyond document processing.\n- Multimodal AI system design — understanding of how to fuse heterogeneous input signals.\n- End-to-end pipeline from raw sensory inputs (video frames + audio) to emotion labels.\n- Differentiator: most AI portfolios are purely LLM/NLP focused. This shows Manish's breadth across vision and audio domains."
  },
  {
    "source": "news_classifier_summarizer.md",
    "content": "Topic: Project: News Classifier and Summarizer - Overview\n\nA two-function NLP pipeline: a fine-tuned BERT classifier that categorizes news articles into predefined categories with ~99% accuracy, combined with a concise 80-word summarizer powered by a locally-run DeepSeek model. Includes OCR support for extracting text from news article images.\n\n**GitHub:** github.com/kumar2302github/News-classification-\n\n---"
  },
  {
    "source": "news_classifier_summarizer.md",
    "content": "Topic: Project: News Classifier and Summarizer - Problem Being Solved\n\nNews consumers face information overload. This tool automates two high-value tasks: (1) routing articles to the right category automatically, and (2) condensing articles to essential information without losing key context.\n\n---"
  },
  {
    "source": "news_classifier_summarizer.md",
    "content": "Topic: Project: News Classifier and Summarizer - Technical Components\n\n### News Classification (Fine-tuned BERT)\n- Base model: BERT (bert-base-uncased or similar).\n- Fine-tuned on a labeled news dataset for multi-class classification into four predefined categories (e.g., Politics, Sports, Technology, Business — or similar domain taxonomy).\n- Achieved ~99% classification accuracy on the test set.\n- Fine-tuning approach: added a classification head on top of BERT's [CLS] token representation, trained with cross-entropy loss.\n\n### News Summarization (DeepSeek via Ollama)\n- Uses deepseek-r1:8b model running locally via Ollama (no external API calls — fully private).\n- Generates concise 80-word summaries that preserve the core facts and context of the article.\n- Local inference means this runs without an internet connection or API cost after setup.\n\n### OCR Integration (Tesseract)\n- Tesseract OCR is integrated to extract text from images of news articles.\n- Allows the pipeline to process screenshots, scanned pages, or photographed newspaper clippings — not just plain text or HTML articles.\n\n### Interface\n- Deployed as a Streamlit app for easy interaction.\n\n---"
  },
  {
    "source": "news_classifier_summarizer.md",
    "content": "Topic: Project: News Classifier and Summarizer - Tech Stack\n\nPython, PyTorch, BERT (fine-tuned), Hugging Face Transformers, deepseek-r1:8b, Ollama, Tesseract OCR, Streamlit\n\n---"
  },
  {
    "source": "news_classifier_summarizer.md",
    "content": "Topic: Project: News Classifier and Summarizer - Outcome\n\n~99% classification accuracy on news categories.\n\n---"
  },
  {
    "source": "news_classifier_summarizer.md",
    "content": "Topic: Project: News Classifier and Summarizer - What This Demonstrates\n\n- Fine-tuning expertise: producing near-perfect accuracy on a classification task.\n- Local LLM deployment: running models via Ollama without API dependency.\n- OCR integration: extending NLP pipelines to handle image-based text inputs.\n- Practical, combined pipeline design (classify + summarize in one flow)."
  },
  {
    "source": "resume.md",
    "content": "Topic: Manish Kumar — Resume & Work History - Contact\n\n- Email: krmanish2302@gmail.com\n- Phone: +91-9031969516\n- GitHub: github.com/kumar2302github\n- LinkedIn: linkedin.com/in/manish-kumar-7915a7267\n\n---"
  },
  {
    "source": "resume.md",
    "content": "Topic: Manish Kumar — Resume & Work History - Professional Experience\n\n### Generative AI Intern — Arishna IOT Solutions\n**Remote | June 2025 – December 2025**\n\nArishna IOT Solutions is an IoT-focused company where Manish worked as a Generative AI intern, applying LLM and RAG techniques to hardware programming challenges.\n\nKey contributions:\n- Identified and resolved critical inaccuracies in LLM-generated code for specialized microcontrollers. The root problem was that general-purpose LLMs lacked knowledge of proprietary hardware documentation. Manish built a RAG system grounded on official hardware documentation, performed exploratory data analysis (EDA) to optimize document ingestion, and significantly improved code generation reliability.\n- Designed and built a conversational, drag-and-drop programming interface using LangGraph, FastAPI, and the Gemini API. The system allowed users to build IoT programs visually through conversation, with iterative prompt testing and evaluation built into the development process. This reduced programming time for end-users by approximately 50%.\n\n---\n\n### Junior AI Developer — Freelance\n**Remote | May 2024 – Present**\n\nManish has independently executed multiple client-facing AI development projects with measurable, production-level outcomes.\n\n**Project A: Privacy-Centric Legal Document Analysis Platform**\n- Built a two-stage document analysis system for legal teams.\n- Stage 1: Fine-tuned a BERT model to detect and anonymize Personally Identifiable Information (PII) in legal documents before any LLM processing occurs — ensuring client data privacy and regulatory compliance.\n- Stage 2: A RAG pipeline enabling secure, accurate Q&A on the sanitized documents.\n- Outcome: Reduced manual document review time for legal teams by over 60%.\n\n**Project B: Invoice Processing Automation**\n- Automated an entire invoice processing workflow for a client using a data pipeline powered by a fine-tuned LayoutLMv3 model (a multimodal transformer that processes both text and layout/visual structure of documents).\n- Achieved approximately 90% extraction accuracy on key invoice fields (vendor name, dates, line items, totals).\n- Outcome: Slashed manual data entry time by 40%.\n\n**Project C: Schema-Driven Document Key-Value Extraction (PoC)**\n- Built a proof of concept for schema-driven extraction of structured key-value pairs from diverse document types using Large Multimodal Models (LMMs).\n- Demonstrated improved structured data extraction accuracy compared to rule-based approaches.\n\n---"
  },
  {
    "source": "resume.md",
    "content": "Topic: Manish Kumar — Resume & Work History - Education\n\n### B.Tech in Computer Science & Engineering\n**Bhagalpur College of Engineering, Bhagalpur, Bihar | 2021–2025**\n- CGPA: 7.74 / 10.0\n\n### Class 12th\n**Bihar School Examination Board | 2020**\n- Percentage: 83.2%\n- Ranked in Top 1% in the state.\n\n---"
  },
  {
    "source": "resume.md",
    "content": "Topic: Manish Kumar — Resume & Work History - Certifications\n\n- **Generative AI with LLMs & Prompt Engineering** — DeepLearning.ai (Completed)\n- **AI Agents & Agentic Workflows** (covering Agentic RAG, Multi-Agent Systems, LangGraph) — Coursera (In Progress)\n- **Supervised & Unsupervised Learning, Deep Learning** — Scaler (Completed)\n\n---"
  },
  {
    "source": "resume.md",
    "content": "Topic: Manish Kumar — Resume & Work History - Achievements & Recognition\n\n- **Top 25 Startup Idea** — Startup Bihar Innovation Challenge\n- **2nd Position** — Smart India (Internal) Hackathon\n- **2nd Position** — Inter-College Robotics Competition\n- **Top 1% in state** — Class 12th Bihar Board Examination\n- **Head Coordinator, ESROS Robotics Club** — September 2024 to June 2025\n- **Assistant Coordinator, ESROS Robotics Club** — October 2023 to August 2024"
  },
  {
    "source": "skills.md",
    "content": "Topic: Manish Kumar — Skills & Technical Expertise - Overview\n\nManish Kumar's skills span the full AI/ML stack — from classical machine learning and deep learning through to the latest Generative AI, LLM fine-tuning, RAG systems, agentic AI, and multimodal document understanding. He works primarily in Python and has production experience deploying AI systems via FastAPI and Docker.\n\n---"
  },
  {
    "source": "skills.md",
    "content": "Topic: Manish Kumar — Skills & Technical Expertise - Programming Languages\n\n- **Python** — Primary language. Used across all ML, DL, and Gen AI projects. Deep familiarity with the Python AI/ML ecosystem.\n- **SQL** — Used for structured data queries, database integration in agentic systems (e.g., agentic chatbot querying SQL databases).\n- **C++** — Academic and competitive programming background.\n- **C** — Academic background.\n\n---"
  },
  {
    "source": "skills.md",
    "content": "Topic: Manish Kumar — Skills & Technical Expertise - Generative AI & LLMs\n\nThis is Manish's core specialization and primary area of expertise.\n\n### Retrieval-Augmented Generation (RAG)\nManish has built multiple production and near-production RAG systems:\n- YouTube transcript Q&A chatbot with hybrid retrieval (semantic + keyword).\n- Legal document analysis platform with PII-anonymization preprocessing.\n- RAG system for IoT hardware documentation grounding (at Arishna IOT Solutions).\n- Multi-source agentic RAG across PDFs, SQL, and web content.\n\nHe understands chunking strategies, embedding model selection, vector store design, retrieval evaluation, and prompt construction for grounded Q&A.\n\n### LLM Fine-tuning\n- Fine-tuned BERT for PII detection and news classification (~99% accuracy on news classification).\n- Fine-tuned LayoutLMv3 (multimodal transformer) for structured invoice field extraction (~90% accuracy).\n- Familiar with PEFT (Parameter-Efficient Fine-Tuning), LoRA (Low-Rank Adaptation), and Prompt Tuning techniques.\n\n### Agentic AI & Multi-Agent Systems\n- Built a multi-agent routing framework using LangGraph for contextual chat across heterogeneous data sources (PDFs, SQL, web).\n- Developed conversational drag-and-drop IoT programming interface using LangGraph at Arishna IOT Solutions.\n- Understands tool calling, agent orchestration, memory systems, and evaluation of agentic outputs.\n\n### LangChain & LangGraph\n- LangChain: Used for RAG pipelines, document loaders, retrievers, chains.\n- LangGraph: Used for stateful multi-agent workflows, conditional routing between agents.\n\n### Prompt Engineering\n- Iterative prompt testing and evaluation built into development workflow.\n- Experience with system prompt design, few-shot prompting, chain-of-thought, and RAG-specific prompt construction.\n- Certified in Generative AI with LLMs & Prompt Engineering (DeepLearning.ai).\n\n### Model Context Protocol (MCP)\n- Familiar with MCP — the emerging standard for connecting AI models to external tools and data sources.\n\n### LLMs & Foundation Models Used\n- OpenAI GPT models (via API)\n- Google Gemini API\n- Anthropic Claude API\n- Meta Llama\n- Mistral\n- DeepSeek (deepseek-r1:8b via Ollama for local inference)\n- Groq LPU (for fast inference in agentic systems)\n- BERT (fine-tuned variants)\n- LayoutLMv3 (multimodal, fine-tuned)\n- Qwen\n\n### Vector Databases\n- Familiar with vector database concepts and usage for semantic search and RAG.\n\n---"
  },
  {
    "source": "skills.md",
    "content": "Topic: Manish Kumar — Skills & Technical Expertise - Machine Learning & Deep Learning\n\n### Frameworks\n- **PyTorch** — Primary deep learning framework for training and fine-tuning models.\n- **TensorFlow / Keras** — Secondary framework; used for standard DL tasks.\n- **Scikit-learn** — Classical ML: classification, regression, clustering, feature engineering.\n- **Hugging Face Transformers** — Pre-trained model hub, tokenizers, fine-tuning pipelines.\n\n### ML Concepts & Techniques\n- Neural Networks: DNN, CNN, RNN, LSTM, ResNet architectures.\n- Linear Models, Decision Trees, Ensemble Methods (Random Forest, Gradient Boosting).\n- Clustering algorithms.\n- Feature Engineering and Data Analysis.\n- Transfer Learning.\n- Distributed Training (academic familiarity).\n- Model evaluation, LLM-as-a-Judge, evaluation frameworks.\n\n---"
  },
  {
    "source": "skills.md",
    "content": "Topic: Manish Kumar — Skills & Technical Expertise - Natural Language Processing (NLP)\n\n- Named Entity Recognition (NER)\n- Transformers and attention mechanisms\n- Word Embeddings: Word2Vec, GloVe\n- Sentence Transformers (for semantic search and RAG)\n- Question Answering systems\n- Semantic Search\n- Text Classification (fine-tuned BERT at ~99% accuracy)\n- Text Summarization (deepseek-r1:8b via Ollama)\n- Information Retrieval\n\n---"
  },
  {
    "source": "skills.md",
    "content": "Topic: Manish Kumar — Skills & Technical Expertise - Computer Vision\n\n- **OpenCV** — Image processing, real-time video analysis.\n- **OCR (Tesseract)** — Text extraction from images; integrated into news summarizer pipeline.\n- **Multimodal Transformers** — LayoutLMv3 for document layout understanding; multimodal models for facial/emotion recognition.\n- **Image Processing** — Preprocessing pipelines for vision tasks.\n- Used in: Multimodal Mood Watcher (emotion detection from face + speech), invoice automation (LayoutLMv3), news summarizer (Tesseract OCR).\n\n---"
  },
  {
    "source": "skills.md",
    "content": "Topic: Manish Kumar — Skills & Technical Expertise - Backend, APIs & Deployment\n\n- **FastAPI** — Backend API development for AI applications. Used at Arishna IOT Solutions and in freelance projects.\n- **Streamlit** — Rapid prototyping and deployment of ML/AI demos and tools.\n- **Docker** — Containerization of AI applications for reproducible deployment.\n- **Git** — Version control across all projects.\n- **MySQL** — Relational database; used in agentic chatbot SQL query integration.\n- **OpenAI API** — Direct API integration for embeddings and completions.\n- **Gemini API** — Used in IoT programming interface and YouTube chatbot.\n- **Claude API (Anthropic)** — Familiar with Anthropic's Claude API.\n- **Hugging Face Hub** — Model hosting, dataset access, and inference API.\n\n---"
  },
  {
    "source": "skills.md",
    "content": "Topic: Manish Kumar — Skills & Technical Expertise - Skill Proficiency Summary\n\n| Area | Level |\n|---|---|\n| RAG Systems | Advanced — multiple production implementations |\n| LLM Fine-tuning (BERT, LayoutLM) | Advanced — proven results with measurable accuracy |\n| LangChain / LangGraph | Advanced — agentic systems and pipelines |\n| Agentic AI | Intermediate-Advanced — multi-agent routing, tool calling |\n| Prompt Engineering | Advanced — certified + production-tested |\n| PyTorch / Transformers | Intermediate-Advanced |\n| FastAPI / Deployment | Intermediate |\n| Computer Vision | Intermediate |\n| Classical ML | Intermediate |\n| MCP | Familiar / Actively Learning |"
  },
  {
    "source": "youtube_rag_chatbot.md",
    "content": "Topic: Project: RAG-Powered Chatbot for YouTube Transcript Understanding - Overview\n\nManish built a Retrieval-Augmented Generation (RAG) application that lets users have a natural language Q&A conversation with any YouTube video — without watching it. The user provides a YouTube URL, and the system retrieves the video transcript, indexes it, and answers questions using hybrid retrieval.\n\n**GitHub:** github.com/kumar2302github/RAG-powered-chatbot-for-YouTube-transcript-understanding_\n**Stars:** 3 | **Forks:** 1\n\n---"
  },
  {
    "source": "youtube_rag_chatbot.md",
    "content": "Topic: Project: RAG-Powered Chatbot for YouTube Transcript Understanding - Problem Being Solved\n\nLong YouTube videos (lectures, tutorials, interviews, podcasts) contain valuable information, but extracting specific answers requires manually watching or scrubbing through the content. This tool removes that friction entirely.\n\n---"
  },
  {
    "source": "youtube_rag_chatbot.md",
    "content": "Topic: Project: RAG-Powered Chatbot for YouTube Transcript Understanding - Technical Architecture\n\n1. User inputs a YouTube video URL.\n2. System extracts the video transcript using the YouTube Transcript API.\n3. Transcript is chunked into segments (chunk size is user-configurable).\n4. Chunks are embedded and stored in a vector index.\n5. On user query: hybrid retrieval (semantic similarity + keyword matching) finds the most relevant chunks.\n6. Retrieved chunks are passed to an LLM (OpenAI or Gemini) with the user's question as a prompt.\n7. LLM generates a grounded, cited answer.\n\n---"
  },
  {
    "source": "youtube_rag_chatbot.md",
    "content": "Topic: Project: RAG-Powered Chatbot for YouTube Transcript Understanding - Key Technical Decisions\n\n- **Hybrid retrieval** (not just semantic): combining dense vector search with sparse keyword search improves recall, especially for specific names, numbers, and technical terms.\n- **User-configurable parameters**: chunk size and relevance threshold are exposed to the user, allowing control over retrieval precision vs. recall.\n- **Multi-LLM support**: both OpenAI and Gemini API backends are supported.\n\n---"
  },
  {
    "source": "youtube_rag_chatbot.md",
    "content": "Topic: Project: RAG-Powered Chatbot for YouTube Transcript Understanding - Tech Stack\n\nPython, LangChain, OpenAI API, Gemini API, Streamlit, vector database\n\n---"
  },
  {
    "source": "youtube_rag_chatbot.md",
    "content": "Topic: Project: RAG-Powered Chatbot for YouTube Transcript Understanding - Outcome\n\nReduces information search time by 70% compared to manually watching or scrubbing through video content.\n\n---"
  },
  {
    "source": "youtube_rag_chatbot.md",
    "content": "Topic: Project: RAG-Powered Chatbot for YouTube Transcript Understanding - What This Demonstrates\n\n- End-to-end RAG pipeline ownership (data ingestion → chunking → embedding → retrieval → generation).\n- Thoughtfulness about retrieval quality (hybrid over pure semantic).\n- User-centric design (configurable parameters for different use cases).\n- Multi-LLM integration."
  }
];
