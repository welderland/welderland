"use client";

import { useState, type FormEvent } from "react";
import type { Locale } from "@/types/content";
import { getDictionary } from "@/i18n/dictionaries";

interface NotifyMeFormProps {
  locale: Locale;
}

/**
 * Phase 1 placeholder: collects emails for early access to Phase 2 tools.
 *
 * NOTE: this currently only simulates submission (local state, no network
 * call) since there is no backend/storage wired up yet. When ready, replace
 * handleSubmit with a real API call (e.g. to Supabase) — the form UI itself
 * does not need to change.
 */
export function NotifyMeForm({ locale }: NotifyMeFormProps) {
  const dict = getDictionary(locale);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO(phase-2): send to real backend/email list provider.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <p className="rounded-md bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
        {dict.tools.notifyMeSuccess}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
      <label className="sr-only" htmlFor="notify-email">
        {dict.tools.notifyMeLabel}
      </label>
      <input
        id="notify-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={dict.tools.notifyMeLabel}
        className="w-full rounded-md border border-slate-300 px-4 py-2.5 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 sm:max-w-xs"
      />
      <button
        type="submit"
        className="rounded-md bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
      >
        {dict.tools.notifyMeButton}
      </button>
    </form>
  );
}
