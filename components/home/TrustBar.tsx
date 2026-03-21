import Container from "../shared/Container";
import { siteContent } from "../../data/site-content";

export default function TrustBar() {
  return (
    <section className="border-y border-brand-border bg-brand-muted">
      <Container>
        <div className="flex min-h-24 items-center justify-center py-8">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 text-center text-sm font-semibold uppercase tracking-[0.14em] text-brand-dark sm:gap-x-6">
            {siteContent.trustItems.map((item, index) => (
              <div key={item} className="flex items-center gap-4">
                <span>{item}</span>
                {index < siteContent.trustItems.length - 1 ? (
                  <span aria-hidden="true" className="text-accent-red/55">
                    •
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}