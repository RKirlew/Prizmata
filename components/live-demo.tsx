"use client";

import { useState } from "react";
import { Download, Sparkles, X } from "lucide-react";
import { chunkText } from "@/lib/text";
import { answerQuestionnaireAction } from "@/lib/ai"; // Import the Server Action
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
type Row = { question: string; answer: string };

async function trackEvent(type: string, data?: any) {
  try {
    await addDoc(collection(db, "generations"), {
      type,
      timestamp: Date.now(),
      ...data,
    });
    //console.log("TRACK SUCCESS");
  } catch (e) {
    // don't break product if tracking fails
    console.error("Tracking failed", e);
  }
}

const SAMPLE_QUESTIONS = `Do you encrypt data at rest?
What is your incident response process?
Do you perform regular penetration testing?
How do you manage employee access to production systems?
Do you have a documented business continuity plan?`;

export function LiveDemo() {
  const [socInput, setSocInput] = useState("");
  const [questionnaireInput, setQuestionnaireInput] =
    useState(SAMPLE_QUESTIONS);
  const [rows, setRows] = useState<Row[] | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [generating, setGenerating] = useState(false);

  async function handleGenerate() {
    if (!socInput.trim()) {
      alert("Please paste your SOC 2 text context first.");
      return;
    }

    setGenerating(true);
    trackEvent("generate_start");
    try {
      // Step 1: Chunk the source text documentation
      const chunks = chunkText(socInput);

      // Step 2: Split the line-separated questionnaire string into individual questions
      const questions = questionnaireInput
        .split("\n")
        .map((q) => q.trim())
        .filter((q) => q.length > 0);

      // Step 3: Dispatch the work securely to the server pipeline
      const result = await answerQuestionnaireAction({
        socChunks: chunks,
        questions: questions,
      });

      if (result.success && result.data) {
        setRows(result.data);
        setModalOpen(true);
        trackEvent("generate_success", {
          questionsCount: questions.length,
          answersCount: result.data.length,
        });
      } else {
        trackEvent("generate_error", {
          error: "network_or_runtime_error",
        });
        alert(`Error: ${result.error}`);
      }
    } catch (err) {
      console.error(err);
      alert("An unexpected network error occurred.");
    } finally {
      setGenerating(false);
    }
  }

  function handleDownload() {
    if (!rows) return;
    const escape = (s: string) => `"${s.replace(/"/g, '""')}"`;
    const csv = [
      "Question,Answer",
      ...rows.map((r) => `${escape(r.question)},${escape(r.answer)}`),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "prizmata-questionnaire.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section
      id="demo"
      className="relative mx-auto max-w-6xl scroll-mt-20 overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 px-6 py-16 shadow-2xl md:py-24"
    >
      <div className="absolute -left-1/4 -top-1/4 -z-10 h-96 w-96 rounded-full bg-blue-500/10 blur-[100px]" />
      <div className="absolute -bottom-1/4 -right-1/4 -z-10 h-96 w-96 rounded-full bg-cyan-500/5 blur-[100px]" />

      <div className="mx-auto mb-10 max-w-2xl text-center">
        <h2 className="text-balance text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Turn Your SOC 2 Into Completed Security Questionnaires
        </h2>
        <p className="mt-3 text-pretty text-slate-400">
          Paste your SOC 2 report and questionnaire. Prizmata automatically
          matches answers and returns a completed questionnaire ready for
          review.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Left Card: SOC 2 Report */}
        <div className="flex flex-col rounded-xl border border-slate-800 bg-slate-900/50 p-5 shadow-sm">
          <label
            htmlFor="socInput"
            className="mb-3 text-sm font-medium text-slate-200"
          >
            SOC 2 Report Context
          </label>
          <textarea
            id="socInput"
            value={socInput}
            onChange={(e) => setSocInput(e.target.value)}
            spellCheck={false}
            className="min-h-64 flex-1 resize-none rounded-lg border border-slate-700 bg-slate-950 p-4 font-mono text-sm leading-relaxed text-slate-200 outline-none transition-colors placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
            placeholder="Paste raw SOC2 text policies here..."
          />
        </div>

        {/* Right Card: Questionnaire */}
        <div className="flex flex-col rounded-xl border border-slate-800 bg-slate-900/50 p-5 shadow-sm">
          <label
            htmlFor="questionnaireInput"
            className="mb-3 text-sm font-medium text-slate-200"
          >
            Questionnaire (One question per line)
          </label>
          <textarea
            id="questionnaireInput"
            value={questionnaireInput}
            onChange={(e) => setQuestionnaireInput(e.target.value)}
            spellCheck={false}
            className="min-h-64 flex-1 resize-none rounded-lg border border-slate-700 bg-slate-950 p-4 font-mono text-sm leading-relaxed text-slate-200 outline-none transition-colors placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
            placeholder="Paste security questionnaire..."
          />
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-500 disabled:opacity-50"
          >
            <Sparkles className="size-4" />
            {generating ? "Embedding & Searching..." : "Generate Live Answers"}
          </button>
        </div>
      </div>

      {/* Results Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="flex max-h-[80vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-950 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 p-5">
              <div>
                <h3 className="text-xl font-semibold text-white">
                  Completed Questionnaire
                </h3>
                <p className="text-sm text-slate-400">
                  {rows?.length ?? 0} answers generated
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-900 hover:text-white"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-auto p-5">
              <div className="rounded-lg border border-slate-800 bg-slate-900/20 overflow-hidden">
                <table className="w-full border-collapse text-left text-sm">
                  <thead className="sticky top-0 bg-slate-900">
                    <tr>
                      <th className="border-b border-slate-800 px-4 py-2.5 font-semibold text-slate-200 w-1/3">
                        Question
                      </th>
                      <th className="border-b border-slate-800 px-4 py-2.5 font-semibold text-slate-200">
                        Answer
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {rows?.map((row, i) => (
                      <tr key={i} className="align-top hover:bg-slate-900/40">
                        <td className="px-4 py-3 font-medium text-slate-300">
                          {row.question}
                        </td>
                        <td className="px-4 py-3 text-slate-400 whitespace-pre-wrap">
                          {row.answer}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 border-t border-slate-800 bg-slate-900/30 p-5">
              <button
                onClick={() => setModalOpen(false)}
                className="inline-flex items-center justify-center rounded-lg border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-900"
              >
                Close
              </button>
              <button
                onClick={handleDownload}
                className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-500"
              >
                <Download className="size-4" />
                Download CSV
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
