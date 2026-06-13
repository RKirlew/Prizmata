import { Prism } from "@/components/prism-logo"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#" className="flex items-center gap-2.5">
          <Prism className="size-7" />
          <span className="text-lg font-semibold tracking-tight text-foreground">Prizmata</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          <a href="#demo" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Demo
          </a>
          <a href="#how-it-works" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            How it works
          </a>
          <a href="#why" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Why Prizmata
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#demo"
            className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:block"
          >
            Sign in
          </a>
          <a
            href="#demo"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-secondary"
          >
            Try Prizmata
          </a>
        </div>
      </div>
    </header>
  )
}
