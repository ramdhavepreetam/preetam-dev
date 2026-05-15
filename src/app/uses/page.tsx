import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { ChatWidget } from "@/components/ai/chat-widget";

export default function UsesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-32 mx-auto max-w-4xl px-6">
        <h1 className="text-6xl font-serif italic text-pearl mb-8">
          The <span className="text-cyan-electric">Stack.</span>
        </h1>
        <p className="text-xl text-mist mb-16 max-w-2xl">
          A curated list of tools, software, and hardware I use to build and ship.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <ToolCategory 
            title="Development"
            items={[
              { name: "VS Code", description: "With a custom dark theme and JetBrains Mono." },
              { name: "Cursor", description: "For AI-assisted coding and rapid prototyping." },
              { name: "Warp", description: "The AI-integrated terminal for macOS." },
              { name: "Next.js", description: "The backbone of my frontend work." },
              { name: "Tailwind CSS v4", description: "For styling at the speed of thought." },
            ]}
          />
          <ToolCategory 
            title="Backend & AI"
            items={[
              { name: "FastAPI", description: "My go-to for Python-based AI services." },
              { name: "Claude API", description: "The intelligence behind my agentic tools." },
              { name: "Supabase", description: "PostgreSQL, Auth, and Storage made easy." },
              { name: "AWS", description: "Lambda, S3, and RDS for production scale." },
              { name: "ChromaDB", description: "Vector storage for RAG implementations." },
            ]}
          />
          <ToolCategory 
            title="Design"
            items={[
              { name: "Figma", description: "Where every pixel is planned." },
              { name: "Linear", description: "Issue tracking for focused execution." },
              { name: "Framer Motion", description: "For fluid, premium animations." },
            ]}
          />
          <ToolCategory 
            title="Desk Setup"
            items={[
              { name: "MacBook Pro M3 Max", description: "Unrivaled power for local LLMs." },
              { name: "LG UltraFine 5K", description: "Perfect clarity for code." },
              { name: "Keychron Q1", description: "Tactile feedback matters." },
              { name: "Herman Miller Aeron", description: "Investment in focus." },
            ]}
          />
        </div>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}

function ToolCategory({ title, items }: { title: string; items: { name: string; description: string }[] }) {
  return (
    <section>
      <h2 className="text-2xl font-serif italic text-pearl mb-6 border-b border-white/5 pb-2">
        {title}
      </h2>
      <ul className="space-y-6">
        {items.map((item) => (
          <li key={item.name} className="group">
            <h3 className="text-pearl font-bold group-hover:text-cyan-electric transition-colors">
              {item.name}
            </h3>
            <p className="text-sm text-mist leading-relaxed mt-1">
              {item.description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
