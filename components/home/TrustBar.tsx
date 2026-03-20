import Container from "../shared/Container";
import { siteContent } from "../../data/site-content";

export default function TrustBar() {
  return (
    <section className="border-y border-zinc-200 bg-zinc-50 py-6">
      <Container>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {siteContent.trustItems.map((item) => (
            <div key={item} className="rounded-lg bg-white px-4 py-3 text-sm font-medium text-zinc-700 shadow-sm">
              {item}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}