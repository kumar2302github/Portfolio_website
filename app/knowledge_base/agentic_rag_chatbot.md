# Project: Agentic RAG Chatbot (Multi-Source, Multi-Agent)

## Overview

A proof-of-concept multi-agent agentic RAG system that enables contextual chat and intelligent querying across heterogeneous data sources — PDFs, SQL databases, and live web content — within a single conversational interface. Built using LangGraph for stateful agent orchestration and Groq LPU for high-speed inference.

---

## Problem Being Solved

Real-world knowledge is scattered across different formats and systems: some in PDFs (reports, documents), some in structured databases (SQL), some on the web. Standard RAG systems are built for one source type. A user asking complex questions often needs answers that span all of these — and a routing system smart enough to know which source to query.

---

## Technical Architecture

### Multi-Agent Routing Framework

The core innovation is the routing layer. When a user asks a question, an orchestrator agent classifies the query and routes it to the most appropriate specialized agent:

- **PDF Agent**: Handles queries about uploaded documents. Performs vector search over embedded PDF chunks.
- **SQL Agent**: Translates natural language questions into SQL queries and retrieves structured data from a relational database.
- **Web Agent**: Performs live web search and retrieves current information for queries that require up-to-date knowledge.

The router uses the query intent, entity types, and context to decide the routing path. For complex queries spanning multiple sources, agents can be chained.

### LangGraph for Orchestration

LangGraph is used to define the agent workflow as a stateful graph:
- Nodes represent agent actions (route, retrieve, generate, validate).
- Edges represent conditional transitions based on query classification and retrieval results.
- State is persisted across turns, enabling multi-turn contextual conversations.

### Groq LPU for Inference

Groq's LPU (Language Processing Unit) hardware is used for inference, enabling significantly faster response times compared to standard GPU-based inference — critical for the low-latency experience needed in agentic multi-step workflows.

---

## Tech Stack

Python, LangGraph, LangChain, Groq LPU, Streamlit, vector database, SQL (MySQL), web search integration

---

## What This Demonstrates

- Advanced agentic AI architecture — not just a single RAG chain, but a multi-agent system with intelligent routing.
- LangGraph proficiency — stateful workflow design, conditional routing, multi-turn memory.
- Multi-source retrieval — understanding that production RAG needs to handle heterogeneous data.
- Performance awareness — deliberate use of Groq LPU for latency optimization in agentic workflows.
- System thinking: how individual agents compose into a coherent, reliable conversational system.
