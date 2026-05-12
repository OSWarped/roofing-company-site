"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { hash } from "bcryptjs";
import { put } from "@vercel/blob";
import { signOut } from "@/auth";
import { requireAdmin, requireOwner } from "@/lib/auth/admin";
import { prisma } from "@/lib/db/prisma";
import { getEditableSiteContent, saveEditableSiteContent } from "@/lib/site/content";

export async function adminSignOutAction() {
  await signOut({ redirectTo: "/admin/login" });
}

function textValue(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function textList(formData: FormData, key: string) {
  return textValue(formData, key)
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function pairedItems(formData: FormData, titleKey: string, descriptionKey: string) {
  const titles = formData.getAll(titleKey).map((value) => String(value).trim());
  const descriptions = formData.getAll(descriptionKey).map((value) => String(value).trim());

  return titles
    .map((title, index) => ({
      title,
      description: descriptions[index] ?? "",
    }))
    .filter((item) => item.title || item.description);
}

function checkboxValue(formData: FormData, key: string) {
  return formData.get(key) === "on";
}

export async function updateSiteContentAction(formData: FormData) {
  await requireAdmin();

  if (!prisma) {
    redirect("/admin/content?status=database-not-configured");
  }

  const current = await getEditableSiteContent();
  const serviceTitles = formData.getAll("serviceTitle").map((value) => String(value).trim());
  const serviceDescriptions = formData.getAll("serviceDescription").map((value) => String(value).trim());
  const serviceHrefs = formData.getAll("serviceHref").map((value) => String(value).trim());
  const reviewNames = formData.getAll("reviewName").map((value) => String(value).trim());
  const reviewTexts = formData.getAll("reviewText").map((value) => String(value).trim());
  const galleryLabels = formData.getAll("galleryCardLabel").map((value) => String(value).trim());
  const galleryTitles = formData.getAll("galleryCardTitle").map((value) => String(value).trim());
  const galleryDescriptions = formData.getAll("galleryCardDescription").map((value) =>
    String(value).trim(),
  );

  const nextContent = {
    ...current,
    companyName: textValue(formData, "companyName") || current.companyName,
    shortName: textValue(formData, "shortName") || current.shortName,
    phone: textValue(formData, "phone") || current.phone,
    phoneHref: textValue(formData, "phoneHref") || current.phoneHref,
    email: textValue(formData, "email") || current.email,
    licenseNumber: textValue(formData, "licenseNumber") || current.licenseNumber,
    serviceArea: textValue(formData, "serviceArea") || current.serviceArea,
    serviceAreaDescription:
      textValue(formData, "serviceAreaDescription") || current.serviceAreaDescription,
    serviceAreaDetail: textValue(formData, "serviceAreaDetail") || current.serviceAreaDetail,
    cities: textList(formData, "cities"),
    serviceCities: textList(formData, "serviceCities"),
    hero: {
      eyebrow: textValue(formData, "heroEyebrow") || current.hero.eyebrow,
      headline: textValue(formData, "heroHeadline") || current.hero.headline,
      subheadline: textValue(formData, "heroSubheadline") || current.hero.subheadline,
      primaryCta: textValue(formData, "heroPrimaryCta") || current.hero.primaryCta,
      secondaryCta: textValue(formData, "heroSecondaryCta") || current.hero.secondaryCta,
      supportingPoints: textList(formData, "heroSupportingPoints"),
    },
    trustItems: textList(formData, "trustItems"),
    services: serviceTitles
      .map((title, index) => ({
        title,
        description: serviceDescriptions[index] ?? "",
        href: serviceHrefs[index] || "/services",
      }))
      .filter((service) => service.title || service.description),
    whyChooseUs: {
      eyebrow: textValue(formData, "whyEyebrow") || current.whyChooseUs.eyebrow,
      title: textValue(formData, "whyTitle") || current.whyChooseUs.title,
      description: textValue(formData, "whyDescription") || current.whyChooseUs.description,
      items: textList(formData, "whyItems"),
    },
    about: {
      intro: textValue(formData, "aboutIntro") || current.about.intro,
      story: textValue(formData, "aboutStory") || current.about.story,
      values: pairedItems(formData, "aboutValueTitle", "aboutValueDescription"),
    },
    contact: {
      responseNote: textValue(formData, "contactResponseNote") || current.contact.responseNote,
      estimateChecklist: textList(formData, "estimateChecklist"),
    },
    gallery: {
      eyebrow: textValue(formData, "galleryEyebrow") || current.gallery.eyebrow,
      title: textValue(formData, "galleryTitle") || current.gallery.title,
      description: textValue(formData, "galleryDescription") || current.gallery.description,
      cards: galleryLabels
        .map((label, index) => ({
          label,
          title: galleryTitles[index] ?? "",
          description: galleryDescriptions[index] ?? "",
        }))
        .filter((card) => card.label || card.title || card.description),
    },
    reviews: reviewNames
      .map((name, index) => ({
        name,
        text: reviewTexts[index] ?? "",
      }))
      .filter((review) => review.name || review.text),
    reviewsPlaceholder: {
      title: textValue(formData, "reviewsPlaceholderTitle") || current.reviewsPlaceholder.title,
      text: textValue(formData, "reviewsPlaceholderText") || current.reviewsPlaceholder.text,
    },
    finalCta: {
      eyebrow: textValue(formData, "finalCtaEyebrow") || current.finalCta.eyebrow,
      title: textValue(formData, "finalCtaTitle") || current.finalCta.title,
      description: textValue(formData, "finalCtaDescription") || current.finalCta.description,
    },
    sectionVisibility: {
      homeHero: checkboxValue(formData, "sectionVisibility.homeHero"),
      homeTrustBar: checkboxValue(formData, "sectionVisibility.homeTrustBar"),
      homeServices: checkboxValue(formData, "sectionVisibility.homeServices"),
      homeWhyChooseUs: checkboxValue(formData, "sectionVisibility.homeWhyChooseUs"),
      homeGallery: checkboxValue(formData, "sectionVisibility.homeGallery"),
      homeFinalCta: checkboxValue(formData, "sectionVisibility.homeFinalCta"),
      galleryPageIntro: checkboxValue(formData, "sectionVisibility.galleryPageIntro"),
      galleryPageProjects: checkboxValue(formData, "sectionVisibility.galleryPageProjects"),
      galleryPageCta: checkboxValue(formData, "sectionVisibility.galleryPageCta"),
    },
    socialLinks: {
      facebook: textValue(formData, "facebook") || current.socialLinks.facebook,
      instagram: textValue(formData, "instagram") || current.socialLinks.instagram,
      tiktok: textValue(formData, "tiktok") || current.socialLinks.tiktok,
    },
  };

  if (!nextContent.cities.length) {
    nextContent.cities = current.cities;
  }

  if (!nextContent.serviceCities.length) {
    nextContent.serviceCities = current.serviceCities;
  }

  if (!nextContent.hero.supportingPoints.length) {
    nextContent.hero.supportingPoints = current.hero.supportingPoints;
  }

  if (!nextContent.trustItems.length) {
    nextContent.trustItems = current.trustItems;
  }

  if (!nextContent.services.length) {
    nextContent.services = current.services;
  }

  if (!nextContent.whyChooseUs.items.length) {
    nextContent.whyChooseUs.items = current.whyChooseUs.items;
  }

  if (!nextContent.about.values.length) {
    nextContent.about.values = current.about.values;
  }

  if (!nextContent.contact.estimateChecklist.length) {
    nextContent.contact.estimateChecklist = current.contact.estimateChecklist;
  }

  if (!nextContent.gallery.cards.length) {
    nextContent.gallery.cards = current.gallery.cards;
  }

  await saveEditableSiteContent(nextContent);

  ["/", "/services", "/gallery", "/about", "/reviews", "/contact", "/admin/content"].forEach(
    (path) => revalidatePath(path),
  );

  redirect("/admin/content?status=saved");
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

export async function resetAdminPasswordAction(formData: FormData) {
  await requireOwner();

  if (!prisma) {
    redirect("/admin/admins?status=database-not-configured");
  }

  const userId = String(formData.get("userId") ?? "").trim();
  const newPassword = String(formData.get("newPassword") ?? "").trim();
  const confirmPassword = String(formData.get("confirmPassword") ?? "").trim();

  if (!userId || !newPassword || !confirmPassword) {
    redirect("/admin/admins?status=missing-password-fields");
  }

  if (newPassword !== confirmPassword) {
    redirect("/admin/admins?status=passwords-do-not-match");
  }

  if (newPassword.length < 8) {
    redirect("/admin/admins?status=password-too-short");
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, role: true },
  });

  if (!user) {
    redirect("/admin/admins?status=user-not-found");
  }

  if (user.role !== "ADMIN" && user.role !== "OWNER") {
    redirect("/admin/admins?status=user-not-admin");
  }

  const passwordHash = await hash(newPassword, 12);

  await prisma.user.update({
    where: { id: userId },
    data: {
      passwordHash,
      isActive: true,
    },
  });

  revalidatePath("/admin/admins");
  redirect("/admin/admins?status=password-reset");
}
