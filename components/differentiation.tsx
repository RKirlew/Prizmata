import { Check, X } from "lucide-react"

export function Differentiation() {
  return (
    <section id="why" className="scroll-mt-20 border-y border-border bg-card">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Built for speed, not workflow complexity
            </h2>
            <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
              Unlike compliance platforms, Prizmata does not require setup, libraries, or onboarding.
            </p>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              It simply transforms existing security documentation into completed questionnaires instantly.
            </p>
            <a
              href="#demo"
              className="mt-7 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-secondary"
            >
              Try Prizmata
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-background p-6">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Compliance platforms
              </span>
              <ul className="mt-4 space-y-3">
                {["Lengthy onboarding", "Answer libraries to maintain", "Complex workflow setup", "Steep learning curve"].map(
                  (item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <X className="mt-0.5 size-4 shrink-0 text-destructive" />
                      {item}
                    </li>
                  ),
                )}
              </ul>
            </div>

            <div className="rounded-xl border-2 border-accent/40 bg-accent/5 p-6">
              <span className="text-xs font-semibold uppercase tracking-wide text-secondary">Prizmata</span>
              <ul className="mt-4 space-y-3">
                {["Zero setup required", "Uses docs you already have", "Paste and generate", "Instant CSV output"].map(
                  (item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm font-medium text-foreground">
                      <Check className="mt-0.5 size-4 shrink-0 text-success" />
                      {item}
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
