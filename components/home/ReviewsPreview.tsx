import Container from "../shared/Container";
import SectionHeading from "../shared/SectionHeading";
import { siteContent } from "../../data/site-content";

export default function ReviewsPreview() {
  return (
    <section className="bg-zinc-50 py-16">
      <Container>
        <SectionHeading
          eyebrow="Reviews"
          title="What customers are saying"
          description="Later this can become curated Google reviews or CMS-managed testimonials."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {siteContent.reviews.map((review) => (
            <div key={review.name} className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <p className="text-sm leading-6 text-zinc-600">“{review.text}”</p>
              <p className="mt-4 font-semibold text-zinc-900">{review.name}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}