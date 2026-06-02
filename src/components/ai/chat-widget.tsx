"use client";

import * as React from "react";
import { useChat } from "@ai-sdk/react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const MAX_INPUT_CHARS = 800;
const MAX_USER_MESSAGES = 5;

const suggestedPrompts = [
  "What kind of FDE work does Preetam do?",
  "Show me his strongest AI deployment.",
  "Is he available for consulting?",
];

export function ChatWidget() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [clientError, setClientError] = React.useState("");
  const { messages, sendMessage, status, error } = useChat();
  const isLoading = status === "submitted" || status === "streaming";
  const userMessageCount = messages.filter((m) => m.role === "user").length;
  const reachedSessionLimit = userMessageCount >= MAX_USER_MESSAGES;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClientError("");
    setInput(e.target.value.slice(0, MAX_INPUT_CHARS));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || reachedSessionLimit) return;
    sendMessage({ text: input });
    setInput("");
  };

  const askSuggestedPrompt = (prompt: string) => {
    if (isLoading || reachedSessionLimit) return;
    setClientError("");
    sendMessage({ text: prompt });
  };

  const scrollRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      {/* Trigger */}
      <motion.div
        className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.3 }}
      >
        <AnimatePresence>
          {!isOpen && (
            <motion.span
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              className="text-[10px] font-mono text-whisper tracking-widest uppercase bg-obsidian/80 border border-white/10 px-2 py-1 rounded"
            >
              Ask me
            </motion.span>
          )}
        </AnimatePresence>
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "h-14 w-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300",
            "bg-cyan-electric text-obsidian",
            "ring-2 ring-cyan-electric/30 ring-offset-2 ring-offset-obsidian",
            isOpen && "ring-cyan-electric/60"
          )}
        >
          {isOpen ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
        </motion.button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[90vw] md:w-[400px] h-[520px] flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-white/8"
            style={{ background: "rgba(14,12,9,0.97)", backdropFilter: "blur(20px)" }}
          >
            {/* Amber top accent line */}
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-electric/60 to-transparent shrink-0" />

            {/* Header */}
            <div className="px-5 py-4 border-b border-white/8 flex items-center justify-between shrink-0"
              style={{ background: "rgba(31,27,22,0.6)" }}>
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-cyan-electric/15 border border-cyan-electric/30 flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-cyan-electric" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-pearl leading-none mb-0.5">Ask Preetam</p>
                  <p className="text-[10px] font-mono text-whisper tracking-wide">Powered by Claude · 5 questions</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="h-7 w-7 rounded-full flex items-center justify-center text-whisper hover:text-pearl hover:bg-white/8 transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-5 space-y-4">

              {/* Empty state */}
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full gap-5 text-center px-4">
                  <div className="h-12 w-12 rounded-full bg-cyan-electric/10 border border-cyan-electric/20 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-cyan-electric" />
                  </div>
                  <p className="text-sm text-mist max-w-[240px] leading-relaxed">
                    Ask about production AI deployments, FDE fit, architecture, or availability.
                  </p>
                  <div className="w-full space-y-2">
                    {suggestedPrompts.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => askSuggestedPrompt(prompt)}
                        disabled={isLoading || reachedSessionLimit}
                        className="w-full text-left text-xs text-mist px-4 py-2.5 rounded-lg border-l-2 border-cyan-electric/30 bg-white/[0.04] hover:bg-white/[0.07] hover:border-cyan-electric/60 hover:text-pearl transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Message bubbles */}
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={cn("flex w-full", m.role === "user" ? "justify-end" : "justify-start")}
                >
                  {m.role === "user" ? (
                    <div className="max-w-[78%] bg-cyan-electric text-obsidian rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm font-medium leading-relaxed">
                      {m.parts.map((part, i) =>
                        part.type === "text" ? <p key={i}>{part.text}</p> : null
                      )}
                    </div>
                  ) : (
                    <div className="max-w-[82%] border-l-2 border-cyan-electric/35 bg-white/[0.05] rounded-r-2xl px-4 py-2.5 text-sm text-pearl leading-relaxed">
                      {m.parts.map((part, i) =>
                        part.type === "text" ? <p key={i}>{part.text}</p> : null
                      )}
                    </div>
                  )}
                </div>
              ))}

              {/* Loading */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="border-l-2 border-cyan-electric/35 bg-white/[0.05] rounded-r-2xl px-4 py-3">
                    <div className="flex gap-1.5 items-center">
                      <div className="h-1.5 w-1.5 bg-cyan-electric rounded-full animate-bounce" />
                      <div className="h-1.5 w-1.5 bg-cyan-electric rounded-full animate-bounce [animation-delay:0.15s]" />
                      <div className="h-1.5 w-1.5 bg-cyan-electric rounded-full animate-bounce [animation-delay:0.3s]" />
                    </div>
                  </div>
                </div>
              )}

              {/* Limit / error */}
              {(clientError || error || reachedSessionLimit) && (
                <div className="border-l-2 border-cyan-electric/30 bg-cyan-electric/[0.06] rounded-r-lg px-4 py-3 text-xs text-mist leading-relaxed">
                  {clientError ||
                    error?.message ||
                    "Session limit reached. For deeper questions, use the contact page."}
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="px-4 pb-4 pt-3 border-t border-white/8 shrink-0"
              style={{ background: "rgba(31,27,22,0.5)" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <input
                  value={input}
                  onChange={handleInputChange}
                  placeholder={reachedSessionLimit ? "Session limit reached" : "Ask a portfolio question..."}
                  disabled={reachedSessionLimit}
                  maxLength={MAX_INPUT_CHARS}
                  className="flex-1 rounded-xl border border-white/12 bg-white/[0.06] px-4 py-2.5 text-sm text-pearl placeholder:text-whisper focus:outline-none focus:ring-1 focus:ring-cyan-electric/40 focus:border-cyan-electric/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim() || reachedSessionLimit}
                  className="h-10 w-10 rounded-xl bg-cyan-electric text-obsidian flex items-center justify-center hover:bg-cyan-electric/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all shrink-0"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-whisper">Portfolio questions only</span>
                <span className="text-[10px] font-mono text-whisper">{input.length}/{MAX_INPUT_CHARS}</span>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
