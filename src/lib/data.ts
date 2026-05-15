export const projects = [
  {
    title: "Agentic AI Document Review",
    description:
      "First-of-its-kind production agentic AI workflow for a Fortune 500 enterprise. Embedded with the document review team, identified that reviewers were burning significant hours per week on repetitive policy checks. Designed and shipped an event-driven pipeline: API Gateway → Step Functions → parallel Lambda tools (PDF parsing, chunk planning, classification, policy validation) → RAG grounding on AWS Kendra GenAI Index. Every output traceable via correlation IDs for compliance audits.",
    slug: "agentic-doc-review",
    image: "/projects/agentic-review.jpg",
    tags: ["AWS Bedrock", "Step Functions", "Kendra GenAI", "RAG", "Lambda", "Python"],
    metrics: "60–80% effort reduction",
    featured: true,
    domain: "Enterprise AI",
  },
  {
    title: "ScholarPath",
    description:
      "Ed-tech platform for Maharashtra MSCE scholarship exam prep, built from a gap discovered by embedding with parents and exam coordinators in the scholarship ecosystem. Parent-as-gateway model with child profiles, tiered access, and 124-test end-to-end testing plan. Generically extensible exam-category configuration enables rapid expansion to new exam verticals. Supabase MCP integration with Claude Code for AI-assisted delivery.",
    slug: "scholarpath",
    image: "/projects/scholarpath.jpg",
    tags: ["React", "TypeScript", "FastAPI", "Supabase", "Razorpay", "MCP"],
    metrics: "1,000+ Students",
    featured: true,
    domain: "Ed-Tech",
    url: "https://scholarpath-app.web.app/",
  },
  {
    title: "OmmSai — Healthcare AI Pipeline",
    description:
      "Open-source LLM document pipeline built for a charitable healthcare event. Embedded with the organizer who needed to digitize 15,000+ handwritten prescription PDFs into structured data — manual transcription was impossible in the available timeframe. Built a Python pipeline using Claude Sonnet (Anthropic API), Google Drive API, ThreadPoolExecutor for concurrency, and a Tkinter operator GUI. All 15,000+ prescriptions processed in 48 hours under real production volume.",
    slug: "ommsai",
    image: "/projects/ommsai.jpg",
    tags: ["Python", "Claude API", "Google Drive API", "ThreadPoolExecutor", "Tkinter"],
    metrics: "15,000+ PDFs · 48 hrs",
    featured: true,
    domain: "Healthcare AI",
    github: "https://github.com/ramdhavepreetam/OmmSai",
  },
  {
    title: "Secure Vendor Integration Platform",
    description:
      "Cross-account S3-based file distribution platform for a Fortune 500 parts & pricing business unit. Identified that ad-hoc file delivery created security risk and slow partner onboarding. Architected with AWS Transfer Family (SFTP), TLS-only bucket policies, KMS encryption, and home-directory isolation per partner. Authored reusable vendor onboarding documentation now used as the team's standard pattern.",
    slug: "vendor-platform",
    image: "/projects/vendor.jpg",
    tags: ["AWS S3", "Transfer Family", "KMS", "IAM", "Python", "Lambda"],
    metrics: "Partner onboarding standardized",
    featured: false,
    domain: "Enterprise",
  },
  {
    title: "JapaApp",
    description:
      "Spiritual mantra-tracking PWA built for practitioners of Vedic disciplines. Originally architected on AWS (Lambda, RDS Proxy, Cognito JWT, SAM) before owning the platform-migration decision to Firebase. Implemented global admin via Firebase Custom Claims and Razorpay subscription/donation flow with tiered pricing.",
    slug: "japaapp",
    image: "/projects/japaapp.jpg",
    tags: ["React 18", "TypeScript", "Firebase", "Framer Motion", "Razorpay", "PWA"],
    metrics: "~85% Complete",
    featured: false,
    domain: "Spiritual-Tech",
    url: "https://dojapa.com/",
  },
  {
    title: "Trading System",
    description:
      "Automated IBKR futures trading system with vertical spread options strategies, NLP command parsing for natural-language order entry, and a React dashboard for monitoring. Built for production with Python ib_insync integration and real-time position management.",
    slug: "trading-system",
    image: "/projects/trading.jpg",
    tags: ["Python", "ib_insync", "React", "NLP", "Fintech"],
    metrics: "Production Ready",
    featured: false,
    domain: "Fintech",
  },
];

export const outcomes = [
  {
    number: "17+",
    unit: "Years",
    description: "Shipping production systems end-to-end — UK enterprise clients, Fortune 500, solo founder products.",
  },
  {
    number: "60–80%",
    unit: "Reduction",
    description: "Manual review effort eliminated via the org's first production agentic AI workflow.",
  },
  {
    number: "15,000+",
    unit: "PDFs",
    description: "Handwritten prescriptions processed in 48 hours at a charitable healthcare event.",
  },
  {
    number: "3×",
    unit: "Awards",
    description: "\"Delighted Customer\" awards (2012–2014) voted by UK enterprise clients for direct impact.",
  },
];

export const howIWork = [
  {
    step: "01",
    title: "Embed",
    description: "Sit with the customer — external client, internal department, or end user. Watch how they actually work.",
  },
  {
    step: "02",
    title: "Discover",
    description: "Find the real problem. It is almost never the stated problem.",
  },
  {
    step: "03",
    title: "Design",
    description: "Architect the solution that fits the customer's reality — their data, their systems, their team, their security posture.",
  },
  {
    step: "04",
    title: "Ship",
    description: "Build it end-to-end. Backend, frontend, infra, security, observability. No handoffs.",
  },
  {
    step: "05",
    title: "Operate & Iterate",
    description: "Stay with it after launch. Watch the customer use it. Iterate on what the field teaches.",
  },
  {
    step: "06",
    title: "Generalize",
    description: "Turn one customer's win into a reusable pattern the rest of the org can leverage.",
  },
];
