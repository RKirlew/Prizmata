import { Clock, Copy, FileStack, Repeat } from "lucide-react"

const problems = [
  {
    icon: FileStack,
    title: "Every enterprise deal requires long questionnaires",
    description: "Procurement and security reviews demand detailed responses before any contract moves forward.",
  },
  {
    icon: Copy,
    title: "Teams manually copy answers from SOC2 and old docs",
    description: "Engineers and security leads dig through reports to paste the same answers over and over.",
  },
  {
    icon: Repeat,
    title: "The same questions are answered repeatedly",
    description: "Each customer sends a slightly different format, forcing teams to rewrite the same content.",
  },
  {
    icon: Clock,
    title: "It delays sales cycles and wastes engineering time",
    description: "Days of back-and-forth turn a closeable deal into a stalled one while answers get assembled.",
  },
]

export function ProblemSection() {
  return (
    <section className="border-y border-border bg-card">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Security questionnaires slow down enterprise deals
          </h2>
          <p className="mt-3 text-pretty text-muted-foreground">
            The work is repetitive, manual, and stands directly between you and revenue.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {problems.map((p) => (
            <div
              key={p.title}
              className="flex gap-4 rounded-xl border border-border bg-background p-6 transition-colors hover:border-accent/40"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                <p.icon className="size-5" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
