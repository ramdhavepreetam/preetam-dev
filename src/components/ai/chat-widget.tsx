"use client";

import * as React from "react";
import { useChat } from "@ai-sdk/react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ChatWidget() {
  const [isOpen, setIsOpen] = React.useState(false);
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
    <>
      {/* Trigger Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="h-14 w-14 rounded-full bg-cyan-electric text-obsidian shadow-lg hover:bg-cyan-electric/90"
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[90vw] md:w-[400px] h-[500px] flex flex-col glass rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="p-4 bg-midnight border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-full bg-cyan-electric/20 flex items-center justify-center">
                  <Bot className="h-5 w-5 text-cyan-electric" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-pearl leading-none">Ask Preetam</h3>
                  <span className="text-[10px] text-mist">Powered by Claude Haiku</span>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin"
            >
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-2 opacity-50">
                  <Sparkles className="h-8 w-8 text-cyan-electric" />
                  <p className="text-sm text-mist">
                    Ask me anything about Preetam&apos;s work, tech stack, or background.
                  </p>
                </div>
              )}
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={cn(
                    "flex w-full",
                    m.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl p-3 text-sm",
                      m.role === "user"
                        ? "bg-cyan-electric text-obsidian rounded-tr-none"
                        : "bg-midnight text-pearl border border-white/5 rounded-tl-none"
                    )}
                  >
                    {m.parts.map((part, i) => (
                      part.type === 'text' ? <p key={i}>{part.text}</p> : null
                    ))}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-midnight rounded-2xl rounded-tl-none p-3 border border-white/5">
                    <div className="flex space-x-1">
                      <div className="h-1.5 w-1.5 bg-cyan-electric rounded-full animate-bounce" />
                      <div className="h-1.5 w-1.5 bg-cyan-electric rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="h-1.5 w-1.5 bg-cyan-electric rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="p-4 bg-midnight border-t border-white/5 flex items-center space-x-2"
            >
              <input
                value={input}
                onChange={handleInputChange}
                placeholder="Ask a question..."
                className="flex-1 bg-obsidian border border-white/10 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-electric text-pearl"
              />
              <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
