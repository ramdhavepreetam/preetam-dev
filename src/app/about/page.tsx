import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { ChatWidget } from "@/components/ai/chat-widget";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Shield, Layers, Zap, Globe, Award, BookOpen } from "lucide-react";

export const metadata = {
  title: "About",
  description:
    "Forward Deployed Engineer with 17+ years embedding with customers, finding the real problem, and shipping production AI systems end-to-end.",
};

const experience = [
  {
    role: "Sr. Software Engineer · AI Agent Architect · AWS Solutions Architect · Internal FDE",
    company: "Fortune 500 Industrial Manufacturing Enterprise",
    location: "Renton, WA",
    period: "Current",
    highlights: [
      "Designed and shipped the organization's first production agentic AI workflow — event-driven ingestion via API Gateway → Step Functions, parallel Lambda tools, RAG grounding on AWS Kendra GenAI Index. Outcome: 60–80% reduction in manual document review effort.",
      "Architected a cross-account S3 secure file distribution platform with AWS Transfer Family (SFTP), KMS encryption, and home-directory isolation. Authored reusable vendor onboarding documentation now standard across the team.",
      "Led legacy application modernization: defined cloud-native migration path with phased roadmap, produced formal TIDs and ADRs with board-ready architecture reports.",
      "Built AWS-to-Azure migration frameworks mapping Lambda/S3/Step Functions to Azure equivalents for org-wide multi-cloud strategy.",
    ],
  },
  {
    role: "Full-Stack & AI-Native Product Development · External Client Engagements",
    company: "Independent Founder & Embedded Engineer",
    location: "Seattle, WA",
    period: "2018 — Present",
    highlights: [
      "OmmSai: LLM document pipeline processing 15,000+ handwritten prescription PDFs in 48 hours for a charitable healthcare event. Claude Sonnet + Google Drive API + ThreadPoolExecutor + Tkinter GUI. Open-sourced.",
      "ScholarPath: Active production ed-tech platform for Maharashtra MSCE scholarship exam prep. React + TypeScript + FastAPI + Supabase + Razorpay. Parent-as-gateway model, 1,000+ students.",
      "JapaApp: Spiritual mantra-tracking PWA live in production. Originally on AWS (Lambda, RDS Proxy, Cognito, SAM); owned the migration decision to Firebase. Razorpay tiered donation flow.",
      "Trading System: Automated IBKR futures trading with vertical spread options, NLP command parsing, React dashboard.",
    ],
  },
  {
    role: "Technical Lead / Sr. Software Engineer · Embedded Engineer for UK Enterprise Clients",
    company: "KPIT Technologies (formerly KPIT Cummins Infosystems)",
    location: "Pune, India · Onsite UK engagements",
    period: "Jun 2008 — 2017",
    highlights: [
      "Eight years as single point of contact for UK enterprise clients — capturing requirements onsite, designing systems for their reality, owning analysis through deployment.",
      "Three consecutive \"Delighted Customer\" awards (2012, 2013, 2014) voted by the client for direct impact.",
      "Real-Time Device Communication Platform: Scalable UDP socket server for concurrent VPS security device communication, WCF services for CRC-based authorization, video/image extraction from raw byte streams. .NET 4.0, C#.",
      "Order-to-Invoice Enterprise Platform: Full PRCR cycle ownership — analysis, design, implementation, regression, release. Complex contract handling and bespoke invoicing calculations. .NET 2.0, VB.NET, SSRS, NHibernate, SQL Server.",
    ],
  },
];

const competencies = [
  {
    icon: Zap,
    title: "AI / LLM",
    items: ["Agentic AI workflows", "RAG", "AWS Bedrock", "AWS Kendra GenAI", "Claude API", "OpenAI API", "Ollama", "ChromaDB", "MCP servers", "Prompt engineering", "Prompt-injection defense", "JSON-schema-constrained reasoning", "Fine-tuned 7B model deployment"],
  },
  {
    icon: Globe,
    title: "Cloud & Infra",
    items: ["AWS Lambda", "Step Functions", "API Gateway", "S3", "Transfer Family", "Kendra", "Bedrock", "IAM", "KMS", "CloudWatch", "RDS", "Cognito", "SAM", "Azure Functions", "Logic Apps", "Firebase", "Supabase", "Terraform", "CloudFormation"],
  },
  {
    icon: Layers,
    title: "Backend",
    items: ["Python", ".NET Core / C#", "FastAPI", "ASP.NET Web API", "Node.js (ESM)", "Event-driven architecture", "Microservices", "ETL pipelines"],
  },
  {
    icon: ArrowRight,
    title: "Frontend",
    items: ["React", "Next.js", "React Native", "TypeScript", "Vite", "TailwindCSS", "Material UI", "Framer Motion"],
  },
  {
    icon: Shield,
    title: "Security",
    items: ["IAM least-privilege", "KMS at rest", "TLS in transit", "Cross-account access", "DevSecOps", "Secrets management", "Prompt-injection defense", "Sensitive-data redaction"],
  },
  {
    icon: BookOpen,
    title: "FDE Practice",
    items: ["Customer discovery with non-technical stakeholders", "Requirements translation", "Solution architecture", "TIDs & ADRs", "Board-ready architecture reports", "Vendor onboarding frameworks", "Single-point-of-contact engagements"],
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">

        {/* Hero — The Realization Hook */}
        <section className="pt-32 pb-16 mx-auto max-w-4xl px-6">
          <div className="flex items-center gap-5 mb-8">
            <div className="relative h-20 w-20 rounded-full overflow-hidden ring-2 ring-cyan-electric/30 ring-offset-2 ring-offset-obsidian shrink-0">
              <Image
                src="/preetam-profile.jpg"
                alt="Preetam Ramdhave"
                fill
                className="object-cover object-top"
                priority
              />
            </div>
            <div>
              <p className="text-pearl font-semibold">Preetam Ramdhave</p>
              <p className="text-xs font-mono text-cyan-electric/70 tracking-[0.2em] uppercase mt-1">Forward Deployed Engineer · Seattle, WA</p>
            </div>
          </div>
          <h1 className="text-6xl md:text-8xl font-serif italic text-pearl mb-8 leading-[1.05]">
            The work <span className="text-cyan-electric">speaks.</span>
          </h1>
          <p className="text-xl text-mist leading-relaxed max-w-2xl">
            I realized something early: the best software in the world doesn't matter if it doesn't fit where
            the customer actually lives. The constraints, the legacy systems, the organizational politics, the
            user who is tired and just wants to get through their day. You can't spec your way to that understanding.
            You have to be there.
          </p>
        </section>

        {/* Origin Story */}
        <section className="py-16 border-y border-white/5 bg-slate/20">
          <div className="mx-auto max-w-4xl px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-2xl font-serif italic text-pearl mb-4">Where it started</h2>
                <p className="text-mist leading-relaxed text-sm mb-4">
                  It started at KPIT in 2008. I was 25, shipped to UK enterprise clients as the single point of
                  contact between an offshore engineering team and a customer who had very specific, very real
                  problems. No PM buffer. No requirements handed down from above. You sat with the customer,
                  you learned how they worked, and you built for their reality.
                </p>
                <p className="text-mist leading-relaxed text-sm">
                  Eight years. Three "Delighted Customer" awards voted by the clients themselves. I didn't know
                  it had a name yet — Forward Deployed Engineering — but the motion was already set: embed,
                  discover, design, ship, operate, generalize.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-serif italic text-pearl mb-4">The evolution</h2>
                <p className="text-mist leading-relaxed text-sm mb-4">
                  In 2018 I moved to Seattle and started applying the same motion to AI — first as an internal
                  FDE at a Fortune 500 industrial manufacturer, then as a founder shipping production products
                  across ed-tech, healthcare, and spiritual-tech.
                </p>
                <p className="text-mist leading-relaxed text-sm">
                  The tools changed. The motion didn't. The customer is still in the room. The problem is still
                  never the stated problem. The work still has to survive contact with production.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The 15,000 Prescription Proof Moment */}
        <section className="py-16 mx-auto max-w-4xl px-6">
          <div className="glass rounded-2xl p-10 border border-cyan-electric/10">
            <p className="text-xs font-mono text-cyan-electric/70 tracking-[0.2em] uppercase mb-4">Proof moment</p>
            <h2 className="text-2xl font-serif italic text-pearl mb-4">15,247 prescriptions. 48 hours. Zero data loss.</h2>
            <p className="text-mist leading-relaxed text-sm mb-4">
              A healthcare charity needed 15,000+ handwritten prescription PDFs converted to structured JSON
              for a medical event. The deadline was the event itself — 48 hours away. Manual transcription was
              mathematically impossible.
            </p>
            <p className="text-mist leading-relaxed text-sm mb-6">
              I built a Python pipeline using Claude Sonnet, Google Drive API, and ThreadPoolExecutor with 8
              parallel workers. The hard part wasn't the throughput — it was the eval problem. Claude was
              confident on prescriptions it shouldn't have been, hallucinating dosages on illegible scans.
              I built an eval harness: a hold-out set of 200 known prescriptions, automated diff against
              ground truth, confidence-threshold gating. Anything below 0.85 routed to human review.
            </p>
            <div className="flex flex-wrap gap-6">
              {[
                { n: "15,247", u: "PDFs processed" },
                { n: "47.5 hrs", u: "Inside the window" },
                { n: "99.97%", u: "Extraction accuracy" },
                { n: "$0", u: "Infrastructure cost" },
              ].map((s) => (
                <div key={s.u}>
                  <div className="text-2xl font-serif italic text-cyan-electric">{s.n}</div>
                  <div className="text-xs font-mono text-whisper mt-0.5">{s.u}</div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Link href="/deployments/ommsai" className="text-sm text-cyan-electric hover:underline flex items-center gap-1 w-fit">
                Full case study <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </section>

        {/* Outcomes strip */}
        <section className="py-12 border-y border-white/5 bg-slate/30">
          <div className="mx-auto max-w-4xl px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { n: "17+", u: "Years", d: "Production systems shipped end-to-end" },
                { n: "60–80%", u: "Reduction", d: "Manual effort via first-of-kind agentic AI workflow" },
                { n: "15,000+", u: "PDFs", d: "Processed in 48 hours at a healthcare event" },
                { n: "3×", u: "Awards", d: "Delighted Customer, voted by UK clients" },
              ].map((o) => (
                <div key={o.u} className="text-center">
                  <div className="text-3xl md:text-4xl font-serif italic text-cyan-electric">{o.n}</div>
                  <div className="text-xs font-mono text-gold-solar uppercase tracking-wider mt-1 mb-2">{o.u}</div>
                  <p className="text-xs text-whisper leading-relaxed">{o.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-6 py-20">

          {/* Why FDE work */}
          <section className="mb-20">
            <h2 className="text-3xl font-serif italic text-pearl mb-6">Why this work</h2>
            <div className="space-y-4 text-mist leading-relaxed">
              <p>
                Most software is built for a spec. FDE work is built for a reality. The customer's reality —
                their legacy systems, their team's actual skill level, their budget, their deadline, their
                ambiguity. That gap between spec and reality is where most AI deployments fail. It's also where
                I do my best work.
              </p>
              <p>
                I don't build demos. I build systems that customers depend on when the event is tomorrow and
                the stakes are real. That requires a different kind of ownership — not just "I shipped the code"
                but "I was there when it ran in production, and I fixed what broke."
              </p>
            </div>
          </section>

          {/* How I Work */}
          <section id="how-i-work" className="mb-20">
            <h2 className="text-3xl font-serif italic text-pearl mb-2">The motion</h2>
            <p className="text-mist text-sm mb-10">
              Set at KPIT with UK clients. Refined across Fortune 500 and solo founder products.
            </p>
            <div className="space-y-4">
              {[
                ["Embed", "Sit with the customer — external client, internal department, or end user. Watch how they actually work."],
                ["Discover", "Find the real problem. It is almost never the stated problem."],
                ["Design", "Architect the solution that fits the customer's reality — their data, their systems, their team, their security posture."],
                ["Ship", "Build it end-to-end. Backend, frontend, infra, security, observability. No handoffs."],
                ["Operate & Iterate", "Stay with it after launch. Watch the customer use it. Iterate on what the field teaches."],
                ["Generalize", "Turn one customer's win into a reusable pattern the rest of the org can leverage."],
              ].map(([title, desc], i) => (
                <div key={title} className="flex gap-6 glass p-5 rounded-xl border border-white/5">
                  <span className="text-xs font-mono text-cyan-electric/50 shrink-0 mt-0.5 w-6">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <span className="text-pearl font-semibold text-sm">{title} — </span>
                    <span className="text-mist text-sm leading-relaxed">{desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Professional Experience */}
          <section id="experience" className="mb-20">
            <h2 className="text-3xl font-serif italic text-pearl mb-10">Experience</h2>
            <div className="space-y-12">
              {experience.map((job) => (
                <div key={job.company} className="relative pl-6 border-l border-white/10">
                  <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-cyan-electric" />
                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 mb-3">
                    <div>
                      <h3 className="text-pearl font-semibold text-base leading-snug">{job.role}</h3>
                      <p className="text-cyan-electric text-sm font-medium mt-0.5">{job.company}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs font-mono text-whisper">{job.location}</p>
                      <p className="text-xs font-mono text-whisper">{job.period}</p>
                    </div>
                  </div>
                  <ul className="space-y-2 mt-4">
                    {job.highlights.map((h, idx) => (
                      <li key={idx} className="flex gap-3 text-sm text-mist leading-relaxed">
                        <span className="text-cyan-electric/40 shrink-0 mt-1">▸</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Core Competencies */}
          <section id="competencies" className="mb-20">
            <h2 className="text-3xl font-serif italic text-pearl mb-10">Core Competencies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {competencies.map((cat) => (
                <div key={cat.title} className="glass rounded-xl p-6 border border-white/5">
                  <div className="flex items-center gap-2 mb-4">
                    <cat.icon className="h-4 w-4 text-cyan-electric" />
                    <h3 className="text-pearl font-semibold text-sm">{cat.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((item) => (
                      <span
                        key={item}
                        className="text-[10px] uppercase tracking-wide text-whisper border border-white/10 px-2 py-0.5 rounded"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Education & Certs */}
          <section id="education" className="mb-20">
            <h2 className="text-3xl font-serif italic text-pearl mb-6">Education & Certifications</h2>
            <div className="space-y-3">
              {[
                { title: "Post Graduation, Computer Science", sub: "Modern College, Pune · 2003–2007 · Specialization: Theoretical Computer Science" },
                { title: "Bachelor of Computer Application (BCA)", sub: "Dayanand College, Latur" },
                { title: "AWS Solutions Architect", sub: "Certification" },
                { title: "Prompt Engineering for ChatGPT", sub: "Coursera" },
                { title: "Transformer Models & BERT", sub: "Google Cloud Skills Boost" },
                { title: "RAG Systems", sub: "Advanced · Ongoing" },
              ].map((item) => (
                <div key={item.title} className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 py-3 border-b border-white/5">
                  <span className="text-pearl text-sm font-medium">{item.title}</span>
                  <span className="text-xs font-mono text-whisper">{item.sub}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-whisper mt-6">
              Languages: English · Hindi · Marathi
            </p>
          </section>

          {/* What I'm looking for next */}
          <section className="mb-20">
            <h2 className="text-3xl font-serif italic text-pearl mb-6">What I'm looking for next</h2>
            <p className="text-mist leading-relaxed text-sm mb-6">
              FDE and applied AI engineering roles at AI labs, enterprise AI deployments, and AI-native
              scaleups — Anthropic, OpenAI, Palantir, Ramp, Sierra, and similar. Organizations where the
              question isn't "should we use AI" but "how do we make it actually work for our customers."
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: "Best fit", items: "AI labs · Enterprise AI deployments · Agentic AI scaleups" },
                { title: "Open to", items: "Consulting · Fractional FDE · Technical advisor" },
                { title: "Not exploring", items: "Full-time at non-AI companies" },
              ].map((col) => (
                <div key={col.title} className="glass rounded-xl p-5 border border-white/5">
                  <p className="text-xs font-mono text-cyan-electric/70 uppercase tracking-widest mb-2">{col.title}</p>
                  <p className="text-sm text-mist leading-relaxed">{col.items}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Personal — Seattle / Maharashtra / Japa */}
          <section className="mb-20">
            <div className="glass rounded-2xl p-8 border border-white/5">
              <p className="text-mist leading-relaxed text-sm">
                Based in Renton, WA — in the shadow of Boeing and a short drive from Amazon, Microsoft, and
                the rest of the Pacific Northwest tech corridor. Grew up in Maharashtra, India; still use
                Marathi phrases in internal docs as a nod to where it started. I practice japa — daily
                mantra repetition, which is partly why I built JapaApp. आपलं काम बोलतं — the work speaks.
              </p>
            </div>
          </section>

          {/* CTA */}
          <div className="p-12 glass rounded-3xl text-center border border-cyan-electric/20">
            <h2 className="text-3xl font-serif italic text-pearl mb-3">Want to work together?</h2>
            <p className="text-mist text-sm mb-8">
              Whether it's an enterprise AI system, a production product, or a hard problem — I'm interested.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <Button size="lg">
                  Let's Talk
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <a href="https://linkedin.com/in/preetam-ramdhave" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg">
                  LinkedIn <ArrowUpRight className="ml-1 h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
