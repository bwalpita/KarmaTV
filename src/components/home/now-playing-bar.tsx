import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getScheduleForDay, currentSlot } from "@/lib/db/queries";
import { getColomboNow } from "@/lib/time";

export async function NowPlayingBar() {
  const [t, locale, now] = await Promise.all([
    getTranslations("nowPlaying"),
    getLocale(),
    Promise.resolve(getColomboNow()),
  ]);
  const daySchedule = await getScheduleForDay(now.dayOfWeek);
  const current = currentSlot(daySchedule, now.minutes);
  if (!current?.program) return null;

  const title =
    locale === "si" ? current.program.titleSi : current.program.titleEn;

  return (
    <div className="mx-4 mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-brand-maroon px-6 py-4 text-text-inverse sm:mx-6">
      <div className="flex items-center gap-3">
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-semantic-live opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-semantic-live" />
        </span>
        <span className="font-bold">{t("nowOnAir")}:</span>
        <span>{title}</span>
      </div>
      <Link
        href="/live"
        className="flex items-center gap-1 font-bold text-brand-saffron hover:opacity-80"
      >
        {t("upNext")} →
      </Link>
    </div>
  );
}
