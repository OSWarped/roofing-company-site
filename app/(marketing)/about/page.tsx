import Link from "next/link";
import type { Metadata } from "next";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import { siteContent } from "@/data/site-content";

export const metadata: Metadata = {
  title: `About | ${siteContent.companyName}`,
  description:
    "Learn more about Integrity Roofing of Mississippi, a licensed and insured roofing company serving the Mississippi Gulf Coast.",
};

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-zinc-200 bg-zinc-50 py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="About"
            title="A Mississippi roofing name with a Gulf Coast focus"
            description={`${siteContent.about.intro} ${siteContent.licenseNumber}.`}
          />
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div className="space-y-6 text-base leading-8 text-zinc-600 sm:text-lg">
              <p>{siteContent.about.story}</p>
              
            </div>

            <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
                Company Snapshot
              </p>
              <dl className="mt-6 space-y-5 text-sm text-zinc-600">
                <div>
                  <dt className="font-semibold text-zinc-900">Company</dt>
                  <dd>{siteContent.companyName}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-zinc-900">Coverage</dt>
                  <dd>{siteContent.serviceArea}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-zinc-900">Credentials</dt>
                  <dd>Licensed &amp; Insured • {siteContent.licenseNumber}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-zinc-900">Contact</dt>
                  <dd>{siteContent.phone}</dd>
                  <dd>{siteContent.email}</dd>
                </div>
              </dl>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-zinc-50 py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="What matters"
            title="Core values behind the work"
            description="These themes can support the brand story across the site, estimate materials, and future review requests."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {siteContent.about.values.map((value) => (
              <div
                key={value.title}
                className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm"
              >
                <h3 className="text-xl font-semibold text-zinc-900">{value.title}</h3>
                <p className="mt-4 text-sm leading-7 text-zinc-600">{value.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <SectionHeading
                eyebrow="Service Area"
                title="Built to serve the Mississippi Gulf Coast"
                description={siteContent.serviceAreaDetail}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {siteContent.serviceCities.map((city) => (
                <div
                  key={city}
                  className="rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-sm font-medium text-zinc-700"
                >
                  {city}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-zinc-900 py-16 text-white sm:py-20">
        <Container>
          <div className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 md:flex-row md:items-end md:justify-between md:p-10">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-300">
                Get Started
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Need roofing help on the Gulf Coast?
              </h2>
              <p className="mt-4 text-base leading-7 text-zinc-300 sm:text-lg">
                Reach out to {siteContent.companyName} for a straightforward
                conversation about your roof, your timeline, and the next best step.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
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
