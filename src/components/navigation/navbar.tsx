"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Deployments", href: "/deployments" },
  { name: "NervaPack", href: "/nervapack" },
  { name: "Playbook", href: "/playbook" },
  { name: "Writing", href: "/writing" },
  { name: "About", href: "/about" },
  { name: "Now", href: "/now" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);
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
          <Button asChild variant="outline" size="sm">
            <Link href="/contact">
              Contact
            </Link>
          </Button>
        </nav>

        <div className="flex md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <motion.nav
          id="mobile-navigation"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-t border-white/5 bg-obsidian/95 px-6 py-5 shadow-2xl"
        >
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "rounded-md px-3 py-3 text-base font-medium transition-colors",
                  pathname === item.href
                    ? "bg-cyan-electric/10 text-cyan-electric"
                    : "text-mist hover:bg-white/5 hover:text-pearl"
                )}
              >
                {item.name}
              </Link>
            ))}
            <Button asChild className="mt-3 w-full" size="lg">
              <Link href="/contact" onClick={() => setMobileOpen(false)}>Contact</Link>
            </Button>
          </div>
        </motion.nav>
      )}

      {isArticle && (
        <motion.div
          className="h-[2px] bg-cyan-electric origin-left"
          style={{ scaleX }}
        />
      )}
    </header>
  );
}
