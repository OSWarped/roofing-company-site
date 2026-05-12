import type { ReactNode } from "react";
import SiteChrome from "@/components/layout/SiteChrome";
import { getEditableSiteContent } from "@/lib/site/content";

export default async function MarketingLayout({ children }: { children: ReactNode }) {
  const content = await getEditableSiteContent();

  return <SiteChrome content={content}>{children}</SiteChrome>;
}
