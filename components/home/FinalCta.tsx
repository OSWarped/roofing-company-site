import Link from "next/link";
import Container from "../shared/Container";
import { siteContent } from "../../data/site-content";

export default function FinalCta() {
  return (
    <section className="min-h-screen bg-zinc-900 text-white flex items-center">
      <Container>
        <div className="mx-auto max-w-3xl py-20 text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-zinc-400">
            Get Started
          </p>

          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Need roofing help?
          </h2>

          <p className="mt-6 text-lg leading-8 text-zinc-300 sm:text-xl">
            Contact us today for a free estimate or to talk through your roofing needs.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-md bg-white px-6 py-3 text-center text-sm font-semibold text-zinc-900 transition hover:bg-zinc-200"
            >
              Request Estimate
            </Link>

            <a
              href={`tel:${siteContent.phone}`}
              className="rounded-md border border-zinc-600 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-zinc-800"
            >
              Call Now
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}