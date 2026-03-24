import { AdminNotice } from "@/components/admin/AdminNotice";
import { MediaCard } from "@/components/admin/MediaCard";
import { getAdminSetupState } from "@/lib/auth/admin";
import { listMediaAssets } from "@/lib/admin/repository";
import {
  toggleArchiveMediaAssetAction,
  updateMediaAssetAction,
  uploadMediaAction,
} from "../actions";

type MediaPageProps = {
  searchParams: Promise<{ status?: string }>;
};

export default async function AdminMediaPage({ searchParams }: MediaPageProps) {
  const assets = await listMediaAssets({ includeArchived: true });
  const { status } = await searchParams;
  const setup = getAdminSetupState();
  const activeAssets = assets.filter((asset) => !asset.isArchived);
  const archivedAssets = assets.filter((asset) => asset.isArchived);

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-300">Media Library</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white">Upload and organize site photos</h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-white/70">
          Blob-backed uploads land here first. From here they can be assigned to homepage and gallery sections,
          then archived later without deleting historical uploads.
        </p>
      </div>

      {!setup.isBlobConfigured ? (
        <AdminNotice
          title="Blob storage is not connected yet"
          description="The upload form is wired to Vercel Blob, but uploads will not persist until BLOB_READ_WRITE_TOKEN is available in the environment."
        />
      ) : null}

      {status ? (
        <AdminNotice
          title="Latest media action"
          description={`Media action result: ${status.replace(/-/g, " ")}.`}
        />
      ) : null}

      <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white">Upload new image</h2>
            <p className="mt-2 text-sm leading-7 text-white/65">
              Add alt text and a short caption now so the same asset is ready for gallery use immediately.
            </p>
          </div>
          <div className="rounded-full bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
            {activeAssets.length} active · {archivedAssets.length} archived
          </div>
        </div>

        <form action={uploadMediaAction} className="mt-6 grid gap-5 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end">
          <div>
            <label htmlFor="file" className="block text-sm font-medium text-white/75">Image file</label>
            <input id="file" name="file" type="file" accept="image/*" required className="mt-2 block w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-sm text-white" />
          </div>
          <div>
            <label htmlFor="altText" className="block text-sm font-medium text-white/75">Alt text</label>
            <input id="altText" name="altText" type="text" placeholder="Describe what is shown" className="mt-2 w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition focus:border-red-300" />
          </div>
          <div>
            <label htmlFor="caption" className="block text-sm font-medium text-white/75">Caption</label>
            <input id="caption" name="caption" type="text" placeholder="Optional project summary" className="mt-2 w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition focus:border-red-300" />
          </div>
          <button type="submit" className="rounded-2xl bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-400">Upload image</button>
        </form>
      </section>

      <section>
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold text-white">Active assets</h2>
          <span className="rounded-full bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">{activeAssets.length} assets</span>
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {activeAssets.map((asset) => (
            <MediaCard
              key={asset.id}
              asset={asset}
              updateAction={updateMediaAssetAction}
              toggleArchiveAction={toggleArchiveMediaAssetAction}
            />
          ))}
        </div>
      </section>

      {archivedAssets.length ? (
        <section>
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold text-white">Archived assets</h2>
            <span className="rounded-full bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">{archivedAssets.length} assets</span>
          </div>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-white/65">
            Archived photos stay in storage but are excluded from gallery assignment lists and public rendering.
          </p>
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {archivedAssets.map((asset) => (
              <MediaCard
                key={asset.id}
                asset={asset}
                updateAction={updateMediaAssetAction}
                toggleArchiveAction={toggleArchiveMediaAssetAction}
              />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
