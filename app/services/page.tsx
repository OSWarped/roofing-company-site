import Link from "next/link";
import type { Metadata } from "next";
import Container from "../../components/shared/Container";
import SectionHeading from "../../components/shared/SectionHeading";
import { siteContent } from "../../data/site-content";

export const metadata: Metadata = {
  title: `Services | ${siteContent.companyName}`,
  description:
    "Explore roof repair, roof replacement, storm damage, inspections, and roofing services from Integrity Roofing of Mississippi on the Mississippi Gulf Coast.",
};

const processSteps = [
  {
    title: "Start with the property",
    description:
      "Every project begins by understanding the roof condition, the visible issues, and the goals for the property.",
  },
  {
    title: "Recommend the right next step",
    description:
      "Some roofs need repairs, some need replacement, and some just need a clear explanation of what to watch next.",
  },
  {
    title: "Complete the work with clear communication",
    description:
      "The process should feel straightforward from estimate to completion, with expectations communicated clearly.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="border-b border-zinc-200 bg-zinc-50 py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Services"
            title="Roofing services built for Mississippi Gulf Coast properties"
            description={`From repairs to replacements, ${siteContent.companyName} is positioned to serve residential and commercial roofing needs across the coast. Licensed & insured • ${siteContent.licenseNumber}.`}
          />
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {siteContent.services.map((service) => (
              <div
                key={service.title}
                className="rounded-3xl border border-zinc-200 bg-zinc-50 p-8 shadow-sm"
              >
                <h2 className="text-2xl font-semibold text-zinc-900">{service.title}</h2>
                <p className="mt-4 text-sm leading-7 text-zinc-600">{service.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-zinc-50 py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="How We Work"
            title="A straightforward process from first call to finished work"
            description="This keeps the services page helpful without making promises that should be tailored to each actual project."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {processSteps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  Step {index + 1}
                </p>
                <h3 className="mt-4 text-xl font-semibold text-zinc-900">{step.title}</h3>
                <p className="mt-4 text-sm leading-7 text-zinc-600">{step.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <SectionHeading
                eyebrow="Where We Serve"
                title="Proudly serving communities across the Gulf Coast"
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
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:flex md:items-end md:justify-between md:gap-8 md:p-10">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-300">
                Request Service
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Tell us what your roof needs
              </h2>
              <p className="mt-4 text-base leading-7 text-zinc-300 sm:text-lg">
                Whether you are dealing with storm damage, an active issue, or an
                aging roof, start the conversation and we can help determine the
                right next step.
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
