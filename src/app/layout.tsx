import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Preetam Ramdhave | AI Builder & Entrepreneur",
    template: "%s | Preetam Ramdhave",
  },
  description: "I build AI-powered products that ship — from ed-tech platforms to healthcare automation. Based in Seattle.",
  openGraph: {
    title: "Preetam Ramdhave | AI Builder & Entrepreneur",
    description: "I build AI-powered products that ship — from ed-tech platforms to healthcare automation. Based in Seattle.",
    url: "https://preetam.dev",
    siteName: "Preetam Ramdhave",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Preetam Ramdhave | AI Builder & Entrepreneur",
    description: "I build AI-powered products that ship.",
    creator: "@preetamramdhave",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0E16",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} ${geistMono.variable} h-full antialiased selection:bg-cyan-electric/30 selection:text-cyan-electric`}
    >
      <body className="min-h-full flex flex-col bg-obsidian text-pearl selection:bg-cyan-electric/30">
        {children}
      </body>
    </html>
  );
}
