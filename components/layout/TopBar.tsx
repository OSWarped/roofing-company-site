import Container from "../shared/Container";
import { siteContent } from "../../data/site-content";

export default function TopBar() {
  return (
    <div className="bg-zinc-900 text-white">
      <Container className="flex min-h-10 items-center justify-between text-sm">
        <p className="truncate">{siteContent.serviceArea}</p>
        <a href={`tel:${siteContent.phone}`} className="font-semibold hover:opacity-80">
          {siteContent.phone}
        </a>
      </Container>
    </div>
  );
}