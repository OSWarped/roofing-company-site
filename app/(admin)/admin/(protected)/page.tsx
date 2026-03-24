import Link from "next/link";
import { AdminNotice } from "@/components/admin/AdminNotice";
import { StatCard } from "@/components/admin/StatCard";
import { getAdminSetupState } from "@/lib/auth/admin";
import { getAdminOverview, listGalleryAssignments, listMediaAssets } from "@/lib/admin/repository";

export default async function AdminOverviewPage() {
  const overview = await getAdminOverview();
  const assignments = await listGalleryAssignments();
  const assets = await listMediaAssets({ includeArchived: true });
  const setup = getAdminSetupState();

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-300">Overview</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white">Site admin foundation</h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-white/70">
            This is the first admin slice: auth, media uploads, gallery assignment, delegated admin management,
            and safer archiving for photos that should disappear from public use without being destroyed.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/admin/media" className="rounded-2xl bg-white px-5 py-3 font-semibold text-zinc-950 transition hover:bg-zinc-200">Upload media</Link>
          <Link href="/admin/gallery" className="rounded-2xl border border-white/15 px-5 py-3 font-semibold text-white transition hover:bg-white/10">Manage galleries</Link>
        </div>
      </div>

      {!setup.isDatabaseConfigured || !setup.isBlobConfigured || !setup.isAuthSecretConfigured ? (
        <AdminNotice
          title="Setup still in progress"
          description="The UI is wired, but production editing depends on Postgres, Blob storage, and AUTH_SECRET being configured in Vercel. Until then the public site keeps using its placeholder content and fallback assets."
        />
      ) : null}

      {overview.usesFallbackData ? (
        <AdminNotice
          title="Fallback preview mode"
          description="Because the database is not connected yet, the admin screens are showing preview data derived from the current marketing site content and a few existing public images."
        />
      ) : null}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Media assets" value={overview.mediaCount} helper="Uploaded images currently available for assignment." />
        <StatCard label="Archived assets" value={overview.archivedMediaCount} helper="Saved for reuse later, but excluded from public rendering." />
        <StatCard label="Gallery assignments" value={overview.assignedCount} helper="Images or placeholder entries currently mapped into public sections." />
        <StatCard label="Managed sections" value={overview.sectionsCount} helper="Homepage featured work and the gallery page are wired first." />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-semibold text-white">Gallery sections</h2>
          <div className="mt-6 grid gap-4">
            {assignments.map((section) => (
              <div key={section.key} className="rounded-2xl border border-white/10 bg-zinc-950/40 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-lg font-semibold text-white">{section.name}</p>
                    <p className="mt-2 text-sm leading-7 text-white/65">{section.description}</p>
                  </div>
                  <span className="rounded-full bg-red-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-red-200">
                    {section.items.length} items
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-semibold text-white">Recent assets</h2>
          <div className="mt-6 grid gap-4">
            {assets.slice(0, 4).map((asset) => (
              <div key={asset.id} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-zinc-950/40 p-4">
                <img src={asset.blobUrl} alt={asset.altText} className="h-20 w-20 rounded-2xl object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-white">{asset.pathname}</p>
                  <p className="mt-2 text-sm text-white/65">{asset.caption || "No caption yet"}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${asset.isArchived ? "bg-amber-500/15 text-amber-200" : "bg-emerald-500/15 text-emerald-200"}`}>
                  {asset.isArchived ? "Archived" : "Active"}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
