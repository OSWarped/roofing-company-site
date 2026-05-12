import Container from "../shared/Container";
import type { SiteContent } from "../../data/site-content";

export default function TopBar({ content }: { content: SiteContent }) {
  return (
    <div className="bg-brand-dark text-text-light">
      <Container className="flex min-h-10 flex-col justify-center gap-1 py-2 text-xs sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:py-0 sm:text-sm">
        <p className="truncate font-medium">{content.serviceArea}</p>
        <div className="flex items-center gap-3 text-white/80">
          <span>{content.licenseNumber}</span>
          <span aria-hidden="true" className="hidden sm:inline">
            •
          </span>
          <a
            href={`tel:${content.phoneHref}`}
            className="font-semibold text-white hover:text-accent-red"
          >
            {content.phone}
          </a>
        </div>
      </Container>
    </div>
  );
}
