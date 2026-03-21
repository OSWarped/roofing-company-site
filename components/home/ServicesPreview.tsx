import Link from "next/link";
import SectionHeading from "../shared/SectionHeading";
import Container from "../shared/Container";
import { siteContent } from "../../data/site-content";

export default function ServicesPreview() {
  return (
    <section className="flex min-h-screen items-center bg-brand-light py-16 sm:py-20">
      <Container>
        <div className="grid gap-12">
          <SectionHeading
            eyebrow="Services"
            title="Roofing services for homeowners and property owners across the Mississippi Gulf Coast"
            description="Integrity Roofing of Mississippi provides roof repair, roof replacement, storm damage support, inspections, metal roofing, and commercial roofing with clear communication and dependable service."
          />

          <div className="grid gap-6 md:grid-cols-3">
            {siteContent.services.map((service) => (
              <article
                key={service.title}
                className="flex min-h-[280px] flex-col justify-between rounded-[2rem] border border-brand-border bg-brand-surface p-8 transition hover:-translate-y-1 hover:shadow-[0_24px_60px_-28px_rgba(31,41,51,0.22)]"
              >
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight text-brand-dark">
                    {service.title}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-text-secondary">
                    {service.description}
                  </p>
                </div>

                <div className="mt-8">
                  <Link
                    href={service.href}
                    className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-red transition hover:text-accent-red-hover"
                  >
                    Explore services
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}