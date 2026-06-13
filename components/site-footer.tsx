import { Prism } from "@/components/prism-logo"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <Prism className="size-6" />
          <span className="font-semibold tracking-tight text-foreground">Prizmata</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Auto-fill security questionnaires from your SOC2.
        </p>
        <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Prizmata</p>
      </div>
    </footer>
  )
}
