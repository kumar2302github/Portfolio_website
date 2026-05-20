import { KNOWLEDGE_BASE } from './knowledgeBase';
import type { Chunk } from './knowledgeBase';

const STOPWORDS = new Set([
  'i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', 'your', 'yours',
  'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', 'her', 'hers',
  'herself', 'it', 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves',
  'what', 'which', 'who', 'whom', 'this', 'that', 'these', 'those', 'am', 'is', 'are',
  'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does',
  'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until',
  'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into',
  'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down',
  'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here',
  'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more',
  'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so',
  'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', 'should', 'now'
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 1 && !STOPWORDS.has(word));
}

export function retrieve(query: string, limit: number = 3): Chunk[] {
  const queryTokens = tokenize(query);
  if (queryTokens.length === 0) return [];

  const df: Record<string, number> = {};
  KNOWLEDGE_BASE.forEach(doc => {
    const uniqueTokens = new Set(tokenize(doc.content));
    uniqueTokens.forEach(token => {
      df[token] = (df[token] || 0) + 1;
    });
  });

  const N = KNOWLEDGE_BASE.length;

  const scoredDocs = KNOWLEDGE_BASE.map(doc => {
    const docTokens = tokenize(doc.content);
    const tf: Record<string, number> = {};
    docTokens.forEach(token => {
      tf[token] = (tf[token] || 0) + 1;
    });

    let score = 0;
    queryTokens.forEach(token => {
      if (tf[token]) {
        const idf = Math.log((N + 1) / (df[token] || 1)) + 1;
        score += tf[token] * idf;
      }
    });

    // Boost score if query keywords appear in order or as exact phrase
    const lowerQuery = query.toLowerCase();
    const lowerDoc = doc.content.toLowerCase();
    if (lowerDoc.includes(lowerQuery)) {
      score += 5;
    }

    return { doc, score };
  });

  return scoredDocs
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.doc);
}

export async function askAI(
  query: string,
  history: { role: 'user' | 'model'; content: string }[],
  isJDAnalysis: boolean = false
): Promise<string> {
  const matchedChunks = retrieve(query, isJDAnalysis ? 6 : 3);
  const context = matchedChunks.map(c => c.content).join('\n\n');

  const apiKey = import.meta.env.VITE_GROQ_API_KEY;

  let systemInstruction = '';
  if (isJDAnalysis) {
    systemInstruction = `You are a professional technical recruiter and talent advisor evaluating Manish Kumar for a specific job role based on the provided Job Description (JD).

Compare the user's Job Description against Manish's skills, projects, and experiences provided in the context below. 

Format your response in a clear, highly professional recruiter-style summary with the following sections:
1. **Match Suitability Rating**: Give a clear assessment (e.g., "Strong Match (85%)", "Good Match with minor gaps (70%)", etc.) and why.
2. **Key Alignments**: List specific skills, tools, and projects Manish has completed that directly match the core requirements of the JD. Focus on his generative AI, RAG pipelines, robotics leadership, and software internship.
3. **Identified Gaps**: Honestly point out any skills, tools, or requirements in the JD that are not explicitly mentioned in Manish's profile (or write "None" if he matches perfectly).
4. **Suggested Interview Starter**: Provide one relevant technical question the interviewer could ask Manish to test his competency for this specific role.
5. **Direct Recruiter Summary**: A 2-sentence closing pitch on why he is worth interviewing.

Context on Manish Kumar:
${context || 'No context details available.'}`;
  } else {
    systemInstruction = `You are an AI assistant representing Manish Kumar, a Data Scientist and AI/ML engineer.
Your job is to help visitors learn about Manish — his projects, experience, skills, and background.

Rules:
1. Answer ONLY from the provided context. Do not invent projects, skills, or claims.
2. Be conversational, warm, and first-person-adjacent ("Manish has worked on..." or "He built...").
3. If asked something not in the context, respond: "That's not something I have details on — but you can reach Manish directly at krmanish2302@gmail.com"
4. Never claim Manish has experience or credentials not present in the context.
5. Keep answers concise — 2-4 sentences unless the visitor explicitly asks for more detail.

Context:
${context || 'No specific context retrieved.'}`;
  }

  // If we have an API Key, hit the Groq Chat Completion API (extremely fast and client-side)
  if (apiKey) {
    try {
      const messages = [
        {
          role: 'system',
          content: systemInstruction
        },
        ...history.map(h => ({
          role: h.role === 'model' ? 'assistant' : 'user',
          content: h.content
        })),
        {
          role: 'user',
          content: query
        }
      ];

      const response = await fetch(
        `https://api.groq.com/openai/v1/chat/completions`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: 'llama-3.1-8b-instant',
            messages,
            temperature: isJDAnalysis ? 0.2 : 0.4,
            max_tokens: 1024
          })
        }
      );

      if (!response.ok) {
        throw new Error(`Groq API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.choices?.[0]?.message?.content || "I couldn't process that. Please try again.";
    } catch (error) {
      console.error('RAG AI call failed:', error);
      return `[Error connecting to Groq API. Falling back to offline match] Here is relevant context on Manish:\n\n${
        matchedChunks.length > 0
          ? matchedChunks.map(c => `• ${c.content}`).join('\n')
          : "Sorry, I couldn't find any matching info offline. You can contact Manish directly at krmanish2302@gmail.com."
      }`;
    }
  }

  // Fallback offline search model (purely local matching)
  if (matchedChunks.length > 0) {
    if (isJDAnalysis) {
      return `[Offline Mode] Match Analysis:\n\nHere are parts of Manish's profile that align with your Job Description:\n\n${matchedChunks
        .map(c => `• ${c.content}`)
        .join('\n\n')}\n\n(Tip: Add a VITE_GROQ_API_KEY in your env/Vercel settings to get a full AI recruiter analysis report!)`;
    }
    return `[Offline Mode] Here is what I found in Manish's profile database:\n\n${matchedChunks
      .map(c => `• ${c.content}`)
      .join('\n\n')}\n\n(Tip: Add a VITE_GROQ_API_KEY in your env/Vercel settings to enable fully conversational AI answers!)`;
  }

  return "I don't have matching details for that request in my database. You can reach out directly to Manish at krmanish2302@gmail.com.";
}
