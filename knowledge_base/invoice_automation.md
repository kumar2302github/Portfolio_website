# Project: Invoice Processing Automation (Freelance)

## Overview

A production data pipeline that fully automates invoice processing for a client, replacing manual data entry with a fine-tuned multimodal transformer (LayoutLMv3) that understands both the text content and visual/spatial layout of invoice documents.

---

## Problem Being Solved

Manual invoice processing is slow, error-prone, and expensive. Invoices come in different formats, layouts, and templates from different vendors — making rule-based extraction brittle. The client needed a system that could accurately extract key fields from diverse invoice formats at scale.

---

## Technical Approach

### Why LayoutLMv3?

Standard text-only models fail on invoices because invoice meaning is encoded in spatial layout as well as text. A "Total" value on the bottom right has a different semantic role than the same word appearing in a header. LayoutLMv3 is a multimodal transformer that processes:
- Text tokens
- Bounding box positions (spatial layout)
- Visual features (the rendered image of the document)

This joint understanding allows the model to correctly identify fields like vendor name, invoice number, dates, line items, subtotals, taxes, and grand totals regardless of template variation.

### Fine-Tuning Process

- Collected and annotated a dataset of diverse invoice documents with key fields labeled.
- Fine-tuned LayoutLMv3 on this labeled dataset for token classification / key-value extraction.
- Evaluated on a held-out test set to validate generalization.

### Pipeline

1. Invoice arrives (PDF or image).
2. Document is preprocessed: OCR extracts text + bounding box coordinates.
3. Fine-tuned LayoutLMv3 performs key-value extraction on the structured input.
4. Extracted fields are validated against schema and written to the client's system.

---

## Tech Stack

Python, LayoutLMv3 (fine-tuned), Hugging Face Transformers, FastAPI, PyTorch

---

## Outcome

- ~90% extraction accuracy on key fields across diverse invoice formats.
- Reduced client's manual data entry time by 40%.

---

## What This Demonstrates

- Multimodal AI (beyond text-only LLMs) — understanding of document layout intelligence.
- Fine-tuning expertise with a specialized, less-common model (LayoutLMv3).
- Real client delivery with quantified production outcomes.
- End-to-end ML pipeline: data annotation → fine-tuning → evaluation → deployment.
