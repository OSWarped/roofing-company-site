import Container from "../shared/Container";
import { siteContent } from "../../data/site-content";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50">
      <Container className="py-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-bold text-zinc-900">{siteContent.companyName}</h2>
            <p className="text-sm text-zinc-600">{siteContent.serviceArea}</p>
          </div>

          <div className="text-sm text-zinc-600">
            <p>{siteContent.phone}</p>
            <p>{siteContent.email}</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}