import type { GallerySectionItem } from "@/lib/admin/repository";

type GalleryPreviewCardProps = {
  item: GallerySectionItem;
};

export function GalleryPreviewCard({ item }: GalleryPreviewCardProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/40">
      <div className="aspect-[16/10] bg-zinc-900">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.altText}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-end bg-gradient-to-br from-zinc-800 via-zinc-900 to-black p-6">
            <p className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
              Placeholder
            </p>
          </div>
        )}
      </div>

      <div className="p-5">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-300">
          {item.sectionKey}
        </p>
        <h3 className="mt-2 text-xl font-semibold text-white">{item.title}</h3>
        <p className="mt-3 text-sm leading-7 text-white/70">{item.subtitle}</p>
      </div>
    </div>
  );
}