import { projects } from "@/lib/data";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { ChatWidget } from "@/components/ai/chat-widget";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import { Github } from "@/components/icons/social-icons";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) notFound();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Project Hero */}
        <section className="pt-32 pb-20 border-b border-white/5">
          <div className="mx-auto max-w-7xl px-6">
            <Link 
              href="/work" 
              className="inline-flex items-center text-sm text-whisper hover:text-cyan-electric mb-12 group transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to all work
            </Link>
            
            <div className="flex flex-col md:flex-row gap-12 items-end justify-between">
              <div className="max-w-3xl">
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] uppercase tracking-widest text-cyan-electric/80 border border-cyan-electric/20 bg-cyan-electric/5 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <h1 className="text-6xl md:text-8xl font-serif italic text-pearl leading-tight mb-8">
                  {project.title}
                </h1>
                <p className="text-xl text-mist leading-relaxed">
                  {project.description}
                </p>
              </div>
              
              <div className="flex flex-col gap-4 w-full md:w-auto">
                <div className="glass p-8 rounded-2xl border border-white/5">
                  <span className="text-xs uppercase tracking-widest text-whisper block mb-2 font-mono">Impact</span>
                  <span className="text-3xl font-bold text-pearl">{project.metrics}</span>
                </div>
                <div className="flex gap-2">
                  {project.url ? (
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="flex-1 md:flex-none">
                      <Button className="w-full">
                        Live Demo <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </a>
                  ) : (
                    <Button className="flex-1 md:flex-none" disabled>
                      Live Demo <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                  {project.github ? (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex-1 md:flex-none">
                      <Button variant="outline" className="w-full">
                        <Github className="mr-2 h-4 w-4" /> Code
                      </Button>
                    </a>
                  ) : (
                    <Button variant="outline" className="flex-1 md:flex-none" disabled>
                      <Github className="mr-2 h-4 w-4" /> Code
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Case Study Content Placeholder */}
        <section className="py-24 mx-auto max-w-4xl px-6 prose prose-invert prose-pearl prose-lg">
          <h2 className="text-3xl font-serif italic text-pearl mb-6">The Problem Statement</h2>
          <p className="text-mist mb-12">
            Detailed case study content would go here. Structured with a hero image, problem statement, 
            market context, architecture diagrams (SVG), the hard problem and solution, results/metrics, 
            and lessons learned.
          </p>

          <div className="p-12 glass rounded-3xl border border-white/5 my-16 text-center">
            <h3 className="text-2xl font-serif italic text-pearl mb-4">Architecture Deep Dive</h3>
            <div className="aspect-video bg-midnight rounded-xl border border-white/5 flex items-center justify-center text-whisper italic">
              SVG Architecture Diagram would be rendered here
            </div>
          </div>

          <h2 className="text-3xl font-serif italic text-pearl mb-6">Key Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 not-prose mb-12">
             <div className="p-8 glass rounded-2xl border border-white/5">
               <span className="text-4xl font-bold text-cyan-electric mb-2 block">10x</span>
               <span className="text-sm text-mist">Faster processing time compared to manual entry.</span>
             </div>
             <div className="p-8 glass rounded-2xl border border-white/5">
               <span className="text-4xl font-bold text-cyan-electric mb-2 block">99%</span>
               <span className="text-sm text-mist">Accuracy in data extraction using Claude 3.5 Sonnet.</span>
             </div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
