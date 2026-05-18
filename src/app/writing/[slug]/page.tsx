import { articles } from "@/lib/data";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { ChatWidget } from "@/components/ai/chat-widget";
import { ArrowLeft, ArrowUpRight, Share2 } from "lucide-react";
import { Twitter, Linkedin } from "@/components/icons/social-icons";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);

  if (!article) notFound();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-32 mx-auto max-w-4xl px-6">
        <Link 
          href="/writing" 
          className="inline-flex items-center text-sm text-whisper hover:text-cyan-electric mb-12 group transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to all writing
        </Link>

        <header className="mb-16">
          <div className="flex items-center space-x-4 mb-6 text-xs uppercase tracking-widest text-cyan-electric font-mono">
            <span>{article.date}</span>
            <span className="h-1 w-1 bg-cyan-electric/20 rounded-full" />
            <span>{article.readTime}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif italic text-pearl leading-tight mb-8">
            {article.title}
          </h1>
          <p className="text-xl text-mist leading-relaxed italic border-l-2 border-cyan-electric pl-6">
            {article.description}
          </p>
          {article.links && (
            <div className="flex flex-wrap gap-3 mt-8">
              {article.links.map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm">
                    {link.label} <ArrowUpRight className="ml-2 h-3 w-3" />
                  </Button>
                </a>
              ))}
            </div>
          )}
        </header>

        <article className="prose prose-invert prose-pearl prose-lg max-w-none">
          {article.blocks.map((block, index) => {
            if (block.kind === "heading") {
              return (
                <h2 key={index} className="text-3xl font-serif italic text-pearl mt-12 mb-6">
                  {block.text}
                </h2>
              );
            }

            if (block.kind === "code") {
              return (
                <pre key={index} className="bg-slate p-6 rounded-xl border border-white/5 cyan-glow overflow-x-auto my-8">
                  <code className="text-sm font-mono text-code-green">{block.code}</code>
                </pre>
              );
            }

            return <p key={index}>{block.text}</p>;
          })}
        </article>

        {/* Article Footer */}
        <footer className="mt-20 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-full bg-cyan-electric/10 border border-cyan-electric/20 flex items-center justify-center">
               <span className="text-cyan-electric font-bold">PR</span>
            </div>
            <div>
              <span className="block text-sm font-bold text-pearl">Preetam Ramdhave</span>
              <span className="text-xs text-whisper">AI Builder · Entrepreneur</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-xs text-whisper uppercase tracking-widest">Share article</span>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </footer>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
