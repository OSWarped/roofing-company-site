import "server-only";

import { siteContent } from "@/data/site-content";
import { prisma } from "@/lib/db/prisma";
import { gallerySections, type GallerySectionKey } from "@/lib/admin/sections";

export type ManagedMediaAsset = {
  id: string;
  blobUrl: string;
  pathname: string;
  altText: string;
  caption: string;
  createdAt: string;
  isArchived: boolean;
  source: "database" | "fallback";
};

export type ManagedGalleryItem = {
  id: string;
  mediaAssetId: string;
  imageUrl: string;
  altText: string;
  title: string;
  subtitle: string;
  sortOrder: number;
  isVisible: boolean;
  sectionKey: GallerySectionKey;
  source: "database" | "fallback";
};

const fallbackHomeItems: ManagedGalleryItem[] = siteContent.gallery.cards.map((item, index) => ({
  id: `home-fallback-${index + 1}`,
  mediaAssetId: `home-fallback-media-${index + 1}`,
  imageUrl: "",
  altText: `${item.label} placeholder`,
  title: item.title,
  subtitle: item.description,
  sortOrder: index + 1,
  isVisible: true,
  sectionKey: "home-featured",
  source: "fallback",
}));

const fallbackGalleryItems: ManagedGalleryItem[] = siteContent.galleryProjects.map((item, index) => ({
  id: `gallery-fallback-${index + 1}`,
  mediaAssetId: `gallery-fallback-media-${index + 1}`,
  imageUrl: "",
  altText: `${item.title} placeholder`,
  title: item.title,
  subtitle: item.description,
  sortOrder: index + 1,
  isVisible: true,
  sectionKey: "gallery-projects",
  source: "fallback",
}));

const fallbackMediaAssets: ManagedMediaAsset[] = [
  "/images/Integrity-Roofing-of-MS-Logo.png",
  "/images/integrity-logo-cleanup.png",
  "/images/integrity-logo-white-red.png",
  "/images/integrity_roofing_transparent.PNG",
].map((src, index) => ({
  id: `fallback-media-${index + 1}`,
  blobUrl: src,
  pathname: src.split("/").pop() ?? src,
  altText: siteContent.companyName,
  caption: "Existing public asset",
  createdAt: new Date(2026, 2, index + 1).toISOString(),
  isArchived: false,
  source: "fallback",
}));

function mapSectionKey(sectionKey: string): GallerySectionKey | null {
  return gallerySections.some((section) => section.key === sectionKey)
    ? (sectionKey as GallerySectionKey)
    : null;
}

export async function getGallerySectionItems(
  sectionKey: GallerySectionKey,
  options?: { fallbackWhenEmpty?: boolean }
) {
  const fallbackWhenEmpty = options?.fallbackWhenEmpty ?? true;

  if (!prisma) {
    if (!fallbackWhenEmpty) {
      return [];
    }

    return sectionKey === "home-featured" ? fallbackHomeItems : fallbackGalleryItems;
  }

  const items = await prisma.galleryItem.findMany({
    where: {
      sectionKey,
      isVisible: true,
      mediaAsset: {
        isArchived: false,
      },
    },
    include: {
      mediaAsset: true,
    },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });

  if (!items.length) {
    if (!fallbackWhenEmpty) {
      return [];
    }

    return sectionKey === "home-featured" ? fallbackHomeItems : fallbackGalleryItems;
  }

  return items.map((item: { id: unknown; mediaAssetId: unknown; mediaAsset: { blobUrl: unknown; altText: unknown; caption: unknown; }; title: unknown; subtitle: unknown; sortOrder: unknown; isVisible: unknown; }) => ({
    id: item.id,
    mediaAssetId: item.mediaAssetId,
    imageUrl: item.mediaAsset.blobUrl,
    altText: item.mediaAsset.altText || item.title || siteContent.companyName,
    title: item.title || item.mediaAsset.caption || "Project image",
    subtitle: item.subtitle || item.mediaAsset.caption || "",
    sortOrder: item.sortOrder,
    isVisible: item.isVisible,
    sectionKey,
    source: "database" as const,
  }));
}

export async function listMediaAssets(options?: { includeArchived?: boolean }) {
  if (!prisma) {
    return fallbackMediaAssets;
  }

  const includeArchived = options?.includeArchived ?? false;
  const assets = await prisma.mediaAsset.findMany({
    where: includeArchived ? undefined : { isArchived: false },
    orderBy: [{ isArchived: "asc" }, { createdAt: "desc" }],
  });

  if (!assets.length) {
    return fallbackMediaAssets;
  }

  return assets.map((asset: {
    id: string;
    blobUrl: string;
    pathname: string;
    altText: string;
    caption: string;
    createdAt: Date;
    isArchived: boolean;
  }): ManagedMediaAsset => ({
    id: asset.id,
    blobUrl: asset.blobUrl,
    pathname: asset.pathname,
    altText: asset.altText || siteContent.companyName,
    caption: asset.caption || "",
    createdAt: asset.createdAt.toISOString(),
    isArchived: asset.isArchived,
    source: "database" as const,
  }));
}

export async function listGalleryAssignments(options?: { fallbackWhenEmpty?: boolean }) {
  const fallbackWhenEmpty = options?.fallbackWhenEmpty ?? true;

  const items = await Promise.all(
    gallerySections.map(async (section) => ({
      ...section,
      items: await getGallerySectionItems(section.key, { fallbackWhenEmpty }),
    })),
  );

  return items;
}

export async function getAdminOverview() {
  const [mediaAssets, assignments] = await Promise.all([
    listMediaAssets({ includeArchived: true }),
    listGalleryAssignments(),
  ]);

  const assignedCount = assignments.reduce((sum, section) => sum + section.items.length, 0);

  return {
    mediaCount: mediaAssets.filter((asset: ManagedMediaAsset) => !asset.isArchived).length,
    archivedMediaCount: mediaAssets.filter((asset: ManagedMediaAsset) => asset.isArchived).length,
    assignedCount,
    sectionsCount: assignments.length,
    usesFallbackData: !prisma,
  };
}

export async function listAdminUsers() {
  if (!prisma) {
    return [];
  }

  return prisma.user.findMany({
    orderBy: [{ role: "asc" }, { email: "asc" }],
  });
}

export async function listAvailableMediaForSection(sectionKey: GallerySectionKey) {
  const normalizedSectionKey = mapSectionKey(sectionKey);

  if (!normalizedSectionKey) {
    return [];
  }

  const media = await listMediaAssets();
  const assigned = await getGallerySectionItems(normalizedSectionKey, {
    fallbackWhenEmpty: false,
  });
  const assignedIds = new Set(assigned.map((item: ManagedGalleryItem) => item.mediaAssetId));

  return media.filter((asset: ManagedMediaAsset) => !assignedIds.has(asset.id) && !asset.isArchived);
}