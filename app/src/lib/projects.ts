export interface Project {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  date: string;
  github: string | null;
  status: 'complete' | 'in-progress';
  highlight: string;
  body: string;
}

export const projects: Project[] = [
  {
    slug: 'youtube-rag-chatbot',
    title: 'YouTube RAG Chatbot',
    summary: 'Query any YouTube video through conversation — no watching required.',
    tags: ['Python', 'RAG', 'OpenAI', 'Gemini', 'Streamlit', 'LangChain'],
    date: '2024-10',
    github: 'https://github.com/kumar2302github/RAG-powered-chatbot-for-YouTube-transcript-understanding_',
    status: 'complete',
    highlight: '70% reduction in information search time',
    body: `
## Problem

Researchers, students, and professionals waste hours watching long YouTube videos to extract key information. Traditional search within video platforms is limited to metadata, not content.

## Solution

A RAG-powered chatbot that ingests YouTube transcripts, chunks them intelligently, and enables conversational querying. Ask "What did the speaker say about deployment costs?" and get an instant, sourced answer.

## Technical Architecture

**Hybrid Retrieval Pipeline**
- Chunking strategy: Sliding window with configurable overlap (default 1000 chars, 200 overlap)
- Relevance threshold: Cosine similarity > 0.75 for inclusion
- Top-k retrieval: 5 most relevant chunks per query

**Models Used**
- Embeddings: OpenAI text-embedding-3-small
- LLM: Gemini 1.5 Pro for response generation
- Whisper API for transcript extraction (fallback to YouTube auto-captions)

**Deployment**
- Streamlit frontend for rapid prototyping
- LangChain orchestration with custom retriever
- Configurable parameters: chunk size, overlap, relevance threshold, temperature

## Key Results

- 70% reduction in information search time vs. manual video watching
- Supports videos up to 4 hours in length
- Average query latency: 2.3 seconds end-to-end
- 94% user-reported answer relevance in testing
    `,
  },
  {
    slug: 'news-classifier',
    title: 'News Classifier & Summarizer',
    summary: 'Fine-tuned BERT for news classification + deepseek-r1:8b powered summarizer with OCR.',
    tags: ['Python', 'PyTorch', 'BERT', 'Transformers', 'Ollama', 'Tesseract OCR', 'Streamlit'],
    date: '2024-08',
    github: 'https://github.com/kumar2302github/News-classification-',
    status: 'complete',
    highlight: '~99% classification accuracy',
    body: `
## Problem

News aggregation platforms need to automatically categorize articles and provide concise summaries. Existing solutions are either API-dependent (costly at scale) or inaccurate for niche categories.

## Solution

A fully local pipeline: fine-tuned BERT for 5-category classification + DeepSeek-R1 8B running via Ollama for abstractive summarization. Includes OCR support for image-based news (scanned newspapers, screenshots).

## Technical Architecture

**Classification Pipeline**
- Base model: bert-base-uncased
- Fine-tuned on: AG News + custom scraped dataset (~120k articles)
- Categories: World, Sports, Business, Sci/Tech, Entertainment
- Training: 3 epochs, learning rate 2e-5, batch size 32
- Hardware: RTX 3060 12GB

**Summarization Pipeline**
- Model: deepseek-r1:8b via Ollama (local inference)
- Prompt engineering for consistent output format
- Max summary length: 100 words
- Temperature: 0.3 for factual consistency

**OCR Integration**
- Tesseract OCR for image-to-text
- Preprocessing: Grayscale → Deskew → Noise reduction
- Supports: JPEG, PNG, TIFF, scanned PDF pages

## Key Results

- Classification accuracy: 98.7% on test set
- Inference speed: ~45ms per article (classification)
- Summarization: ~2.1s per article (8B model, CPU-optimized)
- OCR accuracy: 91% on clean scans, 76% on degraded images
    `,
  },
  {
    slug: 'multimodal-mood-watcher',
    title: 'Multimodal Mood Watcher',
    summary: 'AI agent that reads emotion from both your face and voice simultaneously.',
    tags: ['Python', 'Computer Vision', 'Speech Recognition', 'OpenCV', 'PyTorch', 'Multimodal AI'],
    date: '2025-02',
    github: 'https://github.com/kumar2302github/multimodal-mood-watcher',
    status: 'complete',
    highlight: 'Dual-modality: face + speech fusion',
    body: `
## Problem

Unimodal emotion recognition is unreliable. Facial expressions can be faked; vocal tone reveals what expressions hide. True emotional intelligence requires both.

## Solution

A multimodal AI that processes facial expressions and vocal tone simultaneously, fusing both signals for a more accurate emotional readout. Built for real-time applications like call center analytics, mental health screening, and interactive storytelling.

## Technical Architecture

**Face Branch**
- OpenCV for face detection (Haar cascade + DNN refinement)
- Custom CNN: 4 conv blocks → global avg pooling → 128-d embedding
- Emotion classes: Neutral, Happy, Sad, Angry, Fearful, Surprised, Disgusted

**Speech Branch**
- Librosa for feature extraction (MFCC, mel spectrogram, pitch, energy)
- LSTM network for temporal audio modeling
- Emotion classes: Neutral, Happy, Sad, Angry, Fearful

**Fusion Layer**
- Concatenation of face embedding (128-d) + speech embedding (64-d)
- 2-layer MLP with dropout 0.3
- Weighted loss: face loss × 0.4 + speech loss × 0.35 + fusion loss × 0.25

## Key Results

- Face-only accuracy: 72.3%
- Speech-only accuracy: 68.1%
- **Fused accuracy: 84.7%** (+12.4% vs. best unimodal)
- Real-time inference: 15 FPS on CPU (laptop-grade)
- Latency: ~67ms per frame
    `,
  },
  {
    slug: 'legal-doc-analyzer',
    title: 'Legal Document Analyzer',
    summary: 'Anonymize PII with fine-tuned BERT, then Q&A on sensitive documents safely via RAG.',
    tags: ['Python', 'BERT', 'RAG', 'FastAPI', 'NLP', 'Privacy AI', 'LangChain'],
    date: '2024-12',
    github: null,
    status: 'complete',
    highlight: '60%+ reduction in manual review time',
    body: `
## Problem

Legal teams spend hundreds of hours manually reviewing documents for PII before sharing with external counsel or uploading to AI tools. Existing anonymization tools miss context-specific entities (case numbers, judge names, jurisdiction-specific identifiers).

## Solution

A privacy-first legal document analysis platform: fine-tuned BERT for PII detection → anonymization → RAG-based Q&A on the sanitized document. Zero sensitive data ever reaches the LLM.

## Technical Architecture

**PII Detection Pipeline**
- Base model: BERT-base-cased (legal domain)
- Fine-tuned on: Custom annotated legal corpus (~8k documents)
- Entity types: PERSON, ORG, CASE_NUMBER, COURT, DATE, EMAIL, PHONE, ADDRESS, SSN
- Precision: 94.2% | Recall: 91.8% | F1: 93.0%

**Anonymization Strategy**
- Replacement with entity type tags: [PERSON_1], [CASE_NUMBER_1]
- Consistent mapping: same entity → same tag across document
- Reversible: maintains a secure lookup table client-side

**RAG Q&A**
- Chunking: Sentence-aware splitting (preserve legal clause boundaries)
- Retriever: Dense passage retrieval with legal-domain embeddings
- LLM: GPT-4 via API (only sees anonymized text)
- Answer reconstruction: De-anonymize entity references in responses

## Key Results

- 60%+ reduction in manual PII review time
- Zero PII leakage in 500+ test documents
- Average Q&A latency: 3.1 seconds
- 89% answer relevance score (legal expert evaluation)
    `,
  },
  {
    slug: 'agentic-chatbot',
    title: 'Agentic RAG Chatbot',
    summary: 'Multi-agent system that routes your question to the right source — PDF, SQL, or the web.',
    tags: ['Python', 'LangGraph', 'Groq', 'Agentic AI', 'RAG', 'FastAPI', 'Multi-Agent'],
    date: '2025-04',
    github: null,
    status: 'complete',
    highlight: 'Heterogeneous source routing: PDF + SQL + Web',
    body: `
## Problem

Enterprise knowledge is fragmented across databases, document repositories, and the public web. Users don't know where to look — they just want answers. Traditional chatbots force a single data source, missing the full picture.

## Solution

An agentic multi-source chatbot built on LangGraph. The system analyzes each query, routes it to the appropriate source(s) — PDF documents, SQL databases, or web search — and synthesizes a unified answer with source attribution.

## Technical Architecture

**LangGraph State Machine**
- Entry node: Query analysis (intent classification + source prediction)
- Router: Conditional edges to PDF agent, SQL agent, or Web agent
- Parallel execution: Multiple sources can be queried simultaneously
- Synthesis node: Merge results from multiple sources, resolve conflicts
- Exit node: Format final answer with citations

**Agent Design**
- **PDF Agent**: Dense retrieval over uploaded documents + reranking
- **SQL Agent**: Text-to-SQL with schema awareness + query validation
- **Web Agent**: Real-time search + content extraction + summarization

**Performance**
- Routing accuracy: 94% (correct source selection)
- Groq LPU inference: ~800 tokens/s (mixtral-8x7b)
- End-to-end latency: 1.2s (single source), 2.8s (multi-source)

## Key Results

- Heterogeneous source routing: PDF + SQL + Web in a single query
- Source attribution: Every answer cites its source
- Extensible: New agent types can be added to the graph without modifying existing nodes
- 40% improvement in answer completeness vs. single-source RAG
    `,
  },
];
