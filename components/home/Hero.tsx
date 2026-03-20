import Image from "next/image";
import Link from "next/link";
import Container from "../shared/Container";
import { siteContent } from "../../data/site-content";

export default function Hero() {
  return (
    <section className="min-h-screen bg-white flex items-center">
      <Container>
        <div className="grid min-h-[calc(100vh-8rem)] items-center gap-12 py-16 md:grid-cols-[1.05fr_0.95fr] md:py-20">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-zinc-500">
              Trusted Local Roofing
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl md:text-6xl">
              {siteContent.hero.headline}
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-600 sm:text-xl">
              {siteContent.hero.subheadline}
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="rounded-md bg-zinc-900 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-zinc-700"
              >
                {siteContent.hero.primaryCta}
              </Link>

              <a
                href={`tel:${siteContent.phone}`}
                className="rounded-md border border-zinc-300 px-6 py-3 text-center text-sm font-semibold text-zinc-900 transition hover:bg-zinc-100"
              >
                {siteContent.hero.secondaryCta}
              </a>
            </div>
          </div>

          <div className="relative h-[50vh] min-h-[340px] overflow-hidden rounded-3xl bg-zinc-100 md:h-[72vh]">
            <Image
              src="/images/hero/roofing-hero.jpg"
              alt="Roofing crew working on a residential roof"
              fill
              priority
              className="object-cover"
            />

            <div className="absolute inset-0 bg-black/10" />

            
          </div>
        </div>
      </Container>
    </section>
  );
}