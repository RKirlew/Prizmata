import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { LiveDemo } from "@/components/live-demo"
import { ProblemSection } from "@/components/problem-section"
import { HowItWorks } from "@/components/how-it-works"
import { Differentiation } from "@/components/differentiation"
import { FinalCta } from "@/components/final-cta"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <Hero />
        <LiveDemo />
        <ProblemSection />
        <HowItWorks />
        <Differentiation />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  )
}
