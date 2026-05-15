import Link from "next/link";
import { Mail } from "lucide-react";
import { Github, Linkedin, Twitter } from "@/components/icons/social-icons";

const socialLinks = [
  { icon: Github, href: "https://github.com/ramdhavepreetam", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/preetam-ramdhave", label: "LinkedIn" },
  { icon: Twitter, href: "https://x.com/preetamramdhave", label: "X" },
  { icon: Mail, href: "mailto:hello@preetam.dev", label: "Email" },
];

export function Footer() {
  return (
    <footer className="w-full border-t border-white/5 bg-obsidian py-12">
      <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start space-y-2">
          <span className="text-lg font-serif italic text-pearl">
            Preetam Ramdhave
          </span>
          <p className="text-sm text-whisper">
            © {new Date().getFullYear()} — Applied AI · Production deployments · Seattle.
          </p>
        </div>

        <div className="flex space-x-6">
          {socialLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-mist hover:text-cyan-electric transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <link.icon className="h-5 w-5" />
              <span className="sr-only">{link.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
