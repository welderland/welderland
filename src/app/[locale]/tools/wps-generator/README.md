# WPS Generator — Phase 2 placeholder

This folder is intentionally empty in Phase 1.

Per the project roadmap, the WPS Generator route lives here
(`/[locale]/tools/wps-generator`) so that Phase 2 development only needs
to add files to an existing, already-wired-up route — no project
restructuring required.

When Phase 2 starts:
1. Add `page.tsx` here for the generator UI.
2. Reuse `Header` / `Footer` from `src/components/layout` so visual
   identity stays consistent with the rest of the site.
3. Reuse the `Locale` / dictionary pattern from `src/i18n` for bilingual
   labels.
4. See the "Definisi MVP" document for the functional scope (SMAW +
   AWS D1.1 + carbon steel for the first version).
