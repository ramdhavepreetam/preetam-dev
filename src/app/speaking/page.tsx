import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { ChatWidget } from "@/components/ai/chat-widget";
import { Calendar, MapPin, ExternalLink } from "lucide-react";

export default function SpeakingPage() {
  const talks = [
    {
      title: "Building Production-Ready AI Agents",
      event: "Seattle AI Builders Meetup",
      date: "June 2026 (Upcoming)",
      location: "Seattle, WA",
      description: "A deep dive into tool-calling patterns and error handling for LLM agents."
    },
    {
      title: "Scaling Ed-Tech with Serverless Architecture",
      event: "AWS Community Day",
      date: "March 2026",
      location: "Bellevue, WA",
      description: "How we used AWS Lambda and Supabase to scale ScholarPath to thousands of students."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-32 mx-auto max-w-5xl px-6">
        <h1 className="text-6xl font-serif italic text-pearl mb-8">
          Speaking<span className="text-cyan-electric">.</span>
        </h1>
        <p className="text-xl text-mist mb-20 max-w-2xl">
          Sharing my experience on building AI products, entrepreneurship, and modern web architecture.
        </p>

        <div className="space-y-12">
          {talks.map((talk) => (
            <div key={talk.title} className="glass p-10 rounded-3xl border border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Calendar className="h-24 w-24 text-cyan-electric" />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 text-xs font-mono text-cyan-electric mb-4">
                   <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {talk.date}</span>
                   <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {talk.location}</span>
                </div>
                
                <h2 className="text-3xl font-serif italic text-pearl mb-4 group-hover:text-cyan-electric transition-colors">
                  {talk.title}
                </h2>
                <h3 className="text-xl font-medium text-mist mb-6">{talk.event}</h3>
                <p className="text-mist leading-relaxed max-w-2xl mb-8">
                  {talk.description}
                </p>
                
                <Button variant="outline" size="sm">
                  View Talk Details <ExternalLink className="ml-2 h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-24 text-center">
          <p className="text-mist mb-8">Interested in having me speak at your event?</p>
          <Button size="lg">Invite to Speak</Button>
        </div>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}

import { Button } from "@/components/ui/button";
