# Project: Privacy-Centric Legal Document Analysis Platform

## Overview

A two-stage AI system built for legal teams that first anonymizes sensitive information in documents, then enables secure Q&A on the sanitized content. This was a freelance client project with real-world deployment.

---

## Problem Being Solved

Legal teams deal with highly sensitive documents containing client PII, case details, and confidential information. Standard LLM-based document Q&A pipelines send raw document content to external APIs — creating serious privacy and compliance risks. Legal teams cannot use these tools safely without a PII protection layer.

---

## Solution Architecture

### Stage 1: PII Anonymization
- A BERT model was fine-tuned specifically to detect and classify Personally Identifiable Information (PII) in legal text: names, addresses, case numbers, phone numbers, financial details, and other sensitive entities.
- Detected PII is replaced with anonymized placeholders (e.g., [PERSON_1], [CASE_NUMBER_2]) before any document content leaves the local system.
- This ensures that when documents are sent to external LLM APIs for Q&A, no real client data is exposed.

### Stage 2: RAG-Powered Q&A
- The anonymized documents are indexed in a vector store.
- Legal professionals can ask natural language questions: "What are the key liability clauses?", "Summarize the contract obligations of Party A."
- A RAG pipeline retrieves relevant passages and generates accurate, grounded answers.

---

## Tech Stack

Python, BERT (fine-tuned for NER/PII detection), RAG pipeline, LangChain, FastAPI, vector database

---

## Outcome

Reduced manual document review time for legal teams by over 60%.

---

## What This Demonstrates

- Understanding of real-world constraints (privacy, compliance, regulatory risk) — not just raw technical capability.
- Ability to fine-tune transformer models for domain-specific tasks (legal PII detection).
- End-to-end system design: problem → privacy layer → RAG layer → deployment.
- Freelance client delivery with measurable, production-grade outcomes.
