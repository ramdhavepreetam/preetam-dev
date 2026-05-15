import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { ChatWidget } from "@/components/ai/chat-widget";

export default function NowPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-32 mx-auto max-w-3xl px-6">
        <h1 className="text-6xl font-serif italic text-pearl mb-12">
          What I'm doing <span className="text-cyan-electric">now.</span>
        </h1>
        
        <div className="space-y-12">
          <section className="glass p-8 rounded-2xl border border-white/5">
            <h2 className="text-xl font-serif italic text-pearl mb-4">Location</h2>
            <p className="text-mist leading-relaxed">
              Living in Renton, Washington (Greater Seattle Area). Enjoying the Pacific Northwest energy 
              and the vibrant tech community here.
            </p>
          </section>

          <section className="glass p-8 rounded-2xl border border-white/5">
            <h2 className="text-xl font-serif italic text-pearl mb-4">Current Focus</h2>
            <ul className="space-y-4 text-mist">
              <li className="flex items-start gap-3">
                <span className="text-cyan-electric mt-1">→</span>
                <span>Iterating on **ScholarPath** — scaling to more students and refining the AI prep engine.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-electric mt-1">→</span>
                <span>Deep diving into **Agentic Workflows** using Claude 3.5 Sonnet and tool-calling patterns.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-electric mt-1">→</span>
                <span>Refining my **Automated Trading System** — improving the NLP parser for options strategies.</span>
              </li>
            </ul>
          </section>

          <section className="glass p-8 rounded-2xl border border-white/5">
            <h2 className="text-xl font-serif italic text-pearl mb-4">Learning</h2>
            <p className="text-mist leading-relaxed">
              Currently reading about **Distributed Systems** and **Quant Finance**. 
              Exploring **Rust** for performance-critical backend components.
            </p>
          </section>

          <div className="text-xs text-whisper uppercase tracking-widest text-center mt-20">
            Last updated: May 14, 2026
          </div>
        </div>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
