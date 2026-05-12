import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import ServicesPreview from "@/components/home/ServicesPreview";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import GalleryPreview from "@/components/home/GalleryPreview";
import FinalCta from "@/components/home/FinalCta";
import { getEditableSiteContent, isSectionVisible } from "@/lib/site/content";

export default async function HomePage() {
  const content = await getEditableSiteContent();

  return (
    <>
      {isSectionVisible(content, "homeHero") ? <Hero content={content} /> : null}
      {isSectionVisible(content, "homeTrustBar") ? <TrustBar content={content} /> : null}
      {isSectionVisible(content, "homeServices") ? <ServicesPreview content={content} /> : null}
      {isSectionVisible(content, "homeWhyChooseUs") ? <WhyChooseUs content={content} /> : null}
      {isSectionVisible(content, "homeGallery") ? <GalleryPreview content={content} /> : null}
      {isSectionVisible(content, "homeFinalCta") ? <FinalCta content={content} /> : null}
    </>
  );
}
