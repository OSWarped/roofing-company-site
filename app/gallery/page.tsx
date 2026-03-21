import Link from "next/link";
import type { Metadata } from "next";
import Container from "../../components/shared/Container";
import SectionHeading from "../../components/shared/SectionHeading";
import { siteContent } from "../../data/site-content";

export const metadata: Metadata = {
  title: `Gallery | ${siteContent.companyName}`,
  description:
    "View project gallery placeholders and future project highlights for Integrity Roofing of Mississippi on the Mississippi Gulf Coast.",
};

export default function GalleryPage() {
  return (
    <>
      <section className="border-b border-zinc-200 bg-zinc-50 py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Gallery"
            title="Recent work and future project highlights"
            description="This page is ready for real roofing photography, before-and-after examples, and project summaries that strengthen online trust."
          />
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {siteContent.galleryProjects.map((project, index) => (
              <article
                key={`${project.title}-${index}`}
                className="overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-50 shadow-sm"
              >
                <div className="flex aspect-[16/10] items-end bg-gradient-to-br from-zinc-200 via-zinc-100 to-zinc-300 p-6">
                  <p className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-600 backdrop-blur">
                    Project Placeholder
                  </p>
                </div>
                <div className="p-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
                    {project.location}
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold text-zinc-900">{project.title}</h2>
                  <p className="mt-4 text-sm leading-7 text-zinc-600">{project.description}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-zinc-50 py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-center">
            <div>
              <SectionHeading
                eyebrow="What to add next"
                title="Project photos should reinforce the full brand name"
                description="When real project imagery is added, include short summaries, city names, and alt text that reference Integrity Roofing of Mississippi and the Mississippi Gulf Coast."
              />
            </div>
            <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-zinc-900">Best gallery additions</h3>
              <ul className="mt-6 space-y-4 text-sm leading-7 text-zinc-600">
                <li>Before-and-after residential roof replacements</li>
                <li>Storm-related repairs with concise project notes</li>
                <li>Metal roofing projects with clean finished photos</li>
                <li>Commercial work that supports broader capability messaging</li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-zinc-900 py-16 text-white sm:py-20">
        <Container>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:flex md:items-end md:justify-between md:gap-8 md:p-10">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-300">
                Next Step
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to talk about your roof?
              </h2>
              <p className="mt-4 text-base leading-7 text-zinc-300 sm:text-lg">
                The gallery helps build confidence, but the fastest way to move
                forward is still a direct conversation about your property and
                what is going on with the roof.
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row md:mt-0">
              <Link
                href="/contact"
                className="rounded-md bg-white px-6 py-3 text-center text-sm font-semibold text-zinc-900 transition hover:bg-zinc-200"
              >
                Request an Estimate
              </Link>
              <a
                href={`tel:${siteContent.phone}`}
                className="rounded-md border border-white/20 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Call {siteContent.phone}
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
