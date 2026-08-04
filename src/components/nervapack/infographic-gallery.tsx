"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

type Infographic = {
  src: string;
  title: string;
  caption: string;
  width: number;
  height: number;
};

const infographics: Infographic[] = [
  {
    src: "/nervapack-how-it-works.png",
    title: "How NervaPack works",
    caption: "High-level flow: ingest, build graph, bi-temporal memory, query, AI agent output.",
    width: 1122,
    height: 1402,
  },
  {
    src: "/nervapack-detailed-flow.png",
    title: "The six-step pipeline",
    caption: "Ingest, parse & build graph, store memory, link code ↔ memory, query smart context, deliver to agents.",
    width: 1448,
    height: 1086,
  },
  {
    src: "/nervapack-system-model.png",
    title: "System model & architecture",
    caption: "Core engine, bi-temporal memory, code ↔ memory bridge, dev-ops sync, and the dual MCP server suite.",
    width: 1024,
    height: 1536,
  },
  {
    src: "/nervapack-at-a-glance.png",
    title: "NervaPack at a glance",
    caption: "Benchmarks: 91.2% average token reduction, 96% recall on SWE-bench Lite, and per-developer cost savings.",
    width: 1536,
    height: 1024,
  },
  {
    src: "/nervapack-audience.png",
    title: "Who can use NervaPack",
    caption: "Built for developers, AI/ML engineers, tech leads, dev teams, OSS maintainers, and enterprises.",
    width: 1536,
    height: 1024,
  },
];

export function InfographicGallery() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const close = React.useCallback(() => setOpenIndex(null), []);
  const show = React.useCallback(
    (dir: 1 | -1) =>
      setOpenIndex((current) => {
        if (current === null) return current;
        return (current + dir + infographics.length) % infographics.length;
      }),
    []
  );

  React.useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") show(1);
      if (e.key === "ArrowLeft") show(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex, close, show]);

  const active = openIndex === null ? null : infographics[openIndex];

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2">
        {infographics.map((item, index) => (
          <button
            key={item.src}
            type="button"
            onClick={() => setOpenIndex(index)}
            className="group glass relative block overflow-hidden rounded-xl border border-white/5 text-left transition-colors hover:border-cyan-electric/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-electric/50"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-midnight">
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-transparent" />
              <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-white/10 bg-obsidian/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-whisper backdrop-blur transition-colors group-hover:text-cyan-electric">
                <ZoomIn className="h-3 w-3" /> Zoom
              </span>
            </div>
            <div className="p-5">
              <h3 className="mb-1 font-serif text-lg italic text-pearl">{item.title}</h3>
              <p className="text-sm leading-relaxed text-mist">{item.caption}</p>
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex flex-col bg-obsidian/90 p-4 backdrop-blur-sm sm:p-8"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
          >
            <div className="flex items-center justify-between gap-4 pb-4">
              <div className="min-w-0">
                <p className="truncate font-serif text-lg italic text-pearl">{active.title}</p>
                <p className="truncate text-xs text-whisper">
                  {(openIndex ?? 0) + 1} / {infographics.length} · {active.caption}
                </p>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="shrink-0 rounded-full border border-white/10 bg-obsidian/60 p-2 text-mist transition-colors hover:text-cyan-electric"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative flex flex-1 items-center justify-center overflow-hidden">
              <button
                type="button"
                aria-label="Previous"
                onClick={(e) => {
                  e.stopPropagation();
                  show(-1);
                }}
                className="absolute left-0 z-10 rounded-full border border-white/10 bg-obsidian/60 p-2 text-mist transition-colors hover:text-cyan-electric"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <motion.div
                key={active.src}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="relative flex h-full w-full items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={active.src}
                  alt={active.title}
                  width={active.width}
                  height={active.height}
                  className="max-h-full w-auto max-w-full rounded-lg object-contain shadow-2xl"
                  priority
                />
              </motion.div>

              <button
                type="button"
                aria-label="Next"
                onClick={(e) => {
                  e.stopPropagation();
                  show(1);
                }}
                className="absolute right-0 z-10 rounded-full border border-white/10 bg-obsidian/60 p-2 text-mist transition-colors hover:text-cyan-electric"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
