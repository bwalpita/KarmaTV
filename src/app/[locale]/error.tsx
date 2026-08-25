"use client";

import { useTranslations } from "next-intl";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("common");

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-24 text-center">
      <h1 className="font-display text-2xl font-bold text-brand-maroon">
        {t("error")}
      </h1>
      <button
        type="button"
        onClick={reset}
        className="rounded-full bg-brand-maroon px-6 py-3 text-sm font-bold text-text-inverse hover:opacity-90"
      >
        {t("tryAgain")}
      </button>
    </main>
  );
}
