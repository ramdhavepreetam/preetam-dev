"use client";

import * as React from "react";
import { useChat } from "@ai-sdk/react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
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
                <div className="flex h-full flex-col items-center justify-center space-y-4 text-center">
                  <Sparkles className="h-8 w-8 text-cyan-electric" />
                  <p className="max-w-[260px] text-sm text-mist">
                    Ask about Preetam&apos;s production AI work, FDE fit, architecture, or availability.
                  </p>
                  <div className="grid w-full gap-2">
                    {suggestedPrompts.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => askSuggestedPrompt(prompt)}
                        className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-left text-xs text-whisper transition-colors hover:border-cyan-electric/30 hover:text-pearl disabled:cursor-not-allowed disabled:opacity-50"
                        disabled={isLoading || reachedSessionLimit}
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
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
              {(clientError || error || reachedSessionLimit) && (
                <div className="rounded-lg border border-cyan-electric/20 bg-cyan-electric/5 p-3 text-xs leading-relaxed text-mist">
                  {clientError ||
                    error?.message ||
                    "This chat reached its short-session limit. For deeper questions, use the contact page."}
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="space-y-2 border-t border-white/5 bg-midnight p-4"
            >
              <div className="flex items-center space-x-2">
                <input
                  value={input}
                  onChange={handleInputChange}
                  placeholder={reachedSessionLimit ? "Session limit reached" : "Ask a portfolio question..."}
                  className="flex-1 rounded-md border border-white/10 bg-obsidian px-3 py-2 text-sm text-pearl focus:outline-none focus:ring-1 focus:ring-cyan-electric disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={reachedSessionLimit}
                  maxLength={MAX_INPUT_CHARS}
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={isLoading || !input.trim() || reachedSessionLimit}
                  onClick={() => {
                    if (input.length > MAX_INPUT_CHARS) {
                      setClientError(`Please keep questions under ${MAX_INPUT_CHARS} characters.`);
                    }
                  }}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between text-[10px] text-whisper">
                <span>Portfolio questions only</span>
                <span>{input.length}/{MAX_INPUT_CHARS}</span>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
