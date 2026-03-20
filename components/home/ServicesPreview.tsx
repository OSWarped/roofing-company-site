import SectionHeading from "../shared/SectionHeading";
import Container from "../shared/Container";
import { siteContent } from "../../data/site-content";

export default function ServicesPreview() {
  return (
    <section className="min-h-screen bg-white flex items-center py-16 sm:py-20">
      <Container>
        <div className="grid gap-12">
          <SectionHeading
            eyebrow="Services"
            title="Roofing services designed to keep things simple"
            description="Present the core work clearly and let the customer quickly understand how you can help."
          />

          <div className="grid gap-6 md:grid-cols-3">
            {siteContent.services.map((service) => (
              <article
                key={service.title}
                className="flex min-h-[260px] flex-col justify-between rounded-3xl bg-zinc-50 p-8"
              >
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight text-zinc-900">
                    {service.title}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-zinc-600">
                    {service.description}
                  </p>
                </div>

                <div className="mt-8">
                  <span className="text-sm font-medium uppercase tracking-[0.14em] text-zinc-500">
                    Learn more
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}