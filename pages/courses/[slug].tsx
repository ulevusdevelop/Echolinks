// pages/courses/[slug].tsx
//
// NEW PAGE (direct request), single course detail. Structure and copy
// for `hasFullDetail` courses is transcribed directly from the real
// course-page screenshot supplied: meta info block, "Who this
// workshop is for," the two-industries narrative, "Why traceability
// matters," "The agenda," "Who's already doing this," a Register CTA
// with a Login link underneath, and Previous/Next course navigation.
// See lib/courses.ts's file header for the content-honesty note on why
// the 7 courses without sourced full copy render a shorter, honest
// summary instead of invented curriculum.
//
// SIMULATION ACCESS (direct request): "when the user tries to access
// [a simulation], they should be greeted with a login or register
// account first and only after that before they can be redirected to
// where they can access the simulation." The related-lab CTA below
// links to /lab, which RequireMembership now actually gates again (see
// components/RequireMembership — the TESTING_BYPASS_ALL_GATES flag is
// restored to false as part of this same change). An anonymous visitor
// clicking through lands on the sign-in/become-a-member prompt first,
// carrying a `redirect` back to /lab, and only reaches the simulation
// cards (including the real external Blockchain Foundations platform
// link) after that.
// WORDPRESS WIRING (direct request): now tries the real "Courses" CPT
// via getCourses() (lib/service.ts) first, falling back to
// lib/courses.ts's static `fallbackCourses` on any failure — same
// pattern pages/insights/[slug].tsx already uses. `fallback: 'blocking'`
// on getStaticPaths means a course slug added in WordPress after the
// last deploy still resolves on first request instead of 404ing, and
// `revalidate: 60` keeps it in sync afterward without a full redeploy.
// See docs/COURSES-CPT-ACF-SETUP.md for the WordPress side.
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import { resolveCourses, getCourseBySlug, getAdjacentCourses, Course } from '@/lib/courses';
import { getCourses } from '@/lib/service';
import { CourseTile } from '@/components/CourseTile';

type CoursePageProps = {
  course: Course | null;
  prev: Course | null;
  next: Course | null;
};

// Renders `**lead-in**` as bold, same lightweight convention used in
// the narrative data (avoids pulling in a markdown parser dependency
// for two bolded phrases).
function renderNarrative(line: string, key: number) {
  const parts = line.split(/(\*\*[^*]+\*\*)/g);
  return (
    <p key={key} className="text-base leading-relaxed mb-5" style={{ color: '#434343' }}>
      {parts.map((part, i) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={i} style={{ color: '#16003B' }}>
            {part.slice(2, -2)}
          </strong>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        )
      )}
    </p>
  );
}

export default function CoursePage({ course, prev, next }: CoursePageProps) {
  if (!course) {
    return (
      <div className="pt-44">
        <section className="section--page text-center">
          <div className="wrap">
            <h1 className="sec-title">Course not found.</h1>
            <Link href="/courses" className="btn btn--ghost mt-6 inline-flex">
              ← Back to Courses
            </Link>
          </div>
        </section>
      </div>
    );
  }

  const d = course.detail;

  return (
    <>
      <Head>
        <title>{course.title} — Echolink Solutions</title>
        <meta
          name="description"
          content={course.excerpt}
        />
        <meta property="og:title" content={`${course.title} — Echolink Solutions`} />
        <meta property="og:description" content={course.excerpt} />
      </Head>

      <div className="pt-44">
        <article className="bg-white pb-20">
          <div className="wrap max-w-3xl">
            <Link
              href="/courses"
              className="text-xs font-bold uppercase tracking-tag mb-8 inline-block"
              style={{ color: 'var(--accent)' }}
            >
              ← All Courses
            </Link>

            <h1 className="font-bold text-3xl md:text-4xl leading-tight mb-5" style={{ color: '#16003B' }}>
              {course.title}
            </h1>

            {d ? (
              <>
                <p className="text-base italic mb-6" style={{ color: '#434343' }}>
                  {d.tagline}
                </p>
                <p className="font-bold text-lg mb-2" style={{ color: '#16003B' }}>
                  {d.workshopLine}
                </p>
                <p className="text-base italic mb-8" style={{ color: '#434343' }}>
                  {d.understandLine}
                </p>

                <div className="p-6 md:p-8 mb-10" style={{ background: '#F7F7F9', border: '1px solid #EDEDED' }}>
                  <p className="font-bold text-sm mb-5" style={{ color: '#16003B' }}>
                    {d.metaSummary}
                  </p>
                  <dl className="flex flex-col gap-3 mb-6">
                    {d.meta.map((row) => (
                      <div key={row.label} className="text-sm leading-relaxed">
                        <dt className="inline font-bold" style={{ color: '#16003B' }}>
                          {row.label}:{' '}
                        </dt>
                        <dd className="inline" style={{ color: '#434343' }}>
                          {row.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <Link href={`/login?redirect=${encodeURIComponent(`/courses/${course.slug}`)}`} className="btn btn--primary">
                    Register Here →
                  </Link>
                </div>

                <h2 className="font-bold text-2xl mb-6" style={{ color: '#16003B' }}>
                  Who this workshop is for?
                </h2>
                {d.whoFor.map((item) => (
                  <p key={item.lead} className="text-base leading-relaxed mb-4" style={{ color: '#434343' }}>
                    <strong style={{ color: '#16003B' }}>{item.lead}</strong> {item.text}
                  </p>
                ))}

                <h2 className="font-bold text-xl mt-10 mb-6" style={{ color: '#16003B' }}>
                  {d.narrativeHeading}
                </h2>
                {d.narrative.map((line, i) => renderNarrative(line, i))}

                <h2
                  className="font-bold text-xl mt-10 mb-5 pb-2 border-b-2 w-fit"
                  style={{ color: '#16003B', borderColor: 'var(--accent)' }}
                >
                  {d.whyMattersHeading}
                </h2>
                <p className="text-base leading-relaxed mb-4" style={{ color: '#434343' }}>
                  {d.whyMattersIntro}
                </p>
                <ul className="flex flex-col gap-2 mb-10 pl-5">
                  {d.whyMattersList.map((item) => (
                    <li key={item} className="text-base leading-relaxed list-disc" style={{ color: '#434343' }}>
                      {item}
                    </li>
                  ))}
                </ul>

                <h2
                  className="font-bold text-xl mb-5 pb-2 border-b-2 w-fit"
                  style={{ color: '#16003B', borderColor: 'var(--accent)' }}
                >
                  {d.agendaHeading}
                </h2>
                <p className="text-base leading-relaxed mb-10" style={{ color: '#434343' }}>
                  {d.agenda}
                </p>

                <h2 className="font-bold text-xl mb-1" style={{ color: '#16003B' }}>
                  {d.whoElseHeading}
                </h2>
                <p className="text-base font-bold mb-4" style={{ color: 'var(--accent)' }}>
                  {d.whoElseSubheading}
                </p>
                <p className="text-base leading-relaxed mb-5" style={{ color: '#434343' }}>
                  {d.whoElseIntro}
                </p>
                <ol className="flex flex-col gap-3 mb-10 pl-5">
                  {d.whoElseList.map((item, i) => (
                    <li key={i} className="text-base leading-relaxed list-decimal" style={{ color: '#434343' }}>
                      {item}
                    </li>
                  ))}
                </ol>

                {course.relatedLab && (
                  <div className="p-6 md:p-8 mb-10" style={{ background: '#16003B' }}>
                    <span className="tag-mono tag-mono--accent">FROM THE ECHOLINK LAB</span>
                    <h3 className="text-white font-bold text-lg mt-2 mb-3">
                      Try it yourself: {course.relatedLab.title}
                    </h3>
                    <p className="text-ink_text-secondary text-base leading-relaxed mb-5">
                      This course pairs with a hands-on simulation in the Echolink Lab. Sign in or
                      create a free account to open it.
                    </p>
                    <Link href={`/login?redirect=${encodeURIComponent('/lab')}`} className="btn btn--primary">
                      Sign in to open the Lab →
                    </Link>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-8 border-t" style={{ borderColor: '#EDEDED' }}>
                  <Link href={`/login?redirect=${encodeURIComponent(`/courses/${course.slug}`)}`} className="btn btn--primary">
                    Register Here →
                  </Link>
                  <Link href="/login" className="text-sm underline" style={{ color: '#434343' }}>
                    Login
                  </Link>
                </div>
              </>
            ) : (
              <>
                {/* Honest summary for courses without sourced full copy
                    — see lib/courses.ts header note. Real excerpt and a
                    real path to talk to a human, no invented syllabus. */}
                <div className="mb-10">
                  <CourseTile course={course} className="mb-8 max-w-md" />
                  <p className="text-base leading-relaxed mb-3" style={{ color: '#434343' }}>
                    {course.excerpt}
                  </p>
                  <p className="text-sm" style={{ color: '#8A8A8A' }}>
                    {course.date} &nbsp;·&nbsp; No Comments
                  </p>
                </div>

                <div className="p-6 md:p-8 mb-10" style={{ background: '#F7F7F9', border: '1px solid #EDEDED' }}>
                  <h2 className="font-bold text-xl mb-3" style={{ color: '#16003B' }}>
                    Full course details coming soon.
                  </h2>
                  <p className="text-base leading-relaxed mb-6" style={{ color: '#434343' }}>
                    The full schedule, agenda, and registration for this course aren&apos;t published
                    here yet. Reach out and we&apos;ll get you the details directly.
                  </p>
                  <Link href="/contact" className="btn btn--primary">
                    Talk to us about this course →
                  </Link>
                </div>

                {course.relatedLab && (
                  <div className="p-6 md:p-8 mb-10" style={{ background: '#16003B' }}>
                    <span className="tag-mono tag-mono--accent">FROM THE ECHOLINK LAB</span>
                    <h3 className="text-white font-bold text-lg mt-2 mb-3">
                      Try it yourself: {course.relatedLab.title}
                    </h3>
                    <p className="text-ink_text-secondary text-base leading-relaxed mb-5">
                      This course pairs with a hands-on simulation in the Echolink Lab. Sign in or
                      create a free account to open it.
                    </p>
                    <Link href={`/login?redirect=${encodeURIComponent('/lab')}`} className="btn btn--primary">
                      Sign in to open the Lab →
                    </Link>
                  </div>
                )}

                <Link href="/login" className="text-sm underline" style={{ color: '#434343' }}>
                  Login
                </Link>
              </>
            )}
          </div>
        </article>

        <nav className="bg-white pb-20 border-t" style={{ borderColor: '#EDEDED' }}>
          <div className="wrap max-w-3xl flex items-center justify-between pt-8 text-sm font-bold" style={{ color: 'var(--accent)' }}>
            {prev ? (
              <Link href={`/courses/${prev.slug}`}>← Previous Course</Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link href={`/courses/${next.slug}`}>Next Course →</Link>
            ) : (
              <span />
            )}
          </div>
        </nav>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  let wpCourses: Course[] = [];
  try {
    wpCourses = await getCourses();
  } catch (err) {
    console.warn('Could not fetch courses for static paths:', err);
  }

  return {
    paths: resolveCourses(wpCourses).map((c) => ({ params: { slug: c.slug } })),
    // 'blocking' (not false): a course published in WordPress after
    // the last deploy still resolves on first request instead of
    // 404ing — same reasoning pages/insights/[slug].tsx already uses.
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<CoursePageProps> = async ({ params }) => {
  const slug = params?.slug as string;
  let wpCourses: Course[] = [];
  try {
    wpCourses = await getCourses();
  } catch (err) {
    console.warn('Could not fetch courses:', err);
  }

  const list = resolveCourses(wpCourses);
  const course = getCourseBySlug(list, slug);
  const { prev, next } = getAdjacentCourses(list, slug);

  return {
    props: { course, prev, next },
    revalidate: 60,
  };
};
