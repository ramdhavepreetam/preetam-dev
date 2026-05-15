"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Integration logic here
    console.log("Subscribing:", email);
    alert("Thanks for joining the journey!");
    setEmail("");
  };

  return (
    <section className="py-24 mx-auto max-w-7xl px-6">
      <div className="glass rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
        {/* Glow Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-electric/10 blur-[100px] rounded-full" />
        
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif italic text-pearl mb-6">
            Field Notes
          </h2>
          <p className="text-mist mb-10 leading-relaxed text-lg">
            Field notes from production AI deployments. Monthly. Short.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
            <input
              type="email"
              required
              placeholder="hello@world.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-obsidian border border-white/10 rounded-lg px-6 py-4 text-pearl focus:outline-none focus:ring-1 focus:ring-cyan-electric"
            />
            <Button size="lg" type="submit">
              Subscribe
              <Send className="ml-2 h-4 w-4" />
            </Button>
          </form>
          
          <p className="mt-6 text-xs text-whisper">
            No spam. Just code, AI, and entrepreneurship. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
