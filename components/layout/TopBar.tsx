import Container from "../shared/Container";
import { siteContent } from "../../data/site-content";

export default function TopBar() {
  return (
    <div className="bg-brand-dark text-text-light">
      <Container className="flex min-h-10 flex-col justify-center gap-1 py-2 text-xs sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:py-0 sm:text-sm">
        <p className="truncate font-medium">{siteContent.serviceArea}</p>
        <div className="flex items-center gap-3 text-white/80">
          <span>{siteContent.licenseNumber}</span>
          <span aria-hidden="true" className="hidden sm:inline">
            •
          </span>
          <a
            href={`tel:${siteContent.phoneHref}`}
            className="font-semibold text-white hover:text-accent-red"
          >
            {siteContent.phone}
          </a>
        </div>
      </Container>
    </div>
  );
}
