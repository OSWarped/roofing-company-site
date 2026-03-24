import "./globals.css";
import type { Metadata } from "next";
import { siteContent } from "@/data/site-content";
import SiteChrome from "@/components/layout/SiteChrome";

export const metadata: Metadata = {
  title: `${siteContent.companyName} | Roofing Services`,
  description: "Professional roofing services for homes and businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-brand-light text-text-primary antialiased">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
