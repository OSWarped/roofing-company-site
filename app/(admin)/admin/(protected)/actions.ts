"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { hash } from "bcryptjs";
import { put } from "@vercel/blob";
import { signOut } from "@/auth";
import { requireAdmin, requireOwner } from "@/lib/auth/admin";
import { prisma } from "@/lib/db/prisma";

export async function adminSignOutAction() {
  await signOut({ redirectTo: "/admin/login" });
}

export async function uploadMediaAction(formData: FormData) {
  const user = await requireAdmin();

  if (!prisma || !process.env.BLOB_READ_WRITE_TOKEN) {
    redirect("/admin/media?status=storage-not-configured");
  }

  const file = formData.get("file");
  const altText = String(formData.get("altText") ?? "").trim();
  const caption = String(formData.get("caption") ?? "").trim();

  if (!(file instanceof File) || file.size === 0) {
    redirect("/admin/media?status=missing-file");
  }

  const extension = file.name.includes(".") ? file.name.split(".").pop() : "jpg";
  const safeBase = file.name.replace(/\.[^.]+$/, "").replace(/[^a-zA-Z0-9-_]+/g, "-").toLowerCase();
  const pathname = `roofing-site/${Date.now()}-${safeBase}.${extension}`;

  const blob = await put(pathname, file, {
    access: "public",
    addRandomSuffix: true,
    contentType: file.type || undefined,
  });

  await prisma.mediaAsset.create({
    data: {
      pathname: blob.pathname,
      blobUrl: blob.url,
      contentType: file.type || null,
      altText: altText || null,
      caption: caption || null,
      uploadedByUserId: user.id,
    },
  });

  revalidatePath("/");
  revalidatePath("/gallery");
  revalidatePath("/admin/media");
  redirect("/admin/media?status=uploaded");
}

export async function updateMediaAssetAction(formData: FormData) {
  await requireAdmin();

  if (!prisma) {
    redirect("/admin/media?status=database-not-configured");
  }

  const mediaAssetId = String(formData.get("mediaAssetId") ?? "").trim();
  const altText = String(formData.get("altText") ?? "").trim();
  const caption = String(formData.get("caption") ?? "").trim();

  if (!mediaAssetId) {
    redirect("/admin/media?status=missing-media-item");
  }

  await prisma.mediaAsset.update({
    where: { id: mediaAssetId },
    data: {
      altText: altText || null,
      caption: caption || null,
    },
  });

  revalidatePath("/");
  revalidatePath("/gallery");
  revalidatePath("/admin/media");
  redirect("/admin/media?status=updated");
}

export async function toggleArchiveMediaAssetAction(formData: FormData) {
  await requireAdmin();

  if (!prisma) {
    redirect("/admin/media?status=database-not-configured");
  }

  const mediaAssetId = String(formData.get("mediaAssetId") ?? "").trim();
  const nextArchivedState = String(formData.get("nextArchivedState") ?? "false") === "true";

  if (!mediaAssetId) {
    redirect("/admin/media?status=missing-media-item");
  }

  await prisma.mediaAsset.update({
    where: { id: mediaAssetId },
    data: {
      isArchived: nextArchivedState,
    },
  });

  revalidatePath("/");
  revalidatePath("/gallery");
  revalidatePath("/admin/media");
  revalidatePath("/admin/gallery");
  redirect(`/admin/media?status=${nextArchivedState ? "archived" : "restored"}`);
}

export async function assignMediaToGalleryAction(formData: FormData) {
  await requireAdmin();

  if (!prisma) {
    redirect("/admin/gallery?status=database-not-configured");
  }

  const sectionKey = String(formData.get("sectionKey") ?? "").trim();
  const mediaAssetId = String(formData.get("mediaAssetId") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const subtitle = String(formData.get("subtitle") ?? "").trim();
  const sortOrder = Number(formData.get("sortOrder") ?? 0) || 0;
  const isVisible = formData.get("isVisible") === "on";

  if (!sectionKey || !mediaAssetId) {
    redirect("/admin/gallery?status=missing-fields");
  }

  await prisma.galleryItem.upsert({
    where: {
      sectionKey_mediaAssetId: {
        sectionKey,
        mediaAssetId,
      },
    },
    update: {
      title: title || null,
      subtitle: subtitle || null,
      sortOrder,
      isVisible,
    },
    create: {
      sectionKey,
      mediaAssetId,
      title: title || null,
      subtitle: subtitle || null,
      sortOrder,
      isVisible,
    },
  });

  revalidatePath("/");
  revalidatePath("/gallery");
  revalidatePath("/admin/gallery");
  redirect("/admin/gallery?status=saved");
}

export async function updateGalleryItemAction(formData: FormData) {
  await requireAdmin();

  if (!prisma) {
    redirect("/admin/gallery?status=database-not-configured");
  }

  const itemId = String(formData.get("itemId") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const subtitle = String(formData.get("subtitle") ?? "").trim();
  const sortOrder = Number(formData.get("sortOrder") ?? 0) || 0;
  const isVisible = formData.get("isVisible") === "on";

  if (!itemId) {
    redirect("/admin/gallery?status=missing-item");
  }

  await prisma.galleryItem.update({
    where: { id: itemId },
    data: {
      title: title || null,
      subtitle: subtitle || null,
      sortOrder,
      isVisible,
    },
  });

  revalidatePath("/");
  revalidatePath("/gallery");
  revalidatePath("/admin/gallery");
  redirect("/admin/gallery?status=updated");
}

export async function removeGalleryItemAction(formData: FormData) {
  await requireAdmin();

  if (!prisma) {
    redirect("/admin/gallery?status=database-not-configured");
  }

  const itemId = String(formData.get("itemId") ?? "").trim();

  if (!itemId) {
    redirect("/admin/gallery?status=missing-item");
  }

  const result = await prisma.galleryItem.deleteMany({
    where: { id: itemId },
  });

  if (result.count === 0) {
    redirect("/admin/gallery?status=item-not-found");
  }

  revalidatePath("/");
  revalidatePath("/gallery");
  revalidatePath("/admin/gallery");
  redirect("/admin/gallery?status=removed");
}

export async function createAdminUserAction(formData: FormData) {
  await requireOwner();

  if (!prisma) {
    redirect("/admin/admins?status=database-not-configured");
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "").trim();
  const role = String(formData.get("role") ?? "ADMIN").trim();

  if (!email || !password || (role !== "ADMIN" && role !== "OWNER")) {
    redirect("/admin/admins?status=invalid-input");
  }

  const passwordHash = await hash(password, 12);

  await prisma.user.upsert({
    where: { email },
    update: {
      name: name || null,
      passwordHash,
      role: role as "ADMIN" | "OWNER",
      isActive: true,
    },
    create: {
      name: name || null,
      email,
      passwordHash,
      role: role as "ADMIN" | "OWNER",
      isActive: true,
    },
  });

  revalidatePath("/admin/admins");
  redirect("/admin/admins?status=saved");
}

export async function updateAdminUserAction(formData: FormData) {
  const currentUser = await requireOwner();

  if (!prisma) {
    redirect("/admin/admins?status=database-not-configured");
  }

  const userId = String(formData.get("userId") ?? "").trim();
  const role = String(formData.get("role") ?? "ADMIN").trim();
  const isActive = formData.get("isActive") === "on";

  if (!userId || (role !== "ADMIN" && role !== "OWNER")) {
    redirect("/admin/admins?status=invalid-input");
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      role: role as "ADMIN" | "OWNER",
      isActive: currentUser.id === userId ? true : isActive,
    },
  });

  revalidatePath("/admin/admins");
  redirect("/admin/admins?status=updated");
}
