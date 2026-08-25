import {
  BookOpen,
  Heart,
  Leaf,
  Flower2,
  Home,
  Star,
  Mic,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { PROGRAM_CATEGORIES } from "@/lib/constants";
import { pageMetadata } from "@/lib/seo";

const ICONS: Record<string, LucideIcon> = {
  BookOpen,
  Heart,
  Leaf,
  Flower2,
  Home,
  Star,
  Mic,
  Sparkles,
};

export async function generateMetadata() {
  const [t, locale] = await Promise.all([
    getTranslations("metadata.about"),
    getLocale(),
  ]);
  return pageMetadata({
    locale,
    path: "/about",
    title: t("title"),
    description: t("description"),
  });
}

export default async function AboutPage() {
  const t = await getTranslations("about");

  return (
    <main className="mx-auto max-w-[900px] flex-1 px-4 py-16 sm:px-6">
      <section className="text-center">
        <h1 className="font-display text-3xl font-bold text-brand-maroon md:text-4xl">
          {t("intro.heading")}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-text-secondary">
          {t("intro.body")}
        </p>
      </section>

      <section className="mt-16 rounded-2xl bg-surface-cream p-8 md:p-12">
        <h2 className="font-display text-2xl font-bold text-brand-maroon">
          {t("mission.heading")}
        </h2>
        <p className="mt-4 text-text-secondary">{t("mission.body")}</p>
      </section>

      <section className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4">
        {Object.entries(PROGRAM_CATEGORIES).map(([key, meta]) => {
          const Icon = ICONS[meta.icon];
          return (
            <div
              key={key}
              className="flex flex-col items-center gap-2 rounded-xl bg-surface-white p-5 text-center shadow-sm"
            >
              <Icon className="h-7 w-7" style={{ color: meta.color }} />
            </div>
          );
        })}
      </section>

      <section className="mt-16 rounded-2xl bg-brand-maroon px-8 py-12 text-center text-text-inverse md:px-12">
        <h2 className="font-display text-2xl font-bold text-brand-saffron">
          {t("peoTv.heading")}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-text-inverse/90">
          {t("peoTv.body")}
        </p>
      </section>

      <section className="mt-16 text-center">
        <h2 className="font-display text-xl font-bold text-brand-maroon">
          {t("operator.heading")}
        </h2>
        <p className="mt-3 font-semibold text-text-primary">
          {t("operator.companyName")}
        </p>
        <p className="mt-1 text-text-secondary">{t("operator.address")}</p>
        <p className="mt-1 text-text-secondary">{t("operator.phone")}</p>
      </section>
    </main>
  );
}
