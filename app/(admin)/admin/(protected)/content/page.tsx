import { AdminNotice } from "@/components/admin/AdminNotice";
import { getAdminSetupState } from "@/lib/auth/admin";
import { getEditableSiteContent } from "@/lib/site/content";
import { updateSiteContentAction } from "../actions";

type ContentPageProps = {
  searchParams: Promise<{ status?: string }>;
};

function Field({
  label,
  name,
  defaultValue,
  type = "text",
}: {
  label: string;
  name: string;
  defaultValue: string;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-white/75" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        className="mt-2 w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition focus:border-red-300"
      />
    </div>
  );
}

function TextArea({
  label,
  name,
  defaultValue,
  rows = 4,
}: {
  label: string;
  name: string;
  defaultValue: string;
  rows?: number;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-white/75" htmlFor={name}>
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        defaultValue={defaultValue}
        rows={rows}
        className="mt-2 w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-sm leading-6 text-white outline-none transition focus:border-red-300"
      />
    </div>
  );
}

function VisibilityToggle({
  label,
  name,
  defaultChecked,
  description,
}: {
  label: string;
  name: string;
  defaultChecked: boolean;
  description: string;
}) {
  return (
    <label className="flex items-start gap-3 rounded-2xl border border-white/10 bg-zinc-950/40 p-4">
      <input
        name={name}
        type="checkbox"
        defaultChecked={defaultChecked}
        className="mt-1 h-4 w-4 rounded border-white/20 bg-zinc-950 text-red-400"
      />
      <span>
        <span className="block text-sm font-semibold text-white">{label}</span>
        <span className="mt-1 block text-sm leading-6 text-white/60">{description}</span>
      </span>
    </label>
  );
}

function SectionCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <div>
        <h2 className="text-2xl font-semibold text-white">{title}</h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-white/65">{description}</p>
      </div>
      <div className="mt-6 grid gap-5">{children}</div>
    </section>
  );
}

export default async function AdminContentPage({ searchParams }: ContentPageProps) {
  const content = await getEditableSiteContent();
  const { status } = await searchParams;
  const setup = getAdminSetupState();

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-300">
          Site Content
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white">
          Edit the main website sections
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-white/70">
          This is the simplified CMS layer: structured controls for the homepage,
          core page copy, services, reviews, CTAs, and contact details.
        </p>
      </div>

      {!setup.isDatabaseConfigured ? (
        <AdminNotice
          title="Database not connected yet"
          description="These controls need Postgres before they can save. The public site will keep using the code fallback until the database is configured."
        />
      ) : null}

      {status ? (
        <AdminNotice
          title="Latest content action"
          description={`Content action result: ${status.replace(/-/g, " ")}.`}
        />
      ) : null}

      <form action={updateSiteContentAction} className="space-y-8">
        <SectionCard
          title="Section Visibility"
          description="Turn public sections on or off without deleting the copy or gallery assignments behind them."
        >
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <VisibilityToggle
              label="Homepage hero"
              name="sectionVisibility.homeHero"
              defaultChecked={content.sectionVisibility.homeHero}
              description="Main first-screen headline and calls to action."
            />
            <VisibilityToggle
              label="Homepage trust bar"
              name="sectionVisibility.homeTrustBar"
              defaultChecked={content.sectionVisibility.homeTrustBar}
              description="Credential and service-area badges below the hero."
            />
            <VisibilityToggle
              label="Homepage services"
              name="sectionVisibility.homeServices"
              defaultChecked={content.sectionVisibility.homeServices}
              description="Service cards on the homepage."
            />
            <VisibilityToggle
              label="Homepage why choose us"
              name="sectionVisibility.homeWhyChooseUs"
              defaultChecked={content.sectionVisibility.homeWhyChooseUs}
              description="Dark proof section with cities and value points."
            />
            <VisibilityToggle
              label="Homepage featured work"
              name="sectionVisibility.homeGallery"
              defaultChecked={content.sectionVisibility.homeGallery}
              description="Photo-backed featured work section."
            />
            <VisibilityToggle
              label="Homepage final CTA"
              name="sectionVisibility.homeFinalCta"
              defaultChecked={content.sectionVisibility.homeFinalCta}
              description="Bottom call-to-action section."
            />
            <VisibilityToggle
              label="Gallery page intro"
              name="sectionVisibility.galleryPageIntro"
              defaultChecked={content.sectionVisibility.galleryPageIntro}
              description="Top heading area on the gallery page."
            />
            <VisibilityToggle
              label="Gallery page projects"
              name="sectionVisibility.galleryPageProjects"
              defaultChecked={content.sectionVisibility.galleryPageProjects}
              description="Photo grid powered by the media library."
            />
            <VisibilityToggle
              label="Gallery page CTA"
              name="sectionVisibility.galleryPageCta"
              defaultChecked={content.sectionVisibility.galleryPageCta}
              description="Bottom gallery page call-to-action."
            />
          </div>
        </SectionCard>

        <SectionCard
          title="Business Details"
          description="These fields feed the header, footer, contact page, credentials, and repeated business references."
        >
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Company name" name="companyName" defaultValue={content.companyName} />
            <Field label="Short name" name="shortName" defaultValue={content.shortName} />
            <Field label="Phone display" name="phone" defaultValue={content.phone} />
            <Field label="Phone link digits" name="phoneHref" defaultValue={content.phoneHref} />
            <Field label="Email" name="email" defaultValue={content.email} type="email" />
            <Field label="License number" name="licenseNumber" defaultValue={content.licenseNumber} />
          </div>
          <TextArea
            label="Service area headline"
            name="serviceArea"
            defaultValue={content.serviceArea}
            rows={2}
          />
          <TextArea
            label="Service area short description"
            name="serviceAreaDescription"
            defaultValue={content.serviceAreaDescription}
          />
          <TextArea
            label="Service area detail"
            name="serviceAreaDetail"
            defaultValue={content.serviceAreaDetail}
          />
          <div className="grid gap-5 md:grid-cols-2">
            <TextArea label="Cities, one per line" name="cities" defaultValue={content.cities.join("\n")} />
            <TextArea
              label="Service page cities, one per line"
              name="serviceCities"
              defaultValue={content.serviceCities.join("\n")}
            />
          </div>
        </SectionCard>

        <SectionCard
          title="Homepage Hero"
          description="Main first-screen copy, CTA labels, and supporting badges."
        >
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Eyebrow" name="heroEyebrow" defaultValue={content.hero.eyebrow} />
            <Field label="Headline" name="heroHeadline" defaultValue={content.hero.headline} />
            <Field label="Primary CTA" name="heroPrimaryCta" defaultValue={content.hero.primaryCta} />
            <Field label="Secondary CTA" name="heroSecondaryCta" defaultValue={content.hero.secondaryCta} />
          </div>
          <TextArea
            label="Subheadline"
            name="heroSubheadline"
            defaultValue={content.hero.subheadline}
          />
          <TextArea
            label="Supporting points, one per line"
            name="heroSupportingPoints"
            defaultValue={content.hero.supportingPoints.join("\n")}
          />
        </SectionCard>

        <SectionCard
          title="Trust And Services"
          description="Trust bar items, homepage service cards, and the services page cards."
        >
          <TextArea
            label="Trust bar items, one per line"
            name="trustItems"
            defaultValue={content.trustItems.join("\n")}
          />
          <div className="grid gap-5">
            {content.services.map((service, index) => (
              <div key={`${service.title}-${index}`} className="rounded-2xl border border-white/10 bg-zinc-950/40 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-200">
                  Service {index + 1}
                </p>
                <div className="mt-4 grid gap-4 md:grid-cols-[1fr_1fr_180px]">
                  <Field label="Title" name="serviceTitle" defaultValue={service.title} />
                  <Field label="Description" name="serviceDescription" defaultValue={service.description} />
                  <Field label="Link" name="serviceHref" defaultValue={service.href} />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          title="Why Choose Us And About"
          description="Controls the dark homepage proof section and the about page story/values."
        >
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Why eyebrow" name="whyEyebrow" defaultValue={content.whyChooseUs.eyebrow} />
            <Field label="Why title" name="whyTitle" defaultValue={content.whyChooseUs.title} />
          </div>
          <TextArea
            label="Why description"
            name="whyDescription"
            defaultValue={content.whyChooseUs.description}
          />
          <TextArea
            label="Why items, one per line"
            name="whyItems"
            defaultValue={content.whyChooseUs.items.join("\n")}
          />
          <TextArea label="About intro" name="aboutIntro" defaultValue={content.about.intro} rows={2} />
          <TextArea label="About story" name="aboutStory" defaultValue={content.about.story} rows={6} />
          <div className="grid gap-5 md:grid-cols-3">
            {content.about.values.map((value, index) => (
              <div key={`${value.title}-${index}`} className="rounded-2xl border border-white/10 bg-zinc-950/40 p-5">
                <Field label="Value title" name="aboutValueTitle" defaultValue={value.title} />
                <div className="mt-4">
                  <TextArea
                    label="Value description"
                    name="aboutValueDescription"
                    defaultValue={value.description}
                  />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          title="Gallery, Reviews, And Contact"
          description="Controls gallery headings, placeholder cards, review copy, and contact-page checklist content."
        >
          <div className="grid gap-5 md:grid-cols-3">
            <Field label="Gallery eyebrow" name="galleryEyebrow" defaultValue={content.gallery.eyebrow} />
            <Field label="Gallery title" name="galleryTitle" defaultValue={content.gallery.title} />
            <Field label="Reviews placeholder title" name="reviewsPlaceholderTitle" defaultValue={content.reviewsPlaceholder.title} />
          </div>
          <TextArea
            label="Gallery description"
            name="galleryDescription"
            defaultValue={content.gallery.description}
          />
          <div className="grid gap-5 md:grid-cols-3">
            {content.gallery.cards.map((card, index) => (
              <div key={`${card.label}-${index}`} className="rounded-2xl border border-white/10 bg-zinc-950/40 p-5">
                <Field label="Card label" name="galleryCardLabel" defaultValue={card.label} />
                <div className="mt-4">
                  <Field label="Card title" name="galleryCardTitle" defaultValue={card.title} />
                </div>
                <div className="mt-4">
                  <TextArea
                    label="Card description"
                    name="galleryCardDescription"
                    defaultValue={card.description}
                  />
                </div>
              </div>
            ))}
          </div>
          <TextArea
            label="Reviews placeholder text"
            name="reviewsPlaceholderText"
            defaultValue={content.reviewsPlaceholder.text}
          />
          <div className="grid gap-5 md:grid-cols-2">
            {content.reviews.map((review, index) => (
              <div key={`${review.name}-${index}`} className="rounded-2xl border border-white/10 bg-zinc-950/40 p-5">
                <Field label="Reviewer/source" name="reviewName" defaultValue={review.name} />
                <div className="mt-4">
                  <TextArea label="Review text" name="reviewText" defaultValue={review.text} />
                </div>
              </div>
            ))}
          </div>
          <TextArea
            label="Contact response note"
            name="contactResponseNote"
            defaultValue={content.contact.responseNote}
          />
          <TextArea
            label="Estimate checklist, one per line"
            name="estimateChecklist"
            defaultValue={content.contact.estimateChecklist.join("\n")}
          />
        </SectionCard>

        <SectionCard
          title="Final CTA And Social Links"
          description="Controls the bottom homepage call-to-action and stored social URLs."
        >
          <div className="grid gap-5 md:grid-cols-3">
            <Field label="CTA eyebrow" name="finalCtaEyebrow" defaultValue={content.finalCta.eyebrow} />
            <Field label="CTA title" name="finalCtaTitle" defaultValue={content.finalCta.title} />
            <Field label="Facebook" name="facebook" defaultValue={content.socialLinks.facebook} />
          </div>
          <TextArea
            label="CTA description"
            name="finalCtaDescription"
            defaultValue={content.finalCta.description}
          />
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Instagram" name="instagram" defaultValue={content.socialLinks.instagram} />
            <Field label="TikTok" name="tiktok" defaultValue={content.socialLinks.tiktok} />
          </div>
        </SectionCard>

        <div className="sticky bottom-4 z-10 rounded-3xl border border-white/10 bg-zinc-950/95 p-4 shadow-2xl backdrop-blur">
          <button
            type="submit"
            className="w-full rounded-2xl bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-400"
          >
            Save site content
          </button>
        </div>
      </form>
    </div>
  );
}
