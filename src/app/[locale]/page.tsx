import Link from "next/link";
import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import { getAllArticles } from "@/lib/articles";
import { PILLARS, type Locale } from "@/types/content";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  return {
    title: `WeldHub — ${dict.home.heroTitle}`,
    description: dict.home.heroSubtitle,
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const loc = locale as Locale;
  const dict = getDictionary(loc);
  const latestArticles = getAllArticles(loc).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="border-b border-slate-200 bg-slate-900 text-white">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-amber-400">
            {dict.home.heroEyebrow}
          </p>
          <h1 className="mt-4 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
            {dict.home.heroTitle}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-slate-300">{dict.home.heroSubtitle}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={`/${loc}/articles`}
              className="rounded-md bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100"
            >
              {dict.home.exploreArticles}
            </Link>
            <Link
              href={`/${loc}/tools`}
              className="rounded-md border border-slate-600 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
            >
              {dict.home.toolsComingSoon}
            </Link>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-3">
          {PILLARS.map((pillar) => (
            <Link
              key={pillar.id}
              href={`/${loc}/articles/${pillar.id}`}
              className="rounded-lg border border-slate-200 p-6 transition hover:border-slate-400 hover:shadow-sm"
            >
              <h2 className="text-lg font-semibold text-slate-900">
                {loc === "id" ? pillar.labelId : pillar.labelEn}
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                {dict.nav.articles} →
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest articles */}
      {latestArticles.length > 0 && (
        <section className="border-t border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <h2 className="text-2xl font-semibold text-slate-900">{dict.nav.articles}</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              {latestArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/${loc}/articles/${article.pillar}/${article.slug}`}
                  className="rounded-lg border border-slate-200 bg-white p-5 transition hover:border-slate-400 hover:shadow-sm"
                >
                  <p className="text-xs font-medium uppercase tracking-wide text-amber-600">
                    {loc === "id"
                      ? PILLARS.find((p) => p.id === article.pillar)?.labelId
                      : PILLARS.find((p) => p.id === article.pillar)?.labelEn}
                  </p>
                  <h3 className="mt-2 font-semibold text-slate-900">{article.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{article.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
