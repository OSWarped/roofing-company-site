import type { ReactNode } from "react";
import type { SiteContent } from "@/data/site-content";
import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function SiteChrome({
  children,
  content,
}: {
  children: ReactNode;
  content: SiteContent;
}) {
  return (
    <>
      <TopBar content={content} />
      <Header content={content} />
      <main>{children}</main>
      <Footer content={content} />
    </>
  );
}
