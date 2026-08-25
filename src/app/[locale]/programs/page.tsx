import { getLocale, getTranslations } from "next-intl/server";
import { ProgramCard } from "@/components/program/program-card";
import { getActivePrograms } from "@/lib/db/queries";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const [t, locale] = await Promise.all([
    getTranslations("metadata.programs"),
    getLocale(),
  ]);
  return pageMetadata({
    locale,
    path: "/programs",
    title: t("title"),
    description: t("description"),
  });
}

export default async function ProgramsPage() {
  const [t, locale, allPrograms] = await Promise.all([
    getTranslations("programs"),
    getLocale(),
    getActivePrograms(),
  ]);

  return (
    <main className="mx-auto max-w-[1280px] flex-1 px-4 py-16 sm:px-6">
      <div className="mb-8 text-center">
        <h1 className="font-display text-3xl font-bold text-brand-maroon md:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-2 text-text-secondary">{t("subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {allPrograms.map((program) => (
          <ProgramCard key={program.id} program={program} locale={locale} />
        ))}
      </div>
    </main>
  );
}
