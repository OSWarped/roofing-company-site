import Container from "../shared/Container";
import { siteContent } from "../../data/site-content";

export default function TrustBar() {
  return (
    <section className="border-t border-zinc-200 bg-white">
      <Container>
        <div className="flex min-h-24 items-center justify-center py-8">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-sm font-medium uppercase tracking-[0.16em] text-zinc-500 sm:gap-x-7">
            {siteContent.trustItems.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}