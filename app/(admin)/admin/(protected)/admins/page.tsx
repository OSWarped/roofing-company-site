import { AdminNotice } from "@/components/admin/AdminNotice";
import { requireOwner } from "@/lib/auth/admin";
import { listAdminUsers } from "@/lib/admin/repository";
import { createAdminUserAction, updateAdminUserAction } from "../actions";

type AdminUsersPageProps = {
  searchParams: Promise<{ status?: string }>;
};

export default async function AdminUsersPage({ searchParams }: AdminUsersPageProps) {
  await requireOwner();
  const users = await listAdminUsers();
  const { status } = await searchParams;

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-300">Admin Users</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white">Owner and delegated admin access</h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-white/70">
          Create admin credentials for office staff or trusted delegated users, then adjust who remains active.
        </p>
      </div>

      {status ? (
        <AdminNotice
          title="Latest admin action"
          description={`Admin action result: ${status.replace(/-/g, " ")}.`}
        />
      ) : null}

      <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-2xl font-semibold text-white">Create or reset an admin account</h2>
        <form action={createAdminUserAction} className="mt-6 grid gap-4 lg:grid-cols-[1fr_1fr_1fr_180px_auto] lg:items-end">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white/75">Name</label>
            <input id="name" name="name" type="text" className="mt-2 w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition focus:border-red-300" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white/75">Email</label>
            <input id="email" name="email" type="email" required className="mt-2 w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition focus:border-red-300" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white/75">Password</label>
            <input id="password" name="password" type="password" required className="mt-2 w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition focus:border-red-300" />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-white/75">Role</label>
            <select id="role" name="role" defaultValue="ADMIN" className="mt-2 w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition focus:border-red-300">
              <option value="ADMIN">Admin</option>
              <option value="OWNER">Owner</option>
            </select>
          </div>
          <button type="submit" className="rounded-2xl bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-400">Save account</button>
        </form>
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold text-white">Current admin access</h2>
          <span className="rounded-full bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">{users.length} users</span>
        </div>

        <div className="mt-6 grid gap-4">
          {users.map((user) => (
            <form key={user.id} action={updateAdminUserAction} className="grid gap-4 rounded-2xl border border-white/10 bg-zinc-950/40 p-5 lg:grid-cols-[1.2fr_180px_160px_auto] lg:items-center">
              <input type="hidden" name="userId" value={user.id} />
              <div>
                <p className="text-sm font-semibold text-white">{user.name || user.email}</p>
                <p className="mt-1 text-sm text-white/65">{user.email}</p>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-white/50">Role</label>
                <select name="role" defaultValue={user.role} className="mt-2 w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition focus:border-red-300">
                  <option value="ADMIN">Admin</option>
                  <option value="OWNER">Owner</option>
                </select>
              </div>
              <label className="inline-flex items-center gap-3 text-sm text-white/75 lg:mt-6">
                <input name="isActive" type="checkbox" defaultChecked={user.isActive} className="h-4 w-4 rounded border-white/20 bg-zinc-950 text-red-400" />
                Active
              </label>
              <button type="submit" className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200">Update</button>
            </form>
          ))}
          {!users.length ? (
            <p className="rounded-2xl border border-dashed border-white/15 bg-zinc-950/30 px-5 py-4 text-sm text-white/65">
              No users exist yet. Seed the owner account first, then use the form above to add more admins.
            </p>
          ) : null}
        </div>
      </section>
    </div>
  );
}
