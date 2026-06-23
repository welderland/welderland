import Link from "next/link";
import type { Locale } from "@/types/content";
import { getDictionary } from "@/i18n/dictionaries";

interface HeaderProps {
  locale: Locale;
}

/**
 * Site-wide header. Shared by every route — marketing pages, article pages,
 * and (in Phase 2) the tools section — so visual identity stays consistent
 * as the platform grows beyond articles.
 */
export function Header({ locale }: HeaderProps) {
  const dict = getDictionary(locale);
  const otherLocale: Locale = locale === "id" ? "en" : "id";

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-slate-900 text-sm font-bold text-white">
            W
          </span>
          <span className="text-lg font-semibold tracking-tight text-slate-900">
            WeldHub
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-700 sm:flex">
          <Link href={`/${locale}`} className="hover:text-slate-950">
            {dict.nav.home}
          </Link>
          <Link href={`/${locale}/articles`} className="hover:text-slate-950">
            {dict.nav.articles}
          </Link>
          <Link href={`/${locale}/tools`} className="hover:text-slate-950">
            {dict.nav.tools}
          </Link>
          <Link href={`/${locale}/about`} className="hover:text-slate-950">
            {dict.nav.about}
          </Link>
        </nav>

        <Link
          href={`/${otherLocale}`}
          className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          {otherLocale.toUpperCase()}
        </Link>
      </div>
    </header>
  );
}
