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
    <section className="min-h-screen bg-zinc-50 flex items-center py-16 sm:py-20">
      <Container>
        <div className="grid items-center gap-12 md:grid-cols-[0.95fr_1.05fr]">
          <div className="relative h-[50vh] min-h-[320px] overflow-hidden rounded-3xl bg-zinc-200 md:h-[68vh]">
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-300 via-zinc-200 to-zinc-400" />
            <div className="absolute inset-0 flex items-end p-6">
              <p className="text-sm font-medium text-zinc-600">
                Crew / project image
              </p>
            </div>
          </div>

          <div className="max-w-xl">
            <SectionHeading
              eyebrow="Why Choose Us"
              title="A dependable roofing partner from first call to final cleanup"
              description="Keep this section focused on trust, communication, and the quality of the work."
            />

            <div className="mt-8 space-y-4">
              {items.map((item) => (
                <div
                  key={item}
                  className="border-b border-zinc-300 pb-4 text-base font-medium text-zinc-700"
                >
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