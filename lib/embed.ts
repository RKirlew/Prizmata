import { embed } from "@/lib/ai";

export async function buildIndex(chunks: string[]) {
  const embedded = [];

  for (const chunk of chunks) {
    const vector = await embed(chunk);

    embedded.push({
      text: chunk,
      vector,
    });
  }

  return embedded;
}
