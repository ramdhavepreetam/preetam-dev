import Link from "next/link";
import Image from "next/image";
import { projects } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";

const projectVisuals: Record<string, string> = {
  nervapack: "/nervapack-at-a-glance.png",
  "agentic-doc-review": "/projects/agentic-architecture.png",
  scholarpath: "/scholarpath-screenshot.png",
  japaapp: "/japaapp-screenshot.png",
  "timesfm-mcp": "/projects/timesfm-mcp.svg",
};

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  const targetHref = project.slug === "nervapack" ? "/nervapack" : `/deployments/${project.slug}`;
  return (
    <Link href={targetHref}>
      <div className="group relative glass rounded-2xl overflow-hidden border border-white/5 hover:border-cyan-electric/30 transition-all duration-300 h-full">
        <div className="aspect-video bg-midnight relative overflow-hidden">
          {projectVisuals[project.slug] ? (
            projectVisuals[project.slug].endsWith(".svg") ? (
              /* SVG diagrams: contain + no dark overlay — already dark-themed */
              <img
                src={projectVisuals[project.slug]}
                alt={`${project.title} diagram`}
                className="absolute inset-0 w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-[1.03]"
              />
            ) : (
              <>
                <Image
                  src={projectVisuals[project.slug]}
                  alt={`${project.title} screenshot`}
                  fill
                  className="object-cover object-top opacity-85 transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-obsidian/10 to-transparent" />
              </>
            )
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(232,169,95,0.1),transparent)]" />
          )}
          {/* Domain label */}
          <div className="absolute top-4 left-4">
            <span className="text-[10px] uppercase tracking-widest font-mono text-cyan-electric/70 border border-cyan-electric/20 bg-obsidian/60 px-2 py-1 rounded backdrop-blur-sm">
              {project.domain}
            </span>
          </div>
          {!projectVisuals[project.slug] && (
            <div className="absolute inset-0 flex items-center justify-center text-pearl/[0.06] font-serif italic text-5xl group-hover:scale-105 transition-transform duration-500 text-center px-8">
              {project.title}
            </div>
          )}
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
  );
}

export function ProjectGrid() {
  const featuredDeployments = projects.filter(
    (p) => p.featured && p.category !== "open-source"
  );
  const openSourceTools = projects.filter(
    (p) => p.featured && p.category === "open-source"
  );

  return (
    <section className="py-24 mx-auto max-w-7xl px-6 border-t border-white/5 space-y-20">
      {/* Customer Deployments */}
      <div>
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
          {featuredDeployments.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>

      {/* Open Source Tools */}
      <div>
        <div className="flex flex-col md:flex-row items-baseline justify-between gap-4 mb-12">
          <div>
            <h2 className="text-4xl font-serif italic text-pearl">Open Source</h2>
            <p className="text-mist text-sm mt-2">
              Step 06 · Generalize — turning one customer&apos;s win into a reusable pattern.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {openSourceTools.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
