import { auth } from "@/auth";
import { isDatabaseConfigured } from "@/lib/db/prisma";
import { redirect } from "next/navigation";

export function isAdminRole(role?: string | null) {
  return role === "OWNER" || role === "ADMIN";
}

export async function getAdminSession() {
  return auth();
}

export async function requireAdmin() {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  if (!isAdminRole(session.user.role)) {
    redirect("/");
  }

  return session.user;
}

export async function requireOwner() {
  const user = await requireAdmin();

  if (user.role !== "OWNER") {
    redirect("/admin");
  }

  return user;
}

export function getAdminSetupState() {
  return {
    isDatabaseConfigured,
    isBlobConfigured: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
    isAuthSecretConfigured: Boolean(process.env.AUTH_SECRET),
  };
}
