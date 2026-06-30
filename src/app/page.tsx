import { Hero } from "@/components/home/hero";
import { ProjectGrid } from "@/components/home/project-grid";
import { Newsletter } from "@/components/home/newsletter";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { ChatWidget } from "@/components/ai/chat-widget";
import { articles, outcomes, howIWork } from "@/lib/data";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Hero />

        {/* Selected Outcomes — big numbers break the visual monotony */}
        <section className="py-16 border-y border-white/5 bg-slate/40">
          <div className="mx-auto max-w-7xl px-6">
            <p className="text-xs uppercase tracking-widest font-mono text-whisper mb-10 text-center">
              Selected Outcomes — Real Customers, Real Numbers
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {outcomes.map((o) => (
                <div key={o.unit} className="text-center">
                  <div className="text-4xl md:text-5xl font-serif italic text-cyan-electric leading-none">
                    {o.number}
                  </div>
                  <div className="text-sm font-mono text-gold-solar mt-1 mb-3 uppercase tracking-wider">
                    {o.unit}
                  </div>
                  <p className="text-xs text-whisper leading-relaxed">{o.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ProjectGrid />

        {/* How I Work */}
        <section className="py-24 border-t border-white/5">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col md:flex-row items-baseline justify-between gap-4 mb-12">
              <div>
                <h2 className="text-4xl font-serif italic text-pearl">How I Work</h2>
                <p className="text-mist mt-2 text-sm max-w-lg">
                  The Forward Deployed Engineer motion — same pattern across UK enterprise clients, Fortune 500, and solo founder products.
                </p>
              </div>
              <Link href="/about" className="text-cyan-electric hover:underline flex items-center gap-1 text-sm font-medium shrink-0">
                Full story <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {howIWork.map((step) => (
                <div key={step.step} className="glass rounded-xl p-6 border border-white/5 hover:border-cyan-electric/20 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-mono text-cyan-electric/60">{step.step}</span>
                    <h3 className="text-pearl font-semibold">{step.title}</h3>
                  </div>
                  <p className="text-sm text-mist leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Writing */}
        <section className="py-24 mx-auto max-w-7xl px-6 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-baseline justify-between gap-4 mb-12">
            <h2 className="text-4xl font-serif italic text-pearl">Recent Writing</h2>
            <Link href="/writing" className="text-cyan-electric hover:underline text-sm font-medium flex items-center gap-1">
              Read all articles <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.slice(0, 3).map((article) => (
              <ArticleCard
                key={article.slug}
                title={article.title}
                date={article.date}
                readTime={article.readTime}
                tag={article.tags[0] ?? "Writing"}
                slug={article.slug}
              />
            ))}
          </div>
        </section>

        <Newsletter />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}

function ArticleCard({
  title,
  date,
  readTime,
  tag,
  slug,
}: {
  title: string;
  date: string;
  readTime: string;
  tag: string;
  slug: string;
}) {
  return (
    <Link href={`/writing/${slug}`} className="group">
      <div className="h-full p-8 glass rounded-2xl border border-white/5 group-hover:border-cyan-electric/30 transition-all">
        <div className="flex items-center justify-between mb-6">
          <span className="text-[10px] uppercase tracking-widest text-cyan-electric/70 font-mono border border-cyan-electric/20 px-2 py-0.5 rounded">
            {tag}
          </span>
          <span className="text-[10px] uppercase tracking-widest text-whisper font-mono">{readTime}</span>
        </div>
        <h3 className="text-lg font-serif italic text-pearl group-hover:text-cyan-electric transition-colors leading-snug mb-4">
          {title}
        </h3>
        <p className="text-xs text-whisper font-mono">{date}</p>
      </div>
    </Link>
  );
}
