import { ArrowRight } from "lucide-react"

export function FinalCta() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <div className="relative overflow-hidden rounded-2xl bg-primary px-8 py-16 text-center md:px-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-accent/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-16 size-72 rounded-full bg-success/15 blur-3xl"
        />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-balance text-3xl font-semibold leading-tight tracking-tight text-primary-foreground md:text-4xl">
            Turn security questionnaires into completed spreadsheets instantly
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-primary-foreground/70">
            Stop copying answers by hand. Let Prizmata do it from the documentation you already have.
          </p>
          <a
            href="#demo"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-success"
          >
            Try Prizmata
            <ArrowRight className="size-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
