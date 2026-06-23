import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/types/content";

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  return { title: `${dict.nav.about} — WeldHub` };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const loc = locale as Locale;

  const copy =
    loc === "id"
      ? {
          title: "Tentang WeldHub",
          body: [
            "WeldHub adalah platform referensi dan tools untuk industri welding, dibangun untuk welder, fabricator, QC/inspector, welding engineer, dan siswa training di Indonesia maupun secara global.",
            "Kami menyusun artikel teknis seputar welding fabrication, welding technology, dan welding training, dengan mengacu pada standar internasional seperti AWS, ASME, dan ISO. Ke depan, platform ini juga akan menghadirkan tools praktis seperti WPS Generator, Welding Handbook digital, dan Consumable Database.",
            "Konten teknis di situs ini disusun secermat mungkin, namun selalu rujuk ke code/standar resmi dan pihak berwenang (Welding Engineer, CWI, atau otoritas yang berlaku di proyek Anda) untuk keputusan teknis pada proyek nyata.",
          ],
        }
      : {
          title: "About WeldHub",
          body: [
            "WeldHub is a reference and tools platform for the welding industry, built for welders, fabricators, QC inspectors, welding engineers, and training students — in Indonesia and globally.",
            "We publish technical articles covering welding fabrication, welding technology, and welding training, referencing international standards such as AWS, ASME, and ISO. Going forward, the platform will also offer practical tools such as a WPS Generator, a digital Welding Handbook, and a Consumable Database.",
            "Technical content on this site is prepared carefully, but always defer to the official code/standard and the relevant authority (Welding Engineer, CWI, or whoever governs your project) for technical decisions on real projects.",
          ],
        };

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900">{copy.title}</h1>
      <div className="mt-6 space-y-4 text-slate-700">
        {copy.body.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}
