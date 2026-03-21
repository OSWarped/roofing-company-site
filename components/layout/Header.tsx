import Image from "next/image";
import Link from "next/link";
import Container from "../shared/Container";
import { siteContent } from "../../data/site-content";

const navItems = [
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-brand-border bg-brand-light/92 backdrop-blur">
      <Container className="flex min-h-20 items-center justify-between gap-6 py-3">
        <Link href="/" className="flex items-center gap-3" aria-label={siteContent.companyName}>
          <div className="relative h-14 w-[180px] sm:h-16 sm:w-[220px]">
            <Image
              src="/images/integrity-logo-cleanup.png"
              alt={siteContent.companyName}
              fill
              priority
              className="object-contain object-left"
              sizes="(max-width: 640px) 180px, 220px"
            />
          </div>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          <nav className="flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-text-secondary hover:text-brand-dark"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/contact"
            className="rounded-full bg-zinc-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800"
          >
            Request Estimate
          </Link>
        </div>

        <Link
          href="/contact"
          className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-100 lg:hidden"
        >
          Estimate
        </Link>
      </Container>
    </header>
  );
}
