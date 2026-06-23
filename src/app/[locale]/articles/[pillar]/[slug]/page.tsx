import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getArticle, renderMarkdown, getAllArticles } from "@/lib/articles";
import { getDictionary } from "@/i18n/dictionaries";
import { PILLARS, type Locale, type Pillar } from "@/types/content";

interface ArticlePageProps {
  params: Promise<{ locale: string; pillar: string; slug: string }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { locale, pillar, slug } = await params;
  const article = getArticle(pillar as Pillar, slug, locale as Locale);

  if (!article) return {};

  return {
    title: article.metaTitle,
    description: article.metaDescription,
    alternates: {
      languages: {
        id: `/id/articles/${pillar}/${slug}`,
        en: `/en/articles/${pillar}/${slug}`,
      },
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { locale, pillar, slug } = await params;
  const loc = locale as Locale;
  const article = getArticle(pillar as Pillar, slug, loc);

  if (!article) {
    notFound();
  }

  const dict = getDictionary(loc);
  const html = await renderMarkdown(article.content);
  const pillarMeta = PILLARS.find((p) => p.id === article.pillar)!;
  const pillarLabel = loc === "id" ? pillarMeta.labelId : pillarMeta.labelEn;

  // Simple related-articles fallback: same pillar, excluding the current article.
  const related = getAllArticles(loc)
    .filter((a) => a.pillar === article.pillar && a.slug !== article.slug)
    .slice(0, 3);

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <Link
        href={`/${loc}/articles/${article.pillar}`}
        className="text-sm text-slate-500 hover:text-slate-800"
      >
        ← {pillarLabel}
      </Link>

      <p className="mt-4 text-xs font-medium uppercase tracking-wide text-amber-600">
        {pillarLabel}
      </p>
      <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">{article.title}</h1>

      <div className="mt-3 flex items-center gap-3 text-sm text-slate-500">
        <span>
          {dict.article.publishedOn} {article.publishedAt}
        </span>
        <span>·</span>
        <span>{dict.article.readingTime(article.readingTimeMinutes)}</span>
      </div>

      <div
        className="prose prose-slate mt-8 max-w-none prose-headings:font-semibold prose-a:text-amber-700"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {related.length > 0 && (
        <div className="mt-12 border-t border-slate-200 pt-8">
          <h2 className="text-lg font-semibold text-slate-900">
            {dict.article.relatedArticles}
          </h2>
          <ul className="mt-4 space-y-3">
            {related.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/${loc}/articles/${r.pillar}/${r.slug}`}
                  className="text-amber-700 hover:underline"
                >
                  {r.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}
