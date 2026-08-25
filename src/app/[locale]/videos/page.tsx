import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { VideoGrid } from "@/components/video/video-grid";
import { VideoFilters } from "@/components/video/video-filters";
import { getVideosPage } from "@/lib/db/queries";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const [t, locale] = await Promise.all([
    getTranslations("metadata.videos"),
    getLocale(),
  ]);
  return pageMetadata({
    locale,
    path: "/videos",
    title: t("title"),
    description: t("description"),
  });
}

const PAGE_SIZE = 12;

export default async function VideosPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string }>;
}) {
  const params = await searchParams;
  const t = await getTranslations("videos");
  const category = params.category ?? "";
  const page = Number(params.page ?? "1");

  const { items, total } = await getVideosPage({
    category: category || undefined,
    page,
    pageSize: PAGE_SIZE,
  });
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const labels = {
    filterAll: t("filterAll"),
    filterDhamma: t("filterDhamma"),
    filterWellness: t("filterWellness"),
    filterAyurveda: t("filterAyurveda"),
    filterYoga: t("filterYoga"),
    filterTalkShows: t("filterTalkShows"),
    filterSpecial: t("filterSpecial"),
  };

  return (
    <main className="mx-auto max-w-[1280px] flex-1 px-4 py-16 sm:px-6">
      <div className="mb-8 text-center">
        <h1 className="font-display text-3xl font-bold text-brand-maroon md:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-2 text-text-secondary">{t("subtitle")}</p>
      </div>

      <div className="mb-8 flex justify-center">
        <VideoFilters labels={labels} active={category} />
      </div>

      <VideoGrid videos={items} />

      {totalPages > 1 && (
        <div className="mt-10 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={{
                pathname: "/videos",
                query: {
                  ...(category ? { category } : {}),
                  page: String(p),
                },
              }}
              className={`h-9 w-9 rounded-full text-center text-sm leading-9 ${
                p === page
                  ? "bg-brand-maroon text-text-inverse"
                  : "bg-surface-cream text-text-secondary hover:bg-brand-saffron/20"
              }`}
            >
              {p}
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
