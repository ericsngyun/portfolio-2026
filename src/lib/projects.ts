export interface Project {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  role: string;
  year: string;
  techStack: string[];
  features: { title: string; description: string }[];
  highlights: string[];
  links: { live?: string; github?: string };
}

export const projects: Project[] = [
  {
    slug: "genki-tcg",
    name: "Genki TCG",
    tagline: "Full-stack tournament management platform",
    description:
      "A comprehensive tournament management ecosystem for trading card game stores. Features a React Native mobile app for players, a Next.js admin dashboard for organizers, and a NestJS API backend. Built to handle Swiss-system tournaments with professional-grade tiebreaker calculations.",
    role: "Full-Stack Engineer",
    year: "2024",
    techStack: [
      "React Native",
      "Expo",
      "Next.js",
      "NestJS",
      "PostgreSQL",
      "Prisma",
      "Socket.io",
      "Redis",
      "TypeScript",
    ],
    features: [
      {
        title: "Swiss Pairing Algorithm",
        description:
          "Implemented professional tournament pairing with OMW%, GW%, OGW% tiebreakers, bye assignment fairness, and float handling across point buckets.",
      },
      {
        title: "Real-time Updates",
        description:
          "Socket.io integration delivers instant pairings, standings, and announcements to all connected players and admins.",
      },
      {
        title: "Credits System",
        description:
          "Player wallet with immutable audit trails for prize distribution, refunds, and store credit management.",
      },
      {
        title: "Multi-platform Apps",
        description:
          "React Native mobile app for players with event registration, match reporting, and leaderboards. Next.js admin dashboard for tournament organizers.",
      },
    ],
    highlights: [
      "Extracted tournament logic into a separate, testable package with 86 passing tests",
      "Designed multi-tenant architecture with org-scoped RBAC (Owner, Staff, Player roles)",
      "Built JWT + Discord OAuth authentication with refresh token management",
      "Implemented push notifications via Expo Server SDK",
    ],
    links: {
      live: "https://genkitcg.app",
    },
  },
  {
    slug: "cardflux",
    name: "CardFlux",
    tagline: "AI-powered trading card identification",
    description:
      "A desktop application that identifies trading cards in 111ms with 100% accuracy using computer vision and machine learning. Transforms manual pricing from 3-5 minutes per card to under 1 second. Includes a companion SaaS web platform for shop inventory management.",
    role: "Full-Stack Engineer & ML Engineer",
    year: "2024",
    techStack: [
      "Electron",
      "React",
      "TypeScript",
      "Python",
      "DINOv2",
      "FAISS",
      "Next.js",
      "tRPC",
      "Prisma",
      "PostgreSQL",
    ],
    features: [
      {
        title: "111ms Identification",
        description:
          "Achieved sub-200ms card identification through DINOv2 FP16 inference, pre-computed ORB keypoints, and parallel geometric matching.",
      },
      {
        title: "100% Accuracy",
        description:
          "Multi-modal scoring combines visual embeddings (DINOv2) with geometric verification (ORB features) using dynamic weight allocation.",
      },
      {
        title: "5,390 Card Database",
        description:
          "Full One Piece TCG coverage with 1,014 reprints/variants automatically grouped. Extensible to Pokemon and Magic: The Gathering.",
      },
      {
        title: "Shop Management SaaS",
        description:
          "T3 stack web platform with Clerk auth, multi-org support, inventory tracking, and real-time price sync from TCGPlayer.",
      },
    ],
    highlights: [
      "Built persistent Python ML bridge with JSON-RPC communication for model reuse across identifications",
      "Optimized cold start from 10.5s to 2.3s (78% faster) through model preloading and warmup inference",
      "Pre-computed 120MB ORB keypoints cache eliminates 60% of geometric computation time",
      "Designed monorepo with pnpm workspaces spanning desktop app, web app, and data pipeline services",
    ],
    links: {},
  },
  {
    slug: "refora",
    name: "Refora",
    tagline: "AI visibility intelligence for cybersecurity brands",
    description:
      "A vertical SaaS platform that monitors brand visibility across AI-powered search engines and LLMs. Helps cybersecurity companies understand when and how they appear in AI responses to buyer queries like 'What's the best SIEM solution?'",
    role: "Full-Stack Engineer",
    year: "2025",
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Drizzle ORM",
      "PostgreSQL",
      "Inngest",
      "OpenAI API",
      "Anthropic API",
      "Supabase",
      "Stripe",
    ],
    features: [
      {
        title: "Multi-LLM Integration",
        description:
          "Unified AI client abstraction querying ChatGPT, Claude, Gemini, and Perplexity with graceful degradation if any engine fails.",
      },
      {
        title: "Share of Answer Metrics",
        description:
          "Calculates percentage of AI response dedicated to your brand, mention position, citation rates, and sentiment analysis.",
      },
      {
        title: "Competitive Intelligence",
        description:
          "Compare visibility metrics vs competitors, identify content gaps where competitors appear but you don't.",
      },
      {
        title: "Automated Alerts",
        description:
          "Visibility drop/surge detection, competitor surge alerts, negative sentiment spikes with Slack/email notifications.",
      },
    ],
    highlights: [
      "Designed event-driven architecture with Inngest for fault-tolerant background job processing",
      "Built AI engine abstraction layer with unified interface and engine-specific adapters",
      "Implemented multi-tenant architecture with per-organization data isolation",
      "End-to-end type safety from API routes to database queries with Drizzle ORM",
    ],
    links: {},
  },
  {
    slug: "prax",
    name: "Prax",
    tagline: "Premium brand experience website",
    description:
      "A high-end marketing website for a Los Angeles hair artistry studio and education platform. Features advanced scroll-driven animations, 3D elements, and a custom design system emphasizing precision and craftsmanship.",
    role: "Frontend Engineer & Designer",
    year: "2024",
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "GSAP",
      "Three.js",
      "React Three Fiber",
      "Lenis",
      "Tailwind CSS",
      "Zustand",
    ],
    features: [
      {
        title: "Scroll-Driven Animations",
        description:
          "GSAP ScrollTrigger powers parallax effects, horizontal scroll galleries with section pinning, and staggered reveals.",
      },
      {
        title: "Custom Cursor System",
        description:
          "Context-aware cursor with multiple variants (hover, text, view, drag) using mix-blend-difference for layered visibility.",
      },
      {
        title: "3D Elements",
        description:
          "Three.js integration via React Three Fiber for immersive brand storytelling and visual depth.",
      },
      {
        title: "Smooth Scrolling",
        description:
          "Lenis smooth scroll synchronized with GSAP ticker for frame-perfect scroll-driven animations.",
      },
    ],
    highlights: [
      "Built comprehensive animation system with organized tokens for easing, duration, and orchestration",
      "Implemented prefers-reduced-motion checks for all animations",
      "Designed fluid typography scale using CSS clamp() for responsive text at all breakpoints",
      "Created Zustand stores for cursor state, preloader progress, and navigation state",
    ],
    links: {
      live: "https://prax-lac.vercel.app",
    },
  },
  {
    slug: "riftrecord",
    name: "RiftRecord",
    tagline: "Tournament tracking and analytics",
    description:
      "A tournament tracking application for the Riftbound TCG community. Players can record match results round by round, track performance metrics, analyze win rates and matchup trends, and share tournament results via image export.",
    role: "Full-Stack Engineer",
    year: "2024",
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "NextAuth",
      "Tailwind CSS",
    ],
    features: [
      {
        title: "Round-by-Round Tracking",
        description:
          "Track Swiss and Topcut rounds separately with best-of-3 results, opponent leaders, dice rolls, and match notes.",
      },
      {
        title: "24 Playable Leaders",
        description:
          "Full support for Riftbound champions across 6 domains with leader search, filtering, and matchup tracking.",
      },
      {
        title: "Performance Analytics",
        description:
          "Win/loss/draw tracking, win rate calculations, matchup statistics, and separate Swiss vs Topcut analysis.",
      },
      {
        title: "Hybrid Data Storage",
        description:
          "localStorage for in-progress tournaments (offline-first), PostgreSQL for saved tournaments with automatic sync.",
      },
    ],
    highlights: [
      "Built React Context + Reducer for centralized tournament state management",
      "Implemented independent round numbering for Swiss and Topcut phases",
      "Designed multi-view dashboard system (setup → tracker → results → history)",
      "Google OAuth authentication with automatic redirect flows",
    ],
    links: {
      live: "https://riftrecord.com",
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
