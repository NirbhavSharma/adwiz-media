import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://adwiz-media.example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const sections = ["", "#services", "#process", "#work", "#plans", "#contact"];

  return sections.map((section) => ({
    url: `${siteUrl}/${section}`,
    lastModified: new Date("2026-06-23"),
    changeFrequency: "weekly",
    priority: section ? 0.8 : 1
  }));
}
