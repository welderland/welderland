/**
 * Lightweight i18n dictionary for UI strings (navigation, buttons, labels).
 *
 * This is intentionally simple (no heavy i18n library) since Phase 1 only
 * needs to toggle UI chrome between Indonesian and English. Article content
 * itself is stored as separate per-locale files (see /content/articles),
 * not translated at runtime.
 *
 * If the project grows complex enough to need plural rules, ICU message
 * formatting, etc., this is the seam where a library like next-intl can
 * be introduced later without restructuring the rest of the app.
 */
import type { Locale } from "@/types/content";

export const locales: Locale[] = ["id", "en"];
export const defaultLocale: Locale = "id";

type Dictionary = {
  nav: {
    home: string;
    articles: string;
    tools: string;
    about: string;
  };
  pillars: {
    fabrication: string;
    technology: string;
    training: string;
  };
  home: {
    heroEyebrow: string;
    heroTitle: string;
    heroSubtitle: string;
    exploreArticles: string;
    toolsComingSoon: string;
  };
  tools: {
    comingSoonTitle: string;
    comingSoonBody: string;
    notifyMeLabel: string;
    notifyMeButton: string;
    notifyMeSuccess: string;
  };
  article: {
    readingTime: (minutes: number) => string;
    relatedArticles: string;
    publishedOn: string;
  };
  footer: {
    tagline: string;
    rights: string;
  };
};

export const dictionaries: Record<Locale, Dictionary> = {
  id: {
    nav: {
      home: "Beranda",
      articles: "Artikel",
      tools: "Tools",
      about: "Tentang",
    },
    pillars: {
      fabrication: "Welding Fabrication",
      technology: "Welding Technology",
      training: "Welding Training",
    },
    home: {
      heroEyebrow: "Platform Welding Indonesia & Global",
      heroTitle: "Referensi dan alat bantu untuk profesional welding",
      heroSubtitle:
        "Artikel teknis, panduan training, dan tools praktis seputar welding fabrication, technology, dan training — dirancang untuk welder, fabricator, QC/inspector, dan welding engineer.",
      exploreArticles: "Jelajahi Artikel",
      toolsComingSoon: "Tools untuk profesional welding — segera hadir",
    },
    tools: {
      comingSoonTitle: "Tools sedang disiapkan",
      comingSoonBody:
        "WPS Generator, Welding Handbook digital, dan Consumable Database sedang dalam pengembangan. Daftarkan email Anda untuk jadi yang pertama mencoba saat rilis.",
      notifyMeLabel: "Alamat email",
      notifyMeButton: "Beri tahu saya",
      notifyMeSuccess: "Terima kasih, kami akan menghubungi Anda saat tools siap.",
    },
    article: {
      readingTime: (m) => `${m} menit baca`,
      relatedArticles: "Artikel terkait",
      publishedOn: "Dipublikasikan",
    },
    footer: {
      tagline: "Referensi dan tools untuk industri welding — Indonesia & global.",
      rights: "Hak cipta dilindungi.",
    },
  },
  en: {
    nav: {
      home: "Home",
      articles: "Articles",
      tools: "Tools",
      about: "About",
    },
    pillars: {
      fabrication: "Welding Fabrication",
      technology: "Welding Technology",
      training: "Welding Training",
    },
    home: {
      heroEyebrow: "Indonesian & Global Welding Platform",
      heroTitle: "Reference and tools for welding professionals",
      heroSubtitle:
        "Technical articles, training guides, and practical tools covering welding fabrication, technology, and training — built for welders, fabricators, QC inspectors, and welding engineers.",
      exploreArticles: "Explore Articles",
      toolsComingSoon: "Tools for welding professionals — coming soon",
    },
    tools: {
      comingSoonTitle: "Tools are in the works",
      comingSoonBody:
        "WPS Generator, a digital Welding Handbook, and a Consumable Database are in development. Leave your email to be first in line when they launch.",
      notifyMeLabel: "Email address",
      notifyMeButton: "Notify me",
      notifyMeSuccess: "Thanks — we'll reach out as soon as the tools are ready.",
    },
    article: {
      readingTime: (m) => `${m} min read`,
      relatedArticles: "Related articles",
      publishedOn: "Published",
    },
    footer: {
      tagline: "Reference and tools for the welding industry — Indonesia & global.",
      rights: "All rights reserved.",
    },
  },
};

export function getDictionary(locale: Locale) {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}
