import { redirect } from "next/navigation";
import { defaultLocale } from "@/i18n/dictionaries";

/**
 * The root path ("/") has no UI of its own — it always redirects to the
 * default locale (e.g. "/" -> "/id"). This keeps every actual page living
 * under the [locale] segment, so locale-awareness is never optional.
 */
export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
