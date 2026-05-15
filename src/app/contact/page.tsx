"use client";

import * as React from "react";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { ChatWidget } from "@/components/ai/chat-widget";
import { Button } from "@/components/ui/button";
import { Mail, Copy, Check, Calendar } from "lucide-react";

export default function ContactPage() {
  const [copied, setCopied] = React.useState(false);
  const email = "ramdhavepreetam@gmail.com";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-32 mx-auto max-w-4xl px-6 text-center">
        <h1 className="text-6xl md:text-8xl font-serif italic text-pearl mb-8">
          Let's <span className="text-cyan-electric">build</span> together.
        </h1>
        <p className="text-xl text-mist leading-relaxed max-w-2xl mx-auto mb-16">
          I'm always open to discussing new projects, AI automation, 
          or the future of ed-tech.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {/* Email Card */}
          <div className="glass p-10 rounded-3xl border border-white/5 flex flex-col items-center">
            <div className="h-14 w-14 rounded-2xl bg-cyan-electric/10 flex items-center justify-center mb-6">
              <Mail className="h-6 w-6 text-cyan-electric" />
            </div>
            <h3 className="text-xl font-serif italic text-pearl mb-2">Send an email</h3>
            <p className="text-sm text-whisper mb-6">Response time: ~24 hours</p>
            
            <div className="flex items-center space-x-2 bg-obsidian border border-white/10 rounded-lg p-2 pl-4 w-full">
              <span className="text-sm font-mono text-pearl truncate flex-1">{email}</span>
              <Button size="icon" variant="ghost" onClick={copyToClipboard}>
                {copied ? <Check className="h-4 w-4 text-code-green" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Calendar Card */}
          <div className="glass p-10 rounded-3xl border border-white/5 flex flex-col items-center">
            <div className="h-14 w-14 rounded-2xl bg-gold-solar/10 flex items-center justify-center mb-6">
              <Calendar className="h-6 w-6 text-gold-solar" />
            </div>
            <h3 className="text-xl font-serif italic text-pearl mb-2">Book a call</h3>
            <p className="text-sm text-whisper mb-6">Quick 15-min discovery</p>
            
            <Button className="w-full" size="lg">
              Open Calendly
            </Button>
          </div>
        </div>

        <div className="mt-20 text-whisper text-sm italic">
          "Build in public, talk in private."
        </div>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
