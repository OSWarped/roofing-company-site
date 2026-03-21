import Image from "next/image";
import Link from "next/link";
import Container from "../shared/Container";
import { siteContent } from "../../data/site-content";

export default function Hero() {
  return (
    <section className="flex min-h-screen items-center bg-brand-light">
      <Container>
        <div className="grid min-h-[calc(100vh-8rem)] items-center gap-12 py-16 md:grid-cols-[1.05fr_0.95fr] md:py-20">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-accent-red">
              {siteContent.hero.eyebrow}
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-brand-dark sm:text-5xl md:text-6xl">
              {siteContent.hero.headline}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-text-secondary sm:text-xl">
              {siteContent.hero.subheadline}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {siteContent.hero.supportingPoints.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-brand-border bg-brand-surface px-4 py-2 text-sm font-medium text-accent-blue-gray shadow-sm"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="rounded-full bg-accent-red px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-accent-red-hover"
              >
                {siteContent.hero.primaryCta}
              </Link>

              <a
                href={`tel:${siteContent.phoneHref}`}
                className="rounded-full border border-brand-border px-6 py-3 text-center text-sm font-semibold text-brand-dark transition hover:bg-brand-muted"
              >
                {siteContent.hero.secondaryCta}
              </a>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-brand-dark p-8 text-text-light shadow-[0_40px_120px_-50px_rgba(31,41,51,0.45)] sm:p-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.14),_transparent_35%),linear-gradient(135deg,_rgba(94,118,138,0.18),_transparent_55%)]" />
            <div className="relative">
              <div className="relative h-32 w-full sm:h-40">
                <Image
                  src="/images/integrity-logo-white-red.png"
                  alt={`${siteContent.companyName} logo`}
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 768px) 360px, 500px"
                />
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                    Credentials
                  </p>
                  <p className="mt-3 text-lg font-semibold text-white">
                    Licensed &amp; Insured
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/70">
                    {siteContent.licenseNumber}
                  </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                    Coverage
                  </p>
                  <p className="mt-3 text-lg font-semibold text-white">
                    Mississippi Gulf Coast
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/70">
                    {siteContent.cities.slice(0, 4).join(" • ")}
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                  Why Homeowners Call Us
                </p>
                <p className="mt-3 text-lg font-semibold text-white">
                  Clear service, strong communication, and Gulf Coast roofing support
                </p>
                <p className="mt-3 text-sm leading-7 text-white/75">
                  Integrity Roofing of Mississippi serves homeowners and property owners across the
                  Mississippi Gulf Coast with straightforward guidance, dependable roofing service,
                  and a brand people can clearly recognize and trust.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}