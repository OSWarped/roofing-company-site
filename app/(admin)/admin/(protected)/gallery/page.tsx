import { AdminNotice } from "@/components/admin/AdminNotice";
import { GalleryPreviewCard } from "@/components/admin/GalleryPreviewCard";
import { gallerySections } from "@/lib/admin/sections";
import { getAdminSetupState } from "@/lib/auth/admin";
import { listAvailableMediaForSection, listGalleryAssignments, ManagedMediaAsset } from "@/lib/admin/repository";
import {
  assignMediaToGalleryAction,
  removeGalleryItemAction,
  updateGalleryItemAction,
} from "../actions";

type GalleryPageProps = {
  searchParams: Promise<{ status?: string }>;
};

export default async function AdminGalleryPage({ searchParams }: GalleryPageProps) {
  const assignments = await listGalleryAssignments({ fallbackWhenEmpty: false });
  const { status } = await searchParams;
  const setup = getAdminSetupState();
  const unassignedBySection = Object.fromEntries(
    await Promise.all(
      gallerySections.map(async (section) => [section.key, await listAvailableMediaForSection(section.key)]),
    ),
  ) as Record<string, Awaited<ReturnType<typeof listAvailableMediaForSection>>>;

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-300">Gallery Manager</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white">Control what the public site shows</h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-white/70">
          Assign uploaded photos into sections, set order, add supporting copy, and hide anything that should not display publicly.
        </p>
      </div>

      {!setup.isDatabaseConfigured ? (
        <AdminNotice
          title="Database not connected yet"
          description="Until Postgres is configured, these forms show fallback preview data only. Once the database is live, the same screen becomes the real gallery control surface."
        />
      ) : null}

      {status ? (
        <AdminNotice
          title="Latest gallery action"
          description={`Gallery action result: ${status.replace(/-/g, " ")}.`}
        />
      ) : null}

      <div className="grid gap-8">
        {assignments.map((section) => (
          <section key={section.key} className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-300">{section.name}</p>
                <p className="mt-3 text-sm leading-7 text-white/70">{section.description}</p>
              </div>
              <span className="rounded-full bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                {section.items.length} current items
              </span>
            </div>

            <div className="mt-6 rounded-3xl border border-white/10 bg-zinc-950/40 p-5">
              <h3 className="text-lg font-semibold text-white">Add media to this section</h3>
              <form action={assignMediaToGalleryAction} className="mt-5 grid gap-5">
                <input type="hidden" name="sectionKey" value={section.key} />
                {unassignedBySection[section.key].length ? (
                  <fieldset>
                    <legend className="text-sm font-medium text-white/75">Choose a photo</legend>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                      {unassignedBySection[section.key].map((asset: ManagedMediaAsset) => (
                        <label key={asset.id} className="group cursor-pointer">
                          <input name="mediaAssetId" type="radio" value={asset.id} className="peer sr-only" />
                          <span className="block overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/70 transition peer-checked:border-red-300 peer-checked:ring-2 peer-checked:ring-red-300/35">
                            <span className="block aspect-[4/3] bg-zinc-900">
                              <img src={asset.blobUrl} alt={asset.altText} className="h-full w-full object-cover" />
                            </span>
                            <span className="block truncate px-3 py-2 text-xs font-medium text-white/70 group-hover:text-white">
                              {asset.caption || asset.pathname}
                            </span>
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                ) : (
                  <AdminNotice
                    title="No unassigned photos available"
                    description="Upload photos in the media library, or remove an existing assignment before adding another photo to this section."
                  />
                )}
                <div className="grid gap-4 xl:grid-cols-[1fr_1fr_140px_auto] xl:items-end">
                  <div>
                    <label className="block text-sm font-medium text-white/75" htmlFor={`${section.key}-title`}>Display title</label>
                    <input id={`${section.key}-title`} name="title" type="text" className="mt-2 w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition focus:border-red-300" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/75" htmlFor={`${section.key}-subtitle`}>Supporting copy</label>
                    <input id={`${section.key}-subtitle`} name="subtitle" type="text" className="mt-2 w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition focus:border-red-300" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/75" htmlFor={`${section.key}-sortOrder`}>Sort order</label>
                    <input id={`${section.key}-sortOrder`} name="sortOrder" type="number" min="0" defaultValue={section.items.length + 1} className="mt-2 w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition focus:border-red-300" />
                  </div>
                  <div className="flex items-center gap-4 xl:pb-3">
                    <label className="inline-flex items-center gap-2 text-sm text-white/75">
                      <input name="isVisible" type="checkbox" defaultChecked className="h-4 w-4 rounded border-white/20 bg-zinc-950 text-red-400" />
                      Visible
                    </label>
                    <button type="submit" className="rounded-2xl bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-400">Add</button>
                  </div>
                </div>
              </form>
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-2">
              {section.items.map((item) => (
                <div key={item.id} className="rounded-3xl border border-white/10 bg-zinc-950/40 p-5">
                  <GalleryPreviewCard item={item} />
                  <form action={updateGalleryItemAction} className="mt-5 grid gap-4">
                    <input type="hidden" name="itemId" value={item.id} />
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-white/75">Display title</label>
                        <input name="title" type="text" defaultValue={item.title} className="mt-2 w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition focus:border-red-300" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/75">Sort order</label>
                        <input name="sortOrder" type="number" min="0" defaultValue={item.sortOrder} className="mt-2 w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition focus:border-red-300" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/75">Supporting copy</label>
                      <input name="subtitle" type="text" defaultValue={item.subtitle} className="mt-2 w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition focus:border-red-300" />
                    </div>
                    <div className="flex flex-wrap items-center gap-4">
                      <label className="inline-flex items-center gap-2 text-sm text-white/75">
                        <input name="isVisible" type="checkbox" defaultChecked={item.isVisible} className="h-4 w-4 rounded border-white/20 bg-zinc-950 text-red-400" />
                        Visible publicly
                      </label>
                      <button type="submit" className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200">Save</button>
                    </div>
                  </form>
                  <form action={removeGalleryItemAction} className="mt-3">
                    <input type="hidden" name="itemId" value={item.id} />
                    <button type="submit" className="text-sm font-medium text-red-200 transition hover:text-red-100">Remove from section</button>
                  </form>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
