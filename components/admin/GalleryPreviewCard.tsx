import type { ManagedGalleryItem } from "@/lib/admin/repository";

export function GalleryPreviewCard({ item }: { item: ManagedGalleryItem }) {
  return (
    <article className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/85">
      <div className="aspect-[16/10] bg-zinc-950">
        {item.imageUrl ? (
          <img src={item.imageUrl} alt={item.altText} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-end bg-gradient-to-br from-zinc-700 via-zinc-800 to-zinc-900 p-5">
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
              Placeholder preview
            </span>
          </div>
        )}
      </div>
      <div className="space-y-3 p-5 text-sm text-white/75">
        <p className="font-semibold text-white">{item.title}</p>
        <p>{item.subtitle || "No supporting copy yet."}</p>
        <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.18em] text-red-200">
          <span>Order {item.sortOrder}</span>
          <span>{item.isVisible ? "Visible" : "Hidden"}</span>
          <span>{item.source === "database" ? "Database" : "Fallback"}</span>
        </div>
      </div>
    </article>
  );
}
