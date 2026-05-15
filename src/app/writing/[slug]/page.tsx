import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { ChatWidget } from "@/components/ai/chat-widget";
import { ArrowLeft, Share2 } from "lucide-react";
import { Twitter, Linkedin } from "@/components/icons/social-icons";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ArticlePage({ params }: { params: { slug: string } }) {
  // Mock article data - in a real app, this would come from an MDX file
  const article = {
    title: "How I Built an AI Tool That Processed 15,000 Prescriptions in 48 Hours",
    description: "A deep dive into the architecture and challenges of building OmmSai, an open-source tool for healthcare data automation.",
    date: "May 12, 2026",
    readTime: "8 min read",
    author: "Preetam Ramdhave",
    tags: ["AI Engineering", "Healthcare", "Python"]
  };

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
        </header>

        <article className="prose prose-invert prose-pearl prose-lg max-w-none">
          {/* Article content would be rendered here via MDX */}
          <p>
            When I first heard about the charity healthcare event, the challenge seemed insurmountable. 
            Over 15,000 handwritten prescriptions needed to be digitized into structured JSON for pharmacy 
            management in less than 48 hours.
          </p>
          <h2 className="text-3xl font-serif italic text-pearl mt-12 mb-6">The Architecture</h2>
          <p>
            I built OmmSai using a combination of Python, the Claude 3.5 Sonnet API, and a highly concurrent 
            processing engine. The core of the system was a multi-threaded batch processor that could handle 
            hundreds of requests per minute while maintaining strict accuracy checks.
          </p>
          <pre className="bg-slate p-6 rounded-xl border border-white/5 cyan-glow overflow-x-auto my-8">
            <code className="text-sm font-mono text-code-green">
{`async def process_prescription(image_bytes):
    # Convert image to optimized base64
    # Call Claude 3.5 Sonnet with vision
    # Validate structured JSON response
    # Save to Supabase`}
            </code>
          </pre>
          <p>
            The results were staggering. We achieved a 99% accuracy rate, significantly higher than human 
            data entry, and completed the entire dataset with hours to spare.
          </p>
        </article>

        {/* Article Footer */}
        <footer className="mt-20 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-full bg-cyan-electric/10 border border-cyan-electric/20 flex items-center justify-center">
               <span className="text-cyan-electric font-bold">PR</span>
            </div>
            <div>
              <span className="block text-sm font-bold text-pearl">{article.author}</span>
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
