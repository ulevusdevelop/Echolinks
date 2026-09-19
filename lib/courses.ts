// lib/courses.ts
//
// DATA SOURCE for /courses (archive + detail pages). Originally a
// static-only file (see the WordPress wiring note below); now the
// static array here is the FALLBACK, same role `placeholderPosts`
// plays in pages/insights/index.tsx — rendered only when the live
// WordPress "Courses" CPT can't be reached or hasn't been wired up on
// the WP side yet, so the page is never empty. `getCourses()` in
// lib/service.ts is what tries the real WPGraphQL data first; see
// docs/COURSES-CPT-ACF-SETUP.md for the WordPress-side setup (CPT
// registration + ACF field group) this fetch expects.
//
// CONTENT HONESTY NOTE (same standard this project has held to
// throughout GOOD-DESIGN-CHANGELOG.md): the two screenshots this data
// was originally built from only included FULL body copy for course
// #1. The other 7 only had a title, a short excerpt, and a publish
// date — no "Who this is for," agenda, or full narrative exists
// anywhere in that source material, so those 7 carry only the real
// excerpt, not invented curricula. `hasFullDetail: true` marks course
// #1 as the one exception with real, complete transcribed copy. Once
// the WordPress CPT is live, each real course's own `has_full_detail`
// ACF field controls this the same way.
//
// ICONS: `iconKey` is a plain string, not a component reference,
// specifically so a `Course` object can cross the getStaticProps ->
// props JSON boundary — Next.js can't serialize a React component
// (its `$$typeof` is a Symbol), which is exactly what WordPress-
// sourced courses need to do once they're fetched in getStaticProps.
// `ICONS_BY_KEY` below is the single place that resolves a key back to
// its real Heroicon, used by components/CourseTile and the archive
// grid. IMAGES: see docs/COURSES-CPT-ACF-SETUP.md for why these are
// original icon-tile compositions (this site's own 4-color brand
// system) rather than hotlinked or recreated stock imagery — same
// legal reasoning already applied to Hero's photo collage.
import type { ComponentType, SVGProps } from 'react';
import {
  CubeTransparentIcon,
  RocketLaunchIcon,
  HeartIcon,
  ArrowsRightLeftIcon,
  GlobeAltIcon,
  BuildingOffice2Icon,
  ServerStackIcon,
  ChartBarSquareIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline';

export type IconKey =
  | 'cube'
  | 'rocket'
  | 'heart'
  | 'arrows'
  | 'globe'
  | 'building'
  | 'server'
  | 'chart'
  | 'cap'; // generic fallback for a course an editor hasn't picked an icon for yet

export const ICONS_BY_KEY: Record<IconKey, ComponentType<SVGProps<SVGSVGElement>>> = {
  cube: CubeTransparentIcon,
  rocket: RocketLaunchIcon,
  heart: HeartIcon,
  arrows: ArrowsRightLeftIcon,
  globe: GlobeAltIcon,
  building: BuildingOffice2Icon,
  server: ServerStackIcon,
  chart: ChartBarSquareIcon,
  cap: AcademicCapIcon,
};

// Matches the ACF select field's choice list — see
// docs/COURSES-CPT-ACF-SETUP.md. Kept here as the single source of
// truth for what the WP editor is allowed to pick, so the setup doc's
// instructions and this file can't silently drift apart.
export const ICON_KEYS = Object.keys(ICONS_BY_KEY) as IconKey[];

export type CourseMetaRow = { label: string; value: string };

export type Course = {
  slug: string;
  title: string;
  iconKey: IconKey;
  tile: 'navy' | 'orange';
  date: string; // display date, as shown on the archive card
  excerpt: string; // plain text, HTML already stripped
  hasFullDetail: boolean;
  // Only populated for hasFullDetail courses — see the file header note.
  detail?: {
    tagline: string;
    workshopLine: string;
    understandLine: string;
    metaSummary: string;
    meta: CourseMetaRow[];
    whoFor: { lead: string; text: string }[];
    narrativeHeading: string;
    narrative: string[];
    whyMattersHeading: string;
    whyMattersIntro: string;
    whyMattersList: string[];
    agendaHeading: string;
    agenda: string;
    whoElseHeading: string;
    whoElseSubheading: string;
    whoElseIntro: string;
    whoElseList: string[];
  };
  // Optional bridge into the gated /lab simulations — thematically
  // related, not a guess: each id maps to a real entry in the `labs`
  // array in pages/lab.tsx.
  relatedLab?: { id: string; title: string };
};

// FALLBACK DATA — used whenever getCourses() (lib/service.ts) can't
// reach WordPress or the "Courses" CPT is empty/not-yet-created there.
// SLUGS: course #1's slug is confirmed directly from the original
// reference screenshot's own URL. The other 7 are a reasonable
// kebab-case guess from each title (standard WordPress behavior) — the
// real WP CPT is the actual source of truth once it's populated.
export const fallbackCourses: Course[] = [
  {
    slug: 'ai-to-decentralized-intelligence-and-traceability',
    title: 'AI to Decentralized Intelligence and Traceability',
    iconKey: 'cube',
    tile: 'navy',
    date: 'July 29, 2026',
    excerpt:
      'Hands-On Workshop: Build a Network That Governs Itself. Understand the technology. Then build a network with it. The workshop runs across two Saturdays.',
    hasFullDetail: true,
    relatedLab: { id: 'blockchain', title: 'Blockchain Foundations' },
    detail: {
      tagline: 'AI to Decentralized Artificial Intelligence and Traceability.',
      workshopLine: 'Hands-On Workshop: Build a DAI Network That Governs Itself',
      understandLine: 'Understand the technology. Then build a network with it.',
      metaSummary: 'Live online · Two Saturdays, 2 hours each · Hands-on · 25 seats',
      meta: [
        { label: 'Dates', value: 'Saturday, August 1 and Saturday, August 8, 2026 (two sessions)' },
        { label: 'Time', value: '8:30 am to 10:30 am EST both mornings. Length 2 hours each session, four hours total.' },
        { label: 'Format', value: 'Live on Zoom, hands-on. Seats 25.' },
        { label: 'Cost', value: 'Free' },
      ],
      whoFor: [
        { lead: 'AI professionals and data analysts', text: 'who want to understand the infrastructure that makes AI trustworthy, auditable, and traceable, not just how models generate results.' },
        { lead: 'Career changers', text: 'looking to build practical skills in emerging technologies before they become mainstream and highly competitive.' },
        { lead: 'Healthcare and IT professionals', text: 'preparing for the arrival of AI and wanting to understand the technologies behind security, compliance, governance, and trust.' },
        { lead: 'Software developers and engineers', text: 'who want the concepts behind decentralized systems, consensus networks, shared verifiable records, and AI traceability without focusing on any one framework.' },
        { lead: 'Business analysts, project managers, and technology leaders', text: 'who need to see how AI, traceability, and decentralized technologies fit into enterprise digital transformation.' },
        { lead: 'Non-developers', text: 'who are curious about emerging technologies and want a hands-on introduction with no programming experience required.' },
        { lead: 'Technology enthusiasts and innovators', text: 'interested in the future of AI, traceability, IoT, automation, autonomous systems, and the next generation of intelligent infrastructure.' },
      ],
      narrativeHeading: 'Two industries. The same problem. No one can answer it.',
      narrative: [
        '**A hospital.** A patient deteriorates overnight. The hospital’s system says the alert fired. The device manufacturer’s log says the firmware was current. The insurer’s file shows no notification received. The regulator asks a simple question, what actually happened, and four sophisticated organizations produce four answers that don’t match.',
        '**A food supply chain.** A batch of romaine is pulled for contamination. The grower says it left the farm clean. The processor says it arrived sealed. The distributor says the cold chain held. The store says it followed the recall. The question, where did this batch actually break and which other batches shared its path, takes days to answer. By then people are already sick.',
        'Nobody in either story is lying. Everybody kept records. The records just don’t agree, and no one has the standing to say which is right.',
        'One problem, two industries: independent parties who don’t trust each other, and no shared record they can all rely on. Solving it is what this workshop is about, and it is more approachable than the jargon around it suggests.',
        'Across two Saturday mornings you will understand what this technology actually is, who genuinely uses it, where it has failed, and how decentralized AI is built on top of it. The first session builds your understanding. The second, you build a working four-agent network yourself and watch it reject a participant trying to rewrite history, with no administrator and no referee.',
      ],
      whyMattersHeading: 'Why traceability matters',
      whyMattersIntro: 'Every AI system is moving toward having to answer questions it currently cannot:',
      whyMattersList: [
        'Where did this data come from?',
        'Who trained the model, and on what?',
        'Which version produced this specific decision?',
        'Can the result be audited after the fact?',
        'Has the underlying data been tampered with?',
        'Can a regulator verify the decision independently?',
      ],
      agendaHeading: 'The agenda',
      agenda:
        'Weekend one builds your understanding. Weekend two builds the network. The week in between gives the concepts time to settle, so you arrive at the lab ready to build rather than catching up.',
      whoElseHeading: 'Who’s already doing this',
      whoElseSubheading: 'Ten names you will recognize',
      whoElseIntro:
        'Real companies that have run Decentralized AI and traceability and provenance on shared, verifiable records:',
      whoElseList: [
        'Walmart traced leafy greens, mangoes, and pork on a shared record, cutting trace time from days to seconds.',
        'Nestlé put its Rainforest Alliance coffee brand on a traceability platform so buyers could follow the beans to source.',
        'Carrefour built shared-record traceability into its Act for Food program across products in dozens of countries.',
        'Tyson Foods ran farm-to-facility food-safety tracking pilots on the same technology.',
        'Unilever joined the IBM Food Trust consortium to test supply-chain traceability at scale.',
        'Kroger took part in the multi-retailer effort to trace fresh produce back to the farm.',
        'De Beers built Tracr to trace diamonds from mine to retail and prove they were conflict-free.',
        'Cargill used a shared record to let shoppers trace a Thanksgiving turkey back to the farm.',
        'Maersk built a global shipping-record platform with IBM, then wound it down when too few partners joined, a useful lesson in when this technology does and does not fit.',
        'IBM, SAP, Oracle, and VeChain are the platform vendors behind many of these, and the companies whose job postings you will actually find.',
        'Avaneer Health runs eligibility and prior authorization across payers covering 80 million people, with data staying under the control of whoever created it.',
        'MediLedger verifies 1.6 billion pharmaceutical transactions a year across manufacturers making 80 percent of US prescription drugs.',
      ],
    },
  },
  {
    slug: 'ai-automation-blockchain-for-entrepreneurs',
    title: 'AI, Automation & Blockchain for Entrepreneurs',
    iconKey: 'rocket',
    tile: 'orange',
    date: 'May 15, 2026',
    excerpt:
      'Course Structure Schedule Typically Saturday. Time Commitment? Plan for a 4-hour Saturday session plus 6 to 10 hours of guided async work during the week.',
    hasFullDetail: false,
    relatedLab: { id: 'blockchain', title: 'Blockchain Foundations' },
  },
  {
    slug: 'cerner-millennium-build-analyst',
    title: 'Cerner Millennium Build Analyst',
    iconKey: 'heart',
    tile: 'navy',
    date: 'June 24, 2026',
    excerpt:
      'Welcome to the Echolink Solutions Cerner Millennium Build Analyst Training Program that empowers you to become a Healthcare IT Professional with Hands-On Cerner Millennium Build.',
    hasFullDetail: false,
  },
  {
    slug: 'electronic-data-interchange-edi-application-programming-interface-api',
    title: 'Electronic Data Interchange (EDI) & Application Programming Interface (API)',
    iconKey: 'arrows',
    tile: 'navy',
    date: 'November 29, 2023',
    excerpt:
      'Monday, April 15 to Saturday, May 2, 2026. Welcome to the Electronic Data Interchange (EDI) Program – a comprehensive program designed for beginners and professionals.',
    hasFullDetail: false,
    relatedLab: { id: 'orders', title: 'The Missing Orders' },
  },
  {
    slug: 'electronic-data-interchange-for-administration-commerce-and-transport-un-edifact',
    title: 'Electronic Data Interchange for Administration, Commerce, and Transport (UN/EDIFACT)',
    iconKey: 'globe',
    tile: 'orange',
    date: 'January 22, 2024',
    excerpt:
      'Welcome to our course, "Introduction to EDIFACT" (Electronic Data Interchange for Administration, Commerce, and Transport). This course is designed to provide a comprehensive understanding.',
    hasFullDetail: false,
    relatedLab: { id: 'orders', title: 'The Missing Orders' },
  },
  {
    slug: 'enterprise-resource-planning-erp',
    title: 'Enterprise Resource Planning (ERP)',
    iconKey: 'building',
    tile: 'navy',
    date: 'January 4, 2024',
    excerpt:
      'Welcome to "Mastering Enterprise Resource Planning (ERP) with Microsoft Dynamics 365," a comprehensive course designed to provide in-depth knowledge of the world of ERP.',
    hasFullDetail: false,
  },
  {
    slug: 'healthcare-facets-configuration',
    title: 'Healthcare FACETS Configuration',
    iconKey: 'server',
    tile: 'orange',
    date: 'January 4, 2026',
    excerpt:
      'Introduction to Facets Course Overview. Introduction to Facets is a hands-on foundational course designed to prepare students and professionals for real-world work in healthcare payer systems.',
    hasFullDetail: false,
  },
  {
    slug: 'project-scheduling-earned-value-management-automation-course',
    title: 'Project Scheduling & Earned Value Management Automation Course',
    iconKey: 'chart',
    tile: 'navy',
    date: 'August 12, 2026',
    excerpt:
      'Program Duration: 5 Weeks. Schedule: Mondays through Thursdays, 6:30 PM to 8:30 PM EST. Weekly, Live Online, Instructor Led. Prerequisites: Basic Computer Skills. Software Covered: Oracle Primavera P6, Microsoft Project, Microsoft Power Automate.',
    hasFullDetail: false,
    relatedLab: { id: 'schedule', title: 'Schedule Recovery' },
  },
];

// Real WP data wins whenever it exists — same `isRealPosts`-style rule
// pages/insights/index.tsx already uses. Kept as one shared helper so
// the archive page and the detail page can never disagree about which
// list is "active" (that would make prev/next navigation and direct
// slug lookups inconsistent between the two pages).
export function resolveCourses(wpCourses: Course[]): Course[] {
  return wpCourses.length > 0 ? wpCourses : fallbackCourses;
}

export function getCourseBySlug(list: Course[], slug: string): Course | null {
  return list.find((c) => c.slug === slug) || null;
}

export function getAdjacentCourses(
  list: Course[],
  slug: string
): { prev: Course | null; next: Course | null } {
  const i = list.findIndex((c) => c.slug === slug);
  if (i === -1) return { prev: null, next: null };
  return {
    prev: i > 0 ? list[i - 1] : null,
    next: i < list.length - 1 ? list[i + 1] : null,
  };
}
