import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { ChatWidget } from "@/components/ai/chat-widget";
import { projects } from "@/lib/data";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project) => (
            <Link key={project.slug} href={`/work/${project.slug}`} className="group">
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
