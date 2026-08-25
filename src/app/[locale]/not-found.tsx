import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("common");

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-24 text-center">
      <h1 className="font-display text-3xl font-bold text-brand-maroon">
        {t("pageNotFound")}
      </h1>
      <p className="text-text-secondary">{t("pageNotFoundDesc")}</p>
      <Link
        href="/"
        className="rounded-full bg-brand-maroon px-6 py-3 text-sm font-bold text-text-inverse hover:opacity-90"
      >
        {t("goHome")}
      </Link>
    </main>
  );
}
