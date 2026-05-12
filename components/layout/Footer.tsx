import Image from "next/image";
import Container from "../shared/Container";
import type { SiteContent } from "../../data/site-content";

export default function Footer({ content }: { content: SiteContent }) {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50">
      <Container className="py-12">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-start">
          <div>
            <div className="relative h-16 w-[230px]">
              <Image
                src="/images/integrity-logo-cleanup.png"
                alt={content.companyName}
                fill
                className="object-contain object-left"
                sizes="230px"
              />
            </div>
            <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-600">
              {content.serviceAreaDescription}
            </p>
            <p className="mt-3 text-sm font-semibold text-zinc-900">
              Licensed &amp; Insured • {content.licenseNumber}
            </p>
          </div>

          <div className="grid gap-6 text-sm text-zinc-600 sm:grid-cols-2 md:grid-cols-1">
            <div>
              <p className="font-semibold uppercase tracking-[0.14em] text-zinc-900">Contact</p>
              <p className="mt-3">{content.phone}</p>
              <p>{content.email}</p>
            </div>

            <div>
              <p className="font-semibold uppercase tracking-[0.14em] text-zinc-900">Service Area</p>
              <p className="mt-3 leading-7">{content.cities.join(" • ")}</p>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
