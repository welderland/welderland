/**
 * Core content types for the platform.
 *
 * These types are shared across the article system today, and will be
 * reused by the WPS Generator and other tools in Phase 2 (e.g. for
 * saved documents, user accounts). Keeping them centralized here avoids
 * duplicating shape definitions later.
 */

/** The three content pillars defined in the roadmap. */
export type Pillar = "fabrication" | "technology" | "training";

/** Supported languages. Indonesian is default, English is the secondary market. */
export type Locale = "id" | "en";

export interface ArticleFrontmatter {
  /** Unique slug, used in the URL: /articles/[pillar]/[slug] */
  slug: string;
  pillar: Pillar;
  locale: Locale;
  title: string;
  /** Short summary shown in article list cards and used as meta description fallback. */
  excerpt: string;
  /** ISO date string, e.g. "2026-06-17" */
  publishedAt: string;
  updatedAt?: string;
  /** Estimated reading time in minutes, shown to the reader. */
  readingTimeMinutes: number;
  /** Optional cover image path relative to /public */
  coverImage?: string;
  /** SEO fields - kept explicit rather than auto-generated from title/excerpt. */
  metaTitle: string;
  metaDescription: string;
  /** Slugs of related articles, used for internal linking (important for SEO clustering). */
  relatedSlugs?: string[];
  /** If this article is a natural bridge to a Phase 2 tool, name it here for future CTA insertion. */
  relatedTool?: "wps-generator" | "handbook" | "consumable-database";
}

export interface Article extends ArticleFrontmatter {
  /** Rendered HTML or MDX content body. */
  content: string;
}

export const PILLARS: { id: Pillar; labelId: string; labelEn: string }[] = [
  { id: "fabrication", labelId: "Welding Fabrication", labelEn: "Welding Fabrication" },
  { id: "technology", labelId: "Welding Technology", labelEn: "Welding Technology" },
  { id: "training", labelId: "Welding Training", labelEn: "Welding Training" },
];
