import Link from "next/link";
import type { Locale } from "@/types/content";
import { getDictionary } from "@/i18n/dictionaries";

interface FooterProps {
  locale: Locale;
}

export function Footer({ locale }: FooterProps) {
  const dict = getDictionary(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <span className="text-lg font-semibold tracking-tight text-slate-900">
              Welderland
            </span>
            <p className="mt-2 max-w-sm text-sm text-slate-600">{dict.footer.tagline}</p>
          </div>

          <div className="grid grid-cols-2 gap-8 text-sm sm:gap-12">
            <div>
              <p className="font-medium text-slate-900">{dict.nav.articles}</p>
              <ul className="mt-3 space-y-2 text-slate-600">
                <li>
                  <Link href={`/${locale}/articles/fabrication`} className="hover:text-slate-900">
                    {dict.pillars.fabrication}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/articles/technology`} className="hover:text-slate-900">
                    {dict.pillars.technology}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/articles/training`} className="hover:text-slate-900">
                    {dict.pillars.training}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-slate-900">{dict.nav.tools}</p>
              <ul className="mt-3 space-y-2 text-slate-600">
                <li>
                  <Link href={`/${locale}/tools`} className="hover:text-slate-900">
                    WPS Generator
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/about`} className="hover:text-slate-900">
                    {dict.nav.about}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-6 text-xs text-slate-500">
          © {year} Welderland. {dict.footer.rights}
        </div>
      </div>
    </footer>
  );
}
