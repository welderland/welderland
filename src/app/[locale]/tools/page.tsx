import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import { NotifyMeForm } from "@/components/ui/NotifyMeForm";
import type { Locale } from "@/types/content";

interface ToolsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ToolsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  return { title: `${dict.nav.tools} — WeldHub` };
}

const upcomingTools = [
  {
    id: "wps-generator",
    nameId: "WPS Generator",
    nameEn: "WPS Generator",
    descId: "Buat dokumen Welding Procedure Specification sesuai standar AWS, ASME, atau ISO — dimulai dari SMAW dan AWS D1.1.",
    descEn: "Create Welding Procedure Specification documents aligned with AWS, ASME, or ISO standards — starting with SMAW and AWS D1.1.",
  },
  {
    id: "handbook",
    nameId: "Welding Handbook Digital",
    nameEn: "Digital Welding Handbook",
    descId: "Referensi digital prosedur dan standar welding yang bisa diakses kapan saja.",
    descEn: "A digital reference for welding procedures and standards, accessible anytime.",
  },
  {
    id: "consumable-database",
    nameId: "Consumable Database",
    nameEn: "Consumable Database",
    descId: "Katalog elektroda, kawat las, dan flux beserta spesifikasi dan rekomendasi penggunaannya.",
    descEn: "A catalog of electrodes, welding wire, and flux with specifications and usage recommendations.",
  },
];

export default async function ToolsPage({ params }: ToolsPageProps) {
  const { locale } = await params;
  const loc = locale as Locale;
  const dict = getDictionary(loc);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-amber-600">
        {dict.nav.tools}
      </p>
      <h1 className="mt-2 text-3xl font-bold text-slate-900">{dict.tools.comingSoonTitle}</h1>
      <p className="mt-4 text-slate-600">{dict.tools.comingSoonBody}</p>

      <div className="mt-8">
        <NotifyMeForm locale={loc} />
      </div>

      <div className="mt-12 space-y-5">
        {upcomingTools.map((tool) => (
          <div key={tool.id} className="rounded-lg border border-slate-200 p-5">
            <h2 className="font-semibold text-slate-900">
              {loc === "id" ? tool.nameId : tool.nameEn}
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              {loc === "id" ? tool.descId : tool.descEn}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
