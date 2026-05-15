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
    default: "Preetam Ramdhave | Forward Deployed Engineer",
    template: "%s | Preetam Ramdhave",
  },
  description: "I deploy AI where it has to work — production deployments inside real customer environments. Claude API, AWS, full-stack. Based in Seattle.",
  openGraph: {
    title: "Preetam Ramdhave | Forward Deployed Engineer",
    description: "I deploy AI where it has to work — production deployments inside real customer environments. Claude API, AWS, full-stack. Based in Seattle.",
    url: "https://preetamr.com",
    siteName: "Preetam Ramdhave",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Preetam Ramdhave | Forward Deployed Engineer",
    description: "I deploy AI where it has to work.",
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
  themeColor: "#0E0C09",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Preetam Ramdhave",
  jobTitle: "Forward Deployed Engineer",
  description: "I deploy AI where it has to work — production deployments inside real customer environments. Claude API, AWS, full-stack. Based in Seattle.",
  url: "https://preetamr.com",
  image: "https://preetamr.com/preetam-profile.jpg",
  email: "mailto:ramdhavepreetam@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Renton",
    addressRegion: "WA",
    addressCountry: "US",
  },
  sameAs: [
    "https://linkedin.com/in/preetam-ramdhave",
    "https://github.com/ramdhavepreetam",
    "https://x.com/preetamramdhave",
  ],
  knowsAbout: [
    "Agentic AI", "Forward Deployed Engineering", "AWS", "Claude API",
    "RAG", "Production AI Systems", "Full-Stack Development",
  ],
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-obsidian text-pearl selection:bg-cyan-electric/30">
        {children}
      </body>
    </html>
  );
}
