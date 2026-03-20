import Image from "next/image";
import Container from "../shared/Container";
import SectionHeading from "../shared/SectionHeading";

const galleryItems = [
  {
    src: "/images/gallery/project-1.jpg",
    alt: "Completed residential roof replacement",
    label: "Residential Replacement",
  },
  {
    src: "/images/gallery/project-2.jpg",
    alt: "Roof repair project in progress",
    label: "Roof Repair",
  },
  {
    src: "/images/gallery/project-3.jpg",
    alt: "Finished roofing project with clean lines",
    label: "Finished Project",
  },
];

export default function GalleryPreview() {
  return (
    <section className="min-h-screen bg-white flex items-center py-16 sm:py-20">
      <Container>
        <div className="grid gap-12">
          <SectionHeading
            eyebrow="Recent Work"
            title="A look at recent roofing projects"
            description="Use this space to show a few strong examples rather than a crowded gallery."
          />

          <div className="grid gap-5 md:grid-cols-3">
            {galleryItems.map((item) => (
              <div
                key={item.src}
                className="group relative h-[420px] overflow-hidden rounded-3xl bg-zinc-100"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-black/10" />

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent p-6">
                  <p className="text-sm font-medium text-white/90">
                    {item.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}