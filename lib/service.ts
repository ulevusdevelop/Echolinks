// RECONSTRUCTED STAND-IN — see audit notes. Replace with your real file.
import { fetchAPI } from './base';
import { Article, Post, WPCourseNode } from './types';
import { Course, IconKey, ICON_KEYS } from './courses';

export async function getArticles(count = 10): Promise<Article[]> {
  const data = await fetchAPI(
    `query AllPosts($count: Int) {
      posts(first: $count) {
        nodes {
          slug
          title
          content
          date
          tags { nodes { name } }
          featuredImage { node { sourceUrl } }
        }
      }
    }`,
    { count }
  );

  const nodes = data?.posts?.nodes || [];
  return nodes.map((n: any) => ({
    slug: n.slug,
    title: n.title,
    content: n.content,
    date: n.date,
    featuredImage: n.featuredImage?.node?.sourceUrl || '',
    tags: (n.tags?.nodes || []).map((t: any) => t.name),
  }));
}

export async function getPosts(count = 10): Promise<Post[]> {
  const articles = await getArticles(count);
  return articles;
}

// NEW — fetches the "Courses" CPT + its ACF field group over the same
// WPGraphQL endpoint, per docs/COURSES-CPT-ACF-SETUP.md. Every caller
// (pages/courses/index.tsx, pages/courses/[slug].tsx) wraps this in
// its own try/catch and falls back to lib/courses.ts's static
// `fallbackCourses` on any failure — same resilience pattern
// getArticles() already established for Insights, so a WP outage or a
// field group that isn't wired up yet degrades to real (if generic)
// content instead of a broken build or an empty page.
//
// FIELD NAMES: expects the ACF field group's own field names to match
// the setup doc exactly (camelCase, e.g. `workshopLine`, `metaRows`) —
// deliberately chosen so no casing conversion has to happen on either
// side. If your WPGraphQL for ACF plugin version exposes repeater
// fields wrapped in a `nodes` list instead of a plain array, adjust the
// `metaRows`/`whoFor`/`narrative`/`whyMattersList`/`whoElseList` lines
// below and their access in the mapper to match — see the doc's
// "Verify in GraphiQL" step for how to check the real shape your site
// returns before assuming this query is exactly right.
export async function getCourses(): Promise<Course[]> {
  const data = await fetchAPI(
    `query AllCourses {
      courses(first: 100) {
        nodes {
          slug
          title
          excerpt
          date
          featuredImage { node { sourceUrl } }
          courseFields {
            iconKey
            tile
            relatedLabId
            relatedLabTitle
            hasFullDetail
            tagline
            workshopLine
            understandLine
            metaSummary
            metaRows { label value }
            whoFor { lead text }
            narrativeHeading
            narrative { line }
            whyMattersHeading
            whyMattersIntro
            whyMattersList { item }
            agendaHeading
            agenda
            whoElseHeading
            whoElseSubheading
            whoElseIntro
            whoElseList { item }
          }
        }
      }
    }`
  );

  const nodes: WPCourseNode[] = data?.courses?.nodes || [];
  return nodes.map(mapWpCourseNode);
}

function mapWpCourseNode(n: WPCourseNode): Course {
  const f = n.courseFields || {};
  const iconKey: IconKey = ICON_KEYS.includes((f.iconKey || '') as IconKey)
    ? (f.iconKey as IconKey)
    : 'cap'; // generic fallback icon if an editor hasn't picked one, or picked an unrecognized value
  const tile: Course['tile'] = f.tile === 'orange' ? 'orange' : 'navy';

  const hasFullDetail = Boolean(f.hasFullDetail);

  return {
    slug: n.slug,
    title: n.title,
    iconKey,
    tile,
    date: n.date
      ? new Date(n.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
      : '',
    excerpt: (n.excerpt || '').replace(/<[^>]+>/g, '').trim(),
    hasFullDetail,
    relatedLab:
      f.relatedLabId && f.relatedLabTitle
        ? { id: f.relatedLabId, title: f.relatedLabTitle }
        : undefined,
    detail: hasFullDetail
      ? {
          tagline: f.tagline || '',
          workshopLine: f.workshopLine || '',
          understandLine: f.understandLine || '',
          metaSummary: f.metaSummary || '',
          meta: (f.metaRows || []).map((r) => ({ label: r.label || '', value: r.value || '' })),
          whoFor: (f.whoFor || []).map((w) => ({ lead: w.lead || '', text: w.text || '' })),
          narrativeHeading: f.narrativeHeading || '',
          narrative: (f.narrative || []).map((row) => row.line || ''),
          whyMattersHeading: f.whyMattersHeading || '',
          whyMattersIntro: f.whyMattersIntro || '',
          whyMattersList: (f.whyMattersList || []).map((row) => row.item || ''),
          agendaHeading: f.agendaHeading || '',
          agenda: f.agenda || '',
          whoElseHeading: f.whoElseHeading || '',
          whoElseSubheading: f.whoElseSubheading || '',
          whoElseIntro: f.whoElseIntro || '',
          whoElseList: (f.whoElseList || []).map((row) => row.item || ''),
        }
      : undefined,
  };
}
