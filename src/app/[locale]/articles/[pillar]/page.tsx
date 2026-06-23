import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import { getAllArticlesForPillar } from "@/lib/articles";
import { PILLARS, type Locale, type Pillar } from "@/types/content";

interface PillarPageProps {
  params: Promise<{ locale: string; pillar: string }>;
}

const VALID_PILLARS: Pillar[] = ["fabrication", "technology", "training"];

export async function generateMetadata({ params }: PillarPageProps): Promise<Metadata> {
  const { locale, pillar } = await params;
  const loc = locale as Locale;
  const pillarMeta = PILLARS.find((p) => p.id === pillar);
  const label = pillarMeta ? (loc === "id" ? pillarMeta.labelId : pillarMeta.labelEn) : "Articles";
  return { title: `${label} — WeldHub` };
}

export default async function PillarPage({ params }: PillarPageProps) {
  const { locale, pillar } = await params;
  const loc = locale as Locale;

  if (!VALID_PILLARS.includes(pillar as Pillar)) {
    notFound();
  }

  const dict = getDictionary(loc);
  const pillarMeta = PILLARS.find((p) => p.id === pillar)!;
  const label = loc === "id" ? pillarMeta.labelId : pillarMeta.labelEn;
  const articles = getAllArticlesForPillar(pillar as Pillar, loc);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <Link href={`/${loc}/articles`} className="text-sm text-slate-500 hover:text-slate-800">
        ← {dict.nav.articles}
      </Link>
      <h1 className="mt-3 text-3xl font-bold text-slate-900">{label}</h1>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/${loc}/articles/${article.pillar}/${article.slug}`}
            className="rounded-lg border border-slate-200 p-5 transition hover:border-slate-400 hover:shadow-sm"
          >
            <h2 className="font-semibold text-slate-900">{article.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{article.excerpt}</p>
            <p className="mt-3 text-xs text-slate-400">
              {dict.article.readingTime(article.readingTimeMinutes)}
            </p>
          </Link>
        ))}

        {articles.length === 0 && (
          <p className="text-slate-500">
            {loc === "id" ? "Belum ada artikel di kategori ini." : "No articles in this category yet."}
          </p>
        )}
      </div>
    </div>
  );
}
