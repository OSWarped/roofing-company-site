import Container from "../shared/Container";
import SectionHeading from "../shared/SectionHeading";

export default function GalleryPreview() {
  return (
    <section className="py-16">
      <Container>
        <SectionHeading
          eyebrow="Recent Work"
          title="Featured roofing projects"
          description="A curated project preview works better than flooding the homepage with too many images."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="aspect-[4/3] rounded-2xl bg-zinc-100 p-6 text-zinc-500">
              Gallery image {index + 1}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}