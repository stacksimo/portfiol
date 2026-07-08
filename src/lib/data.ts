export type ProjectTab = "preview" | "case" | "design" | "build" | "quality" | "voices";

export interface Project {
  slug: string;
  name: string;
  kind: string;
  tags: string[];
  stack: string[];
  year: number;
  duration: string;
  complexity: "standard" | "advanced" | "deep";
  outcome: string;
  summary: string;
  challenge: string;
  solution: string;
  process: { step: string; note: string }[];
  architecture: string[];
  apis: string[];
  database: string;
  auth: string;
  lighthouse: { performance: number; accessibility: number; bestPractices: number; seo: number };
  perfNote: string;
  seoNote: string;
  a11yNote: string;
  results: string[];
  testimonial: { quote: string; who: string };
  related: string[];
  theme: { bg: string; fg: string; accent: string };
  demo: DemoPage[];
}

export interface DemoPage {
  path: string;
  title: string;
  blocks: DemoBlock[];
}

export type DemoBlock =
  | { t: "nav"; brand: string; links: string[] }
  | { t: "hero"; title: string; sub: string; cta: string }
  | { t: "stats"; items: { k: string; v: string }[] }
  | { t: "chart"; label: string }
  | { t: "table"; label: string; rows: string[][] }
  | { t: "cards"; items: { title: string; body: string }[] }
  | { t: "form"; label: string; fields: string[] }
  | { t: "footer"; note: string };

export const projects: Project[] = [
  {
    slug: "metrix",
    name: "Metrix",
    kind: "SaaS · Full build",
    tags: ["SaaS", "Dashboard", "React", "Next.js", "Node", "Postgres", "2025"],
    stack: ["Next.js", "TypeScript", "Node", "Postgres", "Stripe", "Redis"],
    year: 2025,
    duration: "8 weeks",
    complexity: "deep",
    outcome: "400 paying users in Q1",
    summary: "Analytics dashboard for a B2B startup. Auth, Stripe billing, real-time charts.",
    challenge:
      "The founders had a working data pipeline but no product around it. Prospects were evaluating on spreadsheets exported by hand, and two pilot deals were stalling because there was nothing to log into.",
    solution:
      "A focused dashboard product: workspace auth, Stripe subscriptions, and a real-time chart layer over their existing pipeline. I cut everything that wasn't needed to close the pilots — no admin theme, no settings sprawl, one great screen.",
    process: [
      { step: "Week 1", note: "Scope workshop, wireframes for the single core screen." },
      { step: "Weeks 2–3", note: "Auth, workspace model, billing skeleton on staging." },
      { step: "Weeks 4–6", note: "Chart layer, live queries, empty/error states." },
      { step: "Weeks 7–8", note: "Onboarding flow, polish pass, launch checklist." },
    ],
    architecture: [
      "Next.js app (SSR) behind Cloudflare",
      "Node worker for aggregation jobs",
      "Postgres (row-level security per workspace)",
      "Redis for query cache + rate limits",
      "Stripe webhooks → billing state machine",
    ],
    apis: ["REST /v1 (public, keyed)", "Internal tRPC between app and worker", "Stripe webhooks"],
    database: "Postgres 15 — 14 tables, RLS per workspace, nightly logical backups.",
    auth: "Email magic links + OAuth (Google). Sessions in httpOnly cookies, workspace-scoped roles.",
    lighthouse: { performance: 98, accessibility: 100, bestPractices: 100, seo: 100 },
    perfNote: "Dashboard LCP 1.1s on 4G. Chart data streamed; shell renders instantly from cache.",
    seoNote: "Marketing pages statically generated; app itself is noindex.",
    a11yNote: "Full keyboard operation of the dashboard, charts have data-table equivalents.",
    results: ["400 paying users in the first quarter", "Both stalled pilots converted", "Churn under 2% monthly"],
    testimonial: {
      quote: "He shipped in eight weeks what our previous agency scoped at six months. The product closed our pilots for us.",
      who: "Co-founder, Metrix",
    },
    related: ["briefly", "northwind"],
    theme: { bg: "#101418", fg: "#e8edf2", accent: "#5ba8f5" },
    demo: [
      {
        path: "/",
        title: "Overview",
        blocks: [
          { t: "nav", brand: "Metrix", links: ["Overview", "Events", "Billing", "Settings"] },
          {
            t: "stats",
            items: [
              { k: "Active users", v: "12,408" },
              { k: "Events / min", v: "3,912" },
              { k: "Conversion", v: "4.7%" },
              { k: "MRR", v: "$38.2k" },
            ],
          },
          { t: "chart", label: "Events — last 30 days" },
          {
            t: "table",
            label: "Top segments",
            rows: [
              ["EU · trial", "4,208", "+12%"],
              ["US · paid", "3,981", "+8%"],
              ["APAC · trial", "2,116", "+21%"],
              ["US · enterprise", "1,004", "+3%"],
            ],
          },
          { t: "footer", note: "Metrix — demo reconstruction" },
        ],
      },
      {
        path: "/billing",
        title: "Billing",
        blocks: [
          { t: "nav", brand: "Metrix", links: ["Overview", "Events", "Billing", "Settings"] },
          {
            t: "cards",
            items: [
              { title: "Growth — $190/mo", body: "Current plan. Renews Mar 12. 5 seats used of 10." },
              { title: "Invoices", body: "12 paid · next invoice Mar 12 · card ending 4242" },
            ],
          },
          {
            t: "table",
            label: "Invoice history",
            rows: [
              ["Feb 2025", "$190.00", "paid"],
              ["Jan 2025", "$190.00", "paid"],
              ["Dec 2024", "$120.00", "paid"],
            ],
          },
          { t: "footer", note: "Metrix — demo reconstruction" },
        ],
      },
    ],
  },
  {
    slug: "northwind",
    name: "Northwind",
    kind: "Landing page",
    tags: ["Landing Page", "React", "Next.js", "2025"],
    stack: ["Next.js", "TypeScript", "Vercel", "PostHog"],
    year: 2025,
    duration: "2 weeks",
    complexity: "standard",
    outcome: "Signup rate 3.1% → 7.4%",
    summary: "Launch page for a dev-tools company. Copy structure, design, build, A/B testing.",
    challenge:
      "A solid product with a landing page that read like internal documentation. Signup conversion sat at 3.1% and the team couldn't tell which changes helped because nothing was measured.",
    solution:
      "Rewrote the page around one promise, one demo, one call to action. Built it static, wired PostHog experiments, and ran three A/B rounds on the hero and pricing framing after launch.",
    process: [
      { step: "Days 1–2", note: "Message workshop: one promise, objections list." },
      { step: "Days 3–6", note: "Design + build, perfect-score budget enforced." },
      { step: "Days 7–10", note: "Experiment wiring, QA, launch." },
      { step: "Post-launch", note: "Three A/B rounds over four weeks." },
    ],
    architecture: ["Static Next.js on Vercel", "Edge middleware for experiment bucketing", "PostHog for events + flags"],
    apis: ["PostHog capture API", "Newsletter provider API"],
    database: "None — content in typed MDX, no runtime state.",
    auth: "None required.",
    lighthouse: { performance: 100, accessibility: 100, bestPractices: 100, seo: 100 },
    perfNote: "14KB of JS shipped. LCP 0.7s on 4G.",
    seoNote: "Structured data, OG images per experiment variant, sitemap.",
    a11yNote: "Landmarked sections, motion-reduced variants of all animations.",
    results: ["Signup conversion 3.1% → 7.4%", "Perfect Lighthouse scores held post-launch", "Page copy reused in their pitch deck"],
    testimonial: {
      quote: "First developer we've worked with who argued about the words before the pixels. The numbers went up because of it.",
      who: "Head of Growth, Northwind",
    },
    related: ["metrix", "atelier-form"],
    theme: { bg: "#f5f1e8", fg: "#1c1a14", accent: "#c4430d" },
    demo: [
      {
        path: "/",
        title: "Home",
        blocks: [
          { t: "nav", brand: "Northwind", links: ["Product", "Docs", "Pricing", "Sign in"] },
          { t: "hero", title: "Ship your CLI to every platform in one command.", sub: "Northwind builds, signs and distributes your developer tools — Homebrew, apt, winget, npm — from a single config file.", cta: "Start free" },
          {
            t: "cards",
            items: [
              { title: "One config", body: "northwind.toml describes your tool once; we handle every registry." },
              { title: "Signed builds", body: "Codesigning and notarization handled per-platform, automatically." },
              { title: "Instant rollback", body: "Every release is content-addressed. Roll back in seconds." },
            ],
          },
          { t: "stats", items: [{ k: "Registries", v: "9" }, { k: "Median release", v: "94s" }, { k: "Teams", v: "1,200+" }] },
          { t: "form", label: "Start shipping", fields: ["work email"] },
          { t: "footer", note: "Northwind — demo reconstruction" },
        ],
      },
      {
        path: "/pricing",
        title: "Pricing",
        blocks: [
          { t: "nav", brand: "Northwind", links: ["Product", "Docs", "Pricing", "Sign in"] },
          {
            t: "cards",
            items: [
              { title: "Free — $0", body: "Public repos, 3 registries, community support." },
              { title: "Team — $49/mo", body: "Private repos, all registries, signing included." },
              { title: "Enterprise", body: "SSO, audit log, custom registries, SLA." },
            ],
          },
          { t: "footer", note: "Northwind — demo reconstruction" },
        ],
      },
    ],
  },
  {
    slug: "atelier-form",
    name: "Atelier Form",
    kind: "Marketing site + CMS",
    tags: ["Marketing Site", "CMS", "React", "2024"],
    stack: ["Astro", "Sanity CMS", "TypeScript", "Netlify"],
    year: 2024,
    duration: "5 weeks",
    complexity: "advanced",
    outcome: "Organic traffic doubled in 6 months",
    summary: "Five-page site for a design studio, with a CMS their editors actually use.",
    challenge:
      "A design studio embarrassed by its own website — a five-year-old WordPress build nobody dared touch. Every content change went through a freelancer and took a week.",
    solution:
      "Astro front-end with a Sanity studio customised to their vocabulary: 'projects', 'press', 'people' — not 'posts'. Editors preview drafts live. I trained the team in one afternoon; they haven't needed me since. That was the point.",
    process: [
      { step: "Week 1", note: "Content model workshop with the editors themselves." },
      { step: "Weeks 2–3", note: "Design + build of the five templates." },
      { step: "Week 4", note: "CMS studio customisation, migrations from WordPress." },
      { step: "Week 5", note: "Editor training, redirects, launch." },
    ],
    architecture: ["Astro static build on Netlify", "Sanity content lake", "Build hook on publish → atomic deploys"],
    apis: ["Sanity GROQ API", "Netlify build hooks"],
    database: "Sanity content lake (hosted). No self-managed database.",
    auth: "CMS auth via Sanity (SSO for the studio's Google Workspace).",
    lighthouse: { performance: 100, accessibility: 100, bestPractices: 100, seo: 100 },
    perfNote: "Static output, images pre-transformed. Zero JS on three of five templates.",
    seoNote: "Full redirect map from the old site preserved 9 years of URLs.",
    a11yNote: "AA contrast throughout a very light palette — checked per-component.",
    results: ["Organic traffic doubled in 6 months", "Content changes now take minutes, not weeks", "Zero developer requests since launch"],
    testimonial: {
      quote: "We are designers and we are picky. He was pickier. The CMS fits how we actually talk about our work.",
      who: "Partner, Atelier Form",
    },
    related: ["northwind", "briefly"],
    theme: { bg: "#f7f6f3", fg: "#181818", accent: "#7a6af0" },
    demo: [
      {
        path: "/",
        title: "Studio",
        blocks: [
          { t: "nav", brand: "ATELIER FORM", links: ["Work", "Studio", "Journal", "Contact"] },
          { t: "hero", title: "Identity and interiors for cultural institutions.", sub: "A twelve-person studio in Copenhagen working with museums, theatres and publishers since 2011.", cta: "See the work" },
          {
            t: "cards",
            items: [
              { title: "Statens Museum — wayfinding", body: "Signage system across four wings, 2024." },
              { title: "Teater Nord — identity", body: "Brand, print and season campaign, 2024." },
              { title: "Forlaget Bro — book series", body: "Design system for 40 titles, 2023." },
            ],
          },
          { t: "footer", note: "Atelier Form — demo reconstruction" },
        ],
      },
      {
        path: "/journal",
        title: "Journal",
        blocks: [
          { t: "nav", brand: "ATELIER FORM", links: ["Work", "Studio", "Journal", "Contact"] },
          {
            t: "table",
            label: "Journal",
            rows: [
              ["On wayfinding that disappears", "essay", "Feb 2025"],
              ["Season posters, forty years apart", "notes", "Dec 2024"],
              ["Why we still print everything", "essay", "Oct 2024"],
            ],
          },
          { t: "footer", note: "Atelier Form — demo reconstruction" },
        ],
      },
    ],
  },
  {
    slug: "briefly",
    name: "Briefly",
    kind: "SaaS MVP",
    tags: ["SaaS", "MVP", "React", "Next.js", "Node", "2024"],
    stack: ["Next.js", "TypeScript", "Node", "Postgres", "Resend"],
    year: 2024,
    duration: "4 weeks",
    complexity: "advanced",
    outcome: "Seed round closed off the MVP demo",
    summary: "Client-portal MVP for a solo founder. Four weeks, fixed price.",
    challenge:
      "A solo founder with a validated idea — a client portal for freelance studios — and a fundraise scheduled in six weeks. She needed something real to demo, not a prototype that falls over when an investor clicks the wrong thing.",
    solution:
      "Ruthless MVP scoping: projects, file threads, approvals, and email notifications. Nothing else. Fixed price, four weeks, and every screen built to survive an unscripted demo — real empty states, real error states, seeded demo data.",
    process: [
      { step: "Week 1", note: "Scope cut-down: 11 proposed features → 4 shipped ones." },
      { step: "Week 2", note: "Data model, auth, project + thread screens." },
      { step: "Week 3", note: "Approvals flow, email notifications, seed data." },
      { step: "Week 4", note: "Demo hardening: empty/error states, deploy, dry run." },
    ],
    architecture: ["Next.js monolith on Railway", "Postgres", "Resend for transactional email", "S3-compatible file storage"],
    apis: ["Internal REST", "Resend API", "S3 presigned uploads"],
    database: "Postgres — 9 tables. Simple by design; migrations checked in from day one.",
    auth: "Password + magic-link fallback. Per-client portal links with scoped tokens.",
    lighthouse: { performance: 96, accessibility: 100, bestPractices: 100, seo: 92 },
    perfNote: "Optimised for demo conditions: instant navigation on seeded data.",
    seoNote: "App is gated; only the one-page site is indexed.",
    a11yNote: "Forms fully labelled, focus management on every dialog.",
    results: ["Seed round closed — the MVP was the demo", "First 10 studios onboarded on the MVP codebase", "Handed over with docs; her new hire extended it without me"],
    testimonial: {
      quote: "Investors poked at everything and nothing broke. I raised on a four-week build.",
      who: "Founder, Briefly",
    },
    related: ["metrix", "atelier-form"],
    theme: { bg: "#14120f", fg: "#efe9df", accent: "#e0a83c" },
    demo: [
      {
        path: "/",
        title: "Projects",
        blocks: [
          { t: "nav", brand: "Briefly", links: ["Projects", "Clients", "Approvals", "Settings"] },
          {
            t: "cards",
            items: [
              { title: "Hakone Rebrand — Studio Mono", body: "3 open threads · approval due Friday" },
              { title: "Website — North&Co", body: "1 open thread · files updated today" },
              { title: "Packaging — Verde", body: "Approved · archive pending" },
            ],
          },
          { t: "table", label: "Recent activity", rows: [["North&Co uploaded 4 files", "2h ago", ""], ["Verde approved v3", "yesterday", ""], ["Studio Mono commented", "yesterday", ""]] },
          { t: "footer", note: "Briefly — demo reconstruction" },
        ],
      },
      {
        path: "/approvals",
        title: "Approvals",
        blocks: [
          { t: "nav", brand: "Briefly", links: ["Projects", "Clients", "Approvals", "Settings"] },
          {
            t: "table",
            label: "Waiting on client",
            rows: [
              ["Hakone Rebrand — logo v4", "Studio Mono", "due Fri"],
              ["Website — homepage v2", "North&Co", "due Mon"],
            ],
          },
          { t: "form", label: "Request an approval", fields: ["project", "file", "note to client"] },
          { t: "footer", note: "Briefly — demo reconstruction" },
        ],
      },
    ],
  },
];

export interface Service {
  slug: string;
  name: string;
  no: string;
  tagline: string;
  who: string;
  deliverables: string[];
  process: string[];
  technologies: string[];
  timeline: string;
  pricing: string;
  related: string[];
  faq: { q: string; a: string }[];
}

export const services: Service[] = [
  {
    slug: "websites",
    name: "Website Development",
    no: "01",
    tagline: "Marketing sites your team can edit without calling me.",
    who: "Companies whose site is out of date and whose team is afraid to touch it.",
    deliverables: ["Design + build of every template", "CMS set up in your vocabulary", "Editor training session", "Redirect map + SEO carryover", "Handover docs"],
    process: ["Content model workshop", "Design", "Build", "CMS + migration", "Training + launch"],
    technologies: ["Astro / Next.js", "Sanity / Payload", "TypeScript", "Netlify / Vercel"],
    timeline: "3–6 weeks",
    pricing: "from $6k fixed",
    related: ["atelier-form", "northwind"],
    faq: [
      { q: "Can you migrate from WordPress?", a: "Yes — content, URLs and SEO equity come along. Atelier Form was exactly this." },
      { q: "Will we need you for content changes?", a: "No. That's the whole point of the CMS setup and training." },
    ],
  },
  {
    slug: "landing-pages",
    name: "Landing Pages",
    no: "02",
    tagline: "One page, one job: convert.",
    who: "Product teams launching something, or unhappy with a page that reads like documentation.",
    deliverables: ["Copy structure workshop", "Design + build", "Analytics + A/B wiring", "Perfect Lighthouse scores", "Post-launch experiment round"],
    process: ["Message workshop", "Design", "Build", "Experiment wiring", "Launch + iterate"],
    technologies: ["Next.js", "TypeScript", "PostHog", "Vercel"],
    timeline: "1–2 weeks",
    pricing: "from $2.5k fixed",
    related: ["northwind"],
    faq: [
      { q: "Do you write the copy?", a: "I structure it and edit hard; final voice stays yours. We argue about words before pixels." },
      { q: "What about after launch?", a: "The first A/B round is included. Retainers cover ongoing experiments." },
    ],
  },
  {
    slug: "saas",
    name: "SaaS Development",
    no: "03",
    tagline: "Idea to first paying customer, boring parts done right.",
    who: "Founders who need a real product — auth, billing, dashboards — not a prototype.",
    deliverables: ["Ruthless scope cut-down", "Auth, billing, core screens", "Deploy + monitoring", "Seeded demo environment", "Handover your next hire can extend"],
    process: ["Scope workshop", "Data model + auth", "Core product", "Hardening", "Launch + handover"],
    technologies: ["Next.js", "Node", "Postgres", "Stripe", "Railway / Vercel"],
    timeline: "4–10 weeks",
    pricing: "from $12k fixed",
    related: ["metrix", "briefly"],
    faq: [
      { q: "Fixed price for a SaaS build, really?", a: "Yes — because week one is a scope workshop where we cut until it's fixable. Briefly went 11 features → 4." },
      { q: "Who owns the code?", a: "You do, from the first commit. Repo lives in your org." },
    ],
  },
  {
    slug: "dashboards",
    name: "Dashboard Development",
    no: "04",
    tagline: "Your data, one great screen.",
    who: "Teams with a pipeline or API and nothing worth logging into.",
    deliverables: ["The one core screen, done properly", "Real-time data layer", "Empty/error/loading states", "Role-based access"],
    process: ["Data audit", "Wireframe the screen", "Build", "Live data + polish"],
    technologies: ["React", "TypeScript", "Postgres", "Redis"],
    timeline: "3–6 weeks",
    pricing: "from $8k fixed",
    related: ["metrix"],
    faq: [{ q: "Can you work with our existing backend?", a: "Yes — Metrix was built over an existing pipeline without touching it." }],
  },
  {
    slug: "ai-integration",
    name: "AI Integration",
    no: "05",
    tagline: "LLM features that survive contact with real users.",
    who: "Products that need summarisation, extraction, search or assistants — with evals, not vibes.",
    deliverables: ["Feasibility spike with your data", "Prompt + eval harness", "Production integration", "Cost + latency budget"],
    process: ["Spike", "Evals", "Integrate", "Monitor"],
    technologies: ["OpenAI / Anthropic APIs", "pgvector", "TypeScript"],
    timeline: "2–5 weeks",
    pricing: "from $5k",
    related: ["metrix"],
    faq: [{ q: "Will it hallucinate?", a: "Less, measurably: every feature ships with an eval set and a fallback path." }],
  },
  {
    slug: "automation",
    name: "Automation & APIs",
    no: "06",
    tagline: "The glue work: integrations, internal tools, APIs.",
    who: "Teams losing hours to copy-paste between systems.",
    deliverables: ["Integration or internal tool", "API design + docs", "Monitoring + alerts"],
    process: ["Map the workflow", "Build", "Deploy + document"],
    technologies: ["Node", "TypeScript", "REST / webhooks"],
    timeline: "1–3 weeks",
    pricing: "from $2k",
    related: ["briefly"],
    faq: [{ q: "Zapier or code?", a: "Whichever survives your scale. I'll tell you honestly when Zapier is the right answer." }],
  },
  {
    slug: "performance",
    name: "Performance & SEO",
    no: "07",
    tagline: "Faster pages, found more often.",
    who: "Sites with slipping Core Web Vitals or invisible search presence.",
    deliverables: ["Audit with prioritised fixes", "Implementation", "Before/after report", "Budget enforced in CI"],
    process: ["Audit", "Fix", "Verify", "Lock in CI"],
    technologies: ["Lighthouse CI", "Next.js / Astro", "Edge caching"],
    timeline: "1–2 weeks",
    pricing: "from $2k",
    related: ["northwind", "atelier-form"],
    faq: [{ q: "Guaranteed scores?", a: "I guarantee the audit's fixes land and the budget goes into CI so scores can't silently rot." }],
  },
  {
    slug: "retainers",
    name: "Retainers & Maintenance",
    no: "08",
    tagline: "After launch: features, fixes, iteration.",
    who: "Past clients first. A few slots, first refusal to people I've shipped with.",
    deliverables: ["Monthly feature/fix budget", "Same-week response", "Quarterly performance review"],
    process: ["Monthly planning note", "Ship", "Review"],
    technologies: ["Whatever we built together"],
    timeline: "ongoing, monthly",
    pricing: "from $1.5k/mo",
    related: ["metrix", "atelier-form"],
    faq: [{ q: "Can we start on a retainer without a build?", a: "Sometimes — send me the codebase and I'll tell you honestly." }],
  },
];

export const processSteps = [
  { name: "Discovery", note: "A call, your goals, hard questions. Fixed quote within 48 hours." },
  { name: "Research", note: "Your users, your competitors, your constraints — before opinions." },
  { name: "Planning", note: "Scope cut-down. What ships, what waits, in writing." },
  { name: "Wireframes", note: "Structure before style. Cheap to change here, expensive later." },
  { name: "Design", note: "You see and approve design before I write product code." },
  { name: "Development", note: "Weekly staging links. You always know where things stand." },
  { name: "Testing", note: "Real states: empty, error, slow network, keyboard-only." },
  { name: "Launch", note: "Checklists, redirects, monitoring. Boring launches are good launches." },
  { name: "Support", note: "Two weeks of free fixes, docs, and an honest handover." },
];

export const milestones = [
  { year: "2018", title: "First paid website", note: "A restaurant site for a friend's family. Learned: deadlines are design constraints." },
  { year: "2019", title: "Startup years begin", note: "Frontend at a fintech startup. Learned: performance is a feature users feel." },
  { year: "2021", title: "First SaaS shipped end-to-end", note: "Auth to billing, alone. Learned: scope cutting is the real senior skill." },
  { year: "2022", title: "Went independent", note: "First three clients from referrals. Learned: fixed quotes win trust." },
  { year: "2024", title: "Briefly MVP funds a seed round", note: "Four weeks of work demoed to investors. Learned: demo-hardening is a discipline." },
  { year: "2025", title: "Metrix — 400 paying users", note: "Best build yet. Learned: one great screen beats ten good ones." },
];

export const currentFocus = ["SaaS MVPs on fixed quotes", "CMS-backed marketing sites", "Measured AI features"];
export const goals = ["Publish the demo-hardening checklist", "Two open playground experiments per quarter", "Keep the client list small"];

export interface Experiment {
  slug: string;
  name: string;
  kind: string;
  note: string;
}

export const experiments: Experiment[] = [
  { slug: "thread", name: "Thread", kind: "canvas", note: "A line that follows the cursor with spring physics. Built to understand damping." },
  { slug: "grid-life", name: "Grid Life", kind: "canvas", note: "Conway's Game of Life on a 1px grid. Click to seed." },
  { slug: "type-scale", name: "Type Scale", kind: "tool", note: "Interactive modular-scale explorer used on real projects." },
  { slug: "ascii-cam", name: "Boot Sequence", kind: "animation", note: "The boot-in animation from this very site, isolated and looped." },
];

export const email = "hello@stacksimo.dev";
