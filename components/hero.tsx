import { ArrowRight, FileSpreadsheet, ShieldCheck } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background selection:bg-cyan-500/20">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none">
        <div className="absolute -top-40 left-1/2 h-[700px] w-[1200px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-cyan-500/15 via-indigo-500/15 to-purple-500/15 opacity-80 blur-[150px]" />

        <div
          className="absolute left-[8%] top-[12%] h-72 w-72 rounded-full bg-gradient-to-br from-cyan-400/20 via-blue-500/10 to-transparent blur-2xl mix-blend-screen"
          style={{
            animation: "float-slower 16s ease-in-out infinite alternate",
          }}
        />

        <div
          className="absolute right-[6%] top-[25%] h-96 w-96 rounded-full bg-gradient-to-tr from-purple-400/20 via-pink-500/10 to-transparent blur-3xl mix-blend-screen"
          style={{
            animation: "float-slow 22s ease-in-out infinite alternate-reverse",
          }}
        />

        <div
          className="absolute bottom-[2%] left-[30%] h-60 w-60 rounded-full bg-gradient-to-r from-emerald-400/15 via-cyan-500/10 to-transparent blur-2xl mix-blend-screen"
          style={{
            animation: "float-slowest 19s ease-in-out infinite alternate",
          }}
        />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_35%,#000_70%,transparent_100%)]" />
      </div>

      <style>{`
        @keyframes float-slow {
          0% { transform: translateY(0px) scale(1) rotate(0deg); opacity: 0.6; }
          50% { transform: translateY(-35px) translateX(20px) scale(1.08) rotate(3deg); opacity: 0.9; }
          100% { transform: translateY(10px) translateX(-10px) scale(0.92) rotate(-2deg); opacity: 0.6; }
        }
        @keyframes float-slower {
          0% { transform: translateY(0px) translateX(0px) scale(0.85) rotate(0deg); opacity: 0.5; }
          50% { transform: translateY(40px) translateX(-25px) scale(1.05) rotate(-4deg); opacity: 0.8; }
          100% { transform: translateY(-15px) translateX(15px) scale(0.95) rotate(2deg); opacity: 0.5; }
        }
        @keyframes float-slowest {
          0% { transform: translateY(0px) scale(0.95); opacity: 0.4; }
          50% { transform: translateY(-50px) translateX(30px) scale(1.12); opacity: 0.7; }
          100% { transform: translateY(-8px) translateX(-20px) scale(0.88); opacity: 0.4; }
        }
      `}</style>

      <div className="mx-auto max-w-6xl px-6 pb-28 pt-24 md:pt-36">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-balance bg-gradient-to-b from-foreground via-foreground to-foreground/60 bg-clip-text text-5xl font-extrabold leading-[1.05] tracking-tight text-transparent sm:text-6xl md:text-7xl lg:text-[5rem]">
            Instantly answer security questionnaires using your SOC2 evidence
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground/80 md:text-xl font-normal">
            Upload your SOC2 report once. Prizmata generates accurate,
            audit-ready answers for any security questionnaire.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#demo"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition hover:opacity-90 active:scale-[0.98]"
            >
              Try Prizmata
              <ArrowRight className="size-4" />
            </a>

            <a
              href="#demo"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-border px-6 text-sm font-medium text-foreground transition hover:bg-muted/40"
            >
              <FileSpreadsheet className="size-4" />
              View example output
            </a>
          </div>

          <div className="mt-10 flex items-center justify-center gap-3 text-[11px] font-semibold tracking-widest text-muted-foreground/40 uppercase">
            <span>No setup</span>
            <span className="text-muted-foreground/20 text-base font-normal">
              /
            </span>
            <span>No onboarding</span>
            <span className="text-muted-foreground/20 text-base font-normal">
              /
            </span>
            <span>Just paste & generate</span>
          </div>
        </div>
      </div>
    </section>
  );
}
