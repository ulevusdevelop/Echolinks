# Courses CPT + ACF — WordPress Side Setup

Companion to `MEMBERPRESS-BACKEND-SETUP.md` (that doc covers login/JWT
+ membership status; this one covers exposing a "Courses" custom post
type and its ACF fields to the same WPGraphQL endpoint, which is what
`lib/service.ts`'s `getCourses()` queries). Do that doc first if you
haven't — this one assumes WPGraphQL is already installed and working.

## 0. Plugins needed

In addition to WPGraphQL + WPGraphQL JWT Authentication from the other
doc, install and activate:

1. **Advanced Custom Fields** (ACF — the free version is enough; ACF
   PRO isn't required for anything below).
2. **WPGraphQL for Advanced Custom Fields** (search
   "wpgraphql-acf" / "WPGraphQL for ACF" in Plugins → Add New — this is
   what actually exposes ACF field values to the GraphQL schema; ACF
   alone doesn't do that).

## 1. Register the "Courses" custom post type

Add this to the same theme `functions.php` (or custom plugin) the
MemberPress bridge snippet already lives in — keeping all of this
site's custom PHP in one place:

```php
add_action('init', function () {
    register_post_type('course', [
        'label' => 'Courses',
        'labels' => [
            'name' => 'Courses',
            'singular_name' => 'Course',
        ],
        'public' => true,
        'has_archive' => true,
        'show_in_rest' => true,
        'menu_icon' => 'dashicons-welcome-learn-more',
        'supports' => ['title', 'editor', 'excerpt', 'thumbnail'],
        // These three lines are what actually put it on the GraphQL
        // schema — without them WPGraphQL won't know this post type
        // exists, no matter how ACF is configured.
        'show_in_graphql' => true,
        'graphql_single_name' => 'course',
        'graphql_plural_name' => 'courses',
    ]);
});
```

This matches what `getCourses()` in `lib/service.ts` already queries
(`courses(first: 100) { nodes { ... } }`) — no frontend change needed
once this is active.

## 2. Create the ACF field group

In WP Admin → Custom Fields → Field Groups → Add New, create one group
(e.g. "Course Details") with **Location: Post Type is equal to
Course**, and add these fields. **Field names must match exactly**
(camelCase, as written) — the GraphQL query only knows these names,
not whatever else you might otherwise pick:

| Field name | Type | Notes |
|---|---|---|
| `iconKey` | Select | Choices: `cube`, `rocket`, `heart`, `arrows`, `globe`, `building`, `server`, `chart`, `cap` — see `lib/courses.ts`'s `ICON_KEYS` for the exact list this maps to. |
| `tile` | Select | Choices: `navy`, `orange` (tile background color) |
| `relatedLabId` | Text | Optional. One of the ids in the `labs` array in `pages/lab.tsx` (`blockchain`, `orders`, `schedule`, `trace`, `agent`, `city`) if this course pairs with a Lab simulation. |
| `relatedLabTitle` | Text | Optional. The matching lab's display title, e.g. "Blockchain Foundations". |
| `hasFullDetail` | True/False | Turn on only once you've filled in every field below for this course — the detail page renders the short honest-summary layout instead when this is off. |
| `tagline` | Text | |
| `workshopLine` | Text | |
| `understandLine` | Text | |
| `metaSummary` | Text | The bold one-line summary above the meta list, e.g. "Live online · Two Saturdays, 2 hours each..." |
| `metaRows` | Repeater | Sub-fields: `label` (Text), `value` (Text). One row per meta line (Dates, Time, Format, Cost, etc.) |
| `whoFor` | Repeater | Sub-fields: `lead` (Text, the bolded lead-in), `text` (Textarea) |
| `narrativeHeading` | Text | |
| `narrative` | Repeater | Sub-field: `line` (Textarea). Wrap a lead-in phrase in `**double asterisks**` to render it bold, same convention the current fallback copy uses — no markdown library involved, just that one pattern. |
| `whyMattersHeading` | Text | |
| `whyMattersIntro` | Textarea | |
| `whyMattersList` | Repeater | Sub-field: `item` (Text) |
| `agendaHeading` | Text | |
| `agenda` | Textarea | |
| `whoElseHeading` | Text | |
| `whoElseSubheading` | Text | |
| `whoElseIntro` | Textarea | |
| `whoElseList` | Repeater | Sub-field: `item` (Textarea) |

Everything else the pages use (title, excerpt, publish date, featured
image) is a core WordPress field, not ACF — nothing to add for those.

**In the field group's own settings (bottom of the edit screen), turn
on "Show in GraphQL"** and set **GraphQL Field Name** to `courseFields`
— this is the name the query in `lib/service.ts` expects
(`courseFields { iconKey tile ... }`). Getting this one setting wrong
(wrong name, or left off) is the most common reason the whole thing
comes back empty.

## 3. Verify in GraphiQL before trusting the frontend

Same IDE as the other doc
(`/wp-admin/admin.php?page=graphiql-ide`, or any GraphQL client pointed
at your `/graphql` endpoint). Run:

```graphql
query TestCourses {
  courses(first: 5) {
    nodes {
      slug
      title
      excerpt
      date
      featuredImage { node { sourceUrl } }
      courseFields {
        iconKey
        tile
        hasFullDetail
        tagline
        metaRows { label value }
        whoFor { lead text }
      }
    }
  }
}
```

**If `metaRows`/`whoFor`/etc. come back as an error instead of an
array**, your installed version of WPGraphQL for ACF may expose
repeater fields wrapped differently (e.g. `metaRows { nodes { label
value } }` instead of a plain array) — check the schema docs panel in
GraphiQL for the actual `metaRows` field's type, and if it's wrapped,
adjust both the query and the mapping function (`mapWpCourseNode` in
`lib/service.ts`) to match. This is the one part of the wiring that
genuinely varies by plugin version and couldn't be verified against a
live site while building it — a 10-minute fix once you can see the
real schema, not a redesign.

## 4. Add the courses

Add each course as a normal WordPress post (Courses → Add New), fill
in the ACF fields, publish. The slug you set here is what the frontend
routes to at `/courses/<slug>` — for the courses already live on the
frontend's fallback data, use these exact slugs so URLs already shared
or indexed keep working once WordPress takes over as the real source:

```
ai-to-decentralized-intelligence-and-traceability
ai-automation-blockchain-for-entrepreneurs
cerner-millennium-build-analyst
electronic-data-interchange-edi-application-programming-interface-api
electronic-data-interchange-for-administration-commerce-and-transport-un-edifact
enterprise-resource-planning-erp
healthcare-facets-configuration
project-scheduling-earned-value-management-automation-course
```

You don't have to add all 8 at once, or in order — the frontend shows
whatever WordPress returns (any number of courses) once at least one
exists; until then it keeps showing the built-in fallback content, so
the page is never broken or empty while you're filling this in.

## 5. Point the frontend at your WordPress site

One environment variable, already scaffolded in `render.yaml` and
`.env.example`:

```
NEXT_PUBLIC_WORDPRESS_API_ENDPOINT=https://your-wordpress-domain.com/graphql
```

Set the real value in the Render dashboard (Environment tab on the
`echolink-frontend` service) — it's marked `sync: false` in
`render.yaml` specifically so it's set once there rather than committed
to the repo. Setting or changing it requires a redeploy to take effect
(Render redeploys automatically on an env var change by default).

## 6. CORS

WPGraphQL's default response already sends
`Access-Control-Allow-Origin: *` for the `/graphql` endpoint, so a
plain POST request (what `lib/base.ts`'s `fetchAPI` sends, no
credentials/cookies involved — same JWT-in-header approach as the
MemberPress bridge doc's CORS note) should work with no extra CORS
configuration. If requests still fail with a CORS error in the browser
console specifically (not a 401/500 — check that first), a hosting
firewall (common on shared hosts like Hostinger) may be stripping the
header; that needs a server-level fix (a small `send_headers` action
adding the header explicitly, or a hosting support ticket), not a
frontend change.
