import Container from "../shared/Container";
import { siteContent } from "../../data/site-content";

export default function WhyChooseUs() {
  return (
    <section className="flex min-h-screen items-center bg-brand-dark py-16 text-text-light sm:py-20">
      <Container>
        <div className="grid items-center gap-12 md:grid-cols-[0.95fr_1.05fr]">
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-sm sm:p-10">
            <div className="grid gap-4 sm:grid-cols-2">
              {siteContent.cities.map((city) => (
                <div
                  key={city}
                  className="rounded-3xl border border-white/10 bg-white/6 px-5 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-white/85"
                >
                  {city}
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-3xl border border-white/10 bg-[rgba(94,118,138,0.18)] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                Service Area
              </p>
              <p className="mt-3 text-lg font-semibold text-white">
                {siteContent.serviceAreaDescription}
              </p>
            </div>
          </div>

          <div className="max-w-xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-accent-red">
              {siteContent.whyChooseUs.eyebrow}
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {siteContent.whyChooseUs.title}
            </h2>

            <p className="mt-5 text-base leading-8 text-white/72 sm:text-lg">
              {siteContent.whyChooseUs.description}
            </p>

            <div className="mt-8 space-y-4">
              {siteContent.whyChooseUs.items.map((item) => (
                <div
                  key={item}
                  className="rounded-3xl border border-white/10 bg-white/6 px-5 py-4 text-base font-medium leading-7 text-white/86"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}