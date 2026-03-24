import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import { siteContent } from "@/data/site-content";
import { getGallerySectionItems } from "@/lib/admin/repository";

export default async function GalleryPreview() {
  const items = await getGallerySectionItems("home-featured");

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
            {items.map((item) => (
              <div
                key={item.id}
                className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-brand-dark text-text-light shadow-[0_24px_60px_-28px_rgba(31,41,51,0.28)]"
              >
                {item.imageUrl ? (
                  <div className="relative h-72 w-full overflow-hidden">
                    <img src={item.imageUrl} alt={item.altText} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/35 to-transparent" />
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.12),_transparent_35%),linear-gradient(160deg,_rgba(94,118,138,0.18),_transparent_50%)]" />
                )}

                <div className="relative flex min-h-[360px] flex-col justify-between p-8">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent-red">
                      {item.source === "database" ? "Featured Work" : "Placeholder Preview"}
                    </p>
                    <h3 className="mt-5 text-2xl font-semibold tracking-tight text-white">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-base leading-7 text-white/72">
                      {item.subtitle}
                    </p>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-sm font-medium text-white/85 backdrop-blur-sm">
                    {siteContent.companyName}
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
