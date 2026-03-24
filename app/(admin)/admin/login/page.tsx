import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { adminLoginAction } from "./actions";
import { siteContent } from "@/data/site-content";
import { getAdminSession, getAdminSetupState } from "@/lib/auth/admin";

export const metadata: Metadata = {
  title: `Admin Login | ${siteContent.companyName}`,
  description: "Secure login for the roofing site admin console.",
};

type LoginPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const session = await getAdminSession();

  if (session?.user) {
    redirect("/admin");
  }

  const { error } = await searchParams;
  const setup = getAdminSetupState();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 py-12 text-white">
      <div className="w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-900 shadow-[0_40px_120px_-55px_rgba(0,0,0,0.8)] lg:grid lg:grid-cols-[1fr_0.9fr]">
        <div className="border-b border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(248,113,113,0.22),_transparent_30%),linear-gradient(180deg,_rgba(24,24,27,0.96),_rgba(9,9,11,1))] p-8 lg:border-b-0 lg:border-r lg:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-300">
            Protected Admin Area
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white">
            Manage the site without touching code.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-white/72">
            This admin module is the starting point for media uploads, homepage gallery control, and delegated admin access for {siteContent.companyName}.
          </p>

          <div className="mt-8 grid gap-4 text-sm text-white/75">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="font-semibold text-white">Current setup status</p>
              <ul className="mt-3 space-y-2">
                <li>Database: {setup.isDatabaseConfigured ? "connected" : "not configured yet"}</li>
                <li>Blob storage: {setup.isBlobConfigured ? "connected" : "not configured yet"}</li>
                <li>Auth secret: {setup.isAuthSecretConfigured ? "configured" : "missing"}</li>
              </ul>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="font-semibold text-white">First-time setup</p>
              <p className="mt-3 leading-7 text-white/72">
                Provision Postgres and Blob in Vercel, set AUTH_SECRET, run Prisma migrations, then seed the owner account before logging in.
              </p>
            </div>
          </div>
        </div>

        <div className="p-8 lg:p-10">
          <div className="max-w-md">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/45">
              Sign in
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Admin console login</h2>
            <p className="mt-4 text-sm leading-7 text-white/65">
              Use an owner or admin account created through the seed script or the admin users screen.
            </p>

            {error ? (
              <div className="mt-6 rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
                Login failed. Double-check the email, password, and database setup.
              </div>
            ) : null}

            <form action={adminLoginAction} className="mt-8 space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/80">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-red-300"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white/80">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-red-300"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-2xl bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-400"
              >
                Sign in to admin
              </button>
            </form>

            <Link
              href="/"
              className="mt-6 inline-flex text-sm font-medium text-white/60 transition hover:text-white"
            >
              ← Back to the website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
