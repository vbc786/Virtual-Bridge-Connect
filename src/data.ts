import { ServiceItem, TechStackItem, ConsultingDiagram, CampaignFramework } from './types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'cloud-inf',
    title: 'Enterprise Multi-Cloud Infrastructure',
    category: 'Architecture',
    icon: 'Cloud',
    description: 'High-availability, immutable infrastructure pipelines designed for strict enterprise governance, safety, and scale.',
    features: ['Terraform IaC Deployments', 'GDPR/HIPAA Compliance Controls', 'Zero-Downtime Migration Blueprints', 'Kubernetes Orchestration Planning'],
    pricingRange: '$12,000 - $45,000'
  },
  {
    id: 'headless-cms',
    title: 'Headless Content & E-Commerce Engines',
    category: 'CMS',
    icon: 'Cpu',
    description: 'Modern decoupled architectures separating content models from performant presentation layers for sub-second page speeds.',
    features: ['Strapi / WordPress Decoupling', 'Direct Next.js / React Hydration', 'Stripe Global Checkout Pipelines', 'Web-Hook Driven CDN Purging'],
    pricingRange: '$8,500 - $22,000'
  },
  {
    id: 'mobile-eng',
    title: 'High-Performance Mobile Codebases',
    category: 'Mobility',
    icon: 'Smartphone',
    description: 'Native experience mobile applications crafted with modern native SDKs and robust cross-platform compilers.',
    features: ['Kotlin/Compose Android Architecture', 'SwiftUI iOS Engineering', 'Flutter Multiplatform Integration', 'Secure Offline Sync Protocols'],
    pricingRange: '$15,000 - $55,000'
  },
  {
    id: 'workflow-auto',
    title: 'Custom Integration & Workflow Automation',
    category: 'Integration',
    icon: 'GitCompare',
    description: 'Autonomous event-driven flows bridging legacy databases with modern SaaS APIs to eliminate direct human error.',
    features: ['Zapier & Make.com Advanced Scenarios', 'Webhooks & REST Middleware Bridges', 'Real-time Event Queue Audits', 'Auto-Data Reconciliation Pipelines'],
    pricingRange: '$4,000 - $14,000'
  },
  {
    id: 'data-analytics',
    title: 'Advanced Analytics & BI Dashboards',
    category: 'Marketing',
    icon: 'LineChart',
    description: 'Converting raw enterprise transaction streams into beautiful visual funnels and data science-driven ROI predictions.',
    features: ['Detailed Event-Tracking Pipelines', 'Recharts Visual Dashboards', 'UTM/Funnel Conversion Attribution', 'BigQuery Integration Setup'],
    pricingRange: '$6,000 - $18,000'
  }
];

export const TECH_STACKS: TechStackItem[] = [
  // CMS Category
  {
    id: 'strapi',
    name: 'Strapi Headless CMS',
    category: 'CMS',
    icon: 'LayoutGrid',
    description: 'Open-source Node.js headless CMS offering customizable content types and elegant JSON API responses natively.',
    benefits: ['Full GraphQL & REST Out-of-the-box', 'Flexible Component Schema Modeling', 'Self-Hostable or Managed Options'],
    popularity: '9.4/10 Dev Choice'
  },
  {
    id: 'wordpress-headless',
    name: 'Decoupled headless WordPress',
    category: 'CMS',
    icon: 'Globe',
    description: 'Traditional editors with high-speed headless interfaces utilizing WP-GraphQL for Next.js caching.',
    benefits: ['Familiar Authoring Dashboard', 'Legacy Catalog Plugins Support', 'Sub-second CDN Edge Responses'],
    popularity: '8.9/10 Client Preferred'
  },
  {
    id: 'payload-cms',
    name: 'Payload CMS (TypeScript-First)',
    category: 'CMS',
    icon: 'Code2',
    description: 'Code-first local-first headless CMS engineered with Express & React for strict schema-definition types.',
    benefits: ['Strict Type Safety Generation', 'Local Document Database Engine', 'Lightweight Administrative Dashboard'],
    popularity: '9.6/10 Tech Speed'
  },

  // Frontend Category
  {
    id: 'react-vite',
    name: 'React & Vite Systems',
    category: 'Frontend',
    icon: 'Layers',
    description: 'Lightweight static bundle generators styled with modern utility CSS and functional single view state routers.',
    benefits: ['Sub-second Cold Compilation', 'Modern Functional Code Paradigms', 'Extremely Compact Client Footprint'],
    popularity: '9.9/10 Core Stack'
  },
  {
    id: 'tailwind-css',
    name: 'Tailwind CSS v4 Engine',
    category: 'Frontend',
    icon: 'Palette',
    description: 'CSS compile-time utility framework with elegant visual theme scales and native @import setups.',
    benefits: ['Zero CSS Runtime Cost', 'Predictable Layout Alignment', 'Strict Modern Color Consistency'],
    popularity: '9.8/10 Styling Standard'
  },

  // Mobile Category
  {
    id: 'kotlin-compose',
    name: 'Kotlin Jetpack Compose',
    category: 'Mobile',
    icon: 'Smartphone',
    description: 'Official modern Android toolkit featuring declarative UI elements and Native platform integration structures.',
    benefits: ['Official Google Recommended Standard', 'Ultra-fluid 120Hz Animation Cycles', 'Strict Static Android Type Binding'],
    popularity: '9.7/10 Android Standard'
  },
  {
    id: 'swift-ui',
    name: 'iOS SwiftUI',
    category: 'Mobile',
    icon: 'Apple',
    description: 'Apple ecosystem compiler outputting hardware-accelerated fluid responsive interfaces.',
    benefits: ['Native macOS & iOS Integration', 'Complex Gesture & Widget Builders', 'Elegant Apple Design Standards'],
    popularity: '9.6/10 iOS Premium'
  },
  {
    id: 'flutter-sdk',
    name: 'Flutter SDK (Dart compilation)',
    category: 'Mobile',
    icon: 'SmartphoneNfc',
    description: 'Multi-platform graphic engine drawing components to canvas for pixel-perfect multi-device symmetry.',
    benefits: ['Single Shared Codebase Architecture', 'Fast Refresh Layout Hydration', 'Massive Pre-built Material Library'],
    popularity: '9.2/10 Cost Effective'
  },

  // Automation
  {
    id: 'make-auto',
    name: 'Make.com Scenario Pipelines',
    category: 'Automation',
    icon: 'Zap',
    description: 'Visual flow graphs mapping complex multi-application transactional handshakes with secure data buffers.',
    benefits: ['Visual Real-time Stream Analytics', 'Advanced Field-mapping Routers', 'Automatic Back-off Error Guards'],
    popularity: '9.5/10 Integration Speed'
  },
  {
    id: 'aws-lambdas',
    name: 'AWS Lambda Node Bridge',
    category: 'Automation',
    icon: 'Terminal',
    description: 'Serverless REST controllers executing specific data transformations with sub-second initialization times.',
    benefits: ['Completely Scale-to-Zero Compute', 'Unlimited Concurrent Event Handling', 'Direct Enterprise DB Authorization'],
    popularity: '9.3/10 Scale Master'
  }
];

export const CONSULTING_DIAGRAMS: ConsultingDiagram[] = [
  {
    id: 'leads-funnel',
    title: 'Event-Driven Strategy & Lead Funnel Schematic',
    systemFlow: ['SPA Event Hooks', 'REST API Proxy Gateway', 'Secure Firestore Lead Collections', 'Make.com Webhook Notification', 'Calendar Booking Auto-Sync'],
    integrations: ['Vite Client App', 'Firebase Client Auth', 'Firestore DB Engine', 'Google Tasks Sync', 'Slack/Twilio Notification Relay'],
    roiEstimate: '32% Reduction in Lead Response Latency'
  },
  {
    id: 'headless-sync',
    title: 'Headless CMS Content Sync Schematic',
    systemFlow: ['Writer Updates Headless Draft', 'Strapi Publisher Event Hook', 'Vite / Next.js Build Hydration', 'Vercel / CDN Edge Propagation', 'Sub-second Visitor Content Loading'],
    integrations: ['Strapi CMS Dashboard', 'Vite Static Compiler', 'Node Cloudflare Cache Purger', 'PostgreSQL Content Store'],
    roiEstimate: '84% Decreased Load Time with Sub-Second Edge Hits'
  }
];

export const CAMPAIGN_FRAMEWORKS: CampaignFramework[] = [
  {
    id: 'seo-high-ticket',
    name: 'High-Ticket Solopreneur Keyword Dominance',
    channel: 'SEO & Search Engine Marketing',
    description: 'Hyper-targeted content strategies ranking for ultra-specific intent keywords, generating qualified inbound leads directly.',
    roiMultiplier: 6.8,
    tactics: ['Competitor Value GAP Scrapes', 'Technical Speed and Schema Overhaul', 'Intent-focused Editorial Cadence', 'Local Business schema injections']
  },
  {
    id: 'linked-in-b2b',
    name: 'B2B Authority Funnel Campaign',
    channel: 'LinkedIn Inbound Funnel',
    description: 'Content clusters showcasing technical consulting diagrams and system architectural schematics to drive CIO bookings.',
    roiMultiplier: 4.2,
    tactics: ['Architectural Case Study Releases', 'Inbound Booking Video Showcases', 'Direct Inbound DM Nurture Loops', 'Hyper-focused Industry Group Filtering']
  }
];

export const AVAILABLE_SLOTS: string[] = [
  'Monday 09:00 AM (EST)',
  'Monday 01:00 PM (EST)',
  'Tuesday 10:00 AM (EST)',
  'Tuesday 03:30 PM (EST)',
  'Wednesday 11:00 AM (EST)',
  'Wednesday 04:00 PM (EST)',
  'Thursday 09:30 AM (EST)',
  'Thursday 02:00 PM (EST)',
  'Friday 10:30 AM (EST)',
  'Friday 01:00 PM (EST)'
];
