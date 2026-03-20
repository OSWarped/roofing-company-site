import Link from "next/link";
import Container from "../shared/Container";
import { siteContent } from "../../data/site-content";

export default function Hero() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-500">
              Trusted Local Roofing
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
              {siteContent.hero.headline}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-zinc-600">
              {siteContent.hero.subheadline}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="rounded-md bg-zinc-900 px-5 py-3 text-center font-semibold text-white hover:bg-zinc-700"
              >
                {siteContent.hero.primaryCta}
              </Link>
              <a
                href={`tel:${siteContent.phone}`}
                className="rounded-md border border-zinc-300 px-5 py-3 text-center font-semibold text-zinc-900 hover:bg-zinc-100"
              >
                {siteContent.hero.secondaryCta}
              </a>
            </div>
          </div>

          <div className="rounded-2xl bg-zinc-100 p-8 text-zinc-500">
            Hero image area
          </div>
        </div>
      </Container>
    </section>
  );
}