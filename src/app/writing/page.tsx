import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { ChatWidget } from "@/components/ai/chat-widget";
import { articles } from "@/lib/data";
import Link from "next/link";

export default function WritingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-32 mx-auto max-w-5xl px-6">
        <header className="max-w-2xl mb-24">
          <h1 className="text-6xl md:text-8xl font-serif italic text-pearl mb-8">
            Writing<span className="text-cyan-electric">.</span>
          </h1>
          <p className="text-xl text-mist leading-relaxed">
            Essays on AI engineering, shipping products, and the entrepreneur&apos;s mindset.
            No corporate-speak, just building in public.
          </p>
        </header>

        <div className="space-y-16">
          {articles.map((article) => (
            <article key={article.slug} className="group border-b border-white/5 pb-16 last:border-0">
              <Link href={`/writing/${article.slug}`} className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-6 text-xs uppercase tracking-widest text-whisper font-mono">
                    <span>{article.date}</span>
                    <span className="h-1 w-1 bg-white/20 rounded-full" />
                    <span>{article.readTime}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif italic text-pearl group-hover:text-cyan-electric transition-colors mb-4 leading-tight">
                    {article.title}
                  </h2>
                  <p className="text-mist leading-relaxed text-lg mb-6 max-w-3xl">
                    {article.description}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {article.tags.map((tag) => (
                      <span key={tag} className="text-[10px] uppercase tracking-wider text-cyan-electric/80 border border-cyan-electric/20 bg-cyan-electric/5 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
