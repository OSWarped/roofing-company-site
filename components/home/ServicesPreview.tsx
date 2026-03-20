import SectionHeading from "../shared/SectionHeading";
import Container from "../shared/Container";
import { siteContent } from "../../data/site-content";

export default function ServicesPreview() {
  return (
    <section className="py-16">
      <Container>
        <SectionHeading
          eyebrow="Services"
          title="Roofing services homeowners can trust"
          description="From repairs to full replacements, help customers quickly understand what the company offers."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {siteContent.services.map((service) => (
            <div key={service.title} className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-zinc-900">{service.title}</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-600">{service.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}