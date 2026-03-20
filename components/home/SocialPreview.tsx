import Container from "../shared/Container";
import SectionHeading from "../shared/SectionHeading";

export default function SocialPreview() {
  return (
    <section className="py-16">
      <Container>
        <SectionHeading
          eyebrow="Social"
          title="See our recent work"
          description="This area can later hold embedded Facebook posts, TikTok videos, or YouTube content."
        />

        <div className="grid gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="aspect-video rounded-2xl bg-zinc-100 p-6 text-zinc-500">
              Social embed {index + 1}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}