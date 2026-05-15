import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { ChatWidget } from "@/components/ai/chat-widget";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Shield, Layers, Zap, Globe, Award, BookOpen } from "lucide-react";

export const metadata = {
  title: "About",
  description:
    "17+ years of the same motion: embed with the customer, find the real problem, build it end-to-end, ship it. Forward Deployed Engineer · AI Agent Architect · AWS Solutions Architect.",
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
      "ScholarPath: Active production ed-tech platform for Maharashtra MSCE scholarship exam prep. React + TypeScript + FastAPI + Supabase + Razorpay. Parent-as-gateway model, 124-test E2E testing plan.",
      "JapaApp: Spiritual mantra-tracking PWA (~85% complete). Originally on AWS (Lambda, RDS Proxy, Cognito, SAM); owned the migration decision to Firebase. Razorpay tiered subscription/donation flow.",
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
    items: ["Agentic AI workflows", "RAG", "AWS Bedrock", "AWS Kendra GenAI", "Claude API", "OpenAI API", "Ollama", "ChromaDB", "MCP servers", "Prompt engineering", "Prompt-injection defense", "JSON-schema-constrained reasoning"],
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
        {/* Hero */}
        <section className="pt-32 pb-16 mx-auto max-w-4xl px-6">
          <h1 className="text-6xl md:text-8xl font-serif italic text-pearl mb-6 leading-[1.05]">
            The story <span className="text-cyan-electric">so far.</span>
          </h1>
          <p className="text-xl text-mist leading-relaxed max-w-2xl">
            17+ years. Every system I have shipped has come out of the same motion: embed with the customer,
            study how they actually work, identify the real problem, design and build the solution end-to-end,
            ship it, operate it, iterate. The customer changes — the motion does not.
          </p>
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
          {/* How I Work */}
          <section id="how-i-work" className="mb-20">
            <h2 className="text-3xl font-serif italic text-pearl mb-2">How I Work</h2>
            <p className="text-mist text-sm mb-10">
              The Forward Deployed Engineer model — set at KPIT with UK clients, refined across Fortune 500 and solo founder products.
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

          {/* Thought Leadership */}
          <section id="writing" className="mb-20">
            <h2 className="text-3xl font-serif italic text-pearl mb-6">Thought Leadership</h2>
            <div className="space-y-4">
              {[
                {
                  title: "Agentic AI — Built for Production",
                  date: "April 2026",
                  desc: "Production security, auditability, and deterministic outputs for enterprise agent workflows; event-driven ingestion, RAG grounding, prompt-injection defense, structured decision logging.",
                  slug: "agentic-ai-production",
                },
                {
                  title: "Building Big Apps with AI Coding Tools — Without Making a Mess",
                  date: "January 2026",
                  desc: "Modular architecture, guardrails, and AI-assisted development at scale; vertical slices, contract-first design, when to keep humans in the loop.",
                  slug: "building-big-apps-ai-tools",
                },
              ].map((article) => (
                <Link key={article.slug} href={`/writing/${article.slug}`} className="group flex gap-6 glass rounded-xl p-6 border border-white/5 hover:border-cyan-electric/30 transition-colors">
                  <div className="flex-1">
                    <h3 className="text-pearl font-serif italic text-lg group-hover:text-cyan-electric transition-colors leading-snug mb-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-mist leading-relaxed">{article.desc}</p>
                    <p className="text-xs font-mono text-whisper mt-3">{article.date}</p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-whisper group-hover:text-cyan-electric transition-colors shrink-0 mt-1" />
                </Link>
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

          {/* Seattle note */}
          <section className="mb-20">
            <div className="glass rounded-2xl p-8 border border-white/5">
              <p className="text-mist leading-relaxed text-sm">
                Based in Renton, WA — in the shadow of Boeing and a short drive from Amazon, Microsoft, and
                the rest of the Pacific Northwest tech corridor. Still use Marathi phrases in internal docs
                as a nod to where it started. आपलं काम बोलतं — the work speaks.
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
