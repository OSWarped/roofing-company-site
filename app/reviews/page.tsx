import Link from "next/link";
import type { Metadata } from "next";
import Container from "../../components/shared/Container";
import SectionHeading from "../../components/shared/SectionHeading";
import { siteContent } from "../../data/site-content";

export const metadata: Metadata = {
  title: `Reviews | ${siteContent.companyName}`,
  description:
    "See how Integrity Roofing of Mississippi plans to showcase verified customer feedback and build trust online across the Mississippi Gulf Coast.",
};

const reviewGoals = [
  "Add verified Google reviews using the full business name: Integrity Roofing of Mississippi.",
  "Feature city names when customers naturally mention where the work was completed.",
  "Highlight a mix of repair, replacement, and storm-related projects.",
];

export default function ReviewsPage() {
  return (
    <>
      <section className="border-b border-zinc-200 bg-zinc-50 py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Reviews"
            title="A place to build visible trust over time"
            description="This page is designed to support the company’s online footprint by showcasing real customer feedback as it is collected."
          />
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-zinc-900">What belongs here</h2>
              <p className="mt-4 text-sm leading-7 text-zinc-600">
                Verified reviews from Google, Facebook, and other real customer
                sources will give this page much more value than placeholders or
                generic testimonials.
              </p>
              <ul className="mt-8 space-y-4">
                {reviewGoals.map((goal) => (
                  <li
                    key={goal}
                    className="rounded-2xl border border-zinc-200 bg-white px-5 py-4 text-sm text-zinc-700"
                  >
                    {goal}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-dashed border-zinc-300 bg-zinc-50 p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
                Current State
              </p>
              <h2 className="mt-4 text-2xl font-semibold text-zinc-900">
                {siteContent.reviewsPlaceholder.title}
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-600 sm:text-base">
                {siteContent.reviewsPlaceholder.text}
              </p>

              <div className="mt-8 grid gap-5 md:grid-cols-2">
                {[1, 2].map((slot) => (
                  <div
                    key={slot}
                    className="rounded-2xl border border-zinc-200 bg-white p-6"
                  >
                    <div className="h-3 w-24 rounded bg-zinc-200" />
                    <div className="mt-5 space-y-3">
                      <div className="h-3 rounded bg-zinc-200" />
                      <div className="h-3 rounded bg-zinc-200" />
                      <div className="h-3 w-4/5 rounded bg-zinc-200" />
                    </div>
                    <div className="mt-6 h-3 w-32 rounded bg-zinc-200" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-zinc-900 py-16 text-white sm:py-20">
        <Container>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:flex md:items-end md:justify-between md:gap-8 md:p-10">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-300">
                Trust Signals
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Reviews, project photos, and consistent branding work together
              </h2>
              <p className="mt-4 text-base leading-7 text-zinc-300 sm:text-lg">
                As real customer feedback is added, this page can become an
                important part of showing the difference between {siteContent.companyName}
                and similarly named companies in the region.
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row md:mt-0">
              <Link
                href="/gallery"
                className="rounded-md bg-white px-6 py-3 text-center text-sm font-semibold text-zinc-900 transition hover:bg-zinc-200"
              >
                View Gallery
              </Link>
              <Link
                href="/contact"
                className="rounded-md border border-white/20 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Request an Estimate
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
