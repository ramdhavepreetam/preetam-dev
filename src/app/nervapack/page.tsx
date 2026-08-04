import { ChatWidget } from "@/components/ai/chat-widget";
import { InfographicGallery } from "@/components/nervapack/infographic-gallery";
import { Github } from "@/components/icons/social-icons";
import { Footer } from "@/components/navigation/footer";
import { Navbar } from "@/components/navigation/navbar";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowUpRight,
  Boxes,
  BrainCircuit,
  CheckCircle,
  ExternalLink,
  GitBranch,
  Lock,
  Network,
  Radar,
  SearchCode,
  Terminal,
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Network,
    title: "Knowledge graph retrieval",
    text: "NervaPack indexes real code entities and relationships, then retrieves context through graph traversal instead of nearest-neighbor chunks alone.",
  },
  {
    icon: SearchCode,
    title: "AST-based precision",
    text: "Tree-sitter parsing extracts classes, functions, imports, and structural edges so the graph is grounded in code shape, not arbitrary text windows.",
  },
  {
    icon: Lock,
    title: "Offline first",
    text: "Local-first operation with ChromaDB and Ollama keeps private repositories on the developer machine, while Claude and OpenAI remain optional providers.",
  },
  {
    icon: GitBranch,
    title: "Incremental sync",
    text: "GitPython-powered sync detects changed files and updates only the affected graph slices instead of re-indexing the entire repository.",
  },
  {
    icon: Radar,
    title: "Graph visualization",
    text: "Interactive HTML visualization exposes nodes, edges, communities, dependency paths, and hotspots so retrieval behavior is inspectable.",
  },
  {
    icon: BrainCircuit,
    title: "MCP-ready context",
    text: "The project includes an MCP integration path so AI coding agents can ask for codebase-aware context through a tool interface.",
  },
];

const decisions = [
  {
    label: "Retrieval model",
    chosen: "K-hop graph traversal over deterministic code entities",
    reason:
      "Developer questions usually depend on structure: which function calls what, which file imports which module, and which docs explain which code. Graph traversal preserves those relationships.",
  },
  {
    label: "Privacy posture",
    chosen: "Local ChromaDB and Ollama by default",
    reason:
      "The target user is indexing source code. Keeping the default path offline removes a major adoption blocker for private repositories and enterprise codebases.",
  },
  {
    label: "Parsing layer",
    chosen: "Tree-sitter AST parsing with language extras",
    reason:
      "A parser gives stable code entities across Python, JavaScript, JSX, TypeScript, and TSX, with optional extras for Go, Rust, Java, C, C++, Ruby, and C#.",
  },
  {
    label: "Operational loop",
    chosen: "CLI-first commands for ingest, query, sync, and visualize",
    reason:
      "The first workflow needs to be fast for developers: install, index a repository, query it, inspect the graph, and refresh it after code changes.",
  },
];

const useCases = [
  "Onboard into a new codebase without sending the repository to a hosted service.",
  "Ask architecture questions and retrieve only the structurally relevant files.",
  "Trace refactor impact through imports, calls, and dependency communities.",
  "Link documentation back to the exact code entities it explains.",
  "Give AI coding agents smaller, more accurate context than naive full-file RAG.",
];

export const metadata = {
  title: "NervaPack",
  description:
    "NervaPack is a privacy-first, offline knowledge graph for developers, built for AST-aware code retrieval, graph visualization, and MCP-powered AI coding workflows.",
};

export default function NervaPackPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="border-b border-white/5 pt-32 pb-20">
          <div className="mx-auto max-w-7xl px-6">
            <Link
              href="/work"
              className="group mb-12 inline-flex items-center text-sm text-whisper transition-colors hover:text-cyan-electric"
            >
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to work
            </Link>

            <div className="grid items-end gap-12 lg:grid-cols-[1fr_0.86fr]">
              <div>
                <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-cyan-electric/70">
                  Open Source AI · Developer Tooling
                </p>
                <h1 className="mb-6 max-w-4xl font-serif text-6xl italic leading-[0.95] text-pearl md:text-8xl">
                  Nerva<span className="text-cyan-electric">Pack.</span>
                </h1>
                <p className="max-w-3xl text-xl leading-relaxed text-mist">
                  A privacy-first, offline knowledge graph for developers. It turns repositories into
                  AST-aware graphs so humans and AI agents can retrieve precise code context without
                  flooding prompts with unrelated files.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="https://nervapack.readthedocs.io/en/latest/" target="_blank" rel="noopener noreferrer">
                    <Button>
                      Documentation <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                  <a href="https://github.com/ramdhavepreetam/NervaPack" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline">
                      <Github className="mr-2 h-4 w-4" /> Code
                    </Button>
                  </a>
                  <a href="https://pypi.org/project/nervapack/" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline">
                      PyPI <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </div>

              <div className="glass overflow-hidden rounded-2xl border border-white/5">
                <div className="border-b border-white/5 px-4 py-3">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-whisper">Demo video</p>
                </div>
                <video
                  src="/nervapack-demo.mp4"
                  className="aspect-video w-full bg-midnight object-cover object-top"
                  controls
                  muted
                  playsInline
                  preload="metadata"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-white/5 bg-slate/20 py-8">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-6 md:grid-cols-4">
            <Metric value="91.2%" label="Average Token Reduction" />
            <Metric value="96%" label="SWE-bench Lite Recall" />
            <Metric value="0 KB" label="Cloud Data (100% Local)" />
            <Metric value="20" label="MCP Tools (Dual Servers)" />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1fr]">
            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-cyan-electric/70">
                Why it exists
              </p>
              <h2 className="mb-5 font-serif text-4xl italic text-pearl">
                Standard vector RAG loses the shape of software.
              </h2>
              <p className="leading-relaxed text-mist">
                Most codebase search systems split files into text chunks, embed them, and hope similarity
                finds the right context. NervaPack takes a more developer-native route: parse the code,
                build a graph of real entities and relationships, then retrieve the neighborhood that
                explains the question.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.title} className="glass rounded-lg border border-white/5 p-6">
                    <Icon className="mb-4 h-5 w-5 text-cyan-electric" />
                    <h3 className="mb-2 font-serif text-xl italic text-pearl">{feature.title}</h3>
                    <p className="text-sm leading-relaxed text-mist">{feature.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-y border-white/5 bg-midnight/50 py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-cyan-electric/70">
                  Quick flow
                </p>
                <h2 className="font-serif text-4xl italic text-pearl">Install, index, query, visualize.</h2>
              </div>
              <p className="max-w-xl text-sm leading-relaxed text-mist">
                The CLI loop is intentionally short so a developer can build a graph from an existing
                repository and immediately compare retrieved context against naive file search.
              </p>
            </div>

            <div className="glass overflow-hidden rounded-2xl border border-white/5">
              <div className="flex items-center gap-2 border-b border-white/5 px-5 py-4">
                <Terminal className="h-4 w-4 text-cyan-electric" />
                <p className="font-mono text-[10px] uppercase tracking-widest text-whisper">Terminal</p>
              </div>
              <pre className="overflow-x-auto p-6 font-mono text-sm leading-7 text-mist">
                <code>{`brew install nervapack
# or: pipx install nervapack

cd your-project/
nervapack ingest .
nervapack query "How does authentication work?"
nervapack visualize --enhanced --communities`}</code>
              </pre>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-cyan-electric/70">
                Infographics
              </p>
              <h2 className="font-serif text-4xl italic text-pearl">See how it fits together.</h2>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-mist">
              A visual walkthrough of the pipeline, system model, benchmarks, and who NervaPack is
              built for. Click any panel to view it full size.
            </p>
          </div>
          <InfographicGallery />
        </section>
        <section className="mx-auto max-w-5xl px-6 py-20">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-cyan-electric/70">
            Architecture decisions
          </p>
          <h2 className="mb-8 font-serif text-4xl italic text-pearl">What I chose and why.</h2>
          <div className="space-y-5">
            {decisions.map((decision) => (
              <div key={decision.label} className="glass rounded-xl border border-white/5 p-6">
                <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-whisper">
                  {decision.label}
                </p>
                <div className="mb-3 flex gap-3">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-teal-deep" />
                  <p className="text-pearl">{decision.chosen}</p>
                </div>
                <p className="text-sm leading-relaxed text-mist">{decision.reason}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-white/5 py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.8fr_1fr]">
            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-cyan-electric/70">
                Use cases
              </p>
              <h2 className="mb-5 font-serif text-4xl italic text-pearl">
                Built for codebases that are too large to paste into a prompt.
              </h2>
              <p className="leading-relaxed text-mist">
                NervaPack is not a hosted SaaS wrapper. It is a local developer tool for reading,
                indexing, syncing, querying, and visualizing software systems with enough structure
                for an AI agent to use the context responsibly.
              </p>
            </div>
            <div className="space-y-3">
              {useCases.map((item, index) => (
                <div key={item} className="flex gap-4 border-l-2 border-cyan-electric/20 p-4">
                  <span className="mt-0.5 w-6 shrink-0 font-mono text-xs text-cyan-electric/50">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm leading-relaxed text-mist">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-24">
          <div className="glass grid gap-8 rounded-2xl border border-cyan-electric/10 p-8 md:grid-cols-[auto_1fr_auto] md:items-center">
            <Boxes className="h-8 w-8 text-cyan-electric" />
            <div>
              <h2 className="font-serif text-2xl italic text-pearl">NervaPack documentation</h2>
              <p className="mt-2 text-sm leading-relaxed text-mist">
                Full installation, quick start, command reference, MCP integration, API reference, and
                contribution guide live in the Read the Docs site.
              </p>
            </div>
            <a href="https://nervapack.readthedocs.io/en/latest/" target="_blank" rel="noopener noreferrer">
              <Button>
                Open docs <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="mb-1 font-serif text-3xl italic text-cyan-electric md:text-4xl">{value}</div>
      <div className="font-mono text-[10px] uppercase tracking-widest text-whisper">{label}</div>
    </div>
  );
}
