"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const other = locale === "si" ? "en" : "si";

  return (
    <button
      type="button"
      onClick={() => router.replace(pathname, { locale: other })}
      className="rounded-full border border-brand-maroon/20 px-3 py-1 text-xs font-semibold text-text-primary transition-colors hover:border-brand-saffron"
    >
      {locale === "si" ? "සිං / EN" : "EN / සිං"}
    </button>
  );
}
