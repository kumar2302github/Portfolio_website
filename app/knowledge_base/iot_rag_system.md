# Project: IoT Hardware RAG System & Conversational Programming Interface (Arishna IOT Solutions)

## Overview

Two interconnected systems built during Manish's Generative AI internship at Arishna IOT Solutions. First: a RAG system that grounds LLM code generation on official hardware documentation to fix critical reliability issues. Second: a conversational drag-and-drop programming interface that lets users build IoT programs through natural language, reducing programming time by ~50%.

---

## Context

Arishna IOT Solutions works with specialized microcontrollers. A key challenge: general-purpose LLMs (GPT, Gemini, etc.) have limited or outdated knowledge of proprietary hardware APIs, pin configurations, and vendor-specific programming patterns. This caused the LLM to generate plausible-looking but incorrect code that didn't work on the actual hardware — a critical reliability failure in an IoT context.

---

## System 1: RAG-Grounded Code Generation

### Problem
LLMs were generating code with inaccurate function calls, wrong pin mappings, and hallucinated API methods for specialized microcontrollers because this hardware-specific knowledge wasn't well-represented in their training data.

### Solution
- Collected official hardware documentation: datasheets, SDK references, vendor programming guides.
- Performed exploratory data analysis (EDA) on the documentation to understand structure, identify key sections, and optimize chunking strategy for maximum retrieval relevance.
- Built a RAG system that retrieves relevant hardware documentation chunks for each code generation request.
- The LLM now generates code grounded in the actual, correct hardware documentation rather than relying solely on training data.

### Outcome
Significantly improved code generation reliability and accuracy for the target microcontrollers.

---

## System 2: Conversational Drag-and-Drop Programming Interface

### Problem
Programming IoT devices requires specialized knowledge that many hardware users and non-programmer engineers don't have. The goal was to make IoT programming accessible through natural conversation.

### Solution
- Built a conversational interface where users describe what they want their IoT device to do in plain language.
- The system uses LangGraph to manage the conversation state and logic flow across multiple turns.
- Users can also drag-and-drop functional blocks visually, with the system translating the visual layout into working code.
- Iterative prompt testing and LLM output evaluation were built into the development process to ensure reliable code generation.
- Backend powered by FastAPI; LLM inference via Gemini API.

### Outcome
Reduced programming time for end-users by approximately 50%.

---

## Tech Stack

Python, LangGraph, FastAPI, Gemini API, RAG pipeline, vector database, Streamlit

---

## What This Demonstrates

- Applying RAG to a domain-specific, non-text-generation problem (code generation reliability).
- Practical EDA applied to document corpora — not just to tabular data.
- LangGraph for conversational workflow management with multi-turn state.
- Full-stack AI feature delivery within a company product context.
- Understanding of where LLMs fail (hallucinated API calls) and systematic approaches to fix them.
