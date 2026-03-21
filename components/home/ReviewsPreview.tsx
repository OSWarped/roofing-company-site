import Container from "../shared/Container";
import SectionHeading from "../shared/SectionHeading";
import { siteContent } from "../../data/site-content";

export default function ReviewsPreview() {
  return (
    <section className="bg-zinc-50 py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Reviews"
          title="The site is ready for strong customer proof"
          description="This section can hold real Google reviews once they are collected, but the layout already supports a stronger trust footprint for the brand."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {siteContent.reviews.map((review) => (
            <div
              key={review.name}
              className="rounded-[2rem] border border-zinc-200 bg-white p-7 shadow-sm"
            >
              <p className="text-base leading-7 text-zinc-600">“{review.text}”</p>
              <p className="mt-5 text-sm font-semibold uppercase tracking-[0.14em] text-zinc-900">
                {review.name}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
