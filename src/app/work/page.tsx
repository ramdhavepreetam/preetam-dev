import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { ChatWidget } from "@/components/ai/chat-widget";
import { projects } from "@/lib/data";
import Link from "next/link";
import { ArrowUpRight, Network } from "lucide-react";

export default function WorkPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-32 mx-auto max-w-7xl px-6">
        <header className="max-w-2xl mb-20">
          <h1 className="text-6xl md:text-8xl font-serif italic text-pearl mb-8">
            Selected <span className="text-cyan-electric">Works.</span>
          </h1>
          <p className="text-xl text-mist leading-relaxed">
            Enterprise AI workflows. Production founder products. Each one started from a real customer problem —
            not a feature spec. 17+ years of the same motion.
          </p>
        </header>

        <Link href="/nervapack" className="group mb-12 block">
          <div className="glass overflow-hidden rounded-3xl border border-white/5 transition-all duration-500 group-hover:border-cyan-electric/30">
            <div className="grid grid-cols-1 lg:grid-cols-[0.92fr_1fr]">
              <div className="relative min-h-[300px] overflow-hidden bg-midnight">
                <video
                  src="/nervapack-demo.mp4"
                  className="absolute inset-0 h-full w-full object-cover object-top opacity-85 transition-transform duration-700 group-hover:scale-[1.03]"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/85 via-obsidian/20 to-transparent" />
                <div className="absolute left-5 top-5 flex items-center gap-2 border border-cyan-electric/20 bg-obsidian/70 px-3 py-2 backdrop-blur-sm">
                  <Network className="h-4 w-4 text-cyan-electric" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-electric/80">
                    New open source
                  </span>
                </div>
              </div>

              <div className="p-10 lg:p-12">
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div>
                    <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-cyan-electric/70">
                      Developer Tooling · AI Context
                    </span>
                    <h2 className="mb-3 font-serif text-4xl italic leading-tight text-pearl transition-colors group-hover:text-cyan-electric md:text-5xl">
                      NervaPack
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {["Python", "Knowledge Graph", "Tree-sitter", "Ollama", "MCP"].map((tag) => (
                        <span key={tag} className="text-[10px] uppercase tracking-widest text-whisper">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 transition-all group-hover:border-cyan-electric/50 group-hover:bg-cyan-electric/10">
                    <ArrowUpRight className="h-6 w-6 text-cyan-electric" />
                  </div>
                </div>

                <p className="mb-8 leading-relaxed text-mist">
                  Privacy-first, offline knowledge graph for developers. NervaPack parses code into
                  AST-aware entities, retrieves context through graph relationships, visualizes the
                  dependency network, and exposes precise repository context for AI coding agents.
                </p>

                <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-8">
                  <div>
                    <span className="block font-mono text-xs text-whisper">Outcome</span>
                    <span className="text-sm font-bold uppercase tracking-wider text-pearl">Published docs · PyPI</span>
                  </div>
                  <div>
                    <span className="block font-mono text-xs text-whisper">Focus</span>
                    <span className="text-sm font-bold uppercase tracking-wider text-pearl">90% smaller prompts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project) => (
            <Link key={project.slug} href={`/work/${project.slug}`} className="group">
              <div className="glass rounded-3xl overflow-hidden border border-white/5 group-hover:border-cyan-electric/30 transition-all duration-500">
                <div className="aspect-[16/10] bg-midnight relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(232,169,95,0.08),transparent)]" />
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
                    <div className="h-12 w-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-cyan-electric/50 group-hover:bg-cyan-electric/10 transition-all">
                      <ArrowUpRight className="h-6 w-6 text-cyan-electric" />
                    </div>
                  </div>
                  
                  <p className="text-mist leading-relaxed mb-8">
                    {project.description}
                  </p>
                  
                  <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                    <span className="text-xs font-mono text-whisper">Impact</span>
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
