import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { ChatWidget } from "@/components/ai/chat-widget";
import Link from "next/link";

export const metadata = {
  title: "Playbook",
  description: "Named frameworks for Forward Deployed Engineering — scoping, eval-first AI shipping, production checklists, and spec-first engineering.",
};

export default function PlaybookPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">

        {/* Header */}
        <section className="pt-32 pb-16 border-b border-white/5">
          <div className="mx-auto max-w-4xl px-6">
            <p className="text-xs font-mono text-cyan-electric/70 tracking-[0.2em] uppercase mb-4">Forward Deployed Engineer</p>
            <h1 className="text-6xl md:text-8xl font-serif italic text-pearl mb-8 leading-[1.05]">
              The <span className="text-cyan-electric">Playbook.</span>
            </h1>
            <p className="text-xl text-mist leading-relaxed max-w-2xl">
              Named frameworks extracted from real deployments. Not theory — patterns that emerged from production
              systems with hard deadlines, real constraints, and customers on the other side.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-6 py-20 space-y-32">

          {/* Framework 1 — 4-Question Scoping Doc */}
          <article id="four-question-scoping-doc">
            <div className="mb-8">
              <p className="text-xs font-mono text-cyan-electric/70 tracking-[0.2em] uppercase mb-3">Framework 01</p>
              <h2 className="text-4xl font-serif italic text-pearl mb-4">The 4-Question Scoping Doc</h2>
              <p className="text-mist leading-relaxed max-w-2xl">
                The doc I write before touching code on any new deployment. Four questions that force clarity on what you're actually building, for whom, and what failure looks like — before a line of code exists.
              </p>
            </div>

            <div className="space-y-6 mb-10">
              {[
                {
                  n: "01",
                  q: "Who is the user on the other side?",
                  body: "Not the persona. Not the demographic. The actual person who will use this system at 9am on a Tuesday when they're tired and have three other things open. Are they a domain expert using a tool, or a non-technical operator running a pipeline? Do they trust computers or do they fight them? What do they do when something goes wrong — do they escalate, restart, or give up?\n\nThis question sounds obvious. It almost never gets answered completely before code is written. The OmmSai Tkinter GUI exists because I answered it: charity volunteers at an event venue, not engineers, running on Windows laptops without a terminal. A CLI would have failed at the first error message.",
                },
                {
                  n: "02",
                  q: "What's the worst-case failure mode?",
                  body: "Not the happy path. Not the edge case you've already thought of. The worst case: what happens when this system fails in a way you didn't design for? Who gets hurt, and how badly?\n\nFor OmmSai: worst-case was the system silently producing wrong medication dosages with high confidence. For the agentic document review system: worst-case was a partial report that looked complete — some chunks processed, some missing, the CSV report rendered anyway. For the trading automation: worst-case is a misinterpreted command that submits the wrong order against a real account.\n\nThe worst case is not a list of error codes. It's a failure scenario with a human consequence. Name it before you write the first function. It will change what you build.",
                },
                {
                  n: "03",
                  q: "What does 'good enough' look like to the customer?",
                  body: "Not 'done'. Not 'perfect'. Good enough. The threshold at which the customer's problem is solved well enough that they don't need to go back to the old way.\n\nThis question has two parts: the explicit answer (what the customer says) and the real answer (what you observe when you watch them work). They're often different. The explicit answer for the prescription pipeline was '15,000 PDFs processed.' The real answer, discovered by watching volunteers use it, was: 'the system tells me when it's stuck, not just when it's done.'\n\nGood enough is also a time constraint. A system that's 95% reliable in 48 hours beats a system that's 99.9% reliable in 3 weeks when the event is tomorrow.",
                },
                {
                  n: "04",
                  q: "What part of this can I not build?",
                  body: "Every deployment has a constraint you can't engineer around. Naming it early is the difference between a scoped delivery and a scope spiral.\n\nFor the agentic document review: I could not build OCR. Scanned PDFs were explicitly out of scope because the existing Kendra index was built on digital-text documents, and OCR would have changed the error profile of the entire system. Naming this in the TID before the first Sprint prevented three weeks of 'but what about the scanned docs' conversations.\n\nFor OmmSai: I could not build fine-tuning on a 48-hour timeline with no budget. The answer to 'what about illegible handwriting' was the confidence-threshold human review queue — not a better model.\n\nThe constraint you name becomes a decision. The constraint you don't name becomes a blocker.",
                },
              ].map((item) => (
                <div key={item.n} className="glass rounded-2xl border border-white/5 overflow-hidden">
                  <div className="px-8 py-5 border-b border-white/5 flex items-baseline gap-4">
                    <span className="text-xs font-mono text-cyan-electric/40">{item.n}</span>
                    <h3 className="text-xl font-serif italic text-pearl">{item.q}</h3>
                  </div>
                  <div className="px-8 py-6">
                    {item.body.split("\n\n").map((para, i) => (
                      <p key={i} className="text-sm text-mist leading-relaxed mb-4 last:mb-0">{para}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="glass rounded-xl p-6 border border-cyan-electric/10">
              <p className="text-xs font-mono text-cyan-electric/70 uppercase tracking-widest mb-2">When to use it</p>
              <p className="text-sm text-mist leading-relaxed">Before any new customer engagement, any new AI feature, any new system with real users. Takes 30 minutes to write. Saves weeks of rework. The TID for the PPD Document Review system started with these four questions — the architecture decisions that followed were direct answers to them.</p>
            </div>
          </article>

          {/* Framework 2 — Eval-First AI Shipping */}
          <article id="eval-first-shipping">
            <div className="mb-8">
              <p className="text-xs font-mono text-cyan-electric/70 tracking-[0.2em] uppercase mb-3">Framework 02</p>
              <h2 className="text-4xl font-serif italic text-pearl mb-4">Eval-First AI Shipping</h2>
              <p className="text-mist leading-relaxed max-w-2xl">
                Write the eval before the feature. Not after, not concurrently — before. Every AI system I've shipped that survived production contact started with an eval harness. Every one that didn't have one broke in a way the demos never showed.
              </p>
            </div>

            <div className="space-y-6 mb-10">
              <div className="glass rounded-xl p-8 border border-white/5">
                <h3 className="text-lg font-serif italic text-pearl mb-4">Why eval-by-demo fails</h3>
                <p className="text-sm text-mist leading-relaxed mb-4">A demo shows you what the model does when it's working on the input you hand it. It tells you nothing about what the model does on the 300 inputs you'll see in production that look slightly different, slightly degraded, or slightly ambiguous.</p>
                <p className="text-sm text-mist leading-relaxed">For OmmSai, the demo worked perfectly on 20 clean prescription scans. The eval harness on 200 mixed-quality prescriptions revealed that Claude was hallucinating dosages on illegible scans with the same confidence score as correct extractions. The demo would never have shown that. The eval found it in 3 minutes.</p>
              </div>

              <div className="glass rounded-xl p-8 border border-white/5">
                <h3 className="text-lg font-serif italic text-pearl mb-4">The golden set methodology</h3>
                <p className="text-sm text-mist leading-relaxed mb-4">A golden set is a fixed collection of inputs with known correct outputs, manually verified by a domain expert. Not generated by the model. Not sampled from a demo run. Verified.</p>
                <div className="space-y-2 mt-4">
                  {[
                    "Minimum 50 examples — enough to surface systematic failures, not just edge cases",
                    "Stratified across input quality — include the good ones, the degraded ones, and the borderline ones",
                    "Domain expert verification — someone who knows what the correct output is, independent of the model",
                    "Automated comparison — a script that diffs model output against ground truth per field, not human spot-check",
                    "Version-locked — the golden set doesn't change; when you add examples, you version it",
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3 text-sm">
                      <span className="text-cyan-electric/40 shrink-0 mt-0.5">→</span>
                      <span className="text-mist">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass rounded-xl p-8 border border-white/5">
                <h3 className="text-lg font-serif italic text-pearl mb-4">Eval harnesses that survive production</h3>
                <p className="text-sm text-mist leading-relaxed mb-4">A demo eval runs once. A production eval runs every time you change the prompt, the model version, the context window, or the chunking strategy. It has to be fast enough to run before every deployment.</p>
                <div className="space-y-2 mt-4">
                  {[
                    "Run in under 5 minutes — if it takes longer, it won't get run",
                    "Outputs a pass/fail signal, not just a score — 97.3% accuracy is not a deployment decision; 'failed on 3 medication name extractions in the test set' is",
                    "Covers the failure mode you're most afraid of — for medical data, that's confident wrong answers, not refusals",
                    "Runs in CI — prompt changes should trigger the eval automatically",
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3 text-sm">
                      <span className="text-cyan-electric/40 shrink-0 mt-0.5">→</span>
                      <span className="text-mist">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass rounded-xl p-8 border border-white/5">
                <h3 className="text-lg font-serif italic text-pearl mb-4">The JSON schema enforcement corollary</h3>
                <p className="text-sm text-mist leading-relaxed mb-4">For AI systems that produce structured output (the majority of enterprise AI use cases), the eval framework pairs with mandatory JSON schema enforcement at the output layer.</p>
                <p className="text-sm text-mist leading-relaxed">For the PPD Document Review system: <code className="text-code-green font-mono text-xs bg-white/5 px-1.5 py-0.5 rounded">temperature=0.0</code> + strict JSON schema + one repair prompt attempt. Same document run twice produces the same findings. That's the minimum bar for auditable output. An eval harness that doesn't check structural validity alongside semantic correctness is incomplete.</p>
              </div>
            </div>

            <div className="glass rounded-xl p-6 border border-cyan-electric/10">
              <p className="text-xs font-mono text-cyan-electric/70 uppercase tracking-widest mb-2">The rule</p>
              <p className="text-sm text-mist leading-relaxed">Do not deploy an AI feature to production that you haven't run against a golden set. The golden set doesn't have to be large. It has to be honest.</p>
            </div>
          </article>

          {/* Framework 3 — Production AI Checklist */}
          <article id="production-ai-checklist">
            <div className="mb-8">
              <p className="text-xs font-mono text-cyan-electric/70 tracking-[0.2em] uppercase mb-3">Framework 03</p>
              <h2 className="text-4xl font-serif italic text-pearl mb-4">The Production AI Checklist</h2>
              <p className="text-mist leading-relaxed max-w-2xl">
                Twelve things that demos never show. Every item on this list has been discovered in production on a real system, usually at an inconvenient moment.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              {[
                { n: "01", title: "Rate limits at sustained volume", body: "Burst rate ≠ sustained rate. A system that handles 10 req/s for 10 seconds may throttle at 2 req/s sustained. Test at production volume, not demo volume." },
                { n: "02", title: "Retry logic with exponential backoff", body: "No retry = silent failure. Infinite retry = infinite cost. Exponential backoff with jitter and a maximum retry count. Different retry budgets for transient vs permanent errors." },
                { n: "03", title: "Prompt versioning", body: "Your prompt is code. It needs a version number, a changelog, and a deployment process. A prompt change without an eval run is a deployment without tests." },
                { n: "04", title: "Eval drift over model updates", body: "Model providers update models without notice. Your golden set needs to run against the same model version you deploy. Track model versions explicitly in your eval results." },
                { n: "05", title: "Cost monitoring per job", body: "Token costs compound. A 200-page document at 4 pages/chunk is 50 Bedrock invocations. At production volume, cost per document × documents per day × 30 days is the number that matters." },
                { n: "06", title: "Fallback paths for model unavailability", body: "What does the system do when the model endpoint returns 503? Fail fast with a clear error? Queue and retry? Route to a simpler model? The answer must exist before it happens." },
                { n: "07", title: "Structured output validation", body: "LLMs produce prose. Your downstream system expects JSON. Schema validation on every output, a repair attempt on failure, and a defined behavior when repair fails. Not optional." },
                { n: "08", title: "Data minimization before model invocation", body: "Send the minimum data the model needs to answer the question. Strip PII, redact sensitive fields, truncate to relevant context. What goes into the model is what gets logged." },
                { n: "09", title: "Prompt injection defense", body: "Any user-controlled text that goes into a prompt is a potential injection surface. Constrain the model's action space, validate inputs before inclusion, and define what the model is not allowed to do." },
                { n: "10", title: "Coverage gates for pipeline completeness", body: "A pipeline that processes 49/50 chunks and renders a report has silently failed. Coverage gating at aggregation: verify every planned step produced output before rendering results." },
                { n: "11", title: "Failure manifests as first-class outputs", body: "Every job that fails should produce a durable failure record — what failed, when, and what state was reached. Operations teams need this more than the success path." },
                { n: "12", title: "Human-in-the-loop gates for high-stakes decisions", body: "Confidence thresholds exist for a reason. Anything below 0.85 confidence (or your domain equivalent) should route to human review, not be silently accepted or silently rejected." },
              ].map((item) => (
                <div key={item.n} className="glass rounded-xl p-6 border border-white/5">
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="text-xs font-mono text-cyan-electric/40">{item.n}</span>
                    <h3 className="text-sm font-semibold text-pearl">{item.title}</h3>
                  </div>
                  <p className="text-xs text-mist leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>

            <div className="glass rounded-xl p-6 border border-cyan-electric/10">
              <p className="text-xs font-mono text-cyan-electric/70 uppercase tracking-widest mb-2">How to use this</p>
              <p className="text-sm text-mist leading-relaxed">Run through this list before any AI system goes to production. Not as a bureaucratic exercise — as a conversation with yourself about which items you've actually addressed and which ones you've assumed away. The ones you've assumed away are the ones that will bite you.</p>
            </div>
          </article>

          {/* Framework 4 — Spec-First Engineering */}
          <article id="spec-first-engineering">
            <div className="mb-8">
              <p className="text-xs font-mono text-cyan-electric/70 tracking-[0.2em] uppercase mb-3">Framework 04</p>
              <h2 className="text-4xl font-serif italic text-pearl mb-4">Spec-First Engineering</h2>
              <p className="text-mist leading-relaxed max-w-2xl">
                No spec, no code. The ADR + TID methodology for shipping complex features without thrashing — particularly important when working with AI coding tools that will write code as fast as you can describe it.
              </p>
            </div>

            <div className="space-y-6 mb-10">
              <div className="glass rounded-xl p-8 border border-white/5">
                <h3 className="text-lg font-serif italic text-pearl mb-4">Why spec-first matters more with AI coding tools</h3>
                <p className="text-sm text-mist leading-relaxed mb-4">AI coding tools accelerate the wrong things if you don't spec first. They make it trivially easy to generate code for a vague requirement — and the code will look plausible, compile, and pass basic tests. You'll have 500 lines of code that solves a slightly different problem than the one you have.</p>
                <p className="text-sm text-mist leading-relaxed">The spec is what you give the AI. A precise spec produces precise code. A vague requirement produces vague code that looks precise — which is worse than obviously wrong code, because it's harder to detect.</p>
              </div>

              <div className="glass rounded-xl p-8 border border-white/5">
                <h3 className="text-lg font-serif italic text-pearl mb-4">The TID (Technical Information Document)</h3>
                <p className="text-sm text-mist leading-relaxed mb-4">A TID is a living document that captures the system's design decisions before and during implementation. Not a post-hoc documentation exercise — a design artifact that the code is written to match.</p>
                <p className="text-sm text-mist leading-relaxed mb-4">The PPD Document Review TID existed before a line of Lambda code was written. It captured: the S3 key layout, the five-stage architecture, the coverage gating requirement, the failure manifest pattern, the JSON schema enforcement policy. Every architectural decision was documented with a rationale. The implementation followed the spec, not the other way around.</p>
                <div className="space-y-2 mt-4">
                  {[
                    "Scope: what's in, what's explicitly out",
                    "Architecture diagram: data flow, not just service list",
                    "Component specs: inputs, outputs, failure modes, operational notes",
                    "Security posture: encryption, IAM, data minimization policy",
                    "Assumptions and constraints: the things that will break first if they're wrong",
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3 text-sm">
                      <span className="text-cyan-electric/40 shrink-0 mt-0.5">→</span>
                      <span className="text-mist">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass rounded-xl p-8 border border-white/5">
                <h3 className="text-lg font-serif italic text-pearl mb-4">The ADR (Architecture Decision Record)</h3>
                <p className="text-sm text-mist leading-relaxed mb-4">An ADR captures a single architectural decision: what was chosen, what was rejected, and why. The why is the part that matters six months later when someone asks why the system works this way.</p>
                <p className="text-sm text-mist leading-relaxed mb-4">Format: one page per decision. Decision → Context → Options considered → Chosen option → Rationale → Consequences. The consequences section is where you document what becomes harder if you make this choice — not to second-guess yourself, but because the next engineer needs to know.</p>
                <p className="text-sm text-mist leading-relaxed">Every architecture decision in this Playbook's deployment case studies was written as an ADR before the code was written. The 'chosen/rejected/why' cards on the case study pages are the ADRs.</p>
              </div>

              <div className="glass rounded-xl p-8 border border-white/5">
                <h3 className="text-lg font-serif italic text-pearl mb-4">The slice-prompt methodology</h3>
                <p className="text-sm text-mist leading-relaxed mb-4">When using AI coding tools on a specced system, slice the spec into vertical chunks — one complete feature slice at a time — and give the AI the spec section for that slice, not a vague description of what you want.</p>
                <p className="text-sm text-mist leading-relaxed">For ScholarPath: the parent-as-gateway permission model was fully specced (parent_id scoping, child profile inheritance, RLS policy definition) before the first Supabase migration was generated. The AI produced the correct migration on the first attempt because the spec was precise. Vague requirement + AI coding tool = plausible wrong code that takes a day to debug.</p>
              </div>
            </div>

            <div className="glass rounded-xl p-6 border border-cyan-electric/10">
              <p className="text-xs font-mono text-cyan-electric/70 uppercase tracking-widest mb-2">The rule</p>
              <p className="text-sm text-mist leading-relaxed">If you can't write the spec, you don't understand the problem well enough to build the solution. The spec isn't the deliverable — it's the forcing function that reveals what you don't know before you build the wrong thing.</p>
            </div>
          </article>

          {/* Framework 5 — 7B vs Claude */}
          <article id="small-llm-deployment-pattern" className="opacity-70">
            <div className="mb-8">
              <p className="text-xs font-mono text-cyan-electric/70 tracking-[0.2em] uppercase mb-3">Framework 05 · Coming Soon</p>
              <h2 className="text-4xl font-serif italic text-pearl mb-4">When to Deploy a 7B Model Instead of Calling Claude</h2>
              <p className="text-mist leading-relaxed max-w-2xl">
                The cost-quality trade-off framework. Frontier models are expensive at scale. Many production workloads can run on fine-tuned 7B class models at 10–50× lower cost with comparable quality. This framework is being written as the deployment case studies accumulate.
              </p>
            </div>
            <div className="glass rounded-xl p-8 border border-gold-solar/10">
              <p className="text-xs font-mono text-gold-solar/70 uppercase tracking-widest mb-3">Active research track</p>
              <div className="space-y-2">
                {[
                  "Decision criteria: when does fine-tuning beat API calls on cost × quality?",
                  "Eval methodology: comparing 7B fine-tuned vs Claude/GPT-4 on domain-specific tasks",
                  "Production deployment patterns: Modal, Hugging Face Inference Endpoints, self-hosted",
                  "Cost analysis: $/1K tokens at production scale with real workload numbers",
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 text-sm">
                    <span className="text-gold-solar/40 shrink-0 mt-0.5">→</span>
                    <span className="text-mist">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </article>

        </div>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
