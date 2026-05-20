# Project: RAG-Powered Chatbot for YouTube Transcript Understanding

## Overview

Manish built a Retrieval-Augmented Generation (RAG) application that lets users have a natural language Q&A conversation with any YouTube video — without watching it. The user provides a YouTube URL, and the system retrieves the video transcript, indexes it, and answers questions using hybrid retrieval.

**GitHub:** github.com/kumar2302github/RAG-powered-chatbot-for-YouTube-transcript-understanding_
**Stars:** 3 | **Forks:** 1

---

## Problem Being Solved

Long YouTube videos (lectures, tutorials, interviews, podcasts) contain valuable information, but extracting specific answers requires manually watching or scrubbing through the content. This tool removes that friction entirely.

---

## Technical Architecture

1. User inputs a YouTube video URL.
2. System extracts the video transcript using the YouTube Transcript API.
3. Transcript is chunked into segments (chunk size is user-configurable).
4. Chunks are embedded and stored in a vector index.
5. On user query: hybrid retrieval (semantic similarity + keyword matching) finds the most relevant chunks.
6. Retrieved chunks are passed to an LLM (OpenAI or Gemini) with the user's question as a prompt.
7. LLM generates a grounded, cited answer.

---

## Key Technical Decisions

- **Hybrid retrieval** (not just semantic): combining dense vector search with sparse keyword search improves recall, especially for specific names, numbers, and technical terms.
- **User-configurable parameters**: chunk size and relevance threshold are exposed to the user, allowing control over retrieval precision vs. recall.
- **Multi-LLM support**: both OpenAI and Gemini API backends are supported.

---

## Tech Stack

Python, LangChain, OpenAI API, Gemini API, Streamlit, vector database

---

## Outcome

Reduces information search time by 70% compared to manually watching or scrubbing through video content.

---

## What This Demonstrates

- End-to-end RAG pipeline ownership (data ingestion → chunking → embedding → retrieval → generation).
- Thoughtfulness about retrieval quality (hybrid over pure semantic).
- User-centric design (configurable parameters for different use cases).
- Multi-LLM integration.
