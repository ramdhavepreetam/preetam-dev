"use client";

import * as React from "react";
import { useChat } from "@ai-sdk/react";
import { Navbar } from "@/components/navigation/navbar";
import { Button } from "@/components/ui/button";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AIPage() {
  const [input, setInput] = React.useState("");
  const { messages, sendMessage, status } = useChat();
  const isLoading = status === "submitted" || status === "streaming";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input });
    setInput("");
  };

  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Navbar />
      <main className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-6 pt-10 pb-6 overflow-hidden">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-serif italic text-pearl mb-2">
            Ask <span className="text-cyan-electric">AI Preetam</span>
          </h1>
          <p className="text-sm text-mist">
            An AI twin trained on my projects, stack, and philosophy.
          </p>
        </header>

        {/* Chat Area */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto space-y-6 pb-20 scroll-smooth pr-4 scrollbar-thin"
        >
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-6 max-w-md mx-auto">
              <div className="h-16 w-16 rounded-3xl bg-cyan-electric/10 flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-cyan-electric" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-serif italic text-pearl">How can I help you?</h3>
                <p className="text-sm text-mist leading-relaxed">
                  Try asking "What is ScholarPath?", "What's Preetam's tech stack?", 
                  or "Tell me about the OmmSai project."
                </p>
              </div>
              <div className="grid grid-cols-1 gap-2 w-full">
                <QuickLink 
                  text="Tell me about ScholarPath" 
                  onClick={() => setInput("Tell me about ScholarPath")} 
                />
                <QuickLink 
                  text="What AI tools does Preetam use?" 
                  onClick={() => setInput("What AI tools does Preetam use?")} 
                />
              </div>
            </div>
          )}

          {messages.map((m) => (
            <div
              key={m.id}
              className={cn(
                "flex w-full animate-in fade-in slide-in-from-bottom-2 duration-300",
                m.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              <div className={cn(
                "flex items-start gap-4 max-w-[85%]",
                m.role === "user" ? "flex-row-reverse" : "flex-row"
              )}>
                <div className={cn(
                  "h-8 w-8 rounded-full flex-shrink-0 flex items-center justify-center",
                  m.role === "user" ? "bg-cyan-electric text-obsidian" : "bg-midnight text-cyan-electric border border-white/5"
                )}>
                  {m.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>
                <div
                  className={cn(
                    "rounded-2xl p-4 text-sm leading-relaxed",
                    m.role === "user"
                      ? "bg-cyan-electric text-obsidian font-medium"
                      : "bg-midnight text-pearl border border-white/5"
                  )}
                >
                  {m.parts.map((part, i) => (
                    part.type === 'text' ? <p key={i}>{part.text}</p> : null
                  ))}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start animate-in fade-in duration-300">
               <div className="flex items-start gap-4">
                <div className="h-8 w-8 rounded-full bg-midnight text-cyan-electric border border-white/5 flex items-center justify-center">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="bg-midnight rounded-2xl p-4 border border-white/5">
                  <div className="flex space-x-1.5">
                    <div className="h-2 w-2 bg-cyan-electric rounded-full animate-bounce" />
                    <div className="h-2 w-2 bg-cyan-electric rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="h-2 w-2 bg-cyan-electric rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input area fixed at bottom of main */}
        <div className="mt-auto pt-4 bg-obsidian/80 backdrop-blur-sm">
          <form
            onSubmit={handleSubmit}
            className="relative flex items-center"
          >
            <input
              value={input}
              onChange={handleInputChange}
              placeholder="Message AI Preetam..."
              className="w-full bg-midnight border border-white/10 rounded-2xl px-6 py-4 pr-16 text-pearl focus:outline-none focus:ring-1 focus:ring-cyan-electric shadow-2xl"
            />
            <Button 
              type="submit" 
              size="icon" 
              className="absolute right-2 h-10 w-10 rounded-xl"
              disabled={isLoading || !input.trim()}
            >
              <Send className="h-5 w-5" />
            </Button>
          </form>
          <p className="mt-3 text-[10px] text-center text-whisper uppercase tracking-widest">
            Always verify important details with Preetam directly.
          </p>
        </div>
      </main>
    </div>
  );
}

function QuickLink({ text, onClick }: { text: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="text-xs text-mist hover:text-cyan-electric border border-white/5 bg-white/5 px-4 py-2 rounded-lg transition-colors text-left"
    >
      {text}
    </button>
  );
}
