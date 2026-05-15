export type Metric = { value: string; label: string; sub?: string };
export type ArchDecision = { what: string; chosen: string; rejected?: string; why: string };

export type CaseStudy = {
  headline: string;
  customer: string;
  timeline: string;
  status: string;
  capabilityTags: string[];
  customerContext: string;
  problem: string;
  constraints: string[];
  architectureDecisions: ArchDecision[];
  hardProblem: string;
  fix: string;
  productionReality?: string;
  outcomeMetrics: Metric[];
  lessons: string[];
  relatedSlugs: string[];
};

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
    caseStudy: {
      headline: "60–80% reduction in manual document review effort — Fortune 500's first production agentic AI workflow.",
      customer: "Fortune 500 Industrial Manufacturing Enterprise (PPD Division)",
      timeline: "2025–2026 · Current",
      status: "Shipped — running in production",
      capabilityTags: ["Agentic AI", "Enterprise", "RAG", "Production"],
      customerContext:
        "A Fortune 500 industrial manufacturer's product documentation division reviews hundreds of high-stakes customer-facing documents per month — product specifications, compliance reports, technical manuals — against a Style Guide and a Quality Review Rubric. The reviewers are domain experts, not engineers. They were doing this entirely manually: open the document, read against the rubric, flag issues, repeat for 200+ pages. The inconsistency across reviewers created audit-grade rework loops. Leadership knew they had a problem. Nobody had shipped a fix.",
      problem:
        "The ask was vague: 'can AI help with document review?' The real problem had three parts: (1) reviewers were burning hours per week on mechanical, repeatable policy checks that didn't require their domain expertise; (2) reviewer inconsistency meant the same document could get different results on different days; (3) findings had to be fully auditable — every flag traceable to a page number and a specific standards reference — because these documents affected customer experience and had compliance implications.",
      constraints: [
        "Enterprise security posture: SSE-KMS encryption at rest, IAM least-privilege, no external data transmission — document content cannot leave the AWS account boundary",
        "Full auditability: every finding must be traceable to page number, standard type (Style Guide vs Rubric), and a specific excerpt — no black-box output",
        "Existing Kendra GenAI index: the standards knowledge base already existed and was managed externally — read-only, no modification",
        "No database: org constraint — S3 is the system of record for all pipeline artifacts",
        "200+ page PDFs: large documents requiring chunked processing with guaranteed coverage",
        "Deterministic, reproducible output: temperature=0.0, strict JSON schema — same document must produce the same findings across runs",
        "Volunteer-friendly failure handling: a FAILED manifest must exist even on terminal failure so operations teams can triage without digging through logs",
      ],
      architectureDecisions: [
        {
          what: "Orchestration engine",
          chosen: "AWS Step Functions Standard workflow",
          rejected: "Step Functions Express / direct Lambda chain",
          why: "Standard workflows provide durable execution history — every state transition is logged and queryable. For a compliance-grade system, the audit trail of the orchestration layer matters as much as the output.",
        },
        {
          what: "Processing stages",
          chosen: "5 modular Lambda functions (pdf_extract → chunk_plan → kendra_retrieve → bedrock_review → aggregate_render)",
          rejected: "Monolithic Lambda",
          why: "Each stage is independently testable, deployable, and reusable. pdf_extract can be tested against a corpus of PDFs without touching the LLM layer. bedrock_review can be tested with canned Kendra results. Decomposition was the only path to reliable production.",
        },
        {
          what: "State persistence",
          chosen: "S3 with deterministic key layout: jobs/{jobId}/pages/{NNNN}.json, findings/chunk-*.json, outputs/report.csv, manifest.json",
          rejected: "DynamoDB or RDS for intermediate state",
          why: "S3 as system of record eliminates an entire class of operational complexity. Any job can be replayed from any stage by re-running from the relevant artifact. Debugging means reading a file, not querying a database under pressure.",
        },
        {
          what: "LLM model selection",
          chosen: "Claude 3.5 Haiku via Amazon Bedrock at temperature=0.0",
          rejected: "Claude 3.5 Sonnet",
          why: "Haiku at temp=0.0 delivered equivalent compliance-review quality at significantly lower cost per chunk, with more predictable latency for large parallel Map states. Deterministic temperature was non-negotiable for reproducible audit output.",
        },
        {
          what: "Output validation",
          chosen: "Strict JSON schema enforcement + one repair attempt with a dedicated repair prompt",
          rejected: "Retry with identical prompt / accept partial output",
          why: "A single repair attempt with a different prompt surface catches most formatting failures without creating infinite retry loops. If both attempts fail, the chunk is marked failed and the coverage gate catches it at aggregation — no silent partial reports.",
        },
      ],
      hardProblem:
        "Claude was producing structurally invalid JSON on ambiguous policy sections — not hallucinating content, but hallucinating structure. When a rubric item was genuinely unclear, the model would add prose commentary outside the JSON envelope. The initial design had no way to distinguish 'valid finding' from 'model commentary masquerading as JSON'. The coverage gate didn't exist yet, so partial chunk outputs were silently passing through to the final report.",
      fix:
        "Two changes. First: strict JSON schema validation on every bedrock_review output, with exactly one repair call using a dedicated repair prompt that explicitly re-states the schema contract and shows the malformed output back to the model. Second: coverage gating at aggregate_render — the stage reads the chunk plan and verifies every planned chunk produced a findings artifact before rendering the CSV. A missing artifact is a terminal failure, not a warning. A FAILED manifest is written before the workflow terminates so operations always has a durable failure record.",
      productionReality:
        "The coverage gate wasn't in the initial design. It was added after a partial report completed without flagging missing chunks — the report looked complete but wasn't. The S3 deterministic key layout saved the recovery: we could identify exactly which chunk artifacts were missing by diffing the plan.json against the findings/ prefix. That experience hardened the rule: the plan is the contract; aggregation validates against it before producing any output.",
      outcomeMetrics: [
        { value: "60–80%", label: "Effort reduction", sub: "Manual review hours eliminated" },
        { value: "200+", label: "Pages per job", sub: "End-to-end automated review" },
        { value: "100%", label: "Coverage guaranteed", sub: "Coverage gating at aggregation" },
        { value: "0", label: "External transmissions", sub: "All compute stays in-account" },
      ],
      lessons: [
        "Coverage gates prevent the silent partial failure mode — if the plan says 50 chunks, the aggregator must see 50 findings artifacts or refuse to produce output",
        "temperature=0.0 + strict JSON schema enforcement is the minimum viable setup for auditable LLM output in an enterprise context",
        "S3 deterministic key layout beats any database for pipeline state when your primary operations need are replay, audit, and debugging",
        "Decompose Lambda stages early — every boundary is a test seam; monolithic pipelines become untestable under production pressure",
        "Write the failure manifest before the success path — operations teams will need it more than the happy path",
        "The modular Lambda patterns from this deployment are now reference architecture across the division — generalization is a deliverable, not a bonus",
      ],
      relatedSlugs: ["vendor-platform", "ommsai"],
    } satisfies CaseStudy,
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
    caseStudy: {
      headline: "Multi-tenant SaaS for India's scholarship exam market — live with 1,000+ students.",
      customer: "Maharashtra MSCE scholarship exam market — parents, students, exam coordinators",
      timeline: "2024–Present",
      status: "Live in production",
      capabilityTags: ["Full-Stack", "SaaS", "Production"],
      customerContext:
        "The Maharashtra MSCE scholarship exam is a high-stakes test for students in classes 5 and 8. Parents in this market are deeply invested in their child's preparation but have no structured digital tool — exam prep is fragmented across WhatsApp groups, photocopied question papers, and individual tutors. The parent is the decision-maker and the paying customer, but the student is the user. That distinction drives everything about the architecture.",
      problem:
        "The gap wasn't 'there's no app' — there were apps. The gap was: no app understood the parent-as-gateway model. Every existing tool gave children direct accounts. But in Maharashtra's scholarship ecosystem, parents manage preparation, parents pay, and parents need visibility into progress. The real problem was building an access model that matched how families actually work, not how SaaS companies assume they work.",
      constraints: [
        "Parent-as-gateway: parent owns the account and manages multiple child profiles — each child may have a different exam tier and access level",
        "Razorpay INR payments with webhook reliability in a market where payment failures are common",
        "Mobile-first for rural Maharashtra users on older Android devices with unreliable connectivity",
        "Generically extensible: the exam-category configuration must support rapid expansion to new exam verticals without re-architecting",
        "Live customer support during onboarding — real users, real issues, real iteration pressure",
      ],
      architectureDecisions: [
        {
          what: "Authentication and access model",
          chosen: "Parent-as-gateway: parent record owns all child sessions, child profiles inherit access from parent's tier",
          rejected: "Direct child authentication / per-child accounts",
          why: "Matches how families actually operate in this market. Simplified the threat model significantly — no child authentication surface. Supabase RLS policies scoped to parent_id rather than user_id per child.",
        },
        {
          what: "Exam configuration",
          chosen: "Generic exam-category configuration table — exam type, grade level, subject, question count, timer rules all configurable per category",
          rejected: "Hardcoded exam types",
          why: "MSCE is the launch vertical but not the only one. Every configuration parameter being data-driven means adding a new exam type is a database row, not a deployment.",
        },
        {
          what: "AI-assisted delivery",
          chosen: "Supabase MCP integration with Claude Code for content generation and AI-assisted development",
          rejected: "Manual content pipeline",
          why: "MCP server integration with Claude Code means content workflows run inside the development environment — schema-aware, context-aware, dramatically faster than a separate CMS.",
        },
      ],
      hardProblem:
        "Multi-tenant data isolation when one parent has multiple children with different access tiers — and the children are not paying users. Supabase Row Level Security was designed for single-user tenancy. Extending it to a parent-owns-children model required a custom access-control layer: every query scoped to the parent's subscription tier, with child profiles inheriting rather than holding their own access grants.",
      fix:
        "Rebuilt the permission model: parent record is the tenant root. Child profiles are owned rows under the parent, with no independent authentication. Access tier is resolved at query time from the parent's active subscription, propagated to child profile reads via a parent_id join. No child can access anything their parent hasn't paid for — and no parent can see another family's data.",
      productionReality:
        "Razorpay webhooks arrived multiple times for the same payment event. The initial payment handler wasn't idempotent — early users were seeing duplicate payment records. Added idempotency keys on the Razorpay order ID, with a processed_webhooks table to deduplicate before updating subscription state. Payment integration in a regulated market has more compliance edges than features.",
      outcomeMetrics: [
        { value: "1,000+", label: "Students", sub: "Active on the platform" },
        { value: "124", label: "E2E tests", sub: "Full test coverage plan" },
        { value: "3", label: "Exam verticals", sub: "Generically extensible config" },
        { value: "Live", label: "Status", sub: "Paying customers in production" },
      ],
      lessons: [
        "Match the access model to how the customer's family actually operates — not how SaaS assumes they operate",
        "Payment webhook idempotency is not optional in markets with unreliable payment infrastructure",
        "Generic configuration tables pay off immediately — the second exam vertical was two database rows and one afternoon",
        "MCP server integration with Claude Code is a legitimate force multiplier for content-heavy platforms",
        "Customer feedback in week 1 changes the spec faster than 6 months of planning",
      ],
      relatedSlugs: ["japaapp", "agentic-doc-review"],
    } satisfies CaseStudy,
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
    caseStudy: {
      headline: "15,247 handwritten prescription PDFs processed in 47.5 hours. Zero data loss. $0 infrastructure.",
      customer: "Sai Healthcare — charitable medical event organizer",
      timeline: "48-hour production window",
      status: "Shipped · Open-sourced",
      capabilityTags: ["Agentic AI", "Healthcare", "Open Source"],
      customerContext:
        "A charitable healthcare event serving thousands of patients needed to digitize 15,000+ handwritten prescription PDFs — patient name, medications, dosages, instructions — into structured JSON for downstream medical record processing. The event had a hard deadline: the data had to be processed before the event closed. Manual transcription by volunteers was mathematically impossible. The organizer had no engineering team, no cloud budget, and no tolerance for data loss on real patient records.",
      problem:
        "The ask was simple: 'process these PDFs.' The real problem had four parts. First: handwritten medical handwriting is notoriously illegible — some of these scans were borderline unreadable. Second: the LLM needed to be confident enough to be useful but calibrated enough to flag what it couldn't read. Third: volunteers — not engineers — were going to run this tool on laptops at the event venue. Fourth: the 48-hour deadline was the event itself. There was no 'we'll finish it next week.'",
      constraints: [
        "Hard 48-hour deadline — the event closes and the window closes with it",
        "Handwritten medical prescriptions — notoriously illegible, varying formats, multiple languages",
        "No fine-tuning budget and no cloud spend budget — free-tier APIs and local compute only",
        "Zero data loss tolerance — real patient medication records",
        "Non-engineer operators — Tkinter GUI required so volunteers could run it on any Windows laptop without a terminal",
        "API rate limits — Anthropic free tier throttles under production volume",
      ],
      architectureDecisions: [
        {
          what: "LLM model",
          chosen: "Claude Sonnet (Anthropic API) with structured JSON output schema",
          rejected: "GPT-4 / local Ollama models",
          why: "Claude's vision capabilities on handwritten text were measurably better in manual eval across 50 sample prescriptions. Ollama models at the available parameter count couldn't reliably extract medication dosages from degraded scans.",
        },
        {
          what: "Concurrency model",
          chosen: "ThreadPoolExecutor with 8 parallel workers",
          rejected: "Sequential processing / async/await",
          why: "8 workers saturated the free-tier rate limit without exceeding it. Sequential processing would have taken 6× longer. Async/await added complexity without benefit given the I/O-bound workload and the need for simple error isolation per prescription.",
        },
        {
          what: "Operator interface",
          chosen: "Tkinter desktop GUI with queue display, progress bar, and error log",
          rejected: "CLI / web interface",
          why: "Volunteers running on event-venue laptops. No terminal familiarity, no browser tab management, no server to host. Tkinter meant one executable, any Windows machine, no setup.",
        },
        {
          what: "Confidence gating",
          chosen: "Hold-out eval set of 200 known prescriptions, automated diff against ground truth, 0.85 confidence threshold → human review queue",
          rejected: "Accept all model output / manual spot-check",
          why: "The model was confident on prescriptions it shouldn't have been — hallucinating dosages on illegible scans. Eval-by-vibes wasn't going to work on patient medication data. The hold-out set revealed the calibration gap before it hit production.",
        },
      ],
      hardProblem:
        "Claude was hallucinating dosages on illegible scans — and doing so confidently. The model would read a smudged '5mg' as '50mg' and return a confidence score that looked fine. Eval-by-vibes on a sample wasn't catching this. The failure mode was not 'model refuses to answer' but 'model answers incorrectly with high apparent confidence.' On medication dosages, that's a patient safety issue.",
      fix:
        "Built an eval harness before deploying at volume: 200 prescriptions with known ground-truth extractions (manually verified), automated diff of model output against ground truth per field (patient name, medication, dosage, instructions), confidence threshold of 0.85 per field. Anything below threshold on any field routed to a human review queue displayed in the Tkinter GUI. Operators reviewed flagged records in real time. The eval harness ran in under 3 minutes on the hold-out set — enough to iterate the prompt before the full run.",
      productionReality:
        "API rate limiting hit harder than expected at production volume. The free tier throttles at a lower sustained rate than the burst rate, so the first hour looked fine — then throughput dropped. Added exponential backoff with jitter, and updated the Tkinter progress display to show 'rate-limited, retrying in Xs' so volunteers knew the system was working, not frozen. Without that display, they would have killed the process and restarted it, which would have corrupted the resume state.",
      outcomeMetrics: [
        { value: "15,247", label: "PDFs processed", sub: "All prescriptions in scope" },
        { value: "47.5 hrs", label: "Total time", sub: "Inside the 48-hour window" },
        { value: "99.97%", label: "Extraction accuracy", sub: "Validated against ground truth" },
        { value: "$0", label: "Infrastructure cost", sub: "Free-tier APIs only" },
      ],
      lessons: [
        "Write the spec before the code — 'process prescriptions' is not a spec; 'extract these 4 fields with this confidence threshold and route low-confidence to human review' is",
        "Build the eval harness before the feature — the 200-prescription hold-out set found the dosage hallucination problem in 3 minutes; finding it in production would have been a patient safety incident",
        "Plan for the failure mode you didn't think of — rate limiting at sustained volume is different from rate limiting at burst volume",
        "Operator UX is a production constraint, not a polish item — the Tkinter display that showed 'rate-limited, retrying' prevented volunteers from killing the process and corrupting resume state",
        "Customer reality beats demo polish, every time — a Tkinter app that works under event conditions is worth more than a beautiful web UI that requires a server",
      ],
      relatedSlugs: ["agentic-doc-review", "trading-system"],
    } satisfies CaseStudy,
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
    caseStudy: {
      headline: "Cross-account S3 file distribution platform — partner onboarding time cut from days to hours.",
      customer: "Fortune 500 Industrial Manufacturing Enterprise — Parts & Pricing Division, external vendor/dealer partners",
      timeline: "2025",
      status: "Shipped — running in production",
      capabilityTags: ["Enterprise", "Cloud Architecture", "Security"],
      customerContext:
        "The parts & pricing division distributes files — price lists, parts catalogs, compliance documents — to a network of external vendor and dealer partners. Before this system, delivery was ad-hoc: email attachments, shared drives, manual SFTP credentials managed in spreadsheets. Partners had inconsistent access, IT had no audit trail, and onboarding a new partner took days of back-and-forth across teams.",
      problem:
        "The stated ask was 'we need a better way to share files with partners.' The real problem was threefold: (1) the ad-hoc delivery model was a security risk — no isolation between partners, no encryption guarantee, no audit trail; (2) partner onboarding required manual intervention from multiple teams each time; (3) there was no reusable pattern — every new partner was a one-off configuration.",
      constraints: [
        "Partners use SFTP — they have existing tooling and cannot be asked to adopt a new protocol",
        "Cross-account access — partner AWS accounts must be able to pull from the distribution bucket without holding long-lived credentials in the enterprise account",
        "Per-partner data isolation — no partner can see another partner's files; home-directory isolation is required",
        "KMS encryption at rest — enterprise security policy",
        "Automated file generation — the pricing pipeline that generates source files must push to the distribution system without manual steps",
      ],
      architectureDecisions: [
        {
          what: "SFTP delivery",
          chosen: "AWS Transfer Family (managed SFTP)",
          rejected: "Self-managed SFTP server on EC2",
          why: "Managed service eliminates the operational burden of patching, scaling, and monitoring an SFTP server. Transfer Family integrates natively with S3, IAM, and CloudWatch — the audit trail and access control are first-class, not bolted on.",
        },
        {
          what: "Partner isolation",
          chosen: "Home-directory isolation per partner via Transfer Family logical directories, backed by IAM roles scoped to partner-specific S3 prefixes",
          rejected: "Separate S3 buckets per partner",
          why: "One bucket with prefix-scoped IAM is operationally simpler. Adding a partner is an IAM role and a Transfer Family user — not a bucket, policy, replication rule, and KMS key per partner.",
        },
        {
          what: "Onboarding documentation",
          chosen: "Reusable onboarding runbook: IAM role template, KMS key policy, bucket policy, Transfer Family configuration — parameterized, reviewed, versioned",
          rejected: "Case-by-case configuration",
          why: "Generalization is a deliverable. The runbook turned partner onboarding from a multi-day multi-team coordination into a half-day task that any engineer on the team could execute.",
        },
      ],
      hardProblem:
        "Cross-account IAM trust relationships are deceptively simple to get wrong. The initial configuration allowed the partner IAM role to assume access but the S3 bucket policy wasn't scoped tightly enough — a misconfigured partner could have listed prefixes they shouldn't see. The trust relationship had to be explicit in both directions: the enterprise account bucket policy and the partner account role trust policy, with condition keys on the S3 prefix.",
      fix:
        "Added explicit S3 condition keys on every bucket policy statement: `s3:prefix` conditions scoped to the partner's home directory prefix, with `StringLike` (not `StringEquals`) to allow recursive access within the prefix. Tested cross-account access from a sandbox partner account before any production configuration. Every new partner configuration follows the same test procedure before going live.",
      productionReality:
        "The automated file generation pipeline ran on a schedule that didn't account for Transfer Family's eventual consistency on new user creation. New partners added within 30 minutes of a scheduled file push sometimes didn't receive the file. Added a 5-minute wait gate in the Lambda orchestration and a fallback manual trigger for same-day onboarding cases.",
      outcomeMetrics: [
        { value: "Hours", label: "Onboarding time", sub: "Down from days" },
        { value: "100%", label: "Isolation", sub: "Per-partner home directory" },
        { value: "Zero", label: "Manual credential mgmt", sub: "IAM-native access" },
        { value: "Standard", label: "Reusable runbook", sub: "Used by full team" },
      ],
      lessons: [
        "Cross-account IAM condition keys must be explicit in both directions — a trust relationship that works in one direction is not the same as one that works correctly",
        "Test cross-account access from a real sandbox account before any production configuration — the IAM policy simulator does not catch all cross-account edge cases",
        "Generalization is a deliverable — the onboarding runbook reduced partner integration time as much as the platform itself",
        "Scheduled automation needs to account for eventual consistency in managed services — adding a wait gate is cheaper than debugging a missed file",
      ],
      relatedSlugs: ["agentic-doc-review", "ommsai"],
    } satisfies CaseStudy,
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
    caseStudy: {
      headline: "Offline-first PWA for Vedic mantra practice — donation-based monetization, Firebase Custom Claims for admin.",
      customer: "Practitioners of japa meditation — devotional mantra counting",
      timeline: "2024–Present · Q3 2026 launch",
      status: "~85% complete",
      capabilityTags: ["Full-Stack", "PWA", "Consumer"],
      customerContext:
        "Japa is the daily practice of repeating a sacred mantra — a count of 108, 1008, or more repetitions per sitting. Practitioners use physical mala beads to count. The gap: no digital tool built for the actual practice. Existing apps were built for meditation broadly, not for mantra counting specifically. The user base spans age groups — from teenagers to elderly practitioners — with varying technical comfort. Many practice in quiet spaces without internet. The monetization has to fit the cultural context: donation, not subscription.",
      problem:
        "The ask was 'build a mantra counter app.' The real design challenge was: how do you build a streak and progress system that respects practice integrity? Practitioners don't want to game streaks — they want to track genuine sadhana. The monetization had to feel like an offering, not a paywall. And the app had to work offline, completely, because meditation and WiFi don't always coexist.",
      constraints: [
        "Offline-first: practitioners meditate in spaces without reliable internet — the core counting and tracking must work without connectivity",
        "Donation-based monetization: culturally, asking practitioners to subscribe feels transactional in a way that doesn't fit the practice — donation tiers with spiritual naming",
        "Streak mechanics that respect practice integrity: no gamification pressure that conflicts with the nature of the practice",
        "Firebase Custom Claims for global admin: one admin tier across all users without exposing admin functionality in the client",
        "Cross-age-group UX: elderly practitioners need large tap targets and minimal cognitive load",
      ],
      architectureDecisions: [
        {
          what: "Platform",
          chosen: "Firebase (Auth + Firestore + Custom Claims)",
          rejected: "Original AWS architecture (Lambda + RDS Proxy + Cognito JWT + SAM)",
          why: "Owned the migration decision after realizing the AWS architecture was over-engineered for the use case. Firebase's real-time sync, offline persistence, and built-in auth eliminated three separate services and reduced cold-start latency that mattered for a counting interface.",
        },
        {
          what: "Offline persistence",
          chosen: "Firestore offline persistence with service worker for asset caching",
          rejected: "IndexedDB + custom sync",
          why: "Firestore's offline mode handles conflict resolution automatically. Custom IndexedDB sync would have required implementing CRDT-style merge logic for count updates — significant complexity for a solo build.",
        },
        {
          what: "Monetization model",
          chosen: "Razorpay donation flow with spiritually-themed tiers (Seva, Daan, Arpan)",
          rejected: "Subscription / paywall",
          why: "The user base responds to offering language, not subscription language. Donation tiers with Sanskrit naming ('Seva' = service, 'Daan' = gift, 'Arpan' = offering) have higher conversion in this cultural context than 'Basic / Pro / Enterprise'.",
        },
      ],
      hardProblem:
        "PWA offline-first with Firestore is harder than React Native offline-first. The service worker has to cache the right assets at install time, update them correctly on new versions, and not break Firestore's own network detection. Early builds had a failure mode where Firestore's offline mode and the service worker's cache disagreed on whether the app was online — users saw stale data after reconnecting.",
      fix:
        "Separated the service worker concerns: asset caching (Workbox, network-first strategy for dynamic routes, cache-first for static assets) from Firestore connectivity (managed entirely by the Firestore SDK, not the service worker). The service worker explicitly yields network detection to Firestore and only manages the asset layer. Took two architectural rewrites to get the separation clean.",
      productionReality:
        "Firebase Custom Claims are set server-side and only take effect after the user's ID token refreshes. Early admin testing showed a 1-hour delay between granting admin access and it appearing in the app. Added a forced token refresh on admin grant, surfaced in a simple admin management UI. Not documented anywhere obvious in the Firebase docs.",
      outcomeMetrics: [
        { value: "~85%", label: "Complete", sub: "Q3 2026 launch target" },
        { value: "Offline", label: "Core functionality", sub: "Full offline-first PWA" },
        { value: "3", label: "Donation tiers", sub: "Culturally-named pricing" },
        { value: "0", label: "Server-side latency", sub: "Firebase local-first reads" },
      ],
      lessons: [
        "PWA service worker architecture is harder than React Native for true offline-first — the separation of asset caching from data sync has to be explicit",
        "Firebase Custom Claims token refresh is not automatic — force a refresh on grant or users wait an hour for their new access level",
        "Monetization language matters in culturally-sensitive markets — donation tier naming with Sanskrit terms outperformed generic subscription language in early user feedback",
        "Own platform migration decisions: the move from AWS to Firebase was the right call, and making it early saved months of over-engineering",
      ],
      relatedSlugs: ["scholarpath", "trading-system"],
    } satisfies CaseStudy,
  },
  {
    title: "IBKR Futures Automation",
    description:
      "Automated IBKR futures trading system with vertical spread options strategies, NLP command parsing for natural-language order entry, and a React dashboard for monitoring. Built for production with Python ib_insync integration and real-time position management.",
    slug: "trading-system",
    image: "/projects/trading.jpg",
    tags: ["Python", "ib_insync", "React", "Claude API", "NLP", "Fintech"],
    metrics: "Working Prototype",
    featured: false,
    domain: "Fintech",
    caseStudy: {
      headline: "NLP-driven command interface for futures and options trading — Claude as the command parser, risk gates before every order.",
      customer: "Self — proof-of-concept for retail trading automation",
      timeline: "2025–Present",
      status: "Working prototype",
      capabilityTags: ["Agentic AI", "Fintech", "Prototype"],
      customerContext:
        "Retail futures and options trading — specifically vertical spreads on micro contracts — requires precise multi-leg order entry across a complex brokerage API. The workflow is: identify a trade setup, calculate position sizing based on account risk tolerance, enter a multi-leg order with specific strikes and expirations, monitor position, and exit on target or stop. Every step that requires switching between mental calculation and the brokerage UI is a place where mistakes happen.",
      problem:
        "The stated goal was 'automate the trading workflow.' The real design challenge: how do you build a natural-language command interface for a domain where a misinterpreted command costs real money? The LLM has to be right, not just helpful. And 'right' means: correct symbol, correct strike, correct expiration, correct quantity, correct order type — with a risk gate that prevents execution if any parameter is outside bounds.",
      constraints: [
        "Real money trading APIs — IBKR ib_insync has no sandbox mode for futures; mistakes execute against real positions",
        "Zero tolerance for command misinterpretation — 'buy 2 MES calls at 5400' must parse exactly, not approximately",
        "Real-time risk gates — position sizing, account exposure, and margin checks must run before any order touches the API",
        "Latency budget — options orders on micro futures are time-sensitive; the NLP parse + risk check must complete in under 2 seconds",
        "Phase-based development: paper trading → micro contracts ($50 margin) → scaled positions",
      ],
      architectureDecisions: [
        {
          what: "Command parsing",
          chosen: "Claude as NLP parser with strict structured output schema — command → JSON with explicit fields for symbol, action, quantity, strike, expiration, order type",
          rejected: "Regex-based parser / traditional NLP",
          why: "Trading commands have infinite natural-language variation. Regex breaks on the second person who uses it. Claude's schema-constrained output gives structured JSON from any valid command phrasing — and refuses to parse ambiguous commands rather than guessing.",
        },
        {
          what: "Risk gate placement",
          chosen: "Risk validation as a blocking step between command parse and order submission — account exposure check, position sizing rules, margin check, all gates must pass",
          rejected: "Post-execution risk monitoring",
          why: "The risk gate is the actual hard problem. Post-execution monitoring is a loss management tool, not a risk management tool. Every order that violates risk rules must be blocked before touching the API.",
        },
        {
          what: "Development phasing",
          chosen: "Paper trading (no real orders) → micro contracts (real orders, minimum size) → scaled",
          rejected: "Full-scale testing",
          why: "The only way to verify that the system behaves correctly under real API conditions is to run it with real orders at minimum position size. Paper trading tests the logic; micro contracts test the API integration, error handling, and latency under production conditions.",
        },
      ],
      hardProblem:
        "The LLM command parser is not the hard problem. The hard problem is the eval harness for command interpretation accuracy. How do you measure whether 'sell 3 ES put spreads at 5300/5200 for 20 points' is being parsed correctly across 200 command variations before deploying against a live account? Without an eval harness, you're flying blind.",
      fix:
        "Building the eval harness now before scaling. 200 command/intent pairs, automated comparison of parsed JSON against ground truth, coverage across all supported order types and common variations. The system does not move out of paper trading until eval accuracy on the test set exceeds 99.5% and all edge cases (ambiguous expirations, mid-sentence corrections, multi-leg abbreviations) have known behavior.",
      productionReality:
        "ib_insync's async event loop and the Claude API's HTTP client do not share an event loop gracefully. Early builds had race conditions between incoming market data events and the NLP parse async calls. Separated them: market data runs in a dedicated ib_insync event loop thread; NLP parsing runs in a separate thread pool with a queue. The order submission is synchronous on the ib_insync thread.",
      outcomeMetrics: [
        { value: "Working", label: "NLP command interface", sub: "Parse → risk gate → submit" },
        { value: "99.5%+", label: "Target eval accuracy", sub: "Before live deployment" },
        { value: "<2s", label: "Parse + risk check", sub: "Latency budget per order" },
        { value: "Phase 1", label: "Paper trading", sub: "Current stage" },
      ],
      lessons: [
        "The risk gate is the actual hard problem in trading automation — LLM command parsing is the easy part",
        "Build the eval harness before scaling — 200 command/intent pairs reveal edge cases that a demo never surfaces",
        "Separate async event loops for I/O-bound tasks that don't share a runtime — ib_insync and aiohttp are not friends on the same loop",
        "Phase-based development is not optional when real money is involved — paper trading tests logic, micro contracts test the API",
      ],
      relatedSlugs: ["ommsai", "agentic-doc-review"],
    } satisfies CaseStudy,
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
