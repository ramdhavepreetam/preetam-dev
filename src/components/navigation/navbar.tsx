"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Deployments", href: "/deployments" },
  { name: "Playbook", href: "/playbook" },
  { name: "Writing", href: "/writing" },
  { name: "About", href: "/about" },
  { name: "Now", href: "/now" },
];

export function Navbar() {
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const isArticle = pathname.startsWith("/writing/");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-obsidian/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="group flex items-center space-x-2">
          <span className="text-xl font-serif italic text-pearl group-hover:text-cyan-electric transition-colors">
            Preetam<span className="text-cyan-electric">.</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-cyan-electric",
                pathname === item.href ? "text-cyan-electric" : "text-mist"
              )}
            >
              {item.name}
            </Link>
          ))}
          <Link href="/contact">
            <Button variant="outline" size="sm">
              Contact
            </Button>
          </Link>
        </nav>

        {/* Mobile menu would go here - simplified for now */}
        <div className="flex md:hidden">
          {/* Add mobile trigger */}
        </div>
      </div>

      {isArticle && (
        <motion.div
          className="h-[2px] bg-cyan-electric origin-left"
          style={{ scaleX }}
        />
      )}
    </header>
  );
}
