import Hero from "../../components/home/Hero";
import TrustBar from "../../components/home/TrustBar";
import ServicesPreview from "../../components/home/ServicesPreview";
import WhyChooseUs from "../../components/home/WhyChooseUs";
import GalleryPreview from "../../components/home/GalleryPreview";
import ReviewsPreview from "../../components/home/ReviewsPreview";
import SocialPreview from "../../components/home/SocialPreview";
import FinalCta from "../../components/home/FinalCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ServicesPreview />
      <WhyChooseUs />
      <GalleryPreview />
      <ReviewsPreview />
      <SocialPreview />
      <FinalCta />
    </>
  );
}