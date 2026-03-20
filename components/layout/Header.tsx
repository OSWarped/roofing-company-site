import Link from "next/link";
import Container from "../shared/Container";
import { siteContent } from "../../data/site-content";

const navItems = [
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur">
      <Container className="flex min-h-20 items-center justify-between">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-zinc-900 sm:text-xl"
        >
          {siteContent.companyName}
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <nav className="flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-zinc-600 transition hover:text-zinc-900"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/contact"
            className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-100"
          >
            Request Estimate
          </Link>
        </div>
      </Container>
    </header>
  );
}