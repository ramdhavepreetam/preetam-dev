"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const statChips = [
  "15,247 prescriptions processed",
  "4 production AI systems shipped",
  "Full-stack · Agentic AI · AWS",
];

export function Hero() {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.15] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black,transparent)]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#6B5F4F_1px,transparent_1px),linear-gradient(to_bottom,#6B5F4F_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* Cyan glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-electric/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="max-w-4xl">
          {/* Profile photo */}
          <motion.div
            initial={{ opacity: 0.65, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <div className="relative h-16 w-16 rounded-full overflow-hidden ring-2 ring-cyan-electric/30 ring-offset-2 ring-offset-obsidian">
              <Image
                src="/preetam-profile.jpg"
                alt="Preetam Ramdhave"
                fill
                className="object-cover object-top"
                sizes="64px"
                priority
              />
            </div>
          </motion.div>

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0.65, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-cyan-electric/20 bg-cyan-electric/5 text-xs font-mono text-cyan-electric tracking-[0.2em] uppercase"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-electric animate-pulse" />
            Forward Deployed Engineer · Seattle, WA
          </motion.div>

          {/* Name */}
          <motion.p
            initial={{ opacity: 0.65, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="text-mist font-mono text-sm tracking-widest mb-4"
          >
            Preetam Ramdhave
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0.75, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-[5rem] font-serif italic text-pearl leading-[1.05] headline-italic"
          >
            I deploy AI where it{" "}
            <em>has to work.</em>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
              className="inline-block ml-2 h-[0.8em] w-[3px] bg-cyan-electric translate-y-[0.1em]"
            />
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0.7, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-mist leading-relaxed max-w-2xl"
          >
            Architecting resilient, agentic AI systems and cloud-native platforms for Fortune 500s and high-growth scaleups. 18 years of enterprise experience. Based in Seattle.
          </motion.p>

          {/* Stat chips */}
          <motion.div
            initial={{ opacity: 0.7, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            {statChips.map((chip) => (
              <span
                key={chip}
                className="text-xs font-mono text-whisper border border-cyan-electric/15 bg-cyan-electric/[0.03] px-3 py-1.5 rounded-full"
              >
                {chip}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0.7, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link href="/deployments">
              <Button size="lg">
                See deployments →
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="text-cyan-electric border-cyan-electric/30 hover:bg-cyan-electric/5">
                Available for engagements
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
