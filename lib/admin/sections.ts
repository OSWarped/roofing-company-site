export type GallerySectionKey = "home-featured" | "gallery-projects";

export const gallerySections: Array<{
  key: GallerySectionKey;
  name: string;
  description: string;
}> = [
  {
    key: "home-featured",
    name: "Homepage Featured Work",
    description:
      "The cards shown on the homepage where the owner highlights the strongest project categories or recent work.",
  },
  {
    key: "gallery-projects",
    name: "Gallery Page Projects",
    description:
      "Full project tiles for the dedicated gallery page, including optional location-style subtitles and display text.",
  },
];
