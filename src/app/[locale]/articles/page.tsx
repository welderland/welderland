import Link from "next/link";
import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import { getAllArticles } from "@/lib/articles";
import { PILLARS, type Locale } from "@/types/content";

interface ArticlesIndexProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ArticlesIndexProps): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  return { title: `${dict.nav.articles} — WeldHub` };
}

export default async function ArticlesIndexPage({ params }: ArticlesIndexProps) {
  const { locale } = await params;
  const loc = locale as Locale;
  const dict = getDictionary(loc);
  const articles = getAllArticles(loc);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900">{dict.nav.articles}</h1>

      <div className="mt-6 flex flex-wrap gap-3">
        {PILLARS.map((pillar) => (
          <Link
            key={pillar.id}
            href={`/${loc}/articles/${pillar.id}`}
            className="rounded-full border border-slate-300 px-4 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            {loc === "id" ? pillar.labelId : pillar.labelEn}
          </Link>
        ))}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/${loc}/articles/${article.pillar}/${article.slug}`}
            className="rounded-lg border border-slate-200 p-5 transition hover:border-slate-400 hover:shadow-sm"
          >
            <p className="text-xs font-medium uppercase tracking-wide text-amber-600">
              {loc === "id"
                ? PILLARS.find((p) => p.id === article.pillar)?.labelId
                : PILLARS.find((p) => p.id === article.pillar)?.labelEn}
            </p>
            <h2 className="mt-2 font-semibold text-slate-900">{article.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{article.excerpt}</p>
            <p className="mt-3 text-xs text-slate-400">
              {dict.article.readingTime(article.readingTimeMinutes)}
            </p>
          </Link>
        ))}

        {articles.length === 0 && (
          <p className="text-slate-500">
            {loc === "id" ? "Belum ada artikel." : "No articles yet."}
          </p>
        )}
      </div>
    </div>
  );
}
