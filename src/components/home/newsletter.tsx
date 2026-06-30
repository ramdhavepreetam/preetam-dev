"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

type SubscribeState = "idle" | "loading" | "success" | "error";

export function Newsletter() {
  const [email, setEmail] = React.useState("");
  const [state, setState] = React.useState<SubscribeState>("idle");
  const [message, setMessage] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("loading");
    setMessage("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "homepage-field-notes" }),
      });
      const data = (await response.json()) as { message?: string; error?: string };

      if (!response.ok) {
        throw new Error(data.error || "Subscription failed. Please try again.");
      }

      setState("success");
      setMessage(data.message || "You are subscribed.");
      setEmail("");
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Subscription failed. Please try again.");
    }
  };

  const isLoading = state === "loading";

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
              onChange={(e) => {
                setEmail(e.target.value);
                if (state !== "loading") {
                  setState("idle");
                  setMessage("");
                }
              }}
              disabled={isLoading}
              className="flex-1 bg-obsidian border border-white/10 rounded-lg px-6 py-4 text-pearl focus:outline-none focus:ring-1 focus:ring-cyan-electric disabled:cursor-not-allowed disabled:opacity-60"
            />
            <Button size="lg" type="submit" disabled={isLoading}>
              {isLoading ? "Subscribing" : "Subscribe"}
              <Send className="ml-2 h-4 w-4" />
            </Button>
          </form>

          {message && (
            <p
              className={
                state === "error"
                  ? "mt-5 text-sm text-coral"
                  : "mt-5 text-sm text-code-green"
              }
              role="status"
              aria-live="polite"
            >
              {message}
            </p>
          )}

          <p className="mt-6 text-xs text-whisper">
            No spam. Just code, AI, and entrepreneurship. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
