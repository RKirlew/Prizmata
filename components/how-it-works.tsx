import { Upload, ClipboardPaste, Download } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload SOC2 report or security docs",
    description:
      "Prizmata ingests and structures your compliance documentation into a searchable knowledge base.",
  },
  {
    icon: ClipboardPaste,
    title: "Paste customer security questionnaire",
    description: "Drop in plain text questionnaires from customers.",
  },
  {
    icon: Download,
    title: "Get fully completed responses",
    description:
      "Receive grounded, SOC2-backed answers exported as a ready-to-send CSV or sheet.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="mx-auto max-w-6xl scroll-mt-20 px-6 py-16 md:py-24"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          How it works
        </h2>
        <p className="mt-3 text-pretty text-muted-foreground">
          From SOC2 docs to completed security questionnaires in minutes.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {steps.map((step, i) => (
          <div
            key={step.title}
            className="relative rounded-xl border border-border bg-card p-7 shadow-sm"
          >
            <div className="mb-5 flex items-center justify-between">
              <div className="flex size-11 items-center justify-center rounded-lg bg-accent/15 text-secondary">
                <step.icon className="size-5" />
              </div>
              <span className="text-4xl font-semibold tabular-nums text-border">
                {`0${i + 1}`}
              </span>
            </div>

            <h3 className="text-lg font-semibold text-foreground">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
