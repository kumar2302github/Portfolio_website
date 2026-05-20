# Project: News Classifier and Summarizer

## Overview

A two-function NLP pipeline: a fine-tuned BERT classifier that categorizes news articles into predefined categories with ~99% accuracy, combined with a concise 80-word summarizer powered by a locally-run DeepSeek model. Includes OCR support for extracting text from news article images.

**GitHub:** github.com/kumar2302github/News-classification-

---

## Problem Being Solved

News consumers face information overload. This tool automates two high-value tasks: (1) routing articles to the right category automatically, and (2) condensing articles to essential information without losing key context.

---

## Technical Components

### News Classification (Fine-tuned BERT)
- Base model: BERT (bert-base-uncased or similar).
- Fine-tuned on a labeled news dataset for multi-class classification into four predefined categories (e.g., Politics, Sports, Technology, Business — or similar domain taxonomy).
- Achieved ~99% classification accuracy on the test set.
- Fine-tuning approach: added a classification head on top of BERT's [CLS] token representation, trained with cross-entropy loss.

### News Summarization (DeepSeek via Ollama)
- Uses deepseek-r1:8b model running locally via Ollama (no external API calls — fully private).
- Generates concise 80-word summaries that preserve the core facts and context of the article.
- Local inference means this runs without an internet connection or API cost after setup.

### OCR Integration (Tesseract)
- Tesseract OCR is integrated to extract text from images of news articles.
- Allows the pipeline to process screenshots, scanned pages, or photographed newspaper clippings — not just plain text or HTML articles.

### Interface
- Deployed as a Streamlit app for easy interaction.

---

## Tech Stack

Python, PyTorch, BERT (fine-tuned), Hugging Face Transformers, deepseek-r1:8b, Ollama, Tesseract OCR, Streamlit

---

## Outcome

~99% classification accuracy on news categories.

---

## What This Demonstrates

- Fine-tuning expertise: producing near-perfect accuracy on a classification task.
- Local LLM deployment: running models via Ollama without API dependency.
- OCR integration: extending NLP pipelines to handle image-based text inputs.
- Practical, combined pipeline design (classify + summarize in one flow).
