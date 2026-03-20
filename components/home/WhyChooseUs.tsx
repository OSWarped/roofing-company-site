import Container from "../shared/Container";
import SectionHeading from "../shared/SectionHeading";

export default function WhyChooseUs() {
  const items = [
    "Experienced local team",
    "Clear communication",
    "Quality workmanship",
    "Responsive service",
  ];

  return (
    <section className="bg-zinc-50 py-16">
      <Container>
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div className="rounded-2xl bg-white p-8 text-zinc-500">Crew / project image area</div>

          <div>
            <SectionHeading
              eyebrow="Why Choose Us"
              title="A dependable roofing partner for your home or business"
              description="This section should build trust fast without becoming a wall of text."
            />

            <div className="grid gap-3 sm:grid-cols-2">
              {items.map((item) => (
                <div key={item} className="rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-700">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}