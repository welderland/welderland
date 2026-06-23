import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import type { Article, ArticleFrontmatter, Locale, Pillar } from "@/types/content";

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "articles");

/**
 * Articles are stored as plain markdown files with frontmatter, one file
 * per locale: e.g. content/articles/fabrication/smaw-basics.id.md and
 * .en.md. This keeps Phase 1 simple (no CMS, no database) while staying
 * easy to migrate later if the article count grows large enough to need one.
 */
function articleFilePath(pillar: Pillar, slug: string, locale: Locale) {
  return path.join(CONTENT_DIR, pillar, `${slug}.${locale}.md`);
}

export async function renderMarkdown(markdown: string): Promise<string> {
  const result = await remark().use(remarkHtml).process(markdown);
  return result.toString();
}

export function getArticle(pillar: Pillar, slug: string, locale: Locale): Article | null {
  const filePath = articleFilePath(pillar, slug, locale);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    ...(data as ArticleFrontmatter),
    content,
  };
}

export function getAllArticleSlugs(pillar: Pillar, locale: Locale): string[] {
  const pillarDir = path.join(CONTENT_DIR, pillar);
  if (!fs.existsSync(pillarDir)) return [];

  const suffix = `.${locale}.md`;
  return fs
    .readdirSync(pillarDir)
    .filter((file) => file.endsWith(suffix))
    .map((file) => file.replace(suffix, ""));
}

export function getAllArticlesForPillar(pillar: Pillar, locale: Locale): ArticleFrontmatter[] {
  const slugs = getAllArticleSlugs(pillar, locale);
  const articles = slugs
    .map((slug) => getArticle(pillar, slug, locale))
    .filter((a): a is Article => a !== null)
    .map(({ content: _content, ...frontmatter }) => frontmatter);

  return articles.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getAllArticles(locale: Locale): ArticleFrontmatter[] {
  const pillars: Pillar[] = ["fabrication", "technology", "training"];
  return pillars
    .flatMap((pillar) => getAllArticlesForPillar(pillar, locale))
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}
