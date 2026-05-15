import Link from "next/link";
import { projects } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";

export function ProjectGrid() {
  const featured = projects.filter((p) => p.featured).slice(0, 4);

  return (
    <section className="py-24 mx-auto max-w-7xl px-6 border-t border-white/5">
      <div className="flex flex-col md:flex-row items-baseline justify-between gap-4 mb-12">
        <div>
          <h2 className="text-4xl font-serif italic text-pearl">Featured Deployments</h2>
          <p className="text-mist text-sm mt-2">Full-Stack · Agentic AI · Healthcare · Ed-Tech</p>
        </div>
        <Link href="/deployments" className="text-cyan-electric hover:underline flex items-center gap-1 text-sm font-medium shrink-0">
          View all deployments <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {featured.map((project, idx) => (
          <Link key={project.slug} href={`/deployments/${project.slug}`}>
            <div className="group relative glass rounded-2xl overflow-hidden border border-white/5 hover:border-cyan-electric/30 transition-all duration-300 h-full">
              <div className="aspect-video bg-midnight relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,217,255,0.07),transparent)]" />
                {/* Domain label */}
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] uppercase tracking-widest font-mono text-cyan-electric/70 border border-cyan-electric/20 bg-obsidian/60 px-2 py-1 rounded backdrop-blur-sm">
                    {project.domain}
                  </span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center text-pearl/[0.06] font-serif italic text-5xl group-hover:scale-105 transition-transform duration-500 text-center px-8">
                  {project.title}
                </div>
              </div>

              <div className="p-8">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-serif italic text-pearl group-hover:text-cyan-electric transition-colors leading-snug">
                    {project.title}
                  </h3>
                  <span className="shrink-0 ml-4 text-xs font-mono text-cyan-electric bg-cyan-electric/10 border border-cyan-electric/20 px-2 py-1 rounded whitespace-nowrap">
                    {project.metrics}
                  </span>
                </div>
                <p className="text-mist text-sm leading-relaxed mb-6 line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-[10px] uppercase tracking-wider text-whisper border border-white/10 px-2 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
