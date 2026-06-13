export function chunkText(text: string) {
  const cleaned = injectBreaks(normalizeText(text));

  const parts = cleaned
    .split("\n")
    .map((p) => p.trim())
    .filter(Boolean);

  const chunks: string[] = [];
  let current = "";

  for (const part of parts) {
    if ((current + part).length > 1200) {
      chunks.push(current);
      current = part;
    } else {
      current += " " + part;
    }
  }

  if (current.trim()) {
    chunks.push(current.trim());
  }

  return chunks;
}
export function normalizeText(text: string) {
  return text
    .replace(/\r/g, "\n")
    .replace(/\n+/g, "\n")
    .replace(/\s{2,}/g, " ")
    .trim();
}
export function injectBreaks(text: string) {
  return text
    .replace(/(Section\s+[IVXLC\d]+:)/g, "\n$1")
    .replace(/(Section\s+[IVXLC\d]+)/g, "\n$1")
    .replace(/([A-Z]\.)\s/g, "\n$1 ");
}
