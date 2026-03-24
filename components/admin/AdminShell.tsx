import Link from "next/link";
import { siteContent } from "@/data/site-content";
import { adminSignOutAction } from "@/app/(admin)/admin/(protected)/actions";

const navItems = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/media", label: "Media Library" },
  { href: "/admin/gallery", label: "Gallery Manager" },
  { href: "/admin/admins", label: "Admins" },
];

export function AdminShell({
  children,
  user,
}: {
  children: React.ReactNode;
  user: {
    name?: string | null;
    email?: string | null;
    role: string;
  };
}) {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col lg:flex-row">
        <aside className="border-b border-white/10 bg-zinc-900/80 p-6 lg:min-h-screen lg:w-72 lg:border-b-0 lg:border-r">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-red-300">
              Admin Console
            </p>
            <h1 className="mt-3 text-2xl font-semibold text-white">{siteContent.companyName}</h1>
            <p className="mt-3 text-sm leading-6 text-white/70">
              Manage site photos, homepage gallery selections, and who can access the admin tools.
            </p>
          </div>

          <nav className="mt-8 grid gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl border border-white/10 px-4 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/75">
            <p className="font-semibold text-white">Signed in as</p>
            <p className="mt-2">{user.name || user.email}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-red-200">{user.role}</p>
          </div>

          <form action={adminSignOutAction} className="mt-4">
            <button
              type="submit"
              className="w-full rounded-2xl border border-white/15 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Sign out
            </button>
          </form>
        </aside>

        <div className="flex-1 p-6 sm:p-8 lg:p-10">
          <div className="rounded-[2rem] border border-white/10 bg-zinc-900/70 p-6 shadow-[0_30px_90px_-45px_rgba(0,0,0,0.7)] sm:p-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
