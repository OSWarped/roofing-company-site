import type { ManagedMediaAsset } from "@/lib/admin/repository";

export function MediaCard({
  asset,
  updateAction,
  toggleArchiveAction,
}: {
  asset: ManagedMediaAsset;
  updateAction: (formData: FormData) => Promise<void>;
  toggleArchiveAction: (formData: FormData) => Promise<void>;
}) {
  return (
    <article className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/90">
      <div className="aspect-[4/3] bg-zinc-950">
        <img src={asset.blobUrl} alt={asset.altText} className="h-full w-full object-cover" />
      </div>
      <div className="space-y-4 p-5 text-sm text-white/75">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate font-semibold text-white">{asset.pathname}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.18em] text-red-200/90">
              {asset.source === "database" ? (asset.isArchived ? "Archived asset" : "Active asset") : "Fallback preview"}
            </p>
          </div>
        </div>

        <form action={updateAction} className="space-y-3">
          <input type="hidden" name="mediaAssetId" value={asset.id} />
          <div>
            <label htmlFor={`alt-${asset.id}`} className="block text-xs font-semibold uppercase tracking-[0.16em] text-white/50">
              Alt text
            </label>
            <input
              id={`alt-${asset.id}`}
              name="altText"
              type="text"
              defaultValue={asset.altText}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition focus:border-red-300"
            />
          </div>
          <div>
            <label htmlFor={`caption-${asset.id}`} className="block text-xs font-semibold uppercase tracking-[0.16em] text-white/50">
              Caption
            </label>
            <input
              id={`caption-${asset.id}`}
              name="caption"
              type="text"
              defaultValue={asset.caption}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition focus:border-red-300"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200"
          >
            Save details
          </button>
        </form>

        {asset.source === "database" ? (
          <form action={toggleArchiveAction}>
            <input type="hidden" name="mediaAssetId" value={asset.id} />
            <input type="hidden" name="nextArchivedState" value={asset.isArchived ? "false" : "true"} />
            <button
              type="submit"
              className="w-full rounded-2xl border border-white/15 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              {asset.isArchived ? "Restore asset" : "Archive asset"}
            </button>
          </form>
        ) : null}
      </div>
    </article>
  );
}
