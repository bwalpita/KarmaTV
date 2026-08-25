import { getLocale, getTranslations } from "next-intl/server";
import { VideoPlayer } from "@/components/video/video-player";
import { VideoGrid } from "@/components/video/video-grid";
import { getScheduleForDay, getLatestVideos } from "@/lib/db/queries";
import { getColomboNow, formatTime } from "@/lib/time";
import { SOCIAL_LINKS, YOUTUBE_LIVE_VIDEO_ID } from "@/lib/constants";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const [t, locale] = await Promise.all([
    getTranslations("metadata.live"),
    getLocale(),
  ]);
  return pageMetadata({
    locale,
    path: "/live",
    title: t("title"),
    description: t("description"),
  });
}

export default async function LivePage() {
  const [t, schedule, home, locale] = await Promise.all([
    getTranslations("live"),
    getTranslations("schedule"),
    getTranslations("home"),
    getLocale(),
  ]);

  const now = getColomboNow();
  const daySchedule = await getScheduleForDay(now.dayOfWeek);
  const remaining = daySchedule.filter(({ slot }) => {
    const [eh, em] = slot.endTime.split(":").map(Number);
    return eh * 60 + em > now.minutes;
  });
  const latestVideos = await getLatestVideos(4);

  return (
    <main className="mx-auto max-w-[1280px] flex-1 px-4 py-16 sm:px-6">
      <div className="mb-8 text-center">
        <h1 className="font-display text-3xl font-bold text-brand-maroon md:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-2 text-text-secondary">{t("subtitle")}</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <VideoPlayer videoId={YOUTUBE_LIVE_VIDEO_ID} title={t("title")} autoplay />
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-surface-cream p-4">
            <p className="text-sm text-text-secondary">
              {t("notLiveDescription")}
            </p>
            <a
              href={SOCIAL_LINKS.youtubeLive}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded-full bg-brand-maroon px-5 py-2 text-sm font-bold text-text-inverse hover:opacity-90"
            >
              {t("watchOnYouTube")}
            </a>
          </div>
        </div>

        <aside className="rounded-2xl border border-brand-maroon/10 bg-surface-white p-6">
          <h2 className="mb-4 font-display text-lg font-bold text-brand-maroon">
            {t("todayRemaining")}
          </h2>
          {remaining.length === 0 ? (
            <p className="text-sm text-text-tertiary">{schedule("noPrograms")}</p>
          ) : (
            <ul className="space-y-3">
              {remaining.map(({ slot, program }) => (
                <li key={slot.id} className="flex items-center gap-3 text-sm">
                  <span className="min-w-[70px] font-bold text-brand-maroon">
                    {formatTime(slot.startTime, locale)}
                  </span>
                  <span className="text-text-primary">
                    {program
                      ? locale === "si"
                        ? program.titleSi
                        : program.titleEn
                      : ""}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </aside>
      </div>

      <section className="mt-16">
        <h2 className="mb-6 font-display text-2xl font-bold text-brand-maroon">
          {home("latestVideosTitle")}
        </h2>
        <VideoGrid videos={latestVideos} />
      </section>
    </main>
  );
}
