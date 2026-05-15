import { projects } from "@/lib/data";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { ChatWidget } from "@/components/ai/chat-widget";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, CheckCircle, XCircle } from "lucide-react";
import { Github } from "@/components/icons/social-icons";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function DeploymentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const cs = project.caseStudy;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">

        {/* Hero */}
        <section className="pt-32 pb-20 border-b border-white/5">
          <div className="mx-auto max-w-7xl px-6">
            <Link href="/deployments" className="inline-flex items-center text-sm text-whisper hover:text-cyan-electric mb-12 group transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to all deployments
            </Link>

            <div className="max-w-4xl">
              <p className="text-xs font-mono text-cyan-electric/70 tracking-[0.2em] uppercase mb-4">{project.domain}</p>
              <h1 className="text-5xl md:text-7xl font-serif italic text-pearl leading-tight mb-6">
                {project.title}
              </h1>
              {cs && (
                <p className="text-lg md:text-xl text-mist leading-relaxed max-w-3xl">
                  {cs.headline}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Metadata strip */}
        {cs && (
          <section className="py-8 border-b border-white/5 bg-slate/20">
            <div className="mx-auto max-w-7xl px-6">
              <div className="flex flex-wrap gap-x-10 gap-y-4 items-start">
                <div>
                  <p className="text-[10px] font-mono text-whisper uppercase tracking-widest mb-1">Customer</p>
                  <p className="text-sm text-pearl">{cs.customer}</p>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-whisper uppercase tracking-widest mb-1">Timeline</p>
                  <p className="text-sm text-pearl">{cs.timeline}</p>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-whisper uppercase tracking-widest mb-1">Status</p>
                  <p className="text-sm text-cyan-electric">{cs.status}</p>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-whisper uppercase tracking-widest mb-1">Capability</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {cs.capabilityTags.map((t) => (
                      <span key={t} className="text-[10px] font-mono uppercase tracking-wider text-teal-deep border border-teal-deep/30 px-2 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-whisper uppercase tracking-widest mb-1">Stack</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {project.tags.map((t) => (
                      <span key={t} className="text-[10px] font-mono uppercase tracking-wider text-whisper border border-white/10 px-2 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Links */}
        <section className="py-6 border-b border-white/5">
          <div className="mx-auto max-w-7xl px-6 flex gap-3">
            {project.url ? (
              <a href={project.url} target="_blank" rel="noopener noreferrer">
                <Button size="sm">Live Demo <ExternalLink className="ml-2 h-3 w-3" /></Button>
              </a>
            ) : (
              <Button size="sm" disabled>Live Demo <ExternalLink className="ml-2 h-3 w-3" /></Button>
            )}
            {project.github ? (
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm"><Github className="mr-2 h-3 w-3" /> Code</Button>
              </a>
            ) : (
              <Button variant="outline" size="sm" disabled><Github className="mr-2 h-3 w-3" /> Code</Button>
            )}
          </div>
        </section>

        {cs ? (
          <div className="mx-auto max-w-4xl px-6 py-20 space-y-20">

            {/* Outcome Metrics — first for scanners */}
            <section>
              <p className="text-xs font-mono text-cyan-electric/70 tracking-[0.2em] uppercase mb-6">Outcome</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {cs.outcomeMetrics.map((m) => (
                  <div key={m.label} className="glass rounded-2xl p-6 border border-white/5 text-center">
                    <div className="text-3xl md:text-4xl font-serif italic text-cyan-electric mb-1">{m.value}</div>
                    <div className="text-xs font-mono text-gold-solar uppercase tracking-wider mb-1">{m.label}</div>
                    {m.sub && <div className="text-[10px] text-whisper leading-relaxed">{m.sub}</div>}
                  </div>
                ))}
              </div>
            </section>

            {/* Customer Context */}
            <section>
              <p className="text-xs font-mono text-cyan-electric/70 tracking-[0.2em] uppercase mb-4">Customer Context</p>
              <h2 className="text-2xl font-serif italic text-pearl mb-4">Who they are and what world they live in</h2>
              <p className="text-mist leading-relaxed">{cs.customerContext}</p>
            </section>

            {/* The Problem */}
            <section>
              <p className="text-xs font-mono text-cyan-electric/70 tracking-[0.2em] uppercase mb-4">The Problem</p>
              <h2 className="text-2xl font-serif italic text-pearl mb-4">The fuzzy ask, translated</h2>
              <p className="text-mist leading-relaxed">{cs.problem}</p>
            </section>

            {/* Constraints */}
            <section>
              <p className="text-xs font-mono text-cyan-electric/70 tracking-[0.2em] uppercase mb-4">The Constraints</p>
              <h2 className="text-2xl font-serif italic text-pearl mb-6">Time · Budget · Regulatory · Technical · Organizational</h2>
              <div className="space-y-3">
                {cs.constraints.map((c, i) => (
                  <div key={i} className="flex gap-4 glass rounded-xl p-4 border border-white/5">
                    <span className="text-xs font-mono text-cyan-electric/40 shrink-0 mt-0.5 w-5">{String(i + 1).padStart(2, "0")}</span>
                    <p className="text-sm text-mist leading-relaxed">{c}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Architecture Diagram */}
            {project.architectureImage && (
              <section>
                <p className="text-xs font-mono text-cyan-electric/70 tracking-[0.2em] uppercase mb-4">Architecture</p>
                <h2 className="text-2xl font-serif italic text-pearl mb-6">System design</h2>
                <div className="glass rounded-2xl border border-white/5 overflow-hidden">
                  <Image
                    src={project.architectureImage}
                    alt={`${project.title} architecture diagram`}
                    width={1200}
                    height={675}
                    className="w-full h-auto"
                    priority
                  />
                </div>
              </section>
            )}

            {/* Architecture Decisions */}
            <section>
              <p className="text-xs font-mono text-cyan-electric/70 tracking-[0.2em] uppercase mb-4">Architecture Decisions</p>
              <h2 className="text-2xl font-serif italic text-pearl mb-6">What I chose. What I rejected. Why.</h2>
              <div className="space-y-5">
                {cs.architectureDecisions.map((d, i) => (
                  <div key={i} className="glass rounded-xl border border-white/5 overflow-hidden">
                    <div className="px-6 py-3 border-b border-white/5 bg-white/[0.02]">
                      <p className="text-xs font-mono text-whisper uppercase tracking-wider">{d.what}</p>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex gap-3">
                        <CheckCircle className="h-4 w-4 text-teal-deep shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[10px] font-mono text-teal-deep uppercase tracking-wider mb-1">Chosen</p>
                          <p className="text-sm text-pearl">{d.chosen}</p>
                        </div>
                      </div>
                      {d.rejected && (
                        <div className="flex gap-3">
                          <XCircle className="h-4 w-4 text-whisper shrink-0 mt-0.5" />
                          <div>
                            <p className="text-[10px] font-mono text-whisper uppercase tracking-wider mb-1">Rejected</p>
                            <p className="text-sm text-whisper">{d.rejected}</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="px-6 pb-5 pt-0">
                      <p className="text-[10px] font-mono text-cyan-electric/60 uppercase tracking-wider mb-1">Why</p>
                      <p className="text-sm text-mist leading-relaxed">{d.why}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Hard Problem */}
            <section>
              <p className="text-xs font-mono text-cyan-electric/70 tracking-[0.2em] uppercase mb-4">The Hard Problem</p>
              <h2 className="text-2xl font-serif italic text-pearl mb-6">The one thing that almost broke the deployment</h2>
              <div className="glass rounded-2xl p-8 border border-cyan-electric/10 mb-6">
                <p className="text-mist leading-relaxed">{cs.hardProblem}</p>
              </div>
              <div className="glass rounded-2xl p-8 border border-teal-deep/10">
                <p className="text-[10px] font-mono text-teal-deep uppercase tracking-widest mb-3">The Fix</p>
                <p className="text-mist leading-relaxed">{cs.fix}</p>
              </div>
            </section>

            {/* Production Reality */}
            {cs.productionReality && (
              <section>
                <p className="text-xs font-mono text-cyan-electric/70 tracking-[0.2em] uppercase mb-4">Production Reality</p>
                <h2 className="text-2xl font-serif italic text-pearl mb-4">What I had to fix in week 2</h2>
                <p className="text-mist leading-relaxed">{cs.productionReality}</p>
              </section>
            )}

            {/* Lessons */}
            <section>
              <p className="text-xs font-mono text-cyan-electric/70 tracking-[0.2em] uppercase mb-4">Lessons Carried Forward</p>
              <h2 className="text-2xl font-serif italic text-pearl mb-6">What this taught me that I apply to every deployment</h2>
              <div className="space-y-3">
                {cs.lessons.map((l, i) => (
                  <div key={i} className="flex gap-4 p-4 border-l-2 border-cyan-electric/20 hover:border-cyan-electric/50 transition-colors">
                    <span className="text-xs font-mono text-cyan-electric/40 shrink-0 mt-0.5">{String(i + 1).padStart(2, "0")}</span>
                    <p className="text-sm text-mist leading-relaxed">{l}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Related Deployments */}
            {cs.relatedSlugs.length > 0 && (
              <section>
                <p className="text-xs font-mono text-cyan-electric/70 tracking-[0.2em] uppercase mb-6">Related Deployments</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cs.relatedSlugs
                    .map((s) => projects.find((p) => p.slug === s))
                    .filter(Boolean)
                    .map((rel) => rel && (
                      <Link key={rel.slug} href={`/deployments/${rel.slug}`} className="group glass rounded-xl p-6 border border-white/5 hover:border-cyan-electric/30 transition-colors flex justify-between items-center">
                        <div>
                          <p className="text-[10px] font-mono text-whisper uppercase tracking-wider mb-1">{rel.domain}</p>
                          <p className="text-pearl font-serif italic group-hover:text-cyan-electric transition-colors">{rel.title}</p>
                          <p className="text-xs text-whisper font-mono mt-1">{rel.metrics}</p>
                        </div>
                        <ArrowLeft className="h-4 w-4 text-whisper group-hover:text-cyan-electric transition-colors rotate-180 shrink-0" />
                      </Link>
                    ))}
                </div>
              </section>
            )}

          </div>
        ) : (
          /* Fallback for projects without a case study yet */
          <section className="py-24 mx-auto max-w-4xl px-6">
            <p className="text-xl text-mist leading-relaxed mb-12">{project.description}</p>
            <div className="p-12 glass rounded-3xl border border-white/5 text-center">
              <h3 className="text-2xl font-serif italic text-pearl mb-4">Full case study coming soon</h3>
              <p className="text-mist text-sm">Problem · Constraints · Architecture · Hard problem · Outcome · Lessons</p>
            </div>
          </section>
        )}

      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
