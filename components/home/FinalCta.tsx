import Link from "next/link";
import Container from "../shared/Container";
import { siteContent } from "../../data/site-content";

export default function FinalCta() {
  return (
    <section className="py-16">
      <Container>
        <div className="rounded-3xl bg-zinc-900 px-6 py-10 text-white sm:px-10">
          <h2 className="text-3xl font-bold tracking-tight">Need roofing help?</h2>
          <p className="mt-3 max-w-2xl text-zinc-300">
            Contact us today for a free estimate or to talk through your roofing needs.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-md bg-white px-5 py-3 text-center font-semibold text-zinc-900 hover:bg-zinc-200"
            >
              Request Estimate
            </Link>
            <a
              href={`tel:${siteContent.phone}`}
              className="rounded-md border border-zinc-600 px-5 py-3 text-center font-semibold text-white hover:bg-zinc-800"
            >
              Call Now
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}