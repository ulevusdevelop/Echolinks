// pages/courses/index.tsx
//
// NEW PAGE (direct request): "create a new /courses page on the
// website, like the one on the screenshot." Mirrors the real
// screenshot supplied for this page directly — the live WordPress
// course archive, headed "Archives: Courses" (WordPress's own default
// archive-title format for a "Courses" custom post type) with a full-
// width orange rule underneath, then a 3-column grid of cards: image,
// small icon + title, excerpt, "READ MORE" link, and a date/comments
// meta line.
//
// DELIBERATE STYLE CHOICE: every other index/listing page on this site
// (Insights, Training, ProjectControls, etc.) opens with a dark
// (#16003B) hero band before the content, per this codebase's own
// established convention. This page intentionally does NOT — the
// screenshot supplied specifically for this page shows a plain white
// page background straight from the header, "Archives: Courses" in
// navy with the orange rule below it, no dark band at all. Since this
// screenshot was given as the literal reference to match for this one
// page, matching it directly takes priority over the sitewide
// convention here. (Header/footer chrome around it is unchanged and
// already matches the current site via AppLayout, same as every page.)
//
// DATA: see lib/courses.ts for the full sourcing/content-honesty note.
// WORDPRESS WIRING (direct request): now tries the real "Courses" CPT
// via getCourses() (lib/service.ts) first, same fetch-with-fallback
// pattern pages/insights/index.tsx already uses for its posts — the
// static `fallbackCourses` only renders if that fetch fails or the CPT
// is still empty. See docs/COURSES-CPT-ACF-SETUP.md for the WordPress
// side of this (CPT + ACF field group + WPGraphQL exposure).
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { ICONS_BY_KEY, resolveCourses, Course } from '@/lib/courses';
import { getCourses } from '@/lib/service';
import { CourseTile } from '@/components/CourseTile';

type CoursesIndexProps = {
  wpCourses: Course[];
};

export default function CoursesIndexPage({ wpCourses }: CoursesIndexProps) {
  const courses = resolveCourses(wpCourses);

  return (
    <>
      <Head>
        <title>Courses — Echolink Solutions</title>
        <meta
          name="description"
          content="Hands-on courses and workshops in decentralized AI, EDI, ERP, project controls, and healthcare systems from Echolink Solutions."
        />
        <meta property="og:title" content="Courses — Echolink Solutions" />
        <meta
          property="og:description"
          content="Hands-on courses and workshops in decentralized AI, EDI, ERP, project controls, and healthcare systems from Echolink Solutions."
        />
      </Head>

      <section className="bg-white !pt-44 pb-8">
        <div className="wrap">
          <h1
            className="font-bold text-3xl md:text-4xl pb-6 mb-0 border-b-2"
            style={{ color: '#16003B', borderColor: 'var(--accent)' }}
          >
            Archives: Courses
          </h1>
        </div>
      </section>

      <section className="bg-white pb-24">
        <div className="wrap">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => {
              const Icon = ICONS_BY_KEY[course.iconKey];
              return (
                <article
                  key={course.slug}
                  className="bg-white flex flex-col"
                  style={{ boxShadow: '0 4px 14px rgba(22,0,59,0.12)' }}
                >
                  <CourseTile course={course} />
                  <div className="p-6 flex flex-col flex-1">
                    <h2 className="font-bold text-lg leading-snug mb-3" style={{ color: '#16003B' }}>
                      <Icon className="inline-block w-4 h-4 mr-2 -mt-1" style={{ color: 'var(--accent)' }} aria-hidden="true" />
                      {course.title}
                    </h2>
                    <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: '#707070' }}>
                      {course.excerpt}
                    </p>
                    <Link
                      href={`/courses/${course.slug}`}
                      className="text-sm font-bold uppercase tracking-tag mb-4 inline-block w-fit"
                      style={{ color: 'var(--accent)' }}
                    >
                      Read More »
                    </Link>
                    <p className="text-xs pt-4 border-t" style={{ color: '#8A8A8A', borderColor: '#EDEDED' }}>
                      {course.date} &nbsp;·&nbsp; No Comments
                    </p>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="text-center mt-16 pt-10 border-t" style={{ borderColor: '#EDEDED' }}>
            <p className="text-base mb-4" style={{ color: '#434343' }}>
              Looking for something not listed here?
            </p>
            <Link href="/contact" className="btn btn--primary-inverse">
              Talk to us about training →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps<CoursesIndexProps> = async () => {
  let wpCourses: Course[] = [];
  try {
    wpCourses = await getCourses();
  } catch (err) {
    console.warn('Could not fetch courses from WordPress:', err);
  }

  return {
    props: { wpCourses },
    revalidate: 60,
  };
};
