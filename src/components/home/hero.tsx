"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const roles = [
  "Forward Deployed Engineer.",
  "AI Agent Architect.",
  "AWS Solutions Architect.",
  "Full-Stack Engineer.",
];

export function Hero() {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative pt-32 pb-24 overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.15] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black,transparent)]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#5A6478_1px,transparent_1px),linear-gradient(to_bottom,#5A6478_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* Cyan glow blob */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-electric/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="max-w-4xl">
          {/* Experience badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-cyan-electric/20 bg-cyan-electric/5 text-xs font-mono text-cyan-electric tracking-wider uppercase"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-electric animate-pulse" />
            17+ Years · Enterprise · Founder · Renton, WA
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-6xl md:text-8xl font-serif italic text-pearl leading-[1.05]"
          >
            Preetam Ramdhave
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
              className="inline-block ml-1 h-[0.8em] w-[4px] bg-cyan-electric translate-y-[0.1em]"
            />
          </motion.h1>

          <div className="mt-6 h-10">
            <AnimatePresence mode="wait">
              <motion.p
                key={roles[index]}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="text-2xl md:text-3xl text-cyan-electric font-medium"
              >
                {roles[index]}
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 text-lg md:text-xl text-mist leading-relaxed max-w-2xl"
          >
            I embed with the customer, find the real problem, build it end-to-end, and ship it.
            Enterprise AI workflows at Fortune 500 scale. Production founder products across four domains.
            17+ years of the same motion — the customer changes, the craft does not.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link href="/work">
              <Button size="lg">
                View Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg">
                Read My Story
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="ghost" size="lg" className="text-mist hover:text-pearl">
                Get in Touch
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
