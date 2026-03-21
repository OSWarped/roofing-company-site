import Container from "../shared/Container";
import SectionHeading from "../shared/SectionHeading";
import { siteContent } from "../../data/site-content";

export default function GalleryPreview() {
  return (
    <section className="flex min-h-screen items-center bg-brand-light py-16 sm:py-20">
      <Container>
        <div className="grid gap-12">
          <SectionHeading
            eyebrow={siteContent.gallery.eyebrow}
            title={siteContent.gallery.title}
            description={siteContent.gallery.description}
          />

          <div className="grid gap-5 md:grid-cols-3">
            {siteContent.gallery.cards.map((item) => (
              <div
                key={item.title}
                className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-brand-dark p-8 text-text-light shadow-[0_24px_60px_-28px_rgba(31,41,51,0.28)]"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.12),_transparent_35%),linear-gradient(160deg,_rgba(94,118,138,0.18),_transparent_50%)]" />
                <div className="relative flex min-h-[360px] flex-col justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent-red">
                      {item.label}
                    </p>
                    <h3 className="mt-5 text-2xl font-semibold tracking-tight text-white">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-base leading-7 text-white/72">
                      {item.description}
                    </p>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-sm font-medium text-white/85 backdrop-blur-sm">
                    Integrity Roofing of Mississippi
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}