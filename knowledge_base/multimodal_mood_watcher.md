# Project: Multimodal Mood Watcher

## Overview

An AI agent for real-time emotion detection that fuses two modalities simultaneously: facial expression recognition (computer vision) and speech emotion recognition (audio signal processing). By combining both signals, the system achieves more robust and nuanced emotion detection than single-modality approaches.

**GitHub:** github.com/kumar2302github/multimodal-mood-watcher

---

## Problem Being Solved

Single-modality emotion detection is fragile. Facial analysis alone fails with occlusion, lighting changes, or neutral facial expressions. Speech analysis alone fails in noisy environments or with monotone speakers. Humans read emotion by integrating multiple cues simultaneously — this system does the same.

---

## Technical Architecture

### Vision Branch (Facial Emotion Recognition)
- Real-time face detection from webcam or video input using OpenCV.
- Facial feature extraction and classification into emotion categories (happy, sad, angry, surprised, fearful, disgusted, neutral).
- Built on pretrained vision models with transfer learning for emotion classification.

### Speech Branch (Speech Emotion Recognition)
- Audio feature extraction: MFCCs (Mel-Frequency Cepstral Coefficients), spectral features.
- Emotion classification from speech signals.

### Multimodal Fusion
- Both branches produce emotion probability distributions.
- Fusion layer combines predictions — either late fusion (weighted combination of output probabilities) or feature-level fusion.
- Final emotion classification based on fused representation.

---

## Tech Stack

Python, PyTorch, OpenCV, multimodal transformers, audio processing libraries

---

## What This Demonstrates

- Computer vision proficiency beyond document processing.
- Multimodal AI system design — understanding of how to fuse heterogeneous input signals.
- End-to-end pipeline from raw sensory inputs (video frames + audio) to emotion labels.
- Differentiator: most AI portfolios are purely LLM/NLP focused. This shows Manish's breadth across vision and audio domains.
