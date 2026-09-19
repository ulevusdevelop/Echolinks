export interface Post {
  slug: string;
  title: string;
  content: string;
  featuredImage: string;
  date: string;
}

export interface Article {
  slug: string;
  title: string;
  content: string;
  featuredImage: string;
  date: string;
  tags: string[];
}

// Raw shape returned by the WPGraphQL "courses" query in
// lib/service.ts's getCourses() — the ACF field group's own field
// names, exactly as set up per docs/COURSES-CPT-ACF-SETUP.md. This is
// intentionally close to the wire format (not yet mapped to the
// frontend's `Course` shape from lib/courses.ts); getCourses() does
// that mapping so every page importing from lib/courses.ts keeps
// working against one stable shape regardless of what WordPress
// happens to return.
export interface WPCourseNode {
  slug: string;
  title: string;
  excerpt: string; // WP excerpt field — arrives as HTML, stripped by getCourses()
  date: string;
  featuredImage?: { node?: { sourceUrl?: string } } | null;
  courseFields?: {
    iconKey?: string | null;
    tile?: string | null;
    relatedLabId?: string | null;
    relatedLabTitle?: string | null;
    hasFullDetail?: boolean | null;
    tagline?: string | null;
    workshopLine?: string | null;
    understandLine?: string | null;
    metaSummary?: string | null;
    metaRows?: { label?: string | null; value?: string | null }[] | null;
    whoFor?: { lead?: string | null; text?: string | null }[] | null;
    narrativeHeading?: string | null;
    narrative?: { line?: string | null }[] | null;
    whyMattersHeading?: string | null;
    whyMattersIntro?: string | null;
    whyMattersList?: { item?: string | null }[] | null;
    agendaHeading?: string | null;
    agenda?: string | null;
    whoElseHeading?: string | null;
    whoElseSubheading?: string | null;
    whoElseIntro?: string | null;
    whoElseList?: { item?: string | null }[] | null;
  } | null;
}
