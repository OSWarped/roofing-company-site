import "./globals.css";
import type { Metadata } from "next";
import TopBar from "../components/layout/TopBar";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { siteContent } from "../data/site-content";

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
      <body className="bg-white text-zinc-900 antialiased">
        <TopBar />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}