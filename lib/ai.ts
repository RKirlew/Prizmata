"use server";

import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

// Define the cached memory type
type CachedAnswer = {
  question: string;
  embedding: number[];
  answer: string;
};

// Next.js Dev/Prod Workaround: Prevent global state from wiping during hot-reloads
const globalForMemory = globalThis as unknown as { memory: CachedAnswer[] };
const memory: CachedAnswer[] = globalForMemory.memory || [];

if (process.env.NODE_ENV !== "production") {
  globalForMemory.memory = memory;
}

// Core Math: Cosine Similarity calculation
function cosineSimilarity(a: number[], b: number[]) {
  let dot = 0;
  let magA = 0;
  let magB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

// Lookup function: Checks memory array for highly similar old questions
function findSimilarAnswer(queryVector: number[]): string | null {
  let best: CachedAnswer | null = null;
  let bestScore = 0;

  for (const item of memory) {
    const score = cosineSimilarity(item.embedding, queryVector);

    if (score > bestScore) {
      bestScore = score;
      best = item;
    }
  }

  // Strict similarity threshold (0.88+) ensuring semantic accuracy
  if (best && bestScore > 0.88) {
    console.log(
      `✨ Memory Cache Hit for: "${best.question}" (Score: ${bestScore.toFixed(4)})`,
    );
    return best.answer;
  }

  return null;
}

// Generate single embedding vector
export async function embed(text: string) {
  const res = await client.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
  });
  return res.data[0].embedding;
}

// Main Orchestrator Action with Cached Memory Lifecycle
export async function answerQuestionnaireAction({
  socChunks,
  questions,
}: {
  socChunks: string[];
  questions: string[];
}) {
  try {
    // 1. Embed all current SOC2 chunks
    const embeddedChunks = [];
    for (const chunk of socChunks) {
      const vector = await embed(chunk);
      embeddedChunks.push({ text: chunk, vector });
    }

    const results = [];

    // 2. Process questions
    for (const question of questions) {
      if (!question.trim()) continue;

      // Step A: Embed the incoming question
      const queryVector = await embed(question);

      // Step B: Similarity lookup BEFORE executing RAG / LLM
      const cachedAnswer = findSimilarAnswer(queryVector);

      if (cachedAnswer) {
        results.push({
          question,
          answer: cachedAnswer,
        });
        continue; // Skip RAG entirely and move to the next question
      }

      // Step C: Fallback to normal RAG if not found in memory
      const topChunks = embeddedChunks
        .map((c) => ({
          text: c.text,
          score: cosineSimilarity(c.vector, queryVector),
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);

      const prompt = `
You are answering a security questionnaire.

Use ONLY the provided SOC2 context.
If the information is not found in the context, reply with "Not found in SOC2 documentation."

Context:
${topChunks.map((c) => c.text).join("\n\n")}

Question:
${question}
`;

      const response = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
      });

      const generatedAnswer =
        response.choices[0].message.content || "No answer generated.";

      // Step D: Store the freshly generated answer into the thin memory layer
      memory.push({
        question,
        embedding: queryVector,
        answer: generatedAnswer,
      });

      results.push({
        question,
        answer: generatedAnswer,
      });
    }

    console.log(`📊 Current Memory Cache Size: ${memory.length} items.`);
    return { success: true, data: results };
  } catch (error: any) {
    console.error("RAG Pipeline failed:", error);
    return { success: false, error: error.message || "Something went wrong" };
  }
}
