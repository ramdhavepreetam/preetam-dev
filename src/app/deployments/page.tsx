import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { ChatWidget } from "@/components/ai/chat-widget";
import { projects } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export const metadata = {
  title: "Deployments",
  description: "Production AI deployments, full-stack platforms, and agentic workflows — each built from a real customer problem, shipped end-to-end.",
};

export default function DeploymentsPage() {
  const [hero, ...rest] = projects;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-32 mx-auto max-w-7xl px-6">
        <header className="max-w-2xl mb-20">
          <p className="text-xs font-mono text-cyan-electric/70 tracking-[0.2em] uppercase mb-4">
            Forward Deployed Engineer
          </p>
          <h1 className="text-6xl md:text-8xl font-serif italic text-pearl mb-8">
            Deploy<span className="text-cyan-electric">ments.</span>
          </h1>
          <p className="text-xl text-mist leading-relaxed">
            Production AI systems. Full-stack platforms. Agentic workflows. Each one started from a real customer
            problem — not a feature spec. Embedded, built, shipped.
          </p>
        </header>

        {/* Hero deployment — agentic-doc-review, full width */}
        <Link href={`/deployments/${hero.slug}`} className="group block mb-12">
          <div className="glass rounded-3xl overflow-hidden border border-white/5 group-hover:border-cyan-electric/30 transition-all duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Content */}
              <div className="p-10 lg:p-14 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-[10px] uppercase tracking-widest font-mono text-cyan-electric border border-cyan-electric/30 px-2 py-1">
                      {hero.domain}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest font-mono text-gold-solar border border-gold-solar/30 px-2 py-1">
                      Featured
                    </span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-serif italic text-pearl group-hover:text-cyan-electric transition-colors leading-tight mb-4">
                    {hero.title}
                  </h2>
                  <p className="text-mist leading-relaxed mb-8">
                    {hero.description}
                  </p>
                  <div className="p-4 border-l-2 border-cyan-electric/40 bg-cyan-electric/5 rounded-r-lg mb-8">
                    <p className="text-xs font-mono text-cyan-electric/70 uppercase tracking-widest mb-1">Why this matters</p>
                    <p className="text-sm text-mist">Most enterprises have stuck AI pilots. This shipped — running in production, auditable, with coverage gating and deterministic output.</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {hero.tags.map((tag) => (
                      <span key={tag} className="text-[10px] uppercase tracking-widest text-whisper border border-white/10 px-2 py-0.5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-10 pt-8 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-mono text-whisper block mb-1">Outcome</span>
                    <span className="text-lg font-bold text-pearl uppercase tracking-wider">{hero.metrics}</span>
                  </div>
                  <div className="flex items-center gap-2 text-cyan-electric text-sm font-medium">
                    View case study <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
              </div>

              {/* Architecture image or visual */}
              <div className="bg-midnight relative overflow-hidden min-h-[320px] lg:min-h-0">
                {"architectureImage" in hero && hero.architectureImage ? (
                  <Image
                    src={(hero as { architectureImage: string }).architectureImage}
                    alt={`${hero.title} architecture`}
                    fill
                    className="object-contain object-center p-6"
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,217,255,0.07),transparent)]" />
                    <div className="absolute inset-0 flex items-center justify-center text-pearl/[0.06] font-serif italic text-7xl group-hover:scale-105 transition-transform duration-700 text-center px-8">
                      {hero.title}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </Link>

        {/* Remaining deployments — 2-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {rest.map((project) => (
            <Link key={project.slug} href={`/deployments/${project.slug}`} className="group">
              <div className="glass rounded-3xl overflow-hidden border border-white/5 group-hover:border-cyan-electric/30 transition-all duration-500">
                <div className="aspect-[16/10] bg-midnight relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,217,255,0.05),transparent)]" />
                  <div className="absolute inset-0 flex items-center justify-center text-pearl/10 font-serif italic text-6xl group-hover:scale-110 transition-transform duration-700">
                    {project.title}
                  </div>
                </div>

                <div className="p-10">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest font-mono text-cyan-electric/70 mb-2 block">{project.domain}</span>
                      <h3 className="text-3xl font-serif italic text-pearl group-hover:text-cyan-electric transition-colors mb-2">
                        {project.title}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-[10px] uppercase tracking-widest text-whisper">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="h-12 w-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-cyan-electric/50 group-hover:bg-cyan-electric/10 transition-all shrink-0">
                      <ArrowUpRight className="h-6 w-6 text-cyan-electric" />
                    </div>
                  </div>

                  <p className="text-mist leading-relaxed mb-8">
                    {project.description}
                  </p>

                  <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                    <span className="text-xs font-mono text-whisper">Outcome</span>
                    <span className="text-sm font-bold text-pearl uppercase tracking-wider">{project.metrics}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
