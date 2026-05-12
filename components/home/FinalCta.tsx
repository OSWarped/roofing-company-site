import Link from "next/link";
import Container from "../shared/Container";
import type { SiteContent } from "../../data/site-content";

export default function FinalCta({ content }: { content: SiteContent }) {
  return (
    <section className="flex min-h-screen items-center bg-brand-dark text-text-light">
      <Container>
        <div className="mx-auto max-w-3xl py-20 text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-accent-red">
            {content.finalCta.eyebrow}
          </p>

          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            {content.finalCta.title}
          </h2>

          <p className="mt-6 text-lg leading-8 text-white/75 sm:text-xl">
            {content.finalCta.description}
          </p>

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-full bg-accent-red px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-accent-red-hover"
            >
              Request Estimate
            </Link>

            <a
              href={`tel:${content.phoneHref}`}
              className="rounded-full border border-white/20 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/5"
            >
              Call {content.phone}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
