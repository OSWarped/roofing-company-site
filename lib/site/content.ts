import "server-only";

import { Prisma } from "@prisma/client";
import {
  siteContent,
  type SectionVisibility,
  type SiteContent,
} from "@/data/site-content";
import { prisma } from "@/lib/db/prisma";

export const SITE_CONTENT_KEY = "site-content";

type PlainObject = Record<string, unknown>;
export type SectionVisibilityKey = keyof SectionVisibility;

function isPlainObject(value: unknown): value is PlainObject {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function mergeDeep<T>(base: T, override: unknown): T {
  if (Array.isArray(base)) {
    return Array.isArray(override) ? (override as T) : base;
  }

  if (!isPlainObject(base)) {
    if (typeof override === "string") {
      return (override.trim() ? override : base) as T;
    }

    return override === undefined || override === null ? base : (override as T);
  }

  if (!isPlainObject(override)) {
    return base;
  }

  const merged: PlainObject = { ...base };

  for (const [key, value] of Object.entries(override)) {
    merged[key] = key in base ? mergeDeep(base[key as keyof T], value) : value;
  }

  return merged as T;
}

export async function getEditableSiteContent(): Promise<SiteContent> {
  if (!prisma) {
    return siteContent;
  }

  try {
    const row = await prisma.siteContentOverride.findUnique({
      where: { key: SITE_CONTENT_KEY },
    });

    return mergeDeep(siteContent, row?.value);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      (error.code === "P2021" || error.code === "P2022")
    ) {
      return siteContent;
    }

    throw error;
  }
}

export async function saveEditableSiteContent(content: SiteContent) {
  if (!prisma) {
    return;
  }

  await prisma.siteContentOverride.upsert({
    where: { key: SITE_CONTENT_KEY },
    update: { value: content as unknown as Prisma.InputJsonValue },
    create: {
      key: SITE_CONTENT_KEY,
      value: content as unknown as Prisma.InputJsonValue,
    },
  });
}

export function isSectionVisible(content: SiteContent, key: SectionVisibilityKey) {
  return content.sectionVisibility?.[key] ?? true;
}
