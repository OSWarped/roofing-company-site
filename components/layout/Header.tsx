import Link from "next/link";
import Container from "../shared/Container";
import { siteContent } from "../../data/site-content";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/reviews", label: "Reviews" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur">
      <Container className="flex min-h-16 items-center justify-between gap-4">
        <Link href="/" className="text-xl font-bold tracking-tight text-zinc-900">
          {siteContent.companyName}
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-zinc-700 hover:text-zinc-900">
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-700"
          >
            Request Estimate
          </Link>
        </nav>
      </Container>
    </header>
  );
}